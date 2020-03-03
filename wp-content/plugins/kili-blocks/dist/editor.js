/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/editor.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/react-html-id/index.js":
/*!*********************************************!*\
  !*** ./node_modules/react-html-id/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Copyright (c) 2018 Hampus Joakim Nilsson
 * Licensed via the MIT license.
 **/

// Unique counter per COMPONENT that uniqueness is added to
var _globallyUniqueIdCounter = 0

function resetUniqueIds() {
    _globallyUniqueIdCounter = 0
}

function injectUniqueness(component) {

    var instanceId;
    if (arguments.length > 1) {
        instanceId = arguments[1];
        if (typeof instanceId !== 'string') {
            console.log('Warning: Expected string as second argument passed to `injectUniqueness`')
            instanceId = '' + instanceId
        }
    }

    // Store all state in the closure for the member functions
    var _render = component.render
    var _htmlIds = {}
    var _uniqueIdCounter = 0
    var _uniqueInstance = instanceId || ++_globallyUniqueIdCounter

    // Inject the following functions into the component
    component.render = function () {
        _uniqueIdCounter = 0
        return _render.apply(component)
    }

    component.nextUniqueId = function () {
        ++_uniqueIdCounter
        return 'id-' + _uniqueInstance + '-' + _uniqueIdCounter
    }

    component.lastUniqueId = function () {
        return 'id-' + _uniqueInstance + '-' + _uniqueIdCounter
    }

    component.getUniqueId = function (identifier) {
        if (typeof identifier !== 'string') {
            console.log('Warning: Expected string identifer passed to `getUniqueId`')
            identifier = '' + identifier
        }

        if (!_htmlIds[identifier]) {
            _htmlIds[identifier] = 'id-' + _uniqueInstance + '-' + identifier
        }

        return _htmlIds[identifier]
    }
}

module.exports = {
    resetUniqueIds: resetUniqueIds,
    enableUniqueIds: injectUniqueness,
}


/***/ }),

/***/ "./node_modules/react/cjs/react.development.js":
/*!*****************************************************!*\
  !*** ./node_modules/react/cjs/react.development.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.13.0
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

var _assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");
var checkPropTypes = __webpack_require__(/*! prop-types/checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var ReactVersion = '16.13.0';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;
var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

/**
 * Keeps track of the current dispatcher.
 */
var ReactCurrentDispatcher = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

/**
 * Keeps track of the current batch's configuration such as how long an update
 * should suspend for if it needs to.
 */
var ReactCurrentBatchConfig = {
  suspense: null
};

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var BEFORE_SLASH_RE = /^(.*)[\\\/]/;
function describeComponentFrame (name, source, ownerName) {
  var sourceInfo = '';

  if (source) {
    var path = source.fileName;
    var fileName = path.replace(BEFORE_SLASH_RE, '');

    {
      // In DEV, include code for a common special case:
      // prefer "folder/index.js" instead of just "index.js".
      if (/^index\./.test(fileName)) {
        var match = path.match(BEFORE_SLASH_RE);

        if (match) {
          var pathBeforeSlash = match[1];

          if (pathBeforeSlash) {
            var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
            fileName = folderName + '/' + fileName;
          }
        }
      }
    }

    sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
  } else if (ownerName) {
    sourceInfo = ' (created by ' + ownerName + ')';
  }

  return '\n    in ' + (name || 'Unknown') + sourceInfo;
}

var Resolved = 1;
function refineResolvedLazyComponent(lazyComponent) {
  return lazyComponent._status === Resolved ? lazyComponent._result : null;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || '';
  return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
}

function getComponentName(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return "Profiler";

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return 'Context.Consumer';

      case REACT_PROVIDER_TYPE:
        return 'Context.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        return getComponentName(type.type);

      case REACT_BLOCK_TYPE:
        return getComponentName(type.render);

      case REACT_LAZY_TYPE:
        {
          var thenable = type;
          var resolvedThenable = refineResolvedLazyComponent(thenable);

          if (resolvedThenable) {
            return getComponentName(resolvedThenable);
          }

          break;
        }
    }
  }

  return null;
}

var ReactDebugCurrentFrame = {};
var currentlyValidatingElement = null;
function setCurrentlyValidatingElement(element) {
  {
    currentlyValidatingElement = element;
  }
}

{
  // Stack implementation injected by the current renderer.
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var stack = ''; // Add an extra top frame while an element is being validated

    if (currentlyValidatingElement) {
      var name = getComponentName(currentlyValidatingElement.type);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
    } // Delegate to the injected renderer-specific implementation


    var impl = ReactDebugCurrentFrame.getCurrentStack;

    if (impl) {
      stack += impl() || '';
    }

    return stack;
  };
}

/**
 * Used by act() to track whether you're inside an act() scope.
 */
var IsSomeRendererActing = {
  current: false
};

var ReactSharedInternals = {
  ReactCurrentDispatcher: ReactCurrentDispatcher,
  ReactCurrentBatchConfig: ReactCurrentBatchConfig,
  ReactCurrentOwner: ReactCurrentOwner,
  IsSomeRendererActing: IsSomeRendererActing,
  // Used by renderers to avoid bundling object-assign twice in UMD bundles:
  assign: _assign
};

{
  _assign(ReactSharedInternals, {
    // These should not be included in production.
    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
    // TODO: remove in React 17.0.
    ReactComponentTreeHook: {}
  });
}

// by calls to these methods by a Babel plugin.
//
// In PROD (or in packages without access to React internals),
// they are left as they are instead.

function warn(format) {
  {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    printWarning('warn', format, args);
  }
}
function error(format) {
  {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    printWarning('error', format, args);
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var hasExistingStack = args.length > 0 && typeof args[args.length - 1] === 'string' && args[args.length - 1].indexOf('\n    in') === 0;

    if (!hasExistingStack) {
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      var stack = ReactDebugCurrentFrame.getStackAddendum();

      if (stack !== '') {
        format += '%s';
        args = args.concat([stack]);
      }
    }

    var argsWithFormat = args.map(function (item) {
      return '' + item;
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      throw new Error(message);
    } catch (x) {}
  }
}

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var _constructor = publicInstance.constructor;
    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
    var warningKey = componentName + "." + callerName;

    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }

    error("Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);

    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}
/**
 * This is the abstract API for an update queue.
 */


var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

var emptyObject = {};

{
  Object.freeze(emptyObject);
}
/**
 * Base class helpers for the updating state of a component.
 */


function Component(props, context, updater) {
  this.props = props;
  this.context = context; // If a component has string refs, we will assign a different object later.

  this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
  // renderer.

  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};
/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */

Component.prototype.setState = function (partialState, callback) {
  if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {
    {
      throw Error( "setState(...): takes an object of state variables to update or a function which returns an object of state variables." );
    }
  }

  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */


Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};
/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */


{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };

  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);

        return undefined;
      }
    });
  };

  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

function ComponentDummy() {}

ComponentDummy.prototype = Component.prototype;
/**
 * Convenience component with default shallow equality check for sCU.
 */

function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context; // If a component has string refs, we will assign a different object later.

  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

_assign(pureComponentPrototype, Component.prototype);

pureComponentPrototype.isPureReactComponent = true;

// an immutable object with a single mutable value
function createRef() {
  var refObject = {
    current: null
  };

  {
    Object.seal(refObject);
  }

  return refObject;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;

{
  didWarnAboutStringRefs = {};
}

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;

        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
      }
    }
  };

  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;

        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
      }
    }
  };

  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

function warnIfStringRefCannotBeAutoConverted(config) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
      var componentName = getComponentName(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://fb.me/react-strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config.ref);

        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */

function createElement(type, config, children) {
  var propName; // Reserved names are extracted

  var props = {};
  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;

      {
        warnIfStringRefCannotBeAutoConverted(config);
      }
    }

    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  } // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.


  var childrenLength = arguments.length - 2;

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);

    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }

    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }

    props.children = childArray;
  } // Resolve default props


  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;

    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  {
    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }

  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}
function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
  return newElement;
}
/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */

function cloneElement(element, config, children) {
  if (!!(element === null || element === undefined)) {
    {
      throw Error( "React.cloneElement(...): The argument must be a React element, but you passed " + element + "." );
    }
  }

  var propName; // Original props are copied

  var props = _assign({}, element.props); // Reserved names are extracted


  var key = element.key;
  var ref = element.ref; // Self is preserved since the owner is preserved.

  var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.

  var source = element._source; // Owner will be preserved, unless ref is overridden

  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }

    if (hasValidKey(config)) {
      key = '' + config.key;
    } // Remaining properties override existing props


    var defaultProps;

    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }

    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  } // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.


  var childrenLength = arguments.length - 2;

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);

    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }

    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */

function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';
/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });
  return '$' + escapedString;
}
/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */


var didWarnAboutMaps = false;
var userProvidedKeyEscapeRegex = /\/+/g;

function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];

function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;

  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}
/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */


function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;

      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }

    }
  }

  if (invokeCallback) {
    callback(traverseContext, children, // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.

  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);

    if (typeof iteratorFn === 'function') {

      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          if (!didWarnAboutMaps) {
            warn('Using Maps as children is deprecated and will be removed in ' + 'a future major release. Consider converting children to ' + 'an array of keyed ReactElements instead.');
          }

          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step;
      var ii = 0;

      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';

      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
      }

      var childrenString = '' + children;

      {
        {
          throw Error( "Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + ")." + addendum );
        }
      }
    }
  }

  return subtreeCount;
}
/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */


function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}
/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */


function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  } // Implicit key determined by the index in the set


  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;
  func.call(context, child, bookKeeping.count++);
}
/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */


function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }

  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;
  var mappedChild = func.call(context, child, bookKeeping.count++);

  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function (c) {
      return c;
    });
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }

    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';

  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }

  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}
/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenmap
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */


function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }

  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}
/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrencount
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */


function countChildren(children) {
  return traverseAllChildren(children, function () {
    return null;
  }, null);
}
/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
 */


function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, function (child) {
    return child;
  });
  return result;
}
/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenonly
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */


function onlyChild(children) {
  if (!isValidElement(children)) {
    {
      throw Error( "React.Children.only expected to receive a single React element child." );
    }
  }

  return children;
}

function createContext(defaultValue, calculateChangedBits) {
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null;
  } else {
    {
      if (calculateChangedBits !== null && typeof calculateChangedBits !== 'function') {
        error('createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits);
      }
    }
  }

  var context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    // As a workaround to support multiple concurrent renderers, we categorize
    // some renderers as primary and others as secondary. We only expect
    // there to be two concurrent renderers at most: React Native (primary) and
    // Fabric (secondary); React DOM (primary) and React ART (secondary).
    // Secondary renderers store their context values on separate fields.
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    // Used to track how many concurrent renderers this context currently
    // supports within in a single renderer. Such as parallel server rendering.
    _threadCount: 0,
    // These are circular
    Provider: null,
    Consumer: null
  };
  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context
  };
  var hasWarnedAboutUsingNestedContextConsumers = false;
  var hasWarnedAboutUsingConsumerProvider = false;

  {
    // A separate object, but proxies back to the original context object for
    // backwards compatibility. It has a different $$typeof, so we can properly
    // warn for the incorrect usage of Context as a Consumer.
    var Consumer = {
      $$typeof: REACT_CONTEXT_TYPE,
      _context: context,
      _calculateChangedBits: context._calculateChangedBits
    }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

    Object.defineProperties(Consumer, {
      Provider: {
        get: function () {
          if (!hasWarnedAboutUsingConsumerProvider) {
            hasWarnedAboutUsingConsumerProvider = true;

            error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
          }

          return context.Provider;
        },
        set: function (_Provider) {
          context.Provider = _Provider;
        }
      },
      _currentValue: {
        get: function () {
          return context._currentValue;
        },
        set: function (_currentValue) {
          context._currentValue = _currentValue;
        }
      },
      _currentValue2: {
        get: function () {
          return context._currentValue2;
        },
        set: function (_currentValue2) {
          context._currentValue2 = _currentValue2;
        }
      },
      _threadCount: {
        get: function () {
          return context._threadCount;
        },
        set: function (_threadCount) {
          context._threadCount = _threadCount;
        }
      },
      Consumer: {
        get: function () {
          if (!hasWarnedAboutUsingNestedContextConsumers) {
            hasWarnedAboutUsingNestedContextConsumers = true;

            error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
          }

          return context.Consumer;
        }
      }
    }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

    context.Consumer = Consumer;
  }

  {
    context._currentRenderer = null;
    context._currentRenderer2 = null;
  }

  return context;
}

function lazy(ctor) {
  var lazyType = {
    $$typeof: REACT_LAZY_TYPE,
    _ctor: ctor,
    // React uses these fields to store the result.
    _status: -1,
    _result: null
  };

  {
    // In production, this would just set it on the object.
    var defaultProps;
    var propTypes;
    Object.defineProperties(lazyType, {
      defaultProps: {
        configurable: true,
        get: function () {
          return defaultProps;
        },
        set: function (newDefaultProps) {
          error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');

          defaultProps = newDefaultProps; // Match production behavior more closely:

          Object.defineProperty(lazyType, 'defaultProps', {
            enumerable: true
          });
        }
      },
      propTypes: {
        configurable: true,
        get: function () {
          return propTypes;
        },
        set: function (newPropTypes) {
          error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');

          propTypes = newPropTypes; // Match production behavior more closely:

          Object.defineProperty(lazyType, 'propTypes', {
            enumerable: true
          });
        }
      }
    });
  }

  return lazyType;
}

function forwardRef(render) {
  {
    if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
      error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
    } else if (typeof render !== 'function') {
      error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
    } else {
      if (render.length !== 0 && render.length !== 2) {
        error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
      }
    }

    if (render != null) {
      if (render.defaultProps != null || render.propTypes != null) {
        error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');
      }
    }
  }

  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };
}

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function memo(type, compare) {
  {
    if (!isValidElementType(type)) {
      error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
    }
  }

  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: compare === undefined ? null : compare
  };
}

function resolveDispatcher() {
  var dispatcher = ReactCurrentDispatcher.current;

  if (!(dispatcher !== null)) {
    {
      throw Error( "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem." );
    }
  }

  return dispatcher;
}

function useContext(Context, unstable_observedBits) {
  var dispatcher = resolveDispatcher();

  {
    if (unstable_observedBits !== undefined) {
      error('useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\n\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://fb.me/rules-of-hooks' : '');
    } // TODO: add a more generic warning for invalid values.


    if (Context._context !== undefined) {
      var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
      // and nobody should be using this in existing code.

      if (realContext.Consumer === Context) {
        error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
      } else if (realContext.Provider === Context) {
        error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
      }
    }
  }

  return dispatcher.useContext(Context, unstable_observedBits);
}
function useState(initialState) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
function useReducer(reducer, initialArg, init) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}
function useRef(initialValue) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useRef(initialValue);
}
function useEffect(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, deps);
}
function useLayoutEffect(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useLayoutEffect(create, deps);
}
function useCallback(callback, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, deps);
}
function useMemo(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, deps);
}
function useImperativeHandle(ref, create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useImperativeHandle(ref, create, deps);
}
function useDebugValue(value, formatterFn) {
  {
    var dispatcher = resolveDispatcher();
    return dispatcher.useDebugValue(value, formatterFn);
  }
}

var propTypesMisspellWarningShown;

{
  propTypesMisspellWarningShown = false;
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current.type);

    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }

  return '';
}

function getSourceInfoErrorAddendum(source) {
  if (source !== undefined) {
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }

  return '';
}

function getSourceInfoErrorAddendumForProps(elementProps) {
  if (elementProps !== null && elementProps !== undefined) {
    return getSourceInfoErrorAddendum(elementProps.__source);
  }

  return '';
}
/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */


var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

    if (parentName) {
      info = "\n\nCheck the top-level render call using <" + parentName + ">.";
    }
  }

  return info;
}
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */


function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }

  element._store.validated = true;
  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }

  ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.

  var childOwner = '';

  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
  }

  setCurrentlyValidatingElement(element);

  {
    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);
  }

  setCurrentlyValidatingElement(null);
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }

  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];

      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);

    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;

        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}
/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */


function validatePropTypes(element) {
  {
    var type = element.type;

    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }

    var name = getComponentName(type);
    var propTypes;

    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
    // Inner props are checked in the reconciler.
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }

    if (propTypes) {
      setCurrentlyValidatingElement(element);
      checkPropTypes(propTypes, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);
      setCurrentlyValidatingElement(null);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true;

      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
    }

    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  {
    setCurrentlyValidatingElement(fragment);
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

        break;
      }
    }

    if (fragment.ref !== null) {
      error('Invalid attribute `ref` supplied to `React.Fragment`.');
    }

    setCurrentlyValidatingElement(null);
  }
}
function createElementWithValidation(type, props, children) {
  var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.

  if (!validType) {
    var info = '';

    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendumForProps(props);

    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    var typeString;

    if (type === null) {
      typeString = 'null';
    } else if (Array.isArray(type)) {
      typeString = 'array';
    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
      typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
      info = ' Did you accidentally export a JSX literal instead of a component?';
    } else {
      typeString = typeof type;
    }

    {
      error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }
  }

  var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.

  if (element == null) {
    return element;
  } // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)


  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}
var didWarnAboutDeprecatedCreateFactory = false;
function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  validatedFactory.type = type;

  {
    if (!didWarnAboutDeprecatedCreateFactory) {
      didWarnAboutDeprecatedCreateFactory = true;

      warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');
    } // Legacy hook: remove it


    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');

        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}
function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);

  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }

  validatePropTypes(newElement);
  return newElement;
}

{

  try {
    var frozenObject = Object.freeze({});
    var testMap = new Map([[frozenObject, null]]);
    var testSet = new Set([frozenObject]); // This is necessary for Rollup to not consider these unused.
    // https://github.com/rollup/rollup/issues/1771
    // TODO: we can remove these if Rollup fixes the bug.

    testMap.set(0, 0);
    testSet.add(0);
  } catch (e) {
  }
}

var createElement$1 =  createElementWithValidation ;
var cloneElement$1 =  cloneElementWithValidation ;
var createFactory =  createFactoryWithValidation ;
var Children = {
  map: mapChildren,
  forEach: forEachChildren,
  count: countChildren,
  toArray: toArray,
  only: onlyChild
};

exports.Children = Children;
exports.Component = Component;
exports.Fragment = REACT_FRAGMENT_TYPE;
exports.Profiler = REACT_PROFILER_TYPE;
exports.PureComponent = PureComponent;
exports.StrictMode = REACT_STRICT_MODE_TYPE;
exports.Suspense = REACT_SUSPENSE_TYPE;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
exports.cloneElement = cloneElement$1;
exports.createContext = createContext;
exports.createElement = createElement$1;
exports.createFactory = createFactory;
exports.createRef = createRef;
exports.forwardRef = forwardRef;
exports.isValidElement = isValidElement;
exports.lazy = lazy;
exports.memo = memo;
exports.useCallback = useCallback;
exports.useContext = useContext;
exports.useDebugValue = useDebugValue;
exports.useEffect = useEffect;
exports.useImperativeHandle = useImperativeHandle;
exports.useLayoutEffect = useLayoutEffect;
exports.useMemo = useMemo;
exports.useReducer = useReducer;
exports.useRef = useRef;
exports.useState = useState;
exports.version = ReactVersion;
  })();
}


/***/ }),

/***/ "./node_modules/react/index.js":
/*!*************************************!*\
  !*** ./node_modules/react/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react.development.js */ "./node_modules/react/cjs/react.development.js");
}


/***/ }),

/***/ "./src/blocks/column/edit.js":
/*!***********************************!*\
  !*** ./src/blocks/column/edit.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/juanse/Documents/Koombea/gutenbergtest/htdocs/wp-content/plugins/kili-blocks/src/blocks/column/edit.js";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var ColumnEdit = /*#__PURE__*/function (_Component) {
  _inherits(ColumnEdit, _Component);

  function ColumnEdit(props) {
    _classCallCheck(this, ColumnEdit);

    return _possibleConstructorReturn(this, _getPrototypeOf(ColumnEdit).call(this, props));
  }

  _createClass(ColumnEdit, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          attributes = _this$props.attributes,
          setAttributes = _this$props.setAttributes;
      var columns = attributes.columns,
          align = attributes.align,
          topPaddingD = attributes.topPaddingD,
          rightPaddingD = attributes.rightPaddingD,
          bottomPaddingD = attributes.bottomPaddingD,
          leftPaddingD = attributes.leftPaddingD,
          currentTab = attributes.currentTab;

      var onTabSelect = function onTabSelect(tabName) {
        setAttributes({
          currentTab: tabName
        });
      };

      var deskControls = wp.element.createElement(wp.element.Fragment, null, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["PanelBody"], {
        title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Row Settings", "kili-blocks"),
        initialOpen: false,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        },
        __self: this
      }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["PanelRow"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        },
        __self: this
      }, wp.element.createElement("h2", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        },
        __self: this
      }, "Columns Size: ", columns))), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["PanelBody"], {
        title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Setting Margin Column"),
        initialOpen: false,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        },
        __self: this
      }, wp.element.createElement("h2", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        },
        __self: this
      }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Desktop Padding (px)")), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["RangeControl"], {
        label: wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
          icon: "arrow-up",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 44
          },
          __self: this
        }),
        value: topPaddingD,
        className: "kt-icon-rangecontrol kt-top-padding",
        onChange: function onChange(value) {
          setAttributes({
            topPaddingD: value
          });
        },
        min: 0,
        max: 500,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        },
        __self: this
      }), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["RangeControl"], {
        label: wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
          icon: "arrow-right",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 56
          },
          __self: this
        }),
        value: rightPaddingD,
        className: "kt-icon-rangecontrol kt-right-padding",
        onChange: function onChange(value) {
          setAttributes({
            rightPaddingD: value
          });
        },
        min: 0,
        max: 500,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["RangeControl"], {
        label: wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
          icon: "arrow-down",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 68
          },
          __self: this
        }),
        value: bottomPaddingD,
        className: "kt-icon-rangecontrol kt-bottom-padding",
        onChange: function onChange(value) {
          setAttributes({
            bottomPaddingD: value
          });
        },
        min: 0,
        max: 500,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        },
        __self: this
      }), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["RangeControl"], {
        label: wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
          icon: "arrow-left",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 80
          },
          __self: this
        }),
        value: leftPaddingD,
        className: "kt-icon-rangecontrol kt-left-padding",
        onChange: function onChange(value) {
          setAttributes({
            leftPaddingD: value
          });
        },
        min: 0,
        max: 500,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        },
        __self: this
      })));
      var mobileControls = wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["PanelBody"], {
        title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Tablet Padding/Margin"),
        initialOpen: false,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 96
        },
        __self: this
      }, wp.element.createElement("h2", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        },
        __self: this
      }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Tablet Padding (px)")), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["RangeControl"], {
        label: wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
          icon: "arrow-up",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 99
          },
          __self: this
        }),
        value: topPaddingD,
        className: "",
        onChange: function onChange(value) {
          setAttributes({
            topPaddingD: value
          });
        },
        min: 0,
        max: 500,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        },
        __self: this
      }));
      var tabletControls = wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["PanelBody"], {
        title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Mobile Padding/Margin"),
        initialOpen: false,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        },
        __self: this
      }, wp.element.createElement("h2", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        },
        __self: this
      }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Mobile Padding (px)")), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["RangeControl"], {
        label: wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
          icon: "arrow-up",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 117
          },
          __self: this
        }),
        value: topPaddingD,
        className: "",
        onChange: function onChange(value) {
          setAttributes({
            topPaddingD: value
          });
        },
        min: 0,
        max: 500,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        },
        __self: this
      }));
      return wp.element.createElement(wp.element.Fragment, null, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__["InspectorControls"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 132
        },
        __self: this
      }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["TabPanel"], {
        className: "kt-inspect-tabs",
        activeClass: "active-tab",
        initialTabName: currentTab,
        onSelect: onTabSelect,
        tabs: [{
          name: "desk",
          title: wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
            icon: "desktop",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 141
            },
            __self: this
          }),
          className: ""
        }, {
          name: "tablet",
          title: wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
            icon: "tablet",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 146
            },
            __self: this
          }),
          className: ""
        }, {
          name: "mobile",
          title: wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
            icon: "smartphone",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 151
            },
            __self: this
          }),
          className: ""
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        },
        __self: this
      }, function (tab) {
        var tabout;

        if (tab.name) {
          if ("mobile" === tab.name) {
            tabout = mobileControls;
          } else if ("tablet" === tab.name) {
            tabout = tabletControls;
          } else {
            tabout = deskControls;
          }
        }

        return wp.element.createElement("div", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 167
          },
          __self: this
        }, tabout);
      })), wp.element.createElement("div", {
        id: "column create",
        style: {
          paddingTop: "".concat(topPaddingD, "px"),
          paddingBottom: "".concat(bottomPaddingD, "px"),
          paddingLeft: "".concat(leftPaddingD, "px"),
          paddingRight: "".concat(rightPaddingD, "px")
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 172
        },
        __self: this
      }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__["InnerBlocks"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 181
        },
        __self: this
      })));
    }
  }]);

  return ColumnEdit;
}(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (ColumnEdit);

/***/ }),

/***/ "./src/blocks/column/index.js":
/*!************************************!*\
  !*** ./src/blocks/column/index.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/blocks/column/edit.js");
var _jsxFileName = "/Users/juanse/Documents/Koombea/gutenbergtest/htdocs/wp-content/plugins/kili-blocks/src/blocks/column/index.js";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["registerBlockType"])("kili-blocks/k-column", {
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])("Kili-Column", "kili-blocks"),
  parent: ["kili-blocks/k-section"],
  category: "kili-blocks",
  attributes: {
    columns: {
      type: "string",
      default: ""
    },
    align: {
      type: "string",
      default: ""
    },
    topPaddingD: {
      type: "number",
      default: 0
    },
    leftPaddingD: {
      type: "number",
      default: 0
    },
    rightPaddingD: {
      type: "number",
      default: 0
    },
    bottomPaddingD: {
      type: "number",
      default: 0
    },
    topPaddingT: {
      type: "number",
      default: 0
    },
    leftPaddingT: {
      type: "number",
      default: 0
    },
    rightPaddingT: {
      type: "number",
      default: 0
    },
    bottomPaddingT: {
      type: "number",
      default: 0
    },
    topPaddingM: {
      type: "number",
      default: 0
    },
    leftPaddingM: {
      type: "number",
      default: 0
    },
    rightPaddingM: {
      type: "number",
      default: 0
    },
    bottomPaddingM: {
      type: "number",
      default: 0
    }
  },
  supports: _defineProperty({
    align: true
  }, "align", ["left", "center", "right"]),
  icon: "columns",
  keywords: [Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])("Column", "kili-blocks"), Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])("Kili", "kili-blocks")],
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: function save(_ref) {
    var attributes = _ref.attributes;
    var columns = attributes.columns;

    var createClass = function createClass(att) {
      var align = att.align,
          topPaddingD = att.topPaddingD,
          bottomPaddingD = att.bottomPaddingD,
          rightPaddingD = att.rightPaddingD,
          leftPaddingD = att.leftPaddingD;
      var classes = "";

      if (topPaddingD) {
        classes += "padding-top__".concat(topPaddingD, " ");
      }

      if (bottomPaddingD) {
        classes += "padding-bottom__".concat(bottomPaddingD, " ");
      }

      if (leftPaddingD) {
        classes += "padding-left__".concat(leftPaddingD, " ");
      }

      if (rightPaddingD) {
        classes += "padding-right__".concat(rightPaddingD, " ");
      }

      switch (align) {
        case "left":
          classes += "justify-content--left ";
          break;

        case "center":
          classes += "justify-content--center ";
          break;

        case "right":
          classes += "justify-content--right ";
          break;

        default:
          "";
          break;
      }

      return classes;
    };

    var createBasis = function createBasis(col) {
      var value = "";

      if (col) {
        var fbasis = Number(col) / 12 * 100;
        value += "flex-basis__".concat(fbasis, " ");
      }

      return value;
    };

    var className = createClass(attributes);
    var basis = createBasis(columns);
    return wp.element.createElement("div", {
      className: "flexgrid__item ".concat(basis),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 129
      },
      __self: this
    }, wp.element.createElement("div", {
      className: "kili-column-inner ".concat(className),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 130
      },
      __self: this
    }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InnerBlocks"].Content, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 131
      },
      __self: this
    })));
  }
});

/***/ }),

/***/ "./src/blocks/layout/index.js":
/*!************************************!*\
  !*** ./src/blocks/layout/index.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


var createElement = wp.element.createElement;
Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["registerBlockType"])("kili-blocks/kililayout", {
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Kili Layout", "kili-core"),
  description: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Our block for Kili", "kili-core"),
  category: "kili-blocks",
  icon: "tagcloud",
  keywords: [Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("kili", "kili-core")],
  edit: function edit() {
    return createElement("p", null, "Hola kili");
  },
  save: function save() {
    return createElement("p", null, "Saved kili");
  }
});

/***/ }),

/***/ "./src/blocks/layout2/index.js":
/*!*************************************!*\
  !*** ./src/blocks/layout2/index.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/juanse/Documents/Koombea/gutenbergtest/htdocs/wp-content/plugins/kili-blocks/src/blocks/layout2/index.js";
// import "./styles.editor.scss";


var _wp$blockEditor = wp.blockEditor,
    RichText = _wp$blockEditor.RichText,
    BlockControls = _wp$blockEditor.BlockControls,
    AlignmentToolbar = _wp$blockEditor.AlignmentToolbar; // import { RichText, BlockControls } from "@wordpress/block-editor";

Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["registerBlockType"])("kili-blocks/kililayout2", {
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Kili Layout 2", "kili-core"),
  description: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Our block for Kili 2", "kili-core"),
  category: "kili-blocks",
  icon: wp.element.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: undefined
  }, wp.element.createElement("path", {
    fill: "none",
    d: "M-74 29h48v48h-48V29zM0 0h24v24H0V0zm0 0h24v24H0V0z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: undefined
  }), wp.element.createElement("path", {
    d: "M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: undefined
  })),
  keywords: [Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("kili2", "kili-core")],
  attributes: {
    content: {
      type: "string",
      source: "html",
      selector: "p"
    },
    align: {
      type: "string",
      default: ""
    }
  },
  edit: function edit(_ref) {
    var className = _ref.className,
        attributes = _ref.attributes,
        setAttributes = _ref.setAttributes;
    var content = attributes.content,
        align = attributes.align;

    var onChangeContent = function onChangeContent(content) {
      setAttributes({
        content: content
      });
    };

    var onChangeAlign = function onChangeAlign(newAlign) {
      setAttributes({
        align: newAlign === undefined ? "" : newAlign
      });
    };

    return wp.element.createElement(wp.element.Fragment, null, wp.element.createElement(BlockControls, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 47
      },
      __self: this
    }, content && content.length > 0 && wp.element.createElement(AlignmentToolbar, {
      value: align,
      onChange: onChangeAlign,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49
      },
      __self: this
    })), console.log("classname", className), wp.element.createElement(RichText, {
      tagName: "p",
      className: align && "kili__align-".concat(align),
      onChange: function onChange(value) {
        return onChangeContent(value);
      },
      value: content,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      },
      __self: this
    }));
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes;
    var content = attributes.content,
        align = attributes.align;
    return wp.element.createElement(RichText.Content, {
      className: align && "kili__align-".concat(align),
      tagName: "p",
      value: content,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 65
      },
      __self: this
    });
  }
});

/***/ }),

/***/ "./src/blocks/row-layout/attributes.js":
/*!*********************************************!*\
  !*** ./src/blocks/row-layout/attributes.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  fullWidth: {
    type: "boolean",
    default: true
  },
  columns: {
    type: "number",
    default: 1
  },
  heightSection: {
    type: "number",
    source: "html",
    selector: "section",
    default: 200
  },
  viewportSize: {
    type: "string",
    default: "md"
  },
  containerSet: {
    type: "boolean",
    source: "html",
    selector: "section",
    default: true
  },
  bgColor: {
    type: "string",
    source: "html",
    selector: "section",
    default: ""
  },
  bgImg: {
    type: "string",
    source: "html",
    selector: "section",
    default: ""
  },
  bgImgID: {
    type: "string",
    source: "html",
    selector: "section",
    default: ""
  },
  bgImgSize: {
    type: "string",
    source: "html",
    selector: "section",
    default: "cover"
  },
  bgImgPosition: {
    type: "string",
    source: "html",
    selector: "section",
    default: "center center"
  },
  bgImgAttachment: {
    type: "string",
    source: "html",
    selector: "section",
    default: "scroll"
  },
  bgImgRepeat: {
    type: "string",
    source: "html",
    selector: "section",
    default: "no-repeat"
  },
  backgroundInline: {
    type: "bool",
    source: "html",
    selector: "section",
    default: false
  },
  UUID: {
    type: "string",
    source: "html",
    selector: "section",
    default: ""
  },
  bgStyle: {
    type: "string",
    source: "html",
    selector: "section",
    default: ""
  }
});

/***/ }),

/***/ "./src/blocks/row-layout/edit.js":
/*!***************************************!*\
  !*** ./src/blocks/row-layout/edit.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_html_id__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-html-id */ "./node_modules/react-html-id/index.js");
/* harmony import */ var react_html_id__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_html_id__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "/Users/juanse/Documents/Koombea/gutenbergtest/htdocs/wp-content/plugins/kili-blocks/src/blocks/row-layout/edit.js";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var RowLayoutEdit = /*#__PURE__*/function (_Component) {
  _inherits(RowLayoutEdit, _Component);

  function RowLayoutEdit(props) {
    var _this;

    _classCallCheck(this, RowLayoutEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RowLayoutEdit).call(this, props));
    react_html_id__WEBPACK_IMPORTED_MODULE_4___default.a.enableUniqueIds(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(RowLayoutEdit, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          attributes = _this$props.attributes,
          setAttributes = _this$props.setAttributes;
      console.log("attributes", attributes);
      var fullWidth = attributes.fullWidth,
          heightSection = attributes.heightSection,
          containerSet = attributes.containerSet,
          bgColor = attributes.bgColor,
          bgImg = attributes.bgImg,
          bgImgID = attributes.bgImgID,
          bgImgSize = attributes.bgImgSize,
          bgImgPosition = attributes.bgImgPosition,
          bgImgRepeat = attributes.bgImgRepeat,
          backgroundInline = attributes.backgroundInline,
          bgImgAttachment = attributes.bgImgAttachment,
          UUID = attributes.UUID;

      var onSelectImage = function onSelectImage(img) {
        setAttributes({
          bgImgID: img.id,
          bgImg: img.url,
          UUID: _this2.nextUniqueId(),
          bgStyle: createStyletag()
        });
      };

      var onRemoveImage = function onRemoveImage() {
        setAttributes({
          bgImgID: null,
          bgImg: null,
          bgStyle: ""
        });
      };

      var createStyletag = function createStyletag() {
        var styles = "";
        var bgStyles = ".wp-block-kili-blocks-row-layout".concat(UUID, "{");

        if (bgImg) {
          styles += "background-image: url(\"".concat(bgImg, "\");");

          if (bgImgSize) {
            styles += " background-size: ".concat(bgImgSize, ";");
          }

          if (bgColor) {
            styles += " background-color: ".concat(bgColor, ";");
          }

          if (bgImgPosition) {
            styles += " background-position: ".concat(bgImgPosition, ";");
          }

          if (bgImgRepeat) {
            styles += " background-repeat: ".concat(bgImgRepeat, ";");
          }

          if (bgImgAttachment) {
            styles += " background-attachment: ".concat(bgImgAttachment, ";");
          }
        } // este style se revisará para ver si es necesario.


        if (heightSection) {
          styles += "min-height: ".concat(heightSection, "px;");
        }

        if (bgColor) {
          styles += "background-color: ".concat(bgColor, ";");
        }

        styles = styles ? "".concat(bgStyles).concat(styles, "}") : "{}";
        return styles;
      };

      var onChangeHeight = function onChangeHeight(height) {
        setAttributes({
          heightSection: height,
          UUID: _this2.nextUniqueId(),
          bgStyle: createStyletag()
        });
      };

      return wp.element.createElement(wp.element.Fragment, null, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InspectorControls"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        },
        __self: this
      }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["PanelBody"], {
        title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Row Settings", "kili-core"),
        initialOpen: false,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        },
        __self: this
      }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["ToggleControl"], {
        label: "Background Full-Width",
        onChange: function onChange(value) {
          return setAttributes({
            fullWidth: value,
            bgStyle: createStyletag()
          });
        },
        checked: fullWidth,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      }), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["ToggleControl"], {
        label: "Content inside Container?",
        onChange: function onChange(value) {
          return setAttributes({
            containerSet: value,
            bgStyle: createStyletag()
          });
        },
        checked: containerSet,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        },
        __self: this
      }), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["RangeControl"], {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Section Height (px)", "kili-core"),
        value: heightSection,
        onChange: function onChange(value) {
          return onChangeHeight(value);
        },
        min: 200,
        max: 800,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 132
        },
        __self: this
      })), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["PanelBody"], {
        title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Backgroung Settings", "kili-core"),
        initialOpen: false,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 140
        },
        __self: this
      }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["PanelBody"], {
        title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Background Image", "kili-core"),
        initialOpen: false,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 150
        },
        __self: this
      }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["PanelRow"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 154
        },
        __self: this
      }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["MediaUploadCheck"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 155
        },
        __self: this
      }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["MediaUpload"], {
        value: bgImgID,
        onSelect: onSelectImage,
        allowedTypes: ["image"],
        render: function render(_ref) {
          var open = _ref.open;
          return wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["IconButton"], {
            className: "components-icon-button components-toolbar__control",
            label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("".concat(bgImgID ? "Edit Image" : "Add Image"), "kili-core"),
            onClick: open,
            icon: "format-image",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 162
            },
            __self: this
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 156
        },
        __self: this
      })), bgImg && wp.element.createElement(wp.element.Fragment, null, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], {
        text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Remove Image", "kili-core"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 177
        },
        __self: this
      }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        className: "components-button components-icon-button kt-remove-img kt-cta-upload-btn",
        onClick: onRemoveImage,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 178
        },
        __self: this
      }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Dashicon"], {
        icon: "no-alt",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 184
        },
        __self: this
      }))))), bgImg && wp.element.createElement("img", {
        src: bgImg,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 190
        },
        __self: this
      }), bgImg && wp.element.createElement(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 192
        },
        __self: this
      }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["SelectControl"], {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Background Image Size", "kili-core"),
        value: bgImgSize,
        options: [{
          value: "cover",
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Cover", "kili-core")
        }, {
          value: "contain",
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Contain", "kili-core")
        }, {
          value: "auto",
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Auto", "kili-core")
        }],
        onChange: function onChange(value) {
          return setAttributes({
            bgImgSize: value,
            bgStyle: createStyletag()
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 193
        },
        __self: this
      }), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["SelectControl"], {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Background Image Position"),
        value: bgImgPosition,
        options: [{
          value: "center top",
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Center Top", "kili-core")
        }, {
          value: "center center",
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Center Center", "kili-core")
        }, {
          value: "center bottom",
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Center Bottom", "kili-core")
        }, {
          value: "left top",
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Left Top", "kili-core")
        }, {
          value: "left center",
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Left Center", "kili-core")
        }, {
          value: "left bottom",
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Left Bottom", "kili-core")
        }, {
          value: "right top",
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Right Top", "kili-core")
        }, {
          value: "right center",
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Right Center", "kili-core")
        }, {
          value: "right bottom",
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Right Bottom", "kili-core")
        }],
        onChange: function onChange(value) {
          return setAttributes({
            bgImgPosition: value,
            bgStyle: createStyletag()
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 208
        },
        __self: this
      }), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["SelectControl"], {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Background Image Repeat", "kili-core"),
        value: bgImgRepeat,
        options: [{
          value: "no-repeat",
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("No Repeat", "kili-core")
        }, {
          value: "repeat",
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Repeat", "kili-core")
        }, {
          value: "repeat-x",
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Repeat-x", "kili-core")
        }, {
          value: "repeat-y",
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Repeat-y", "kili-core")
        }],
        onChange: function onChange(value) {
          return setAttributes({
            bgImgRepeat: value,
            bgStyle: createStyletag()
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 256
        },
        __self: this
      }), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["SelectControl"], {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Background Image Attachment", "kili-core"),
        value: bgImgAttachment,
        options: [{
          value: "scroll",
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Scroll", "kili-core")
        }, {
          value: "fixed",
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Fixed", "kili-core")
        }, {
          value: "parallax",
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Parallax", "kili-core")
        }],
        onChange: function onChange(value) {
          return setAttributes({
            bgImgAttachment: value,
            bgStyle: createStyletag()
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 278
        },
        __self: this
      }))), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["PanelColorSettings"], {
        initialOpen: false,
        title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Background color", "kili-core"),
        colorSettings: [{
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Choose color", "kili-core"),
          value: {
            bgColor: bgColor
          },
          onChange: function onChange(bgColor) {
            return setAttributes({
              bgColor: bgColor,
              bgStyle: createStyletag(),
              UUID: _this2.nextUniqueId()
            });
          }
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 296
        },
        __self: this
      }))), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InnerBlocks"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 314
        },
        __self: this
      }));
    }
  }]);

  return RowLayoutEdit;
}(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (RowLayoutEdit);

/***/ }),

/***/ "./src/blocks/row-layout/index.js":
/*!****************************************!*\
  !*** ./src/blocks/row-layout/index.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/blocks/row-layout/edit.js");
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./attributes */ "./src/blocks/row-layout/attributes.js");
var _jsxFileName = "/Users/juanse/Documents/Koombea/gutenbergtest/htdocs/wp-content/plugins/kili-blocks/src/blocks/row-layout/index.js";





Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["registerBlockType"])("kili-blocks/row-layout", {
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])("Row Layout", "kili-core"),
  description: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])("Block made to build a layout", "kili-core"),
  icon: "layout",
  category: "kili-blocks",
  keywords: [Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])("Layout", "kili-core")],
  attributes: _attributes__WEBPACK_IMPORTED_MODULE_4__["default"],
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: function save(props) {
    var attributes = props.attributes;
    var UUID = attributes.UUID,
        containerSet = attributes.containerSet,
        bgStyle = attributes.bgStyle,
        fullWidth = attributes.fullWidth;
    console.log("bgStyle", bgStyle);
    return wp.element.createElement("section", {
      className: "wp-block-kili-blocks-row-layout".concat(UUID, " ").concat(!fullWidth ? "container" : ""),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      },
      __self: this
    }, wp.element.createElement("div", {
      className: containerSet ? "container" : "",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 25
      },
      __self: this
    }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__["InnerBlocks"].Content, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      },
      __self: this
    }), bgStyle ? wp.element.createElement("style", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      },
      __self: this
    }, bgStyle) : ""));
  }
});

/***/ }),

/***/ "./src/blocks/row-rf/attributes.js":
/*!*****************************************!*\
  !*** ./src/blocks/row-rf/attributes.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var getUUID = function getUUID() {
  var cryptoObj = window.crypto || window.msCrypto;
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ cryptoObj.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
};

/* harmony default export */ __webpack_exports__["default"] = ({
  content: {
    type: "array",
    source: "children",
    selector: "p"
  },
  tagName: {
    type: "string",
    default: "grid"
  },
  backgroundColor: {
    type: "string",
    default: "#FFFFFF"
  },
  backgroundImage: {
    type: "string",
    default: ""
  },
  mobileBackgroundImage: {
    type: "string",
    default: ""
  },
  backgroundImageId: {
    type: "integer",
    default: 0
  },
  mobileBackgroundImageId: {
    type: "integer",
    default: 0
  },
  useContainer: {
    type: "boolean",
    default: true
  },
  UUID: {
    type: "string",
    default: getUUID()
  },
  marginBottomMobile: {
    type: "integer",
    default: 0
  },
  marginTopMobile: {
    type: "integer",
    default: 0
  },
  marginBottomDesktop: {
    type: "integer",
    default: 0
  },
  marginTopDesktop: {
    type: "integer",
    default: 0
  },
  paddingBottomMobile: {
    type: "integer",
    default: 0
  },
  paddingTopMobile: {
    type: "integer",
    default: 0
  },
  paddingBottomDesktop: {
    type: "integer",
    default: 0
  },
  paddingTopDesktop: {
    type: "integer",
    default: 0
  }
});

/***/ }),

/***/ "./src/blocks/row-rf/editor.scss":
/*!***************************************!*\
  !*** ./src/blocks/row-rf/editor.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/blocks/row-rf/index.js":
/*!************************************!*\
  !*** ./src/blocks/row-rf/index.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/row-rf/editor.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_editor_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attributes */ "./src/blocks/row-rf/attributes.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/Users/juanse/Documents/Koombea/gutenbergtest/htdocs/wp-content/plugins/kili-blocks/src/blocks/row-rf/index.js";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




var __ = wp.i18n.__;
var registerBlockType = wp.blocks.registerBlockType;
var _wp$blockEditor = wp.blockEditor,
    InspectorControls = _wp$blockEditor.InspectorControls,
    InnerBlocks = _wp$blockEditor.InnerBlocks,
    withColors = _wp$blockEditor.withColors,
    PanelColorSettings = _wp$blockEditor.PanelColorSettings,
    getColorClassName = _wp$blockEditor.getColorClassName,
    MediaUploadCheck = _wp$blockEditor.MediaUploadCheck,
    MediaUpload = _wp$blockEditor.MediaUpload;
var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    PanelRow = _wp$components.PanelRow,
    ToggleControl = _wp$components.ToggleControl,
    RangeControl = _wp$components.RangeControl,
    Button = _wp$components.Button; // const editBlock = function (props) {
//   const { attributes: { content }, setAttributes, className } = props;
//   const onChangeContent = (newContent) => {
//     setAttributes({ content: newContent });
//   };
//   return (
//     <RichText
//       tagName="p"
//       className={className}
//       onChange={onChangeContent}
//       value={content}
//     />
//   );
// };

var editBlock = function editBlock(props) {
  return wp.element.createElement(react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }, wp.element.createElement(InnerBlocks, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }), wp.element.createElement(InspectorControls, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: this
  }, wp.element.createElement(PanelBody, {
    title: __("Section settings", "kili-builder"),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  }, wp.element.createElement(PanelRow, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: this
  }, wp.element.createElement(ToggleControl, {
    label: __("Use container", "kili-builder"),
    onChange: function onChange(value) {
      props.setAttributes({
        useContainer: value
      });
    },
    checked: props.attributes.useContainer,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: this
  })), wp.element.createElement(PanelRow, {
    className: "kili-section__component-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, props.attributes.mobileBackgroundImage ? wp.element.createElement("div", {
    className: "components-base-control",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: this
  }, wp.element.createElement("img", {
    src: props.attributes.mobileBackgroundImage,
    className: "kili-section__placeholder-image",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: this
  })) : wp.element.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  }, __("No image has been set yet", "kili-builder")), wp.element.createElement(MediaUploadCheck, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65
    },
    __self: this
  }, wp.element.createElement(MediaUpload, {
    onSelect: function onSelect(media) {
      props.setAttributes({
        mobileBackgroundImage: media.url,
        mobileBackgroundImageId: media.id
      });
    },
    allowedTypes: ["image"],
    value: props.attributes.mobileBackgroundImageId,
    render: function render(_ref) {
      var open = _ref.open;
      return wp.element.createElement(Button, {
        onClick: open,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        },
        __self: this
      }, __("Mobile background image", "kili-builder"));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66
    },
    __self: this
  }))), wp.element.createElement(PanelRow, {
    className: "kili-section__component-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83
    },
    __self: this
  }, props.attributes.backgroundImage ? wp.element.createElement("div", {
    className: "components-base-control",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85
    },
    __self: this
  }, wp.element.createElement("img", {
    src: props.attributes.backgroundImage,
    className: "kili-section__placeholder-image",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86
    },
    __self: this
  })) : wp.element.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92
    },
    __self: this
  }, __("No image has been set yet", "kili-builder")), wp.element.createElement(MediaUploadCheck, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94
    },
    __self: this
  }, wp.element.createElement(MediaUpload, {
    onSelect: function onSelect(media) {
      props.setAttributes({
        backgroundImage: media.url,
        backgroundImageId: media.id
      });
    },
    allowedTypes: ["image"],
    value: props.attributes.backgroundImage,
    render: function render(_ref2) {
      var open = _ref2.open;
      return wp.element.createElement(Button, {
        onClick: open,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        },
        __self: this
      }, __("Desktop background image", "kili-builder"));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95
    },
    __self: this
  })))), wp.element.createElement(PanelColorSettings, {
    title: __("Background color", "kili-builder"),
    colorSettings: [{
      label: __("Choose color", "kili-builder"),
      value: props.attributes.backgroundColor,
      onChange: function onChange(value) {
        props.setAttributes({
          backgroundColor: value
        });
      }
    }],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113
    },
    __self: this
  }), wp.element.createElement(PanelBody, {
    title: __("Mobile settings", "kili-builder"),
    initialOpen: false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 125
    },
    __self: this
  }, wp.element.createElement(PanelRow, {
    className: "kili-section__component-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 129
    },
    __self: this
  }, wp.element.createElement(RangeControl, {
    label: __("Margin bottom (in px)", "kili-builder"),
    onChange: function onChange(value) {
      props.setAttributes({
        marginBottomMobile: value
      });
    },
    value: props.attributes.marginBottomMobile,
    min: 0,
    max: 100,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 130
    },
    __self: this
  })), wp.element.createElement(PanelRow, {
    className: "kili-section__component-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 140
    },
    __self: this
  }, wp.element.createElement(RangeControl, {
    label: __("Margin top (in px)", "kili-builder"),
    onChange: function onChange(value) {
      props.setAttributes({
        marginTopMobile: value
      });
    },
    value: props.attributes.marginTopMobile,
    min: 0,
    max: 100,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141
    },
    __self: this
  })), wp.element.createElement(PanelRow, {
    className: "kili-section__component-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 151
    },
    __self: this
  }, wp.element.createElement(RangeControl, {
    label: __("Padding bottom (in px)", "kili-builder"),
    onChange: function onChange(value) {
      props.setAttributes({
        paddingBottomMobile: value
      });
    },
    value: props.attributes.paddingBottomMobile,
    min: 0,
    max: 100,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 152
    },
    __self: this
  })), wp.element.createElement(PanelRow, {
    className: "kili-section__component-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 162
    },
    __self: this
  }, wp.element.createElement(RangeControl, {
    label: __("Padding top (in px)", "kili-builder"),
    onChange: function onChange(value) {
      props.setAttributes({
        paddingTopMobile: value
      });
    },
    value: props.attributes.paddingTopMobile,
    min: 0,
    max: 100,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 163
    },
    __self: this
  }))), wp.element.createElement(PanelBody, {
    title: __("Desktop settings", "kili-builder"),
    initialOpen: false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 174
    },
    __self: this
  }, wp.element.createElement(PanelRow, {
    className: "kili-section__component-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 178
    },
    __self: this
  }, wp.element.createElement(RangeControl, {
    label: __("Margin bottom (in px)", "kili-builder"),
    onChange: function onChange(value) {
      props.setAttributes({
        marginBottomDesktop: value
      });
    },
    value: props.attributes.marginBottomDesktop,
    min: 0,
    max: 100,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 179
    },
    __self: this
  })), wp.element.createElement(PanelRow, {
    className: "kili-section__component-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 189
    },
    __self: this
  }, wp.element.createElement(RangeControl, {
    label: __("Margin top (in px)", "kili-builder"),
    onChange: function onChange(value) {
      props.setAttributes({
        marginTopDesktop: value
      });
    },
    value: props.attributes.marginTopDesktop,
    min: 0,
    max: 100,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 190
    },
    __self: this
  })), wp.element.createElement(PanelRow, {
    className: "kili-section__component-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 200
    },
    __self: this
  }, wp.element.createElement(RangeControl, {
    label: __("Padding bottom (in px)", "kili-builder"),
    onChange: function onChange(value) {
      props.setAttributes({
        paddingBottomDesktop: value
      });
    },
    value: props.attributes.paddingBottomDesktop,
    min: 0,
    max: 100,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 201
    },
    __self: this
  })), wp.element.createElement(PanelRow, {
    className: "kili-section__component-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 211
    },
    __self: this
  }, wp.element.createElement(RangeControl, {
    label: __("Padding top (in px)", "kili-builder"),
    onChange: function onChange(value) {
      props.setAttributes({
        paddingTopDesktop: value
      });
    },
    value: props.attributes.paddingTopDesktop,
    min: 0,
    max: 100,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 212
    },
    __self: this
  })))));
};

var processStyles = function processStyles(props) {
  var styles = "";
  var customClassName = ".kili-section-" + props.attributes.UUID;

  if (props.attributes.backgroundColor) {
    styles += customClassName + "{background-color:" + props.attributes.backgroundColor + ";";
  }

  if (props.attributes.paddingTopMobile) {
    styles += (styles !== "" ? "" : customClassName + "{") + "padding-top:" + props.attributes.paddingTopMobile + "px;";
  }

  if (props.attributes.paddingBottomMobile) {
    styles += (styles !== "" ? "" : customClassName + "{") + "padding-bottom:" + props.attributes.paddingBottomMobile + "px;";
  }

  if (props.attributes.marginTopMobile) {
    styles += (styles !== "" ? "" : customClassName + "{") + "margin-top:" + props.attributes.marginTopMobile + "px;";
  }

  if (props.attributes.marginBottomMobile) {
    styles += (styles !== "" ? "" : customClassName + "{") + "margin-bottom:" + props.attributes.marginBottomMobile + "px;";
  }

  if (styles !== "") {
    styles += "}";
  }

  if (props.attributes.paddingBottomDesktop || props.attributes.paddingTopDesktop || props.attributes.marginTopDesktop || props.attributes.marginBottomDesktop) {
    var deskStyle = "";

    if (props.attributes.paddingBottomDesktop) {
      deskStyle = customClassName + "{padding-bottom:" + props.attributes.paddingBottomDesktop + "px;";
    }

    if (props.attributes.paddingTopDesktop) {
      deskStyle += deskStyle === "" ? customClassName + "{" : "";
      deskStyle += "padding-top:" + props.attributes.paddingTopDesktop + "px;";
    }

    if (props.attributes.marginBottomDesktop) {
      deskStyle = customClassName + "{margin-bottom:" + props.attributes.marginBottomDesktop + "px;";
    }

    if (props.attributes.marginTopDesktop) {
      deskStyle += deskStyle === "" ? customClassName + "{" : "";
      deskStyle += "margin-top:" + props.attributes.marginTopDesktop + "px;";
    }

    if (deskStyle !== "") {
      deskStyle += "}";
      styles += "@media all and (min-width:815px){" + deskStyle + "}";
    }
  }

  return styles;
};

var saveBlock = function saveBlock(props) {
  var styles = processStyles(props);
  var classNameString = _typeof(props.className) ? "" : props.className;

  if (typeof props.attributes.UUID !== "undefined") {
    classNameString += " kili-section-" + props.attributes.UUID;
  }

  classNameString = classNameString.replace("undefined", "");
  classNameString = classNameString.replace(/\s{2,}/g, " ");
  return wp.element.createElement("section", {
    className: classNameString,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 317
    },
    __self: this
  }, wp.element.createElement("div", {
    className: props.attributes.useContainer ? "container" : "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 318
    },
    __self: this
  }, wp.element.createElement(InnerBlocks.Content, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 319
    },
    __self: this
  })), styles !== "" ? wp.element.createElement("style", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 321
    },
    __self: this
  }, styles) : "");
};

registerBlockType("kili-blocks/section", {
  title: __("Kili Section", "kili-core"),
  description: __("Creates a section element", "kili-builder"),
  attributes: _attributes__WEBPACK_IMPORTED_MODULE_1__["default"],
  category: "kili-blocks",
  icon: "editor-insertmore",
  edit: editBlock,
  save: saveBlock,
  supports: {
    align: ["wide", "full"]
  }
});

/***/ }),

/***/ "./src/blocks/section/edit.js":
/*!************************************!*\
  !*** ./src/blocks/section/edit.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/juanse/Documents/Koombea/gutenbergtest/htdocs/wp-content/plugins/kili-blocks/src/blocks/section/edit.js";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }






var ColumnsSettings = function ColumnsSettings(props) {
  var onChangeValue = props.onChangeValue,
      settings = props.settings;
  return wp.element.createElement(wp.element.Fragment, null, wp.element.createElement("div", {
    className: "flexgrid",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, settings.map(function (col, index) {
    return wp.element.createElement("div", {
      className: "flexgrid__item",
      key: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      },
      __self: this
    }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["TextControl"], {
      label: "Size (columns)",
      value: col,
      onChange: function onChange(val) {
        return onChangeValue(val, index);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: this
    }));
  })));
};

var MySelectControl = function MySelectControl(_ref) {
  var size = _ref.size,
      onChangeColumns = _ref.onChangeColumns;
  return wp.element.createElement(wp.element.Fragment, null, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["SelectControl"], {
    label: "Number of Columns: ",
    value: size,
    options: [{
      label: "1 Column",
      value: 1
    }, {
      label: "2 Columns",
      value: 2
    }, {
      label: "3 Columns",
      value: 3
    }, {
      label: "4 Columns",
      value: 4
    }, {
      label: "6 Columns",
      value: 6
    }, {
      label: "12 Columns",
      value: 12
    }],
    onChange: function onChange(value) {
      return onChangeColumns(value);
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }));
};

var Grid = function Grid(_ref2) {
  var settings = _ref2.settings,
      clientId = _ref2.clientId;

  var newTemplate = function newTemplate(columns) {
    return columns.map(function (col, index) {
      return ["kili-blocks/k-column", {
        columns: "".concat(col)
      }];
    });
  };

  return wp.element.createElement(wp.element.Fragment, null, wp.element.createElement("div", {
    className: "kili-section__row kili-section__row-".concat(clientId),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: this
  }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__["InnerBlocks"], {
    template: newTemplate(settings),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: this
  })));
};

var RowSectionEdit = function RowSectionEdit(_ref3) {
  var currentBlock = _ref3.currentBlock,
      attributes = _ref3.attributes,
      setAttributes = _ref3.setAttributes,
      clientId = _ref3.clientId,
      rest = _objectWithoutProperties(_ref3, ["currentBlock", "attributes", "setAttributes", "clientId"]);

  var _useState = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["useState"])(attributes.isCreated),
      _useState2 = _slicedToArray(_useState, 2),
      isCreated = _useState2[0],
      setIsCreated = _useState2[1];

  var _useState3 = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["useState"])(2),
      _useState4 = _slicedToArray(_useState3, 2),
      size = _useState4[0],
      setSize = _useState4[1];

  var _useState5 = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["useState"])([6, 6]),
      _useState6 = _slicedToArray(_useState5, 2),
      settings = _useState6[0],
      setSettings = _useState6[1];

  var _useState7 = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["useState"])(''),
      _useState8 = _slicedToArray(_useState7, 2),
      columnsStyle = _useState8[0],
      setColumnsStyle = _useState8[1];

  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var newColumnsStyle = '';
    currentBlock.innerBlocks.map(function (innerBlock, index) {
      var numberOfColumns = innerBlock.attributes.columns;
      newColumnsStyle += ".kili-columns > .kili-section__row-".concat(clientId, " > .editor-inner-blocks > .editor-block-list__layout > [data-type=\"kili-blocks/k-column\"]:nth-child(").concat(index + 1, ") {\n        flex-basis: ").concat(numberOfColumns / 12 * 100, "%;\n        margin-left: 0;\n        margin-right: 0;\n      }");
    });
    console.log(newColumnsStyle);
    setColumnsStyle(newColumnsStyle);
  }, [currentBlock]);

  var fillArray = function fillArray(value, len) {
    if (len == 0) return [];
    var a = [value];

    while (a.length * 2 <= len) {
      a = a.concat(a);
    }

    if (a.length < len) a = a.concat(a.slice(0, len - a.length));
    return a;
  };

  var toggleCreate = function toggleCreate() {
    setIsCreated(!isCreated);
    setAttributes({
      isCreated: !isCreated
    });
  };

  var _onChangeColumns = function onChangeColumns(value) {
    setSize(value);
    setSettings(fillArray(12 / Number(value), Number(value)));
  };

  var onChangeValue = function onChangeValue(newValue, index) {
    var newSettings = _toConsumableArray(settings);

    newSettings[index] = newValue;
    setSettings(newSettings);
  };

  return wp.element.createElement(wp.element.Fragment, null, wp.element.createElement("div", {
    className: "select-menu",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108
    },
    __self: this
  }, !isCreated && wp.element.createElement(wp.element.Fragment, null, wp.element.createElement("div", {
    className: "flexgrid",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111
    },
    __self: this
  }, wp.element.createElement(MySelectControl, {
    size: size,
    onChangeColumns: function onChangeColumns(v) {
      return _onChangeColumns(Number(v));
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112
    },
    __self: this
  }), wp.element.createElement("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116
    },
    __self: this
  }, "Available column: 12")), wp.element.createElement(ColumnsSettings, {
    size: size,
    onChangeValue: onChangeValue,
    settings: settings,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 118
    },
    __self: this
  }), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    onClick: toggleCreate,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123
    },
    __self: this
  }, "Create Grid"))), wp.element.createElement("div", {
    className: "kili-columns",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 127
    },
    __self: this
  }, isCreated && wp.element.createElement(Grid, {
    settings: settings,
    clientId: clientId,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128
    },
    __self: this
  })), wp.element.createElement("style", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 130
    },
    __self: this
  }, columnsStyle));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__["withSelect"])(function (select, ownProps) {
  return {
    currentBlock: select('core/block-editor').getBlock(ownProps.clientId)
  };
})(RowSectionEdit));

/***/ }),

/***/ "./src/blocks/section/index.js":
/*!*************************************!*\
  !*** ./src/blocks/section/index.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/section/edit.js");
/* harmony import */ var _parent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parent */ "./src/blocks/section/parent.js");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.editor.scss */ "./src/blocks/section/style.editor.scss");
/* harmony import */ var _style_editor_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_editor_scss__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "/Users/juanse/Documents/Koombea/gutenbergtest/htdocs/wp-content/plugins/kili-blocks/src/blocks/section/index.js";






var attributes = {
  columns: {
    type: "number",
    default: 1
  },
  isCreated: {
    type: "boolean",
    default: false
  },
  currentTab: {
    type: "string",
    default: "desk"
  }
};
Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["registerBlockType"])("kili-blocks/row-section", {
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("kili-Columns", "kili-bloks"),
  parent: ["kili-blocks/k-section"],
  category: "kili-blocks",
  icon: "grid-view",
  supports: {
    html: false,
    reusable: false
  },
  attributes: attributes,
  keywords: [Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Row", "kili-blocks"), Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Kili", "kili-blocks")],
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: function save(_ref) {
    var attributes = _ref.attributes;
    return wp.element.createElement("div", {
      className: "flexgrid",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 37
      },
      __self: this
    }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__["InnerBlocks"].Content, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      },
      __self: this
    }));
  }
});

/***/ }),

/***/ "./src/blocks/section/parent.js":
/*!**************************************!*\
  !*** ./src/blocks/section/parent.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/juanse/Documents/Koombea/gutenbergtest/htdocs/wp-content/plugins/kili-blocks/src/blocks/section/parent.js";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * WordPress dependencies
 */

 // import { column as icon } from "@wordpress/icons";



/**
 * Internal dependencies
 */

Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["registerBlockType"])("kili-blocks/k-section", {
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Kili-Row", "kili-blocks"),
  description: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Add section where you can create diferents sections for the main page", "kili-blocks"),
  category: "kili-blocks",
  icon: "text",
  keywords: [Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Section", "kili-blocks")],
  supports: _defineProperty({
    html: false,
    align: true
  }, "align", ["full", "wide"]),
  attributes: {
    fullWidth: {
      type: "boolean",
      default: false
    },
    id: {
      type: "string",
      default: ""
    },
    url: {
      type: "string",
      default: ""
    },
    alt: {
      type: "string",
      default: ""
    }
  },
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        setAttributes = _ref.setAttributes;
    var id = attributes.id,
        url = attributes.url,
        alt = attributes.alt,
        fullWidth = attributes.fullWidth;

    var onSelectImage = function onSelectImage(_ref2) {
      var id = _ref2.id,
          url = _ref2.url,
          alt = _ref2.alt;
      setAttributes({
        id: id,
        url: url,
        alt: alt
      });
    };

    var onRemoveImage = function onRemoveImage() {
      setAttributes({
        id: null,
        url: null,
        alt: null
      });
    };

    return wp.element.createElement(wp.element.Fragment, null, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__["InspectorControls"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 73
      },
      __self: this
    }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["PanelBody"], {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Row Settings", "kili-blocks"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 74
      },
      __self: this
    }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["ToggleControl"], {
      label: "Background Full-Width",
      onChange: function onChange(value) {
        return setAttributes({
          fullWidth: value
        });
      },
      checked: fullWidth,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 75
      },
      __self: this
    })), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["PanelBody"], {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Background Settings", "kili-blocks"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 85
      },
      __self: this
    }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["PanelRow"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 86
      },
      __self: this
    }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__["MediaUploadCheck"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 87
      },
      __self: this
    }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__["MediaUpload"], {
      value: id,
      onSelect: function onSelect(img) {
        return onSelectImage(img);
      },
      allowedTypes: ["image"],
      render: function render(_ref3) {
        var open = _ref3.open;
        return wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["IconButton"], {
          className: "button--add_edit",
          label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("".concat(url ? "Edit Image" : "Add Image"), "kili-core"),
          onClick: open,
          icon: "format-image",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 94
          },
          __self: this
        });
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 88
      },
      __self: this
    })), id && wp.element.createElement(wp.element.Fragment, null, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], {
      text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Remove Image", "kili-core"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 109
      },
      __self: this
    }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      className: "button--close",
      onClick: function onClick() {
        return onRemoveImage();
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 110
      },
      __self: this
    }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["Dashicon"], {
      icon: "no-alt",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 114
      },
      __self: this
    }))))), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["PanelRow"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 120
      },
      __self: this
    }, url && wp.element.createElement("img", {
      src: url,
      alt: alt,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 120
      },
      __self: this
    })))), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__["InnerBlocks"], {
      template: [["kili-blocks/row-section"]],
      __source: {
        fileName: _jsxFileName,
        lineNumber: 123
      },
      __self: this
    }));
  },
  save: function save(_ref4) {
    var attributes = _ref4.attributes,
        className = _ref4.className;
    console.log("kili-section-save", attributes, className);
    var fullWidth = attributes.fullWidth;
    return wp.element.createElement("section", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 131
      },
      __self: this
    }, wp.element.createElement("div", {
      className: !fullWidth ? "container" : "",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 132
      },
      __self: this
    }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__["InnerBlocks"].Content, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 133
      },
      __self: this
    })));
  }
});

/***/ }),

/***/ "./src/blocks/section/style.editor.scss":
/*!**********************************************!*\
  !*** ./src/blocks/section/style.editor.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/blocks/team-member/edit.js":
/*!****************************************!*\
  !*** ./src/blocks/team-member/edit.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blob__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blob */ "@wordpress/blob");
/* harmony import */ var _wordpress_blob__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blob__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "/Users/juanse/Documents/Koombea/gutenbergtest/htdocs/wp-content/plugins/kili-blocks/src/blocks/team-member/edit.js";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var TeamMemberEdit = /*#__PURE__*/function (_Component) {
  _inherits(TeamMemberEdit, _Component);

  function TeamMemberEdit(props) {
    var _this;

    _classCallCheck(this, TeamMemberEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TeamMemberEdit).call(this, props));
    _this.state = {
      selectedLink: null
    };
    return _this;
  }

  _createClass(TeamMemberEdit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          attributes = _this$props.attributes,
          setAttributes = _this$props.setAttributes;
      var url = attributes.url,
          id = attributes.id;

      if (url && Object(_wordpress_blob__WEBPACK_IMPORTED_MODULE_2__["isBlobURL"])(url) && !id) {
        setAttributes({
          url: "",
          alt: ""
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.isSelected && !this.props.isSelected) {
        this.setState({
          selectedLink: null
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          className = _this$props2.className,
          attributes = _this$props2.attributes,
          setAttributes = _this$props2.setAttributes,
          noticeOperations = _this$props2.noticeOperations,
          noticeUI = _this$props2.noticeUI,
          image = _this$props2.image,
          imageSizes = _this$props2.imageSizes,
          isSelected = _this$props2.isSelected;
      var title = attributes.title,
          info = attributes.info,
          url = attributes.url,
          alt = attributes.alt,
          id = attributes.id,
          social = attributes.social;
      var createErrorNotice = noticeOperations.createErrorNotice;

      var onChangeTitle = function onChangeTitle(title) {
        setAttributes({
          title: title
        });
      };

      var onChangeInfo = function onChangeInfo(info) {
        setAttributes({
          info: info
        });
      };

      var onSelectImage = function onSelectImage(_ref) {
        var id = _ref.id,
            url = _ref.url,
            alt = _ref.alt;
        setAttributes({
          id: id,
          url: url,
          alt: alt
        });
      };

      var _onSelectURL = function onSelectURL(url) {
        return setAttributes({
          url: url,
          id: null,
          alt: ""
        });
      };

      var onUploadError = function onUploadError(message) {
        createErrorNotice(message);
      };

      var removeImage = function removeImage() {
        setAttributes({
          url: "",
          id: null,
          alt: ""
        });
      };

      var updateAlt = function updateAlt(alt) {
        setAttributes({
          alt: alt
        });
      };

      var getImageSizes = function getImageSizes() {
        if (!image) return [];
        var options = [];
        var sizes = image.media_details.sizes;

        var _loop = function _loop(key) {
          var size = sizes[key];
          var imageSize = imageSizes.find(function (size) {
            return size.slug === key;
          });

          if (imageSize) {
            options.push({
              label: imageSize.name,
              value: size.source_url
            });
          }
        };

        for (var key in sizes) {
          _loop(key);
        }

        return options;
      };

      var onImageSizeChange = function onImageSizeChange(url) {
        setAttributes({
          url: url
        });
      };

      var addNewLink = function addNewLink() {
        setAttributes({
          social: [].concat(_toConsumableArray(social), [{
            icon: "wordpress",
            link: ""
          }])
        });

        _this2.setState({
          selectedLink: social.length
        });
      };

      var updateSocialItem = function updateSocialItem(type, value) {
        var social = attributes.social;
        var selectedLink = _this2.state.selectedLink;

        var new_social = _toConsumableArray(social);

        new_social[selectedLink][type] = value;
        setAttributes({
          social: new_social
        });
      };

      var removeLink = function removeLink(e) {
        e.preventDefault();
        var social = attributes.social;
        var selectedLink = _this2.state.selectedLink;
        setAttributes({
          social: [].concat(_toConsumableArray(social.slice(0, selectedLink)), _toConsumableArray(social.slice(selectedLink + 1)))
        });

        _this2.setState({
          selectedLink: null
        });
      };

      return wp.element.createElement(wp.element.Fragment, null, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__["InspectorControls"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 132
        },
        __self: this
      }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["PanelBody"], {
        title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Image Settings", "kili-core"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        },
        __self: this
      }, url && !Object(_wordpress_blob__WEBPACK_IMPORTED_MODULE_2__["isBlobURL"])(url) && wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["TextareaControl"], {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Alt Text", "kili-core"),
        value: alt,
        onChange: updateAlt,
        help: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Here you can update the alt property of a image", "kili-core"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 135
        },
        __self: this
      }), id && wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["SelectControl"], {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Image Size", "kili-core"),
        options: getImageSizes(),
        onChange: onImageSizeChange,
        value: url,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 146
        },
        __self: this
      }))), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__["BlockControls"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 155
        },
        __self: this
      }, url && wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["Toolbar"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 157
        },
        __self: this
      }, id && wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__["MediaUploadCheck"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 159
        },
        __self: this
      }, wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__["MediaUpload"], {
        value: id,
        onSelect: onSelectImage,
        allowedTypes: ["image"],
        render: function render(_ref2) {
          var open = _ref2.open;
          return wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["IconButton"], {
            className: "components-icon-button components-toolbar__control",
            label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Edit Image", "kili-code"),
            onClick: open,
            icon: "edit",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 166
            },
            __self: this
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160
        },
        __self: this
      })), wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["IconButton"], {
        className: "components-icon-button components-toolbar__control",
        label: "Remove Image",
        onClick: removeImage,
        icon: "trash",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 177
        },
        __self: this
      }))), wp.element.createElement("div", {
        className: className,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 186
        },
        __self: this
      }, url ? wp.element.createElement(wp.element.Fragment, null, wp.element.createElement("img", {
        src: url,
        alt: alt,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 189
        },
        __self: this
      }), Object(_wordpress_blob__WEBPACK_IMPORTED_MODULE_2__["isBlobURL"])(url) && wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["Spinner"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 190
        },
        __self: this
      })) : wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__["MediaPlaceholder"], {
        icon: "format-image",
        onSelect: function onSelect(image) {
          return onSelectImage(image);
        },
        onSelectURL: function onSelectURL(url) {
          return _onSelectURL(url);
        },
        onError: function onError(message) {
          return onUploadError(message);
        } // accept="image/*"
        ,
        allowedTypes: ["image"],
        notices: noticeUI,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 193
        },
        __self: this
      }), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__["RichText"], {
        className: "wp-block-kili-blocks-team-member__title",
        tagName: "h4",
        onChange: function onChange(title) {
          return onChangeTitle(title);
        },
        value: title,
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Member Name", "kili-core"),
        allowedFormats: [],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 203
        },
        __self: this
      }), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__["RichText"], {
        className: "wp-block-kili-blocks-team-member__info",
        tagName: "p",
        onChange: function onChange(info) {
          return onChangeInfo(info);
        },
        value: info,
        placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("User Info", "kili-core"),
        allowedFormats: [],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 211
        },
        __self: this
      }), wp.element.createElement("div", {
        className: "wp-block-kili-blocks-team-member__social",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 219
        },
        __self: this
      }, wp.element.createElement("ul", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 220
        },
        __self: this
      }, social.map(function (s, i) {
        return wp.element.createElement("li", {
          key: i,
          onClick: function onClick() {
            return _this2.setState({
              selectedLink: i
            });
          },
          className: _this2.state.selectedLink === i ? "is-selected" : null,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 223
          },
          __self: this
        }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["Dashicon"], {
          icon: s.icon,
          size: 16,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 230
          },
          __self: this
        }));
      }), isSelected && wp.element.createElement("li", {
        className: "wp-block-kili-blocks-team-member__addIconLI",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 235
        },
        __self: this
      }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], {
        text: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Add Item", "kili-core"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 236
        },
        __self: this
      }, wp.element.createElement("button", {
        className: "wp-block-kili-blocks-team-member__addIcon",
        onClick: addNewLink,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 237
        },
        __self: this
      }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["Dashicon"], {
        icon: "plus",
        size: 14,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 241
        },
        __self: this
      })))))), this.state.selectedLink !== null && wp.element.createElement("div", {
        className: "wp-block-kili-blocks-team-member__linkForm",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 249
        },
        __self: this
      }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["TextControl"], {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Icon", "kili-core"),
        value: social[this.state.selectedLink].icon,
        onChange: function onChange(icon) {
          return updateSocialItem("icon", icon);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 250
        },
        __self: this
      }), wp.element.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__["URLInput"], {
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("URL", "kili-core"),
        value: social[this.state.selectedLink].link,
        onChange: function onChange(url) {
          return updateSocialItem("link", url);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 255
        },
        __self: this
      }), wp.element.createElement("a", {
        className: "wp-block-kili-blocks-team-member__removeLink",
        onClick: removeLink,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 260
        },
        __self: this
      }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Remove Link", "kili-core")))));
    }
  }]);

  return TeamMemberEdit;
}(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__["withSelect"])(function (select, props) {
  var id = props.attributes.id;
  return {
    image: id ? select("core").getMedia(id) : null,
    imageSizes: select("core/block-editor").getSettings().imageSizes
  };
})(Object(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["withNotices"])(TeamMemberEdit)));

/***/ }),

/***/ "./src/blocks/team-member/index.js":
/*!*****************************************!*\
  !*** ./src/blocks/team-member/index.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.editor.scss */ "./src/blocks/team-member/style.editor.scss");
/* harmony import */ var _style_editor_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_editor_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _parent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parent */ "./src/blocks/team-member/parent.js");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./edit */ "./src/blocks/team-member/edit.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "/Users/juanse/Documents/Koombea/gutenbergtest/htdocs/wp-content/plugins/kili-blocks/src/blocks/team-member/index.js";



var RichText = wp.blockEditor.RichText;



var attributes = {
  title: {
    type: "string",
    source: "html",
    selector: "h4"
  },
  info: {
    type: "string",
    source: "html",
    selector: "p"
  },
  id: {
    type: "number"
  },
  alt: {
    type: "string",
    source: "attribute",
    selector: "img",
    attribute: "alt",
    default: ""
  },
  url: {
    type: "string",
    source: "attribute",
    selector: "img",
    attribute: "src"
  },
  social: {
    type: "array",
    default: [{
      link: "https://facebook.com",
      icon: "facebook"
    }, {
      link: "https://twitter.com",
      icon: "twitter"
    }],
    source: "query",
    selector: ".wp-block-kili-blocks-team-member__social ul li",
    query: {
      icon: {
        source: "attribute",
        attribute: "data-icon"
      },
      link: {
        source: "attribute",
        selector: "a",
        attribute: "href"
      }
    }
  }
};
Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__["registerBlockType"])("kili-blocks/team-member", {
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])("Team Member", "kili-core"),
  description: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])("Our block for Team member", "kili-core"),
  category: "kili-blocks",
  icon: "admin-users",
  parent: ["kili-blocks/team-members"],
  supports: {
    html: false,
    reusable: false
  },
  attributes: attributes,
  keywords: [Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])("Team", "kili-core"), Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])("Member", "kili-core")],
  edit: _edit__WEBPACK_IMPORTED_MODULE_4__["default"],
  save: function save(_ref) {
    var attributes = _ref.attributes;
    var title = attributes.title,
        info = attributes.info,
        url = attributes.url,
        alt = attributes.alt,
        id = attributes.id,
        social = attributes.social;
    return wp.element.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 74
      },
      __self: this
    }, url && wp.element.createElement("img", {
      src: url,
      alt: alt,
      className: id ? "wp-image-".concat(id) : null,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 76
      },
      __self: this
    }), title && wp.element.createElement(RichText.Content, {
      className: "wp-block-kili-blocks-team-member__title",
      value: title,
      tagName: "h4",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 79
      },
      __self: this
    }), info && wp.element.createElement(RichText.Content, {
      className: "wp-block-kili-blocks-team-member__info",
      value: info,
      tagName: "p",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 86
      },
      __self: this
    }), social.length > 0 && wp.element.createElement("div", {
      className: "wp-block-kili-blocks-team-member__social",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 93
      },
      __self: this
    }, wp.element.createElement("ul", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 94
      },
      __self: this
    }, social.map(function (item, index) {
      return wp.element.createElement("li", {
        key: index,
        "data-icon": item.icon,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        },
        __self: this
      }, wp.element.createElement("a", {
        href: item.link,
        target: "_blank",
        rel: "noopener noreferrer",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        },
        __self: this
      }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["Dashicon"], {
        icon: item.icon,
        size: 16,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        },
        __self: this
      })));
    }))));
  }
});

/***/ }),

/***/ "./src/blocks/team-member/parent.js":
/*!******************************************!*\
  !*** ./src/blocks/team-member/parent.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/Users/juanse/Documents/Koombea/gutenbergtest/htdocs/wp-content/plugins/kili-blocks/src/blocks/team-member/parent.js";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var _wp$blockEditor = wp.blockEditor,
    InnerBlocks = _wp$blockEditor.InnerBlocks,
    InspectorControls = _wp$blockEditor.InspectorControls;
var attributes = {
  columns: {
    type: "number",
    default: 2
  }
};
Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["registerBlockType"])("kili-blocks/team-members", {
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Team Members", "kili-core"),
  description: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Our block for wrap other components", "kili-core"),
  icon: "grid-view",
  category: "layout",
  keywords: [Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("kili3", "kili-core")],
  supports: _defineProperty({
    html: false,
    align: true
  }, "align", ["left", "right", "center", "full", "wide"]),
  attributes: attributes,
  edit: function edit(_ref) {
    var className = _ref.className,
        attributes = _ref.attributes,
        setAttributes = _ref.setAttributes;
    var columns = attributes.columns;
    return wp.element.createElement("div", {
      className: "".concat(className, " has-").concat(columns, "-columns"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: this
    }, wp.element.createElement(InspectorControls, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      },
      __self: this
    }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["PanelBody"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
      },
      __self: this
    }, wp.element.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["RangeControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])("Columns", "kili-core"),
      value: columns,
      onChange: function onChange(columns) {
        return setAttributes({
          columns: columns
        });
      },
      min: 1,
      max: 12,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 31
      },
      __self: this
    }))), wp.element.createElement(InnerBlocks, {
      allowedBlocks: ["kili-blocks/team-member"],
      template: [["kili-blocks/team-member"], ["kili-blocks/team-member"]],
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      },
      __self: this
    }));
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes;
    var columns = attributes.columns;
    return wp.element.createElement("div", {
      className: "has-".concat(columns, "-columns"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      },
      __self: this
    }, wp.element.createElement(InnerBlocks.Content, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      },
      __self: this
    }));
  }
});

/***/ }),

/***/ "./src/blocks/team-member/style.editor.scss":
/*!**************************************************!*\
  !*** ./src/blocks/team-member/style.editor.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/editor.js":
/*!***********************!*\
  !*** ./src/editor.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _blocks_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blocks/layout */ "./src/blocks/layout/index.js");
/* harmony import */ var _blocks_layout2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blocks/layout2 */ "./src/blocks/layout2/index.js");
/* harmony import */ var _blocks_team_member__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blocks/team-member */ "./src/blocks/team-member/index.js");
/* harmony import */ var _blocks_row_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./blocks/row-layout */ "./src/blocks/row-layout/index.js");
/* harmony import */ var _blocks_row_rf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./blocks/row-rf */ "./src/blocks/row-rf/index.js");
/* harmony import */ var _blocks_section__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./blocks/section */ "./src/blocks/section/index.js");
/* harmony import */ var _blocks_column__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./blocks/column */ "./src/blocks/column/index.js");








/***/ }),

/***/ "@wordpress/blob":
/*!******************************!*\
  !*** external ["wp","blob"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = wp["blob"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = wp["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = wp["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = wp["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = wp["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = wp["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = wp["i18n"];

/***/ })

/******/ });
//# sourceMappingURL=editor.js.map