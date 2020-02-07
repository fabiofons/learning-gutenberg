<?php
if ( class_exists( 'TimberSite' ) ) {
	class PayixSite extends TimberSite {
		function __construct() {
			add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
			parent::__construct();
		}

		function add_to_twig( $twig ) {

			$function = new Twig_SimpleFunction('get_assets_path', function ( $filename ) {
				return $this->assets_path( $filename );
			});
			$twig->addFunction($function);

			$function = new Twig_SimpleFunction('get_block_styles', function ( $filename ) {
				return $this->block_styles( $filename );
			});
			$twig->addFunction($function);

			$function = new Twig_SimpleFunction('truncate_words', function ( $string, $max_words ) {
				return $this->truncate_words( $string, $max_words );
			});
			$twig->addFunction($function);

			return $twig;
		}

		private function truncate_words( $phrase, $max_words ) {
			$phrase = strip_tags( $phrase );
			$phrase_array = explode( ' ', $phrase );
			if( count( $phrase_array ) > $max_words && $max_words > 0 ) {
				$phrase = implode( ' ', array_slice( $phrase_array, 0, $max_words ) ) . ' (...)';
			}
			return $phrase;
		}

		private function block_styles( $filename ) {
			$uri = $this->assets_path( 'styles/' . $filename . '.css' );
			return "<link rel='stylesheet' href='{$uri}'>";
		}

		private function assets_path( $filename ) {
			$dist_path = get_stylesheet_directory_uri() . '/dist/';
			static $manifest;

			if (empty($manifest)) {
				$manifest_path = get_stylesheet_directory() . '/dist/' . 'assets.json';
				$manifest = new payixAssets($manifest_path);
			}

			if (array_key_exists($filename, $manifest->get())) {
				return $dist_path . $manifest->get()[$filename];
			}
			return $dist_path . $filename;
		}
	}
	new PayixSite();
}
