<?php
/**
 * Manages block rendering
 *
 * @package kiliframework
 */

/**
 * Class for managing block rendering
 */
class Kili_Layout {
	/**
	 * Render a block
	 *
	 * @param string  $layout Block layout.
	 * @param integer $block_position Block position.
	 * @param array   $context Page context (timber).
	 * @param string  $blocks_id Block builder id.
	 * @return void
	 */
	public function render( $layout, $block_position, $context = array(), $blocks_id = 0 ) {
		$layout_file = '{{layout}}';
		$find = array( $layout_file, '_' );
		$replace = array( $layout, '-' );
		$new_layout_file = str_replace( $find, $replace, $layout_file );
		$layout_directory = '/blocks/' . ( isset( $context['is_custom_post_type'] ) && $context['is_custom_post_type'] ? 'cpt/' . $context['post_type'] . '/' : 'pages/' );
		$full_layout_directory = get_stylesheet_directory() . $layout_directory;
		if ( ! is_dir( $full_layout_directory ) ) {
			wp_mkdir_p( $full_layout_directory, 0755 );
		}
		$file_to_render = $this->get_file_name( $layout_directory, $new_layout_file, get_stylesheet_directory() . '/blocks/pages/' );
		if ( strcasecmp( $file_to_render, '' ) === 0 ) {
			$notice = $this->get_warn_message( $new_layout_file );
			echo html_entity_decode( $notice );
			return;
		}
		$page_block = $context['post']->get_field( $blocks_id )[ $block_position ];
		$settings = array(
			'layout' => $layout,
			'blocks_id' => $blocks_id,
			'block_position' => $block_position,
			'page_block' => $page_block,
			'block_unique_class' => $page_block['acf_fc_layout'] . '_' . $block_position . '_' . $context['post']->id,
		);
		$context = array_merge( $context, $settings );
		Timber::render( $file_to_render, $context, false );
	}

	/**
	 * Get warning message when a block file is not found
	 *
	 * @param string $file_name Block file name.
	 * @return string The warning message
	 */
	private function get_warn_message( $file_name = '' ) {
		return '<section class="kili-missing-block" style="background-color:#d6ba46;color:#FFFFFF;border:1px dotted #867328;"><div class="kili-container kili-soft" style="margin:auto;max-width:1280px;padding: 15px;"><b>' .
			__( 'Notice', 'kiliframework' ) . ':</b> ' . __( 'No block template found', 'kiliframework' ) . ', ' . __( 'please create file', 'kiliframework' ) .
			' ' . $file_name . '.twig</div></section>';
	}

	/**
	 * Returns the full file path of the file to be rendered, if exists
	 *
	 * @param string $layout_directory Where should be the file.
	 * @param string $layout_file The file name.
	 * @param string $default_directory Directory where are located the default files.
	 * @return string The full file path of the file to be rendered, if exists; else, an empty string
	 */
	private function get_file_name( $layout_directory, $layout_file, $default_directory ) {
		$file_name = '';
		if ( file_exists( get_stylesheet_directory() . $layout_directory . $layout_file . '.twig' ) ) {
			$file_name = get_stylesheet_directory() . $layout_directory . $layout_file . '.twig';
		} elseif ( file_exists( $default_directory . $layout_file . '.twig' ) ) {
			$file_name = $default_directory . $layout_file . '.twig';
		} elseif ( file_exists( get_template_directory() . $layout_directory . $layout_file . '.twig' ) ) {
			$file_name = get_template_directory() . $layout_directory . $layout_file . '.twig';
		}
		return $file_name;
	}

	/**
	 * Determine if a post object is a custom post type
	 *
	 * @param object $post The post object.
	 * @return boolean If is a custom post type
	 */
	public static function is_custom_post_type( $post = null ) {
		$all_custom_post_types = get_post_types( array(
			'_builtin' => false,
		) );
		// there are no custom post types.
		if ( empty( $all_custom_post_types ) ) {
			return false;
		}
		$custom_types = array_keys( $all_custom_post_types );
		$current_post_type = get_post_type( $post );
		// could not detect current type.
		if ( ! $current_post_type ) {
			return false;
		}
		return in_array( $current_post_type, $custom_types, true );
	}
}
