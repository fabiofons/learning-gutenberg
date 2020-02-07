<?php

function add_kili_defer_attribute($tag, $handle) {
   // add script handles to the array below
   $scripts_to_defer = array(
	'pwa-main-script',
   	'theme-scripts',
   	'bodymovin',
   	'wp-bodymovin',
   	'jquery.isonscreen',
   	'prismjs',
	'admin-bar',
	'et_monarch-ouibounce',
	'et_monarch-custom-js',
	'wpshout-js-cookie-demo',
	'cookie',
	'wpshout-no-broken-image',
	'goodbye-captcha-public-script',
	'devicepx',
	'search-box-value',
	'page-min-height',
	'kamn-js-widget-easy-twitter-feed-widget',
	'__ytprefs__',
	'__ytprefsfitvids__',
	'jquery-migrate',
	'icegram',
	'disqus',
   );

   foreach($scripts_to_defer as $defer_script) {
      if ($defer_script === $handle) {
         return str_replace(' src', ' defer src', $tag);
      }
   }
   return $tag;
}

add_filter('script_loader_tag', 'add_kili_defer_attribute', 10, 2);

function add_kili_async_attribute($tag, $handle) {
   // add script handles to the array below
   $scripts_to_async = array(

   );
   foreach($scripts_to_async as $async_script) {
      if ($async_script === $handle) {
         return str_replace(' src', ' async src', $tag);
      }
   }
   return $tag;
}

add_filter('script_loader_tag', 'add_kili_async_attribute', 10, 2);


function defer_parsing_of_js( $url ) {
    if ( is_user_logged_in() ) return $url; //don't break WP Admin
	if ( FALSE === strpos( $url, '.js' ) ) {
		return $url;
	}
	else if ( FALSE !== strpos( $url, 'defer' ) ) {
		return $url;
	}
	if (  FALSE !== strpos( $url, 'jquery.js' ) ) {
		return str_replace( ' src', ' defer src', $url );
	};

    return str_replace( ' src', ' defer src', $url );
}
add_filter( 'script_loader_tag', 'defer_parsing_of_js', 10 );
