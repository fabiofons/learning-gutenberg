<?php
/**
 * Plugin Name: kili-blocks
 * Plugin URI: https://koombea.com
 * Description: blocks for kili.
 * Author: Fabio Fonseca <fabio.fonseca@koombea.com>
 * Author URI: https://koombea.com
 *  * Version: 1.0.0
 */

 // Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function kili_blocks_register_block_type($block, $options=array()){
  register_block_type('kili-blocks/' . $block, 
    array_merge(
      array(
        'editor_script' => 'kili-blocks-editor-script',
        'editor_style' => 'kili-blocks-editor-style',
        'script' => 'kili-blocks-script',
        'style' => 'kili-blocks-style'
      ),
      $options
    )
  );
}

function kili_blocks_register() {
  wp_register_script('kili-blocks-editor-script',
    plugins_url('dist/editor.js',__FILE__),
    array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-editor','wp-blob', 'wp-data')  
  );

  wp_register_script('kili-blocks-script',
    plugins_url('dist/script.js',__FILE__),
    array('jquery')  
  );

  wp_register_style('kili-blocks-editor-style',
    plugins_url('dist/editor.css',__FILE__),
    array('wp-edit-blocks')
  );

  wp_register_style('kili-blocks-style',
  plugins_url('dist/style.css',__FILE__)
);

  kili_blocks_register_block_type('kililayout');
  kili_blocks_register_block_type('kililayout2');
  kili_blocks_register_block_type('team-member');
  kili_blocks_register_block_type('team-members');
}

add_action('init', 'kili_blocks_register');