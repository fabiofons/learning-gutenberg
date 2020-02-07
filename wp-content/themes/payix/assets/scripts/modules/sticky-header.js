import $ from 'jquery';

export function stickyHeader(option) {
  "use strict";
  // Get class name
  var stickyClass = document.querySelector(option.stickyClass);

  // get disable at small screen size setting
  var disableWidth = parseInt(option.disableWidth);

  // get disable at large screen size setting
  var disableLargeWidth = parseInt(option.disableLargeWidth);

  // get transition effect (slide or fade)
  var stickyTransition = option.stickyTransition;

  // get activaton height setting
  var activationHeight = parseInt(option.activationHeight);

  // if is admin bar showing, needed for auto calc of activation height when admin bar is showing
  var adminBar = option.adminBar;

  // disable on scroll down
  var sticky_disable_down = option.sticky_disable_down;

  var viewportWidth;

  function calcViewportWidth(e) {

    // Calculate actual viewport width
    var e = window, a = 'inner';

    if (!('innerWidth' in window)) {
      a = 'client';
      e = document.documentElement || document.body;
    }
    viewportWidth = e[a + 'Width'];

  }

  calcViewportWidth();

  var parentsticky = stickyClass.parentNode;

  var wrappersticky = document.createElement('div');
  var position = 0;
  for (var i = 0; i < parentsticky.childNodes.length; i++) {
    if (parentsticky.childNodes[i] == stickyClass) {
      position = i;
      break;
    }
  }

  wrappersticky.id = 'sticky-wrap';
  wrappersticky.appendChild(stickyClass);
  parentsticky.insertBefore(wrappersticky, parentsticky.childNodes[position]);

  var parentnav = stickyClass.parentNode;
  var wrappernav = document.createElement('div');
  wrappernav.id = 'sticky-nav';
  parentnav.replaceChild(wrappernav, stickyClass);
  wrappernav.appendChild(stickyClass);

  // get activation height from settings
  if (activationHeight == "0") {
    var autoActivate = true;
  }

  var mydivHeight;


  function initialDivHeight() {

    // get initial element height of selected sticky class
    mydivHeight = (stickyClass.offsetHeight);

    // when initial element have margin bottom - awaken example using #masthead class
    if (parseInt($(stickyClass).css("marginBottom")) > 0) {

      // element have margin bottom, apply it to initial wrap
      //$(stickyClass).css("marginBottom").replace('px', '')
      wrappersticky.style.marginBottom = ($(stickyClass).css("marginBottom"));
    }

    if (mydivHeight == "0") {
      // something is wrong, wrapper cant be zero, if so content will jump while scroll. Awaken theme (for example) with .awaken-navigation-container class selected will use this part. Calculate height based on element children height

      $(stickyClass).children().filter(':visible').each(function () {
        mydivHeight = $(this).outerHeight(true);

      });

    }

    if (viewportWidth >= disableWidth) {
      //wrappersticky.style.height = mydivHeight + 'px';
    }
  }

  initialDivHeight();
  var headerElement;
  var headerElementHeight;

  function fixedDivHeight() {
    //if ( autoActivate == true ) {
    // calculate element height while fixed
    stickyClass.classList.add('js-header')
    headerElement = $(".js-header");
    headerElementHeight = headerElement.outerHeight();

    if (headerElementHeight == "0") {
      // something is wrong, wrapper cant be zero, try to calculate again with div children.
      headerElement.children().filter(':visible').each(function () {
        headerElementHeight = $(this).outerHeight(true);
      });
    }

    stickyClass.classList.remove('js-header');

    //}

  }

  fixedDivHeight();

  var adminBarHeight = 0;

  function calcAdminBarHeight() {

    if ((adminBar == "true") && (viewportWidth > 600)) {

      if ($("#wpadminbar")[0]) {
        adminBarHeight = $('#wpadminbar').height();
      } else {
        adminBarHeight = 0;
      }
    } else {
      adminBarHeight = 0;
    }


    //wrappernav.style.top = adminBarHeight + "px";
    if (stickyTransition == "slide") {
      wrappernav.style.top = "-" + headerElementHeight + "px";
      //wrappernav.style.top = "-" + headerElementHeight  + "px";
    } else {
      wrappernav.style.top = adminBarHeight + "px";
    }

  }

  calcAdminBarHeight();


  var mydivWidth;

  function initialDivWidth() {

    var rect = $(stickyClass)[0].getBoundingClientRect();
    mydivWidth = rect.width;

    //var mydivWidth = ((stickyClass.offsetWidth) + 'px');
    //stickyClass.style.width = mydivWidth + "px";

  }

  initialDivWidth();




  var deactivationHeight = activationHeight;

  function calcActivationHeight() {

    // If activate height (Make visible on Scroll) is set to 0, automatic calculation will be used.
    if (autoActivate == true) {

      // Automatic calculation of activation and deactivation height (Make visible on Scroll is set to 0).
      if (stickyTransition == "slide") {
        // Slide effect is selected
        //activationHeight  = $(stickyClass).offset().top + stickyClass.offsetHeight - adminBarHeight;
        activationHeight = $(stickyClass).offset().top + mydivHeight - adminBarHeight;
        deactivationHeight = $(stickyClass).offset().top + mydivHeight - adminBarHeight;
        //deactivationHeight = $(stickyClass).offset().top - adminBarHeight;

        if (sticky_disable_down == "on") {
          deactivationHeight = $(stickyClass).offset().top - adminBarHeight;

        }

      }

      if (stickyTransition == "fade") {

        if (sticky_disable_down == "false") {
          // Fade effect is selected
          activationHeight = $(stickyClass).offset().top - adminBarHeight;

          deactivationHeight = $(stickyClass).offset().top - adminBarHeight;

        }

        if (sticky_disable_down == "on") {

          // Fade effect is selected
          activationHeight = $(stickyClass).offset().top - adminBarHeight + mydivHeight;
          deactivationHeight = $(stickyClass).offset().top - adminBarHeight;

        }

      }

    }

  }

  calcActivationHeight();

  function headerDeactivateOnHeight() {


    if (autoActivate == true) {

      if (mydivHeight > headerElementHeight) {
        // Auto activate is true, Make visible on Scroll is set to 0, menu is probably header



        if (stickyTransition == "slide") {
          // slide effect is selected
          deactivationHeight = activationHeight;

          if (sticky_disable_down == "on") {
            deactivationHeight = activationHeight - headerElementHeight;

          }


        } else {
          activationHeight = mydivHeight;
          deactivationHeight = mydivHeight;

        }

      }

    }

  }

  headerDeactivateOnHeight();


  var hasScrollY = 'scrollY' in window;
  var lastScrollTop = 0;

  function onScroll(e) {

    //initialDivHeight();
    // if body width is larger than disable at small screen size setting

    if (viewportWidth >= disableWidth) {

      if (disableLargeWidth == 0 || viewportWidth <= disableLargeWidth) {

        //if (sticky_disable_down == "on") {

        var y = hasScrollY ? window.scrollY : document.documentElement.scrollTop;

        //var yScrollPosition = $(this).scrollTop();

        // add up or down class to the element depending on scroll direction
        if (0 <= y) {

          //var st = $(this).scrollTop();

          if (y >= lastScrollTop) {

            // downscroll code

            // add myfixed and wrapfixed class to selected fixed element while scroll down
            y >= activationHeight ? stickyClass.classList.add('js-header') : "";
            y >= activationHeight ? wrappernav.classList.add('wrapfixed') : "";

            y >= activationHeight ? wrappersticky.style.height = mydivHeight + 'px' : "";
            y >= activationHeight ? stickyClass.style.width = mydivWidth + "px" : "";


            if (stickyTransition == "slide") {

              if (sticky_disable_down == "false") {
                //y < activationHeight  + (headerElementHeight + 250) - adminBarHeight ? wrappernav.style.top = "-" + headerElementHeight  + "px" : '';
                //wrappernav.style.top = "-" + headerElementHeight  + "px"
                y >= activationHeight + headerElementHeight - adminBarHeight ? wrappernav.style.top = adminBarHeight + "px" : wrappernav.style.top = "-" + headerElementHeight + "px";

              }

              if (mydivHeight > headerElementHeight) {
                // if it's header (guess)

                if (sticky_disable_down == "false") {

                  y < activationHeight + headerElementHeight ? wrappernav.style.top = "-" + mydivHeight + "px" : '';
                  y >= activationHeight + headerElementHeight ? wrappernav.style.top = adminBarHeight + "px" : '';

                }

              }

            }

            wrappernav.classList.add('down');
            wrappernav.classList.remove('up');


            if (sticky_disable_down == "on") {
              wrappernav.style.top = "-" + (mydivHeight + adminBarHeight) + "px";
              jQuery('#sticky-nav ' + option.stickyClass + '.elementor-sticky').hide();
              //jQuery('#sticky-nav ' + option.stickyClass).css( 'top' , "-" + (mydivHeight + adminBarHeight ) + "px");
            }

          } else {
            // upscroll code

            var x = hasScrollY ? window.scrollY : document.documentElement.scrollTop;
            //x > deactivationHeight ? '' : stickyClass.classList.remove('js-header') ;
            //x > deactivationHeight ? '' : wrappernav.classList.remove('wrapfixed');

            x > deactivationHeight ? "" : wrappersticky.style.height = "";
            x > deactivationHeight ? "" : stickyClass.style.width = "";

            if (stickyTransition == "slide") {

              x > deactivationHeight ? '' : stickyClass.classList.remove('js-header');
              x > deactivationHeight ? '' : wrappernav.classList.remove('wrapfixed');

              if (sticky_disable_down == "false") {

                x < deactivationHeight + headerElementHeight + 200 - adminBarHeight ? wrappernav.style.top = "-" + headerElementHeight + "px" : '';
              }

            } else {

              x > deactivationHeight ? "" : stickyClass.classList.remove('js-header');
              x > deactivationHeight ? "" : wrappernav.classList.remove('wrapfixed');

            }


            wrappernav.classList.remove('down');
            wrappernav.classList.add('up');

            if (sticky_disable_down == "on") {
              wrappernav.style.top = adminBarHeight + "px";
              jQuery('#sticky-nav ' + option.stickyClass).css('width', mydivWidth + "px");
              jQuery('#sticky-nav ' + option.stickyClass + '.elementor-sticky').show();

            }

          }

          lastScrollTop = y;

        } else {
          //if (sticky_disable_down == "on") {
          wrappernav.classList.remove('up');
          //}
        }

      }	// if disableWidth is greater than zero


    }	// if disableLargeWidth is 0 or greater than zero

  }

  document.addEventListener('scroll', onScroll);


  var width = $(window).width()

  function OnResizeDocument() {

    // don't recalculate on height change, only width
    if ($(window).width() != width) {

      wrappernav.classList.remove('up');
      wrappernav.classList.remove('down');

      if ($(".wrapfixed")[0]) {
        // If class wrapfixed exists
        // Remove myfixed and wrapfixed clases so we can calculate
        stickyClass.classList.remove('js-header');
        wrappernav.classList.remove('wrapfixed');

      } else {
        // Else class wrapfixed does not exists
        initialDivHeight();

        // Remove width
        stickyClass.style.removeProperty("width");
        initialDivWidth();

      }
      calcViewportWidth();
      calcAdminBarHeight();
      fixedDivHeight();
      calcActivationHeight();
      headerDeactivateOnHeight();

    }

  }

  window.addEventListener('resize', OnResizeDocument);
  // need to test this, it should fire script on mobile orientation change, since onresize is somehow faulty in this case
  window.addEventListener('orientationchange', OnResizeDocument);
}