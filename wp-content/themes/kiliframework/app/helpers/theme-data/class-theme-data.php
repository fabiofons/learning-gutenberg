<?php
/**
 * Obtain theme relevant data
 *
 * @package kiliframework
 */

/**
 * Class for obtaining theme data
 */
final class Theme_Data {
	/**
	 * Get theme data
	 *
	 * @param string $type theme type. Accepted values: 'child'(default), 'parent'.
	 * @param string $theme_dir Theme directory.
	 * @param string $stylesheet Stylesheet route.
	 * @return array Theme data
	 */
	public function kili_get_theme_data( $type = 'child', $theme_dir = null, $stylesheet = null ) {
		if ( null === $theme_dir ) {
			$theme_dir = strcasecmp( $type, 'parent' ) === 0 ? get_template_directory() : get_stylesheet_directory();
		}
		if ( ! file_exists( $theme_dir . '/style.css' ) ) {
			return null;
		}
		$stylesheet_files = array();
		$template_files   = array();
		$theme_files = $this->kili_scandir( $theme_dir );
		foreach ( $theme_files as $file ) {
			if ( is_file( $theme_dir . '/' . $file ) ) {
				$this->decide_assign_array( $stylesheet_files, $template_files, preg_match( '/(.+).css/', $file ) ? 'first' : 'second', $theme_dir . '/' . $file );
			}
		}
		$explode_theme_dir = explode( '/', $theme_dir );
		$stylesheet = ( null === $stylesheet ) ? array_pop( $explode_theme_dir ) : $stylesheet;

		$theme = wp_get_theme( $stylesheet );
		$theme_data = array(
			'name'            => $theme->get( 'Name' ),
			'uri'             => $theme->get( 'ThemeURI' ),
			'description'     => $theme->get( 'Description' ),
			'author'          => $theme->get( 'Author' ),
			'author_uri'       => $theme->get( 'AuthorURI' ),
			'version'         => $theme->get( 'Version' ),
			'template'        => $theme->get( 'Template' ),
			'status'          => $theme->get( 'Status' ),
			'tags'            => $theme->get( 'Tags' ),
			'text_domain'      => $theme->get( 'TextDomain' ),
			'domain_path'      => $theme->get( 'DomainPath' ),
			'title'           => $theme->get( 'Name' ),
			'author_name'      => $theme->get( 'Author' ),
			'stylesheet_files' => $stylesheet_files,
			'template_files'   => $template_files,
			'folder'          => $stylesheet,
		);
		return $theme_data;
	}

	/**
	 * Decide in which array put the value
	 *
	 * @param array  $array1 First array.
	 * @param array  $array2 Second array.
	 * @param string $which_one In which array to put the value.
	 * @param mixed  $value The value to assign.
	 * @return void
	 */
	private function decide_assign_array( $array1, $array2, $which_one, $value ) {
		if ( strcasecmp( $which_one, 'first' ) ) {
			$array1[] = $value;
		} elseif ( strcasecmp( $which_one, 'second' ) ) {
			$array2[] = $value;
		}
	}

	/**
	 * Scans directory for files
	 *
	 * @param string $dir Directory route.
	 * @param array  $excl Excluded file names.
	 * @return array Files array
	 */
	public static function kili_scandir( $dir, $excl = array() ) {
		$all_files    = scandir( $dir );
		$files        = array();
		$denied_files = array( '.', '..', '.DS_Store' );
		if ( ! empty( $excl ) ) {
			$denied_files = array_merge( $denied_files, $excl );
		}
		foreach ( $all_files as $file ) {
			if ( ! in_array( $file, $denied_files, true ) ) {
				$files[] = $file;
			}
		}
		return $files;
	}

	/**
	 * Return WordPress global variables
	 *
	 * @return array Array with WordPress globals
	 */
	public static function get_wordpress_globals() {
		global $wp_query, $paged, $post;
		return array(
			'wp_query' => $wp_query,
			'paged' => $paged,
			'post' => $post,
		);
	}
}
