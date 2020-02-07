<?php
/**
 * Sets the theme functions
 *
 * @package Payix
 */

// Load the parent theme.
if ( !isset($kili_framework) || $kili_framework == null ) {
	include get_template_directory() . '/config/load.php';
}

// Autoload Payix Includes.
foreach ( glob( __DIR__ . '/inc/*.php' ) as $module ) {
	if ( ! $modulepath = $module ) {
		trigger_error( sprintf( __( 'Error locating %s for inclusion', 'payix' ), $module ), E_USER_ERROR );
	}
	require_once( $modulepath );
}

unset( $module, $filepath );


if ( ! class_exists( 'payixKili' ) ) {
	/**
	* Child theme main Class
	*/
	class payixKili {
		/**
		 * Class constructor
		 */
		function __construct() {
			$this->theme_setup();
			$this->add_actions();
			$this->add_filters();
		}

		/**
		 * Theme setup
		 *
		 * @return void
		 */
		public function theme_setup() {
			global $kili_framework;

			if ( isset($kili_framework) || $kili_framework != null ) {
				$kili_framework->render_pages();
			}

			register_nav_menus( array(
				'header_navigation'	=> __( 'Header Navigation', 'payix' )
			) );

			add_theme_support( 'kili-nice-search' );
			add_theme_support( 'post-thumbnails', array( 'post' ) );
			add_image_size( 'loop-image', 310, 181 );
			remove_image_size('large');
			remove_image_size('medium');
			remove_image_size('thumbnail');

		}

		/**
		 * Add actions to theme
		 *
		 * @return void
		 */
		public function add_actions() {
			if ( is_admin() ) {
				add_action( 'acf/init', array( $this, 'add_theme_options_page' ) );
				add_action( 'admin_enqueue_scripts', array( $this, 'load_admin_assets' ) );
				add_action('acf/save_post', array( $this,'clear_options_main_transient'), 20);
				add_action('wp_update_nav_menu', array( $this,'clear_options_main_transient'));
			} else {
				add_action( 'wp_enqueue_scripts', array( $this, 'load_assets' ) );
			}
		}

		/**
		 * Add filters to theme
		 *
		 * @return void
		 */
		public function add_filters() {
			add_filter( 'timber_context', array( $this, 'theme_context' ) );
			add_filter( 'wpcf7_autop_or_not', '__return_false' );
			add_filter('autoptimize_filter_css_defer_inline',array( $this, 'my_ao_css_defer_inline' ),10,1);
		}

		/**
		 * Options for using in page context
		 *
		 * @param array $context The timber context.
		 * @return array Theme options array
		 */
	    public function theme_context( $context ) {
			$context['menu']['header']	= $this->get_kili_transient_object('header_navigation', 1, 'header_navigation', 31557600);
			$context['options']			= $this->get_kili_transient_object('site_options', 0, 'option', 31557600);

			if ( class_exists( 'WPSEO_Meta' )  ) {
				$context['wpseo_metadesc'] = WPSEO_Meta::get_value( "metadesc" );
			}

			return $context;
		}

		function clear_options_main_transient() {
			$screen = get_current_screen();

			if ( strpos($screen->id, "kili-theme-settings") > -1 || strpos($screen->id, "nav-menus") > -1 ) {
				delete_transient('payixKili_header_navigation');
				delete_transient('payixKili_site_options');

				$this->get_kili_transient_object('header_navigation', 1, 'header_navigation', 31557600);
				$this->get_kili_transient_object('site_options', 0, 'option', 31557600);
			}
		}

		/**
		 * Load assets for admin
		 *
		 * @return void
		 */
		public function load_admin_assets() {
			global $kili_framework;
			wp_enqueue_style( 'admin_css', $this->asset_path( 'styles/admin.css' ), false, null );
		}

		/**
		 * Load theme assets
		 *
		 * @return void
		 */
		public function load_assets() {
			wp_enqueue_style( 'site-fonts', get_stylesheet_directory_uri() . '/dist/' . 'styles/fonts.css', false, null );
			wp_enqueue_script( 'theme-scripts', $this->asset_path('scripts/main.js'), ['jquery'], null, true );

		}

		/**
		 * Add Payix theme options page
		 *
		 * @return void
		 */
		public function add_theme_options_page() {
			if( function_exists('acf_add_options_page') ) {
				$option_page = acf_add_options_page(
					array(
						'page_title' => __('Theme Settings', 'payix'),
						'menu_title' => __('Theme Settings', 'payix'),
						'menu_slug' => 'kili-theme-settings',
						'position' => 58.996,
						'icon_url' => 'dashicons-kili',
						'capability' => 'manage_options',
					)
				);
			}
		}

		public function my_ao_css_defer_inline($inlined) {
			if ( ( is_archive() || is_author() || is_category() || is_home() || is_tag() || is_search()) && 'post' === get_post_type() ) {
				return $this->get_kili_transient_object('critical-blog', 2, 'styles/critical/blog.css');
			} elseif ( is_page('about') ) {
				return $this->get_kili_transient_object('critical-about', 2, 'styles/critical/about.css');
			} elseif ( is_page('solutions') ) {
				return $this->get_kili_transient_object('critical-solutions', 2, 'styles/critical/solutions.css');
			} elseif ( is_page('contact') ) {
				return $this->get_kili_transient_object('critical-contact', 2, 'styles/critical/contact.css');
			} elseif (is_front_page()) {
				return $this->get_kili_transient_object('critical-home', 2, 'styles/critical/home.css');
			} else {
				return $inlined;
			}
		}

		 public function get_file_contents( $asset ): string {

			global $wp_filesystem;
			if ( empty( $wp_filesystem ) ) {
				require_once( ABSPATH . '/wp-admin/includes/file.php' );
				WP_Filesystem();
			}

			$asset_path = $this->asset_path( $asset, true );

			if ($wp_filesystem->is_readable($asset_path)) {
				return $wp_filesystem->get_contents($asset_path);
			}

			return '';
		}

		public function get_kili_transient_object( $name, $type = 0, $slug = 'option', $time = 3600 ) {
            $transient_key = __CLASS__ . '_' . $name;
            $transient_object = get_transient( $transient_key );
            if ( ! empty( $transient_object ) ) {
                return $transient_object;
            }
            if ($type == 1) {
            	$object = class_exists( 'TimberMenu' ) ? new TimberMenu( $slug ) : '';
            } elseif ($type == 2) {
				$object =  $this->get_file_contents($slug);
			} else {
            	$object = function_exists( 'get_fields' ) ? get_fields( $slug ) : '';
            }
			set_transient( $transient_key, $object, $time );
            return $object;
		}

		public function asset_path( $filename, $get_dir = false ) {
			$dist_path = get_stylesheet_directory_uri() . '/dist/';
			$dist_path_dir = get_stylesheet_directory() . '/dist/';
			static $manifest;

			if (empty($manifest)) {
				$manifest_path = get_stylesheet_directory() . '/dist/' . 'assets.json';
				$manifest = new payixAssets($manifest_path);
			}

			if (array_key_exists($filename, $manifest->get())) {
				if ($get_dir) {
					return $dist_path_dir . $manifest->get()[$filename];
				}
				return $dist_path . $manifest->get()[$filename];
			}
			if ($get_dir) {
				return $dist_path_dir . $filename;
			}
			return $dist_path . $filename;
		}
	}
}


// Start the main class.
$payix_kili_class = new payixKili();

foreach(parse_blocks(get_post(5)->post_content) as $key => $value){
	// var_dump($value["blockName"]);
}