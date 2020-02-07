import LazyLinePainter from 'lazy-line-painter'

'use strict';

/**
 * Define Object with enumerable, configurable, and writable keys
 *
 * @param {*} obj Object to create.
 * @param {*} key Property name.
 * @param {*} value Value of value property.
 *
 * @returns {Object} obj An object
 */
function _defineProperty(obj, key, value) {
  obj[key] = value;
  return obj;
}

/*eslint wrap-iife: [2, "inside"]*/

/**
 * @param {HTMLDocument} doc Entire HTML document.
 */
(function (doc, $) {
  'use strict';

  const TABS_JS = 'js-tabs';
  const TABS_JS_LIST = 'js-tablist';
  const TABS_JS_LISTITEM = 'js-tablist__item';
  const TABS_JS_LISTLINK = 'js-tablist__link';
  const TABS_JS_CONTENT = 'js-tabcontent';
  const TABS_JS_CONTAINER = 'js-tabs-content';
  const TABS_JS_LINK_TO_TAB = 'js-link-to-tab';

  const TABS_DATA_PREFIX_CLASS = 'data-tabs-prefix-class';
  const TABS_DATA_HX = 'data-hx';
  const TABS_DATA_GENERATED_HX_CLASS = 'data-tabs-generated-hx-class';
  const TABS_DATA_EXISTING_HX = 'data-existing-hx';

  const TABS_DATA_SELECTED_TAB = 'data-selected';

  const TABS_PREFIX_IDS = 'label_';

  const TABS_STYLE = 'tabs';
  const TABS_LIST_STYLE = 'tabs__list';
  const TABS_LISTITEM_STYLE = 'tabs__item';
  const TABS_LINK_STYLE = 'tabs__link';
  const TABS_CONTENT_STYLE = 'tabs__content';

  const ACCORDION_LINK = 'accordion__link';
  const ACCORDION_CONTENT = 'accordion__content';
  const ACCORDION_ACTIVE = 'accordion--active';
  const ACCORDION_OPEN = 'accordion--open';

  const TABS_HX_DEFAULT_CLASS = 'invisible';

  const TABS_ROLE_TABLIST = 'tablist';
  const TABS_ROLE_TAB = 'tab';
  const TABS_ROLE_TABPANEL = 'tabpanel';
  const TABS_ROLE_PRESENTATION = 'presentation';

  const ATTR_ROLE = 'role';
  const ATTR_LABELLEDBY = 'aria-labelledby';
  const ATTR_HIDDEN = 'aria-hidden';
  const ATTR_CONTROLS = 'aria-controls';
  const ATTR_SELECTED = 'aria-selected';

  const DELAY_HASH_UPDATE = 1000;

  const MAX_WINDOW_WIDTH = 1040;

  let hash = window.location.hash.replace('#', '');
  let resizeTimeout;
  let tabsActive = false;
  let accordionActive = false;

  //const IS_OPENED_CLASS = 'is-opened';

  /**
   * Find HTML elment by ID.
   *
   * @param {String} id HTML ID to find.
   *
   * @return {HTMLElement} Element by ID
   */
  function findById(id) {
    return doc.getElementById(id);
  }

  /**
   * Add CSS classname to element.
   *
   * @param {HTMLElement} el HTML element.
   * @param {String} className CSS classname.
   */
  function addClass(el, className) {
    if (el.classList) {
      el.classList.add(className); // IE 10+
    } else {
      el.className += ' ' + className; // IE 8+
    }
  }

  /**
   * Remove CSS classname from element
   *
   * @param {HTMLElement} el HTML element.
   * @param {String} className CSS classname.
   */
  function removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className); // IE 10+
    } else {
      el.className = el.className.replace(
        new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
        ' '
      ); // IE 8+
    }
  }

  /**
   * Check if element contains CSS class name.
   *
   * @param {HTMLElement} el HTML element.
   * @param {String} className CSS classname.
   *
   * @return {HTMLElement} HTML element with className
   */
  function hasClass(el, className) {
    if (el.classList) {

      // IE 10+
      return el.classList.contains(className);
    } else {

      // IE 8+ ?
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  }

  /**
   * Set attributes
   *
   * @param {HTMLElement} node HTML element
   * @param {Object} attrs Attributes
   */
  function setAttributes(node, attrs) {
    Object.keys(attrs).forEach(function (attribute) {
      node.setAttribute(attribute, attrs[attribute]);
    });
  }

  /**
   * Unselect a link.
   *
   * @param {Array} elts List of LI elements (tabs).
   */
  function unSelectLinks(elts) {
    elts.forEach(function (linkNode) {
      var _setAttributes;

      setAttributes(
        linkNode,
        ((_setAttributes = {}),
          _defineProperty(_setAttributes, ATTR_SELECTED, false),
          _defineProperty(_setAttributes, 'tabindex', '-1'),
          _setAttributes)
      );
    });
  }

  /**
   * Unselect contents.
   *
   * @param {Array} elts List of elements that contain the content.
   */
  function unSelectContents(elts) {
    elts.forEach(function (contentNode) {
      contentNode.setAttribute(ATTR_HIDDEN, true);
    });
  }
  function paintSvgDots(el) {
    const elIndex = el.dataset.item;
    let svg = document.querySelector('#dottedline-' + elIndex);
    let svgAnimation = new LazyLinePainter(svg, { "ease": "easeLinear", "strokeWidth": 2, "strokeOpacity": 1, "strokeDash": "5, 5", "log": false });
    svgAnimation.paint();
    svg.style.opacity = 1;
  }
  /**
   * Selected element.
   *
   * @param {HTMLElement} el Selected HTML elements.
   */
  function selectLink(el) {
    var _setAttributes2;

    var destination = findById(el.getAttribute(ATTR_CONTROLS));
    setAttributes(
      el,
      ((_setAttributes2 = {}),
        _defineProperty(_setAttributes2, ATTR_SELECTED, 'true'),
        _defineProperty(_setAttributes2, 'tabindex', '0'),
        _setAttributes2)
    );
    destination.removeAttribute(ATTR_HIDDEN);
    let svgElements = document.querySelectorAll('.js-tabs-svg-animation');
    svgElements.forEach(function (element) {
      element.style.opacity = 0;
    });
    setTimeout(function () {
      el.focus();
      paintSvgDots(el);
    }, 0);
    setTimeout(function () {
      history.pushState(
        null,
        null,
        location.pathname + location.search + '#' + el.getAttribute(ATTR_CONTROLS)
      );
    }, 'DELAY_HASH_UPDATE');
  }

  /**
   * Add hash to URL.
   *
   * @param {HTMLElement} heading The accordion heading
   * @param {HTMLElement} sibling The corresponding content DIV
   *
   */
  function addHashToAccordion(heading, sibling) {
    heading.setAttribute('tabindex', '0');

    setTimeout(function () {
      heading.focus();
    }, 0);

    setTimeout(function () {
      history.pushState(
        null,
        null,
        location.pathname + location.search + '#' + sibling.getAttribute('id')
      );
    }, DELAY_HASH_UPDATE);

    // Let's make sure this tranfers into our tabs too.
    hash = `${sibling.getAttribute('id')}`;
  }

  /**
   * Select Link in list.
   *
   * @param {Array} itemsList The LI with class name .tabs__item
   * @param {Array} linkList  The anchor inside the LI with class .tabs__link
   * @param {Array} contentList The div with content
   * @param {String} param The string with "next" or "prev"
   */
  function selectLinkInList(itemsList, linkList, contentList, param) {
    var indiceTrouve = undefined;

    itemsList.forEach(function (itemNode, index) {
      if (
        'true' ===
        itemNode.querySelector('.' + TABS_JS_LISTLINK).getAttribute(ATTR_SELECTED)
      ) {
        indiceTrouve = index;
      }
    });
    unSelectLinks(linkList);
    unSelectContents(contentList);
    if ('next' === param) {
      selectLink(linkList[indiceTrouve + 1]);
      setTimeout(function () {
        linkList[indiceTrouve + 1].focus();
      }, 0);
    }
    if ('prev' === param) {
      selectLink(linkList[indiceTrouve - 1]);
      setTimeout(function () {
        linkList[indiceTrouve - 1].focus();
      }, 0);
    }
  }

  /**
   * Gets an element el, search if it is child of parent class, returns id of the parent.
   *
   * @param {HTMLElement} el HTML element.
   * @param {String} parentClass Class name of parent.
   *
   * @return {HTMLElement} Returns ID of the parent.
   */
  function searchParent(el, parentClass) {
    var found = false;
    var parentElement = el.parentNode;
    while (parentElement && false === found) {
      if (true === hasClass(parentElement, parentClass)) {
        found = true;
      } else {
        parentElement = parentElement.parentNode;
      }
    }
    if (true === found) {
      return parentElement.getAttribute('id');
    } else {
      return '';
    }
  }

  /**
   * Find all tabs inside a container
   *
   * @param  {Node} node Default document
   * @return {Array} List of tabs.
   */
  function $listTabs() {
    var node = 0 >= arguments.length || arguments[0] === undefined ? doc : arguments[0];
    return [].slice.call(node.querySelectorAll('.' + TABS_JS));
  }

  /**
   * Build tooltips for a container
   * @param  {Array} node Entire Tab node div
   */
  function attach(node) {
    if (true === tabsActive) {
      return;
    }

    destroyAccordions();

    $listTabs(node).forEach(function (tabsNode) {

      /**
       * Random string appended to the end of Tabs ID attribute name.
       */
      var iLisible = Math.random()
        .toString(32)
        .slice(2, 12);
      var prefixClassName =
        true === tabsNode.hasAttribute(TABS_DATA_PREFIX_CLASS) ?
          tabsNode.getAttribute(TABS_DATA_PREFIX_CLASS) + '-' :
          '';
      var hx =
        true === tabsNode.hasAttribute(TABS_DATA_HX) ?
          tabsNode.getAttribute(TABS_DATA_HX) :
          '';
      var hxGeneratedClass =
        true === tabsNode.hasAttribute(TABS_DATA_GENERATED_HX_CLASS) ?
          tabsNode.getAttribute(TABS_DATA_GENERATED_HX_CLASS) :
          TABS_HX_DEFAULT_CLASS;
      var existingHx =
        true === tabsNode.hasAttribute(TABS_DATA_EXISTING_HX) ?
          tabsNode.getAttribute(TABS_DATA_EXISTING_HX) :
          '';
      var $tabList = [].slice.call(tabsNode.querySelectorAll('.' + TABS_JS_LIST));
      var $tabListItems = [].slice.call(tabsNode.querySelectorAll('.' + TABS_JS_LISTITEM));
      var $tabListLinks = [].slice.call(tabsNode.querySelectorAll('.' + TABS_JS_LISTLINK));
      var $tabListPanels = [].slice.call(tabsNode.querySelectorAll('.' + TABS_JS_CONTENT));
      var noTabSelected = true;

      // container
      addClass(tabsNode, prefixClassName + TABS_STYLE);
      tabsNode.setAttribute('id', TABS_STYLE + iLisible);

      // ul
      $tabList.forEach(function (tabList) {
        var _setAttributes3;

        addClass(tabList, prefixClassName + TABS_LIST_STYLE);
        setAttributes(
          tabList,
          ((_setAttributes3 = {}),
            _defineProperty(_setAttributes3, ATTR_ROLE, TABS_ROLE_TABLIST),
            _defineProperty(_setAttributes3, 'id', TABS_LIST_STYLE + iLisible),
            _setAttributes3)
        );
      });

      // li
      $tabListItems.forEach(function (tabListItem, index) {
        var _setAttributes4;

        addClass(tabListItem, prefixClassName + TABS_LISTITEM_STYLE);
        setAttributes(
          tabListItem,
          ((_setAttributes4 = {}),
            _defineProperty(_setAttributes4, ATTR_ROLE, TABS_ROLE_PRESENTATION),
            _defineProperty(
              _setAttributes4,
              'id',
              TABS_LISTITEM_STYLE + iLisible + '-' + (index + 1)
            ),
            _setAttributes4)
        );
      });

      // a
      $tabListLinks.forEach(function (tabListLink) {
        var _setAttributes5, _setAttributes6;

        var idHref = tabListLink.getAttribute('href').replace('#', '');
        var panelControlled = findById(idHref);
        var linkText = tabListLink.innerText;
        var panelSelected = true === tabListLink.hasAttribute(TABS_DATA_SELECTED_TAB);

        addClass(tabListLink, prefixClassName + TABS_LINK_STYLE);
        setAttributes(
          tabListLink,
          ((_setAttributes5 = {
            id: TABS_PREFIX_IDS + idHref
          }),
            _defineProperty(_setAttributes5, ATTR_ROLE, TABS_ROLE_TAB),
            _defineProperty(_setAttributes5, ATTR_CONTROLS, idHref),
            _defineProperty(_setAttributes5, 'tabindex', '-1'),
            _defineProperty(_setAttributes5, ATTR_SELECTED, 'false'),
            _setAttributes5)
        );

        // panel controlled
        setAttributes(
          panelControlled,
          ((_setAttributes6 = {}),
            _defineProperty(_setAttributes6, ATTR_HIDDEN, 'true'),
            _defineProperty(_setAttributes6, ATTR_ROLE, TABS_ROLE_TABPANEL),
            _defineProperty(_setAttributes6, ATTR_LABELLEDBY, TABS_PREFIX_IDS + idHref),
            _setAttributes6)
        );
        addClass(panelControlled, prefixClassName + TABS_CONTENT_STYLE);

        // if already selected
        if (panelSelected && noTabSelected) {
          noTabSelected = false;
          setAttributes(
            tabListLink,
            _defineProperty(
              {
                tabindex: '0'
              },
              ATTR_SELECTED,
              'true'
            )
          );
          setAttributes(panelControlled, _defineProperty({}, ATTR_HIDDEN, 'false'));
        }

        // hx
        if ('' !== hx) {
          var hxNode = document.createElement(hx);
          hxNode.setAttribute('class', hxGeneratedClass);
          hxNode.setAttribute('tabindex', '0');
          hxNode.innerHTML = linkText;
          panelControlled.insertBefore(hxNode, panelControlled.firstChild);
        }

        // existingHx

        if ('' !== existingHx) {
          var $hxExisting = [].slice.call(
            panelControlled.querySelectorAll(existingHx + ':first-child')
          );
          $hxExisting.forEach(function (hxItem) {
            hxItem.setAttribute('tabindex', '0');
          });
        }

        tabListLink.removeAttribute('href');
      });

      if ('' !== hash) {
        var nodeHashed = findById(hash);
        if (null !== nodeHashed) {

          // just in case of an dumb error
          // search if hash is current tabsNode
          if (null !== tabsNode.querySelector('#' + hash)) {

            // search if hash is ON tabs
            if (true === hasClass(nodeHashed, TABS_JS_CONTENT)) {

              // unselect others
              unSelectLinks($tabListLinks);
              unSelectContents($tabListPanels);

              // select this one
              nodeHashed.removeAttribute(ATTR_HIDDEN);
              var linkHashed = findById(TABS_PREFIX_IDS + hash);
              setAttributes(
                linkHashed,
                _defineProperty(
                  {
                    tabindex: '0'
                  },
                  ATTR_SELECTED,
                  'true'
                )
              );
              paintSvgDots(linkHashed);
              noTabSelected = false;
            } else {

              // search if hash is IN tabs
              var panelParentId = searchParent(nodeHashed, TABS_JS_CONTENT);
              if ('' !== panelParentId) {

                // unselect others
                unSelectLinks($tabListLinks);
                unSelectContents($tabListPanels);

                // select this one
                var panelParent = findById(panelParentId);
                panelParent.removeAttribute(ATTR_HIDDEN);
                var linkParent = findById(TABS_PREFIX_IDS + panelParentId);
                setAttributes(
                  linkParent,
                  _defineProperty(
                    {
                      tabindex: '0'
                    },
                    ATTR_SELECTED,
                    'true'
                  )
                );
                noTabSelected = false;
              }
            }
          }
        }
      }

      // if no selected => select first
      if (true === noTabSelected) {
        setAttributes(
          $tabListLinks[0],
          _defineProperty(
            {
              tabindex: '0'
            },
            ATTR_SELECTED,
            'true'
          )
        );
        var panelFirst = findById($tabListLinks[0].getAttribute(ATTR_CONTROLS));
        panelFirst.removeAttribute(ATTR_HIDDEN);
        if (accordionActive == false) {
          paintSvgDots($tabListLinks[0]);
        }
      }
    });

    tabsActive = true;
    accordionActive = false;
  }

  /* listeners */
  ['click', 'keydown'].forEach(function (eventName) {

    //let isCtrl = false;

    doc.body.addEventListener(
      eventName,
      function (e) {

        // click on a tab link or on something IN a tab link
        var parentLink = searchParent(e.target, TABS_JS_LISTLINK);
        if (
          (true === hasClass(e.target, TABS_JS_LISTLINK) || '' !== parentLink) &&
          'click' === eventName
        ) {
          var linkSelected =
            true === hasClass(e.target, TABS_JS_LISTLINK) ?
              e.target :
              findById(parentLink);
          var parentTabId = searchParent(e.target, TABS_JS);
          var parentTab = findById(parentTabId);

          //let $parentListItems = [].slice.call(parentTab.querySelectorAll('.' + TABS_JS_LISTITEM));
          var $parentListLinks = [].slice.call(
            parentTab.querySelectorAll('.' + TABS_JS_LISTLINK)
          );
          var $parentListContents = [].slice.call(
            parentTab.querySelectorAll('.' + TABS_JS_CONTENT)
          );

          // aria selected false on all links
          unSelectLinks($parentListLinks);

          // add aria-hidden on all tabs contents
          unSelectContents($parentListContents);

          // add aria selected on selected link + show linked panel
          selectLink(linkSelected);

          e.preventDefault();
        }

        // Key down on tabs
        if (
          (true === hasClass(e.target, TABS_JS_LISTLINK) || '' !== parentLink) &&
          'keydown' === eventName
        ) {

          //let linkSelected = hasClass( e.target, TABS_JS_LISTLINK) === true ? e.target : findById( parentLink );
          var parentTabId = searchParent(e.target, TABS_JS);
          var parentTab = findById(parentTabId);
          var $parentListItems = [].slice.call(
            parentTab.querySelectorAll('.' + TABS_JS_LISTITEM)
          );
          var $parentListLinks = [].slice.call(
            parentTab.querySelectorAll('.' + TABS_JS_LISTLINK)
          );
          var $parentListContents = [].slice.call(
            parentTab.querySelectorAll('.' + TABS_JS_CONTENT)
          );
          var firstLink = $parentListItems[0].querySelector('.' + TABS_JS_LISTLINK);
          var lastLink = $parentListItems[$parentListItems.length - 1].querySelector(
            '.' + TABS_JS_LISTLINK
          );

          // strike home on a tab => 1st tab
          if (36 === e.keyCode) {
            unSelectLinks($parentListLinks);
            unSelectContents($parentListContents);
            selectLink(firstLink);

            e.preventDefault();
          } else if (35 === e.keyCode) {

            // strike end on a tab => last tab
            unSelectLinks($parentListLinks);
            unSelectContents($parentListContents);
            selectLink(lastLink);

            e.preventDefault();
          } else if ((37 === e.keyCode || 38 === e.keyCode) && !e.ctrlKey) {

            // strike up or left on the tab => previous tab
            if ('true' === firstLink.getAttribute(ATTR_SELECTED)) {
              unSelectLinks($parentListLinks);
              unSelectContents($parentListContents);
              selectLink(lastLink);

              e.preventDefault();
            } else {
              selectLinkInList(
                $parentListItems,
                $parentListLinks,
                $parentListContents,
                'prev'
              );
              e.preventDefault();
            }
          } else if ((40 === e.keyCode || 39 === e.keyCode) && !e.ctrlKey) {

            // strike down or right in the tab => next tab
            if ('true' === lastLink.getAttribute(ATTR_SELECTED)) {
              unSelectLinks($parentListLinks);
              unSelectContents($parentListContents);
              selectLink(firstLink);

              e.preventDefault();
            } else {
              selectLinkInList(
                $parentListItems,
                $parentListLinks,
                $parentListContents,
                'next'
              );
              e.preventDefault();
            }
          }
        }

        // Key down in tab panels
        var parentTabPanelId = searchParent(e.target, TABS_JS_CONTENT);
        if ('' !== parentTabPanelId && 'keydown' === eventName) {
          (function () {
            var linkSelected = findById(
              findById(parentTabPanelId).getAttribute(ATTR_LABELLEDBY)
            );
            var parentTabId = searchParent(e.target, TABS_JS);
            var parentTab = findById(parentTabId);
            var $parentListItems = [].slice.call(
              parentTab.querySelectorAll('.' + TABS_JS_LISTITEM)
            );
            var $parentListLinks = [].slice.call(
              parentTab.querySelectorAll('.' + TABS_JS_LISTLINK)
            );
            var $parentListContents = [].slice.call(
              parentTab.querySelectorAll('.' + TABS_JS_CONTENT)
            );
            var firstLink = $parentListItems[0].querySelector('.' + TABS_JS_LISTLINK);
            var lastLink = $parentListItems[$parentListItems.length - 1].querySelector(
              '.' + TABS_JS_LISTLINK
            );

            // strike up + ctrl => go to header
            if (38 === e.keyCode && e.ctrlKey) {
              setTimeout(function () {
                linkSelected.focus();
              }, 0);
              e.preventDefault();
            }

            // strike pageup + ctrl => go to prev header
            if (33 === e.keyCode && e.ctrlKey) {

              // go to header
              linkSelected.focus();
              e.preventDefault();

              // then previous
              if ('true' === firstLink.getAttribute(ATTR_SELECTED)) {
                unSelectLinks($parentListLinks);
                unSelectContents($parentListContents);
                selectLink(lastLink);
              } else {
                selectLinkInList(
                  $parentListItems,
                  $parentListLinks,
                  $parentListContents,
                  'prev'
                );
              }
            }

            // strike pagedown + ctrl => go to next header
            if (34 === e.keyCode && e.ctrlKey) {

              // go to header
              linkSelected.focus();
              e.preventDefault();

              // then next
              if ('true' === lastLink.getAttribute(ATTR_SELECTED)) {
                unSelectLinks($parentListLinks);
                unSelectContents($parentListContents);
                selectLink(firstLink);
              } else {
                selectLinkInList(
                  $parentListItems,
                  $parentListLinks,
                  $parentListContents,
                  'next'
                );
              }
            }
          })();
        }

        // click on a tab link
        var parentLinkToPanelId = searchParent(e.target, TABS_JS_LINK_TO_TAB);
        if (
          (true === hasClass(e.target, TABS_JS_LINK_TO_TAB) ||
            '' !== parentLinkToPanelId) &&
          'click' === eventName
        ) {
          var panelSelectedId =
            true === hasClass(e.target, TABS_JS_LINK_TO_TAB) ?
              e.target.getAttribute('href').replace('#', '') :
              findById(parentLinkToPanelId).replace('#', '');
          var panelSelected = findById(panelSelectedId);
          var buttonPanelSelected = findById(panelSelected.getAttribute(ATTR_LABELLEDBY));
          var parentTabId = searchParent(e.target, TABS_JS);
          var parentTab = findById(parentTabId);

          //let $parentListItems = [].slice.call(parentTab.querySelectorAll('.' + TABS_JS_LISTITEM));
          var $parentListLinks = [].slice.call(
            parentTab.querySelectorAll('.' + TABS_JS_LISTLINK)
          );
          var $parentListContents = [].slice.call(
            parentTab.querySelectorAll('.' + TABS_JS_CONTENT)
          );

          unSelectLinks($parentListLinks);
          unSelectContents($parentListContents);
          selectLink(buttonPanelSelected);

          e.preventDefault();
        }
      },
      true
    );
  });

  /**
   * Return an array with tabs__link or accordion__link
   *
   * @return {Array} tabsLink List with all tabs__link elements.
   */
  function getTabLinks() {
    var $tabListLinks =
      doc.querySelectorAll(`.${TABS_JS_LISTLINK}`) ||
      doc.querySelectorAll(`.${ACCORDION_LINK}`);
    let tabsLink = [];

    if ($tabListLinks) {
      $tabListLinks.forEach(function (tabsNode) {
        tabsLink.push(tabsNode);
      });
    }

    return tabsLink;
  }

  /**
   * Return an array with tabs__content
   *
   * @return {Array} tabsContent List with all tabs__link elements.
   */
  function getTabContent() {
    let tabsContent = [];

    $listTabs().forEach(function (tabsNode) {
      tabsContent = [].slice.call(tabsNode.querySelectorAll('.' + TABS_JS_CONTENT));
    });

    return tabsContent;
  }

  /**
   * Create heading buttons for accordions
   *
   * @return {Array} accordionButtons Array with button elements
   */
  function createButtons() {
    const links = getTabLinks();
    let accordionButtons = [];

    if (links) {
      links.forEach(function (link) {
        let button = document.createElement('a');
        let id = '';

        if (link.hasAttribute('href')) {
          id = link.getAttribute('href').replace('#', '');
        } else if (link.hasAttribute('aria-controls')) {
          id = link.getAttribute('aria-controls');
        }

        if (!link.hasAttribute('href')) {
          link.setAttribute('href', id);
        }

        button.className = `${ACCORDION_LINK}`;
        button.innerHTML = link.innerHTML;
        button.setAttribute('aria-controls', id);
        button.setAttribute('id', TABS_PREFIX_IDS + id);
        accordionButtons.push(button);
      });

      return accordionButtons;
    }
  }

  /**
   * Clean up CSS classname on a node
   *
   * @param {Array} list A list of nodes to replace the CSS classname
   *
   * @return {Array} newList Clean list with update CSS classname.
   */
  function cleanUpCssClassName(list) {
    let newList = list;

    newList.forEach(function (item) {
      item.className = `${ACCORDION_CONTENT}`;
    });

    return newList;
  }

  /**
   * Append our newly created buttons to the DOM
   */
  function createAccordions() {
    if (true === accordionActive) {
      return;
    }

    destroyTabs();

    const accordionHeadings = createButtons();
    const content = cleanUpCssClassName(getTabContent());
    const parent = doc.querySelector(`.${TABS_JS}`).querySelector(`.${TABS_JS_CONTAINER}`);

    // Make sure we have the same amount of accordion headings as tab content elements
    // Make sure parent exists
    if (null !== parent && accordionHeadings.length === content.length) {

      // We use a for loop so we can loop through both arrays at the same time
      for (let x = 0; x < accordionHeadings.length; x++) {
        let elementById = doc.getElementById(content[x].id);

        // Insert newly created buttons on top of their corresponding DIV

        // eslint-disable-next-line
        if (content[x].id == accordionHeadings[x].getAttribute('aria-controls')) {
          parent.insertBefore(accordionHeadings[x], elementById);
        }

        // Add inactive class to headings
        content[x].setAttribute('aria-expanded', 'false');

        // Collapse content
        // window.Velocity.RunSequence(content[x], 'fadeOut', 300);
        $(content[x]).hide();

        // Click event
        accordionHeadings[x].addEventListener('click', function (event) {
          const target = event.target;
          const sibling = target.nextElementSibling;
          const openElements = target.parentNode.querySelectorAll(`.${ACCORDION_ACTIVE}`);

          if (target.classList.contains(ACCORDION_ACTIVE)) {
            closeAccordion(target, sibling);
          } else if (!target.classList.contains(ACCORDION_ACTIVE)) {

            // only open one accordion at a time
            if (0 < openElements.length) {
              for (let x = 0; x < openElements.length; x++) {
                closeAccordion(openElements[x], openElements[x].nextElementSibling);
              }
            }

            openAccordion(target, sibling);
          }

          addHashToAccordion(target, sibling);
        });
      }

      // Check if hash exists
      // If so, let's open that accordion
      if ('' !== hash) {
        const selectedButton = document.querySelector(`a#${TABS_PREFIX_IDS}${hash}`);
        const selectedContent = selectedButton.nextElementSibling;
        openAccordion(selectedButton, selectedContent);

        // Scroll to content
        // window.Velocity(selectedButton, 'scroll', { duration: 1000, delay: 700 });
        $(selectedButton).get(0).scrollIntoView({ behavior: "smooth" });

      } else {

        // Else, let's open the first accordion
        openAccordion(accordionHeadings[0], content[0]);
        accordionHeadings[0].setAttribute('aria-expanded', 'true');
      }
    }

    accordionActive = true;
    tabsActive = false;
  }

  /**
   * Open accordion
   *
   * @param {Node} heading  Click event target (should be the heading)
   * @param {Node} content Event's sibling (should be the content)
   */
  function openAccordion(heading, content) {
    addClass(heading, ACCORDION_ACTIVE);
    addClass(content, ACCORDION_OPEN);
    content.setAttribute('aria-expanded', 'true');
    // window.Velocity(content, 'fadeIn', 600);
    $(content).show();

    // Make sure we don't scroll to the first open accordion if user has not clicked on a accordion heading
    if ('' !== hash) {
      // window.Velocity(heading, 'scroll', { duration: 1000, delay: 700 });
      $(heading).get(0).scrollIntoView({ behavior: "smooth" });
    }
  }

  /**
   * Close accordion
   *
   * @param {Node} heading  Click event target (should be the heading)
   * @param {Node} content Event's sibling (should be the content)
   */
  function closeAccordion(heading, content) {
    removeClass(heading, ACCORDION_ACTIVE);
    removeClass(content, ACCORDION_OPEN);
    content.setAttribute('aria-expanded', 'false');
    // window.Velocity(content, 'fadeOut', 600);
    $(content).hide();
  }

  /**
   * We call this function in the resize event listener.
   * Ignores the resize events as long as the initMobileMenu execution is in the queue.
   *
   * @private
   */
  function resizeThrottler() {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        resizeTimeout = null;
        onLoad();
      }, 66);
    }
  }

  /**
   * Remove accordion functionality on window resize
   */
  function destroyAccordions() {
    const tabsList = doc.querySelector(`.${TABS_JS_LIST}`);
    const buttonList = document.querySelectorAll(`.${ACCORDION_LINK}`);
    const content = doc.querySelectorAll(`.${ACCORDION_CONTENT}`);

    if (null === tabsList || 0 === buttonList.length || 0 === content.length) {
      return;
    }

    // Make sure we can see the UL list in bigger screen sizes
    tabsList.style.display = 'grid';

    // Remove each button
    buttonList.forEach(button => button.remove());

    content.forEach(item => {
      removeClass(item, ACCORDION_CONTENT);
      removeClass(item, ACCORDION_OPEN);

      addClass(item, TABS_JS_CONTENT);

      item.removeAttribute('aria-expanded');
      item.removeAttribute('style');
    });
  }

  /**
   * Removes tab functionality on window resize
   */
  function destroyTabs() {
    const tabsList = doc.querySelector(`.${TABS_JS_LIST}`);

    if (null !== tabsList) {

      // Make sure we don't see the UL list for small screen sizes
      tabsList.style.display = 'none';
    }
  }

  function isCellphone() {
    return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  /**
   * onLoad function
   */
  function onLoad() {
    let currentWindowWidth = isCellphone() ? document.documentElement.clientWidth : window.innerWidth;
    if (currentWindowWidth > MAX_WINDOW_WIDTH) {
      attach();
    } else if (currentWindowWidth < MAX_WINDOW_WIDTH) {
      createAccordions();
    }

    document.removeEventListener('DOMContentLoaded', onLoad);
  }
  if (document.querySelector("." + TABS_JS) !== null) {
    window.addEventListener('resize', resizeThrottler, false);

    document.addEventListener('DOMContentLoaded', onLoad);

    window.van11yAccessibleTabPanelAria = attach;

  }
})(document, jQuery);