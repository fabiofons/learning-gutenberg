<?php
add_filter( 'wpcf7_load_js', '__return_false' ); // Disable CF7 JavaScript
add_filter( 'wpcf7_load_css', '__return_false' ); // Disable CF7 CSS

add_action('wp_enqueue_scripts', 'load_wpcf7_scripts');
function load_wpcf7_scripts() {
    if ( is_page('contact') ) {
        if ( function_exists( 'wpcf7_enqueue_scripts' ) ) {
            wpcf7_enqueue_scripts();
        }
        if ( function_exists( 'wpcf7_enqueue_styles' ) ) {
            wpcf7_enqueue_styles();
        }
    }
}

/**
 * Add <body> classes
 */
add_filter('body_class', function (array $classes) {
    /** Add page slug if it doesn't exist */
    if (is_single() || is_page() && !is_front_page()) {
        if (!in_array(basename(get_permalink()), $classes)) {
            $classes[] = basename(get_permalink());
        }
    }
    /** Clean up class names for custom templates */
    $classes = array_map(function ($class) {
        return preg_replace(['/-builder(-php)?$/', '/page-template/', '/-\w+/'], '', $class);
    }, $classes);
    return array_filter($classes);
});


/**
 * Add inline css editor width
 */
add_action('admin_head', 'editor_full_width_gutenberg');

function editor_full_width_gutenberg() {
  echo '<style>
    body.gutenberg-editor-page .editor-post-title__block, body.gutenberg-editor-page .editor-default-block-appender, body.gutenberg-editor-page .editor-block-list__block {
		max-width: none !important;
	}
    .block-editor__container .wp-block {
        max-width: none !important;
    }
  </style>';
}
