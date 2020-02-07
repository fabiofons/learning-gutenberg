<?php
/**
 * Removing XMLRPC, WLW, Generator, Feeds and ShortLink
 *
 * @package Payix
 */
if ( ! is_admin() ) {
	// =========================================================================
	// REMOVE JUNK FROM HEAD
	// =========================================================================

	remove_action('wp_head', 'wp_generator'); // remove wordpress version

	// REMOVE WP EMOJI
	remove_action('wp_head', 'print_emoji_detection_script', 7);
	remove_action('wp_print_styles', 'print_emoji_styles');
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	// Remove api.w.org relation link
	remove_action('wp_head', 'rest_output_link_wp_head', 10);
	remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);
	remove_action('template_redirect', 'rest_output_link_header', 11, 0);

	add_action( 'wp_default_scripts', 'kili_jquery_into_footer' );
	function kili_jquery_into_footer( $wp_scripts ) {
		if( is_admin() ) {
			return;
		}
		$wp_scripts->add_data( 'jquery', 'group', 1 );
		$wp_scripts->add_data( 'jquery-core', 'group', 1 );
		$wp_scripts->add_data( 'jquery-migrate', 'group', 1 );
	}
	// Dequeue jQuery migrate
	function kili_dequeue_jquery_migrate( $scripts ) {
		if ( ! is_admin() && ! empty( $scripts->registered['jquery'] ) ) {
			$jquery_dependencies = $scripts->registered['jquery']->deps;
			$scripts->registered['jquery']->deps = array_diff( $jquery_dependencies, array( 'jquery-migrate' ) );
		}
	}
	add_action( 'wp_default_scripts', 'kili_dequeue_jquery_migrate' );

	//* Mover javascripts al footer
	function scripts_footer() {
		remove_action('wp_head', 'wp_print_scripts');
		remove_action('wp_head', 'wp_print_head_scripts', 9);
		remove_action('wp_head', 'wp_enqueue_scripts', 1);

		add_action('wp_footer', 'wp_print_scripts', 5);
		add_action('wp_footer', 'wp_enqueue_scripts', 5);
		add_action('wp_footer', 'wp_print_head_scripts', 5);
	}
	add_action( 'wp_enqueue_scripts', 'scripts_footer' );

	// Remove all embeds
	function disable_embeds_code_init() {

	// Remove the REST API endpoint.
	remove_action( 'rest_api_init', 'wp_oembed_register_route' );

	// Turn off oEmbed auto discovery.
	add_filter( 'embed_oembed_discover', '__return_false' );

	// Don't filter oEmbed results.
	remove_filter( 'oembed_dataparse', 'wp_filter_oembed_result', 10 );

	// Remove oEmbed-specific JavaScript from the front-end and back-end.
	remove_action( 'wp_head', 'wp_oembed_add_host_js' );
	add_filter( 'tiny_mce_plugins', 'disable_embeds_tiny_mce_plugin' );

	// Remove all embeds rewrite rules.
	add_filter( 'rewrite_rules_array', 'disable_embeds_rewrites' );

	// Remove filter of the oEmbed result before any HTTP requests are made.
	remove_filter( 'pre_oembed_result', 'wp_filter_pre_oembed_result', 10 );
	}

	add_action( 'init', 'disable_embeds_code_init', 9999 );

	function disable_embeds_tiny_mce_plugin($plugins) {
	return array_diff($plugins, array('wpembed'));
	}

	function disable_embeds_rewrites($rules) {
	foreach($rules as $rule => $rewrite) {
		if(false !== strpos($rewrite, 'embed=true')) {
		unset($rules[$rule]);
		}
	}
	return $rules;
	}

	// remove version from head
	remove_action('wp_head', 'wp_generator');

	// remove version from rss
	add_filter('the_generator', '__return_empty_string');

	// Change version from scripts and styles
	function remove_version_scripts_styles($src) {
		if (strpos($src, 'ver=')) {
			$src = remove_query_arg('ver', $src) . '?ver=py20';
		}
		return $src;
	}
	add_filter('style_loader_src', 'remove_version_scripts_styles', 9999);
	add_filter('script_loader_src', 'remove_version_scripts_styles', 9999);

	add_filter( 'style_loader_tag',  'kili_clean_style_tag'  );
	add_filter( 'script_loader_tag', 'kili_clean_script_tag'  );

	/**
	 * Clean up output of stylesheet <link> tags
	 */
	function kili_clean_style_tag( $input ) {
		preg_match_all( "!<link rel='stylesheet'\s?(id='[^']+')?\s+href='(.*)' type='text/css' media='(.*)' />!", $input, $matches );
		if ( empty( $matches[2] ) ) {
			return $input;
		}
		// Only display media if it is meaningful
		$media = $matches[3][0] !== '' && $matches[3][0] !== 'all' ? ' media="' . $matches[3][0] . '"' : '';

		return '<link rel="stylesheet" href="' . $matches[2][0] . '"' . $media . '>' . "\n";
	}

	/**
	 * Clean up output of <script> tags
	 */
	function kili_clean_script_tag( $input ) {
	$input = str_replace( "type='text/javascript' ", '', $input );

	return str_replace( "'", '"', $input );
	}

	add_action('wp_loaded', 'output_buffer_start');
	function output_buffer_start() {
		ob_start("output_callback");
	}
	function output_callback($buffer) {
		return preg_replace( "%[ ]type=[\'\"]text\/(javascript|css)[\'\"]%", '', $buffer );
	}
	add_action( 'wp_enqueue_scripts', 'remove_third_party_assets' );

	function remove_third_party_assets() {
		if ( is_page() || is_home() && is_page_template( 'page-templates/layout-builder.php' ) ) {
			wp_dequeue_style( 'wp-block-library' );
			wp_deregister_style( 'wp-block-library' );
		}
		if ( !is_user_logged_in() ) {
			wp_dequeue_style( 'dashicons' );
			wp_deregister_style( 'dashicons' );
		}
	}
} else {
	add_filter('acf/settings/remove_wp_meta_box', '__return_true');
}
