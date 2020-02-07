import $ from 'jquery';
import { loadDeferredassets, scrollToTop } from "../modules/scrolling";
import { stickyHeader } from "../modules/sticky-header"

export default {
  init() {
    // JavaScript to be fired on all pages
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
    let url = window.location;
    let urlPath = url.href.replace(url.hash, '');
    $('.js-menu-item').removeClass('active');
    if ($('.js-menu-item a[href="' + urlPath + '"]').length > 0) {
      $('.js-menu-item a[href="' + urlPath + '"]').parent().addClass('active');
    } else {
      $('.js-menu-item a[href="' + url.pathname + '"]').parent().addClass('active');
    }

    let opened = null
    const toggleVisibility = e => e.classList.toggle('show-menu')
    const toggleDropDown = e => {
      const clickedItem = e.target.closest('header')
      toggleVisibility(clickedItem);
      if (!opened) {
        opened = clickedItem
      } else if (opened == clickedItem) {
        opened = null
      } else {
        toggleVisibility(opened);
        opened = clickedItem
      }
    }

    [...document.querySelectorAll('.js-navigation-toogle')].forEach(dropDown => dropDown.addEventListener('click', toggleDropDown));

    if (document.querySelector('.js-swipe-button') !== null) {
      scrollToTop('.js-swipe-button');
    }

    let options = { "stickyClass": ".header", "activationHeight": "102", "disableWidth": "0", "disableLargeWidth": "0", "adminBar": "false", "stickyTransition": "slide", "sticky_disable_down": "false" };

    stickyHeader(options);

    loadDeferredassets('.js-iframe-defer');
    var dt = new Date();
    $('.js-current-year').html(dt.getFullYear())
  }
};
