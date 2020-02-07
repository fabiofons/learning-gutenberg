import $ from 'jquery';

function updateAssetSource (selector) {
  $(selector).each(function () {
    let elem = $(this);
    if (elem.data('src') && elem.data('src') != '') {
      elem.prop('src', elem.data('src'));
      elem.removeData('src');
      elem.data('src', null);
      if (elem.data('srcset')) {
        elem.prop('srcset', elem.data('srcset'));
        elem.removeData('srcset');
        elem.data('srcset', null);
      }
    } else if (elem.data('bg') && elem.data('bg') != '') {
      elem.css('background-image', 'url(' + elem.data('bg') + ')');
      elem.removeData('bg');
      elem.data('bg', null);
    }
  });
};

export function loadDeferredassets(selector) {
  if (document.querySelector(selector)) {
    let scrolling = false;
    let scrolled = false;
    $(window).scroll(function () {
      if (scrolled) {
        return;
      }
      scrolling = true;
    });
    var interval = setInterval(function () {
      if (scrolled) {
        clearInterval(interval);
        interval = null;
      } else if (scrolling || ($(window).scrollTop() > 0)) {
        if (scrolling) {
          scrolling = false;
        }
        scrolled = true;
        updateAssetSource(selector);
      }
    }, 250);
  }
}

export function scrollToTop(selector) {
  $(selector).click(() => {
    $('html, body').animate({
      scrollTop: 0
    }, 900);
    return false;
  });

}