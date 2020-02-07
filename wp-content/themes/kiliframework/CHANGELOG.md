# Changelog
All notable changes to this project will be documented in this file.

## 1.0.4
  * Add validation for kili blocks

## 1.0.3
  * Add validation for page, post and custom post type preview modes

## 1.0.2
  * Updated theme hierarchy: Child theme support for the single page on specific category eg. single-{category}.twig

## 1.0.1
  * Updated page hierarchy for render the page template type {$type}-{$pagename}.twig and {$type}-{$id}.twig

## 1.0.0
  * Add ACF local json support for kili Blocks

## 0.1.14
  * Bugfix: Add extra validation to blocks processing

## 0.1.13
  * Added Support Kili for Autosave JSON file from ACF

## 0.1.12
  * Fixed the script for add class visible to current layouts

## 0.1.11
  * Add support for ACF 5.7 and keep support for previous versions

## 0.1.10
  * Bugfix: Add missing post builder support and post template

## 0.1.9
  * Bugfix: author page shows error if the author has not set his/her name

## 0.1.8
  * Update styles file permissions

## 0.1.7
  * Updates to editor styles

## 0.1.6
  * Add dynamic styles support to pages and theme options

## 0.1.5
  * Message added to layout builder when there are no json blocks
  * Remove top border from flexible content modal tabs
  * Code optimizations
  * Add support for child theme page templates

## 0.1.4
  * Add context support for child theme.
  * Delete unnecessary TGM languages files and disable TGM plugin ACF free version when is active pro version.
  * Add html5 tags for default kili layout.
  * Add ACF free version to TGM plugins installer.

## 0.1.3
  * Updated styles for layout builder modal
  * Fixed the router to support some custom post types

## 0.1.2
  * Validate if Child is present render twig files
  * Add Asset manifest support to Child Theme
  * Add dynamic styles support to Child Theme
  * Code style improvements

## 0.1.1
  * Bugfix: layout now is visible if there are no json blocks
  * Code style improvements

## 0.1.0
  * Code improvements
  * Add theme updating functionality: now the theme will notify if there is a new version. Requires the plugin [Kili. Automatic updater](https://github.com/fabolivark/kili-automatic-updater)
  * Bugfix: correct the bad query generation when searching a custom post type with ACF fields

## 0.0.4
  * HotFix: support for page template

## 0.0.3
  * Template type names to be used for dynamic hooks
  * Augment native template hierarchy with non-PHP template processing.
  * Optimize theme hierarchy routes for twig views
  * Child theme support

## 0.0.2
  * ACF and Timber integration into the parent theme. It now works without the need of a child theme.
  * Route updates.

## 0.0.1
  * Initial development version.
