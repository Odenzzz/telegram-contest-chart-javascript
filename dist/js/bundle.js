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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/q/q.js":
/*!*****************************!*\
  !*** ./node_modules/q/q.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, setImmediate) {// vim:ts=4:sts=4:sw=4:
/*!
 *
 * Copyright 2009-2017 Kris Kowal under the terms of the MIT
 * license found at https://github.com/kriskowal/q/blob/v1/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (definition) {
    "use strict";

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

    // CommonJS
    } else if (true) {
        module.exports = definition();

    // RequireJS
    } else { var previousQ, global; }

})(function () {
"use strict";

var hasStacks = false;
try {
    throw new Error();
} catch (e) {
    hasStacks = !!e.stack;
}

// All code after this point will be filtered from stack traces reported
// by Q.
var qStartingLine = captureLine();
var qFileName;

// shims

// used for fallback in "allResolved"
var noop = function () {};

// Use the fastest possible means to execute a task in a future turn
// of the event loop.
var nextTick =(function () {
    // linked list of tasks (single, with head node)
    var head = {task: void 0, next: null};
    var tail = head;
    var flushing = false;
    var requestTick = void 0;
    var isNodeJS = false;
    // queue for late tasks, used by unhandled rejection tracking
    var laterQueue = [];

    function flush() {
        /* jshint loopfunc: true */
        var task, domain;

        while (head.next) {
            head = head.next;
            task = head.task;
            head.task = void 0;
            domain = head.domain;

            if (domain) {
                head.domain = void 0;
                domain.enter();
            }
            runSingle(task, domain);

        }
        while (laterQueue.length) {
            task = laterQueue.pop();
            runSingle(task);
        }
        flushing = false;
    }
    // runs a single function in the async queue
    function runSingle(task, domain) {
        try {
            task();

        } catch (e) {
            if (isNodeJS) {
                // In node, uncaught exceptions are considered fatal errors.
                // Re-throw them synchronously to interrupt flushing!

                // Ensure continuation if the uncaught exception is suppressed
                // listening "uncaughtException" events (as domains does).
                // Continue in next event to avoid tick recursion.
                if (domain) {
                    domain.exit();
                }
                setTimeout(flush, 0);
                if (domain) {
                    domain.enter();
                }

                throw e;

            } else {
                // In browsers, uncaught exceptions are not fatal.
                // Re-throw them asynchronously to avoid slow-downs.
                setTimeout(function () {
                    throw e;
                }, 0);
            }
        }

        if (domain) {
            domain.exit();
        }
    }

    nextTick = function (task) {
        tail = tail.next = {
            task: task,
            domain: isNodeJS && process.domain,
            next: null
        };

        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };

    if (typeof process === "object" &&
        process.toString() === "[object process]" && process.nextTick) {
        // Ensure Q is in a real Node environment, with a `process.nextTick`.
        // To see through fake Node environments:
        // * Mocha test runner - exposes a `process` global without a `nextTick`
        // * Browserify - exposes a `process.nexTick` function that uses
        //   `setTimeout`. In this case `setImmediate` is preferred because
        //    it is faster. Browserify's `process.toString()` yields
        //   "[object Object]", while in a real Node environment
        //   `process.toString()` yields "[object process]".
        isNodeJS = true;

        requestTick = function () {
            process.nextTick(flush);
        };

    } else if (typeof setImmediate === "function") {
        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
        if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);
        } else {
            requestTick = function () {
                setImmediate(flush);
            };
        }

    } else if (typeof MessageChannel !== "undefined") {
        // modern browsers
        // http://www.nonblocking.io/2011/06/windownexttick.html
        var channel = new MessageChannel();
        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
        // working message ports the first time a page loads.
        channel.port1.onmessage = function () {
            requestTick = requestPortTick;
            channel.port1.onmessage = flush;
            flush();
        };
        var requestPortTick = function () {
            // Opera requires us to provide a message payload, regardless of
            // whether we use it.
            channel.port2.postMessage(0);
        };
        requestTick = function () {
            setTimeout(flush, 0);
            requestPortTick();
        };

    } else {
        // old browsers
        requestTick = function () {
            setTimeout(flush, 0);
        };
    }
    // runs a task after all other tasks have been run
    // this is useful for unhandled rejection tracking that needs to happen
    // after all `then`d tasks have been run.
    nextTick.runAfter = function (task) {
        laterQueue.push(task);
        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };
    return nextTick;
})();

// Attempt to make generics safe in the face of downstream
// modifications.
// There is no situation where this is necessary.
// If you need a security guarantee, these primordials need to be
// deeply frozen anyway, and if you don’t need a security guarantee,
// this is just plain paranoid.
// However, this **might** have the nice side-effect of reducing the size of
// the minified code by reducing x.call() to merely x()
// See Mark Miller’s explanation of what this does.
// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
var call = Function.call;
function uncurryThis(f) {
    return function () {
        return call.apply(f, arguments);
    };
}
// This is equivalent, but slower:
// uncurryThis = Function_bind.bind(Function_bind.call);
// http://jsperf.com/uncurrythis

var array_slice = uncurryThis(Array.prototype.slice);

var array_reduce = uncurryThis(
    Array.prototype.reduce || function (callback, basis) {
        var index = 0,
            length = this.length;
        // concerning the initial value, if one is not provided
        if (arguments.length === 1) {
            // seek to the first value in the array, accounting
            // for the possibility that is is a sparse array
            do {
                if (index in this) {
                    basis = this[index++];
                    break;
                }
                if (++index >= length) {
                    throw new TypeError();
                }
            } while (1);
        }
        // reduce
        for (; index < length; index++) {
            // account for the possibility that the array is sparse
            if (index in this) {
                basis = callback(basis, this[index], index);
            }
        }
        return basis;
    }
);

var array_indexOf = uncurryThis(
    Array.prototype.indexOf || function (value) {
        // not a very good shim, but good enough for our one use of it
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    }
);

var array_map = uncurryThis(
    Array.prototype.map || function (callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function (undefined, value, index) {
            collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
    }
);

var object_create = Object.create || function (prototype) {
    function Type() { }
    Type.prototype = prototype;
    return new Type();
};

var object_defineProperty = Object.defineProperty || function (obj, prop, descriptor) {
    obj[prop] = descriptor.value;
    return obj;
};

var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

var object_keys = Object.keys || function (object) {
    var keys = [];
    for (var key in object) {
        if (object_hasOwnProperty(object, key)) {
            keys.push(key);
        }
    }
    return keys;
};

var object_toString = uncurryThis(Object.prototype.toString);

function isObject(value) {
    return value === Object(value);
}

// generator related shims

// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
function isStopIteration(exception) {
    return (
        object_toString(exception) === "[object StopIteration]" ||
        exception instanceof QReturnValue
    );
}

// FIXME: Remove this helper and Q.return once ES6 generators are in
// SpiderMonkey.
var QReturnValue;
if (typeof ReturnValue !== "undefined") {
    QReturnValue = ReturnValue;
} else {
    QReturnValue = function (value) {
        this.value = value;
    };
}

// long stack traces

var STACK_JUMP_SEPARATOR = "From previous event:";

function makeStackTraceLong(error, promise) {
    // If possible, transform the error stack trace by removing Node and Q
    // cruft, then concatenating with the stack trace of `promise`. See #57.
    if (hasStacks &&
        promise.stack &&
        typeof error === "object" &&
        error !== null &&
        error.stack
    ) {
        var stacks = [];
        for (var p = promise; !!p; p = p.source) {
            if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter)) {
                object_defineProperty(error, "__minimumStackCounter__", {value: p.stackCounter, configurable: true});
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        var stack = filterStackString(concatedStacks);
        object_defineProperty(error, "stack", {value: stack, configurable: true});
    }
}

function filterStackString(stackString) {
    var lines = stackString.split("\n");
    var desiredLines = [];
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];

        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
        }
    }
    return desiredLines.join("\n");
}

function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}

function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    // In IE10 function name can have spaces ("Anonymous function") O_o
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
}

function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    if (!fileNameAndLineNumber) {
        return false;
    }

    var fileName = fileNameAndLineNumber[0];
    var lineNumber = fileNameAndLineNumber[1];

    return fileName === qFileName &&
        lineNumber >= qStartingLine &&
        lineNumber <= qEndingLine;
}

// discover own file name and line number range for filtering stack
// traces
function captureLine() {
    if (!hasStacks) {
        return;
    }

    try {
        throw new Error();
    } catch (e) {
        var lines = e.stack.split("\n");
        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (!fileNameAndLineNumber) {
            return;
        }

        qFileName = fileNameAndLineNumber[0];
        return fileNameAndLineNumber[1];
    }
}

function deprecate(callback, name, alternative) {
    return function () {
        if (typeof console !== "undefined" &&
            typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative +
                         " instead.", new Error("").stack);
        }
        return callback.apply(callback, arguments);
    };
}

// end of shims
// beginning of real work

/**
 * Constructs a promise for an immediate reference, passes promises through, or
 * coerces promises from different systems.
 * @param value immediate reference or promise
 */
function Q(value) {
    // If the object is already a Promise, return it directly.  This enables
    // the resolve function to both be used to created references from objects,
    // but to tolerably coerce non-promises to promises.
    if (value instanceof Promise) {
        return value;
    }

    // assimilate thenables
    if (isPromiseAlike(value)) {
        return coerce(value);
    } else {
        return fulfill(value);
    }
}
Q.resolve = Q;

/**
 * Performs a task in a future turn of the event loop.
 * @param {Function} task
 */
Q.nextTick = nextTick;

/**
 * Controls whether or not long stack traces will be on
 */
Q.longStackSupport = false;

/**
 * The counter is used to determine the stopping point for building
 * long stack traces. In makeStackTraceLong we walk backwards through
 * the linked list of promises, only stacks which were created before
 * the rejection are concatenated.
 */
var longStackCounter = 1;

// enable long stacks if Q_DEBUG is set
if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
    Q.longStackSupport = true;
}

/**
 * Constructs a {promise, resolve, reject} object.
 *
 * `resolve` is a callback to invoke with a more resolved value for the
 * promise. To fulfill the promise, invoke `resolve` with any value that is
 * not a thenable. To reject the promise, invoke `resolve` with a rejected
 * thenable, or invoke `reject` with the reason directly. To resolve the
 * promise to another thenable, thus putting it in the same state, invoke
 * `resolve` with that other thenable.
 */
Q.defer = defer;
function defer() {
    // if "messages" is an "Array", that indicates that the promise has not yet
    // been resolved.  If it is "undefined", it has been resolved.  Each
    // element of the messages array is itself an array of complete arguments to
    // forward to the resolved promise.  We coerce the resolution value to a
    // promise using the `resolve` function because it handles both fully
    // non-thenable values and other thenables gracefully.
    var messages = [], progressListeners = [], resolvedPromise;

    var deferred = object_create(defer.prototype);
    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, operands) {
        var args = array_slice(arguments);
        if (messages) {
            messages.push(args);
            if (op === "when" && operands[1]) { // progress operand
                progressListeners.push(operands[1]);
            }
        } else {
            Q.nextTick(function () {
                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
            });
        }
    };

    // XXX deprecated
    promise.valueOf = function () {
        if (messages) {
            return promise;
        }
        var nearerValue = nearer(resolvedPromise);
        if (isPromise(nearerValue)) {
            resolvedPromise = nearerValue; // shorten chain
        }
        return nearerValue;
    };

    promise.inspect = function () {
        if (!resolvedPromise) {
            return { state: "pending" };
        }
        return resolvedPromise.inspect();
    };

    if (Q.longStackSupport && hasStacks) {
        try {
            throw new Error();
        } catch (e) {
            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
            // accessor around; that causes memory leaks as per GH-111. Just
            // reify the stack trace as a string ASAP.
            //
            // At the same time, cut off the first line; it's always just
            // "[object Promise]\n", as per the `toString`.
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
            promise.stackCounter = longStackCounter++;
        }
    }

    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
    // consolidating them into `become`, since otherwise we'd create new
    // promises with the lines `become(whatever(value))`. See e.g. GH-252.

    function become(newPromise) {
        resolvedPromise = newPromise;

        if (Q.longStackSupport && hasStacks) {
            // Only hold a reference to the new promise if long stacks
            // are enabled to reduce memory usage
            promise.source = newPromise;
        }

        array_reduce(messages, function (undefined, message) {
            Q.nextTick(function () {
                newPromise.promiseDispatch.apply(newPromise, message);
            });
        }, void 0);

        messages = void 0;
        progressListeners = void 0;
    }

    deferred.promise = promise;
    deferred.resolve = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(Q(value));
    };

    deferred.fulfill = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(fulfill(value));
    };
    deferred.reject = function (reason) {
        if (resolvedPromise) {
            return;
        }

        become(reject(reason));
    };
    deferred.notify = function (progress) {
        if (resolvedPromise) {
            return;
        }

        array_reduce(progressListeners, function (undefined, progressListener) {
            Q.nextTick(function () {
                progressListener(progress);
            });
        }, void 0);
    };

    return deferred;
}

/**
 * Creates a Node-style callback that will resolve or reject the deferred
 * promise.
 * @returns a nodeback
 */
defer.prototype.makeNodeResolver = function () {
    var self = this;
    return function (error, value) {
        if (error) {
            self.reject(error);
        } else if (arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
        } else {
            self.resolve(value);
        }
    };
};

/**
 * @param resolver {Function} a function that returns nothing and accepts
 * the resolve, reject, and notify functions for a deferred.
 * @returns a promise that may be resolved with the given resolve and reject
 * functions, or rejected by a thrown exception in resolver
 */
Q.Promise = promise; // ES6
Q.promise = promise;
function promise(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError("resolver must be a function.");
    }
    var deferred = defer();
    try {
        resolver(deferred.resolve, deferred.reject, deferred.notify);
    } catch (reason) {
        deferred.reject(reason);
    }
    return deferred.promise;
}

promise.race = race; // ES6
promise.all = all; // ES6
promise.reject = reject; // ES6
promise.resolve = Q; // ES6

// XXX experimental.  This method is a way to denote that a local value is
// serializable and should be immediately dispatched to a remote upon request,
// instead of passing a reference.
Q.passByCopy = function (object) {
    //freeze(object);
    //passByCopies.set(object, true);
    return object;
};

Promise.prototype.passByCopy = function () {
    //freeze(object);
    //passByCopies.set(object, true);
    return this;
};

/**
 * If two promises eventually fulfill to the same value, promises that value,
 * but otherwise rejects.
 * @param x {Any*}
 * @param y {Any*}
 * @returns {Any*} a promise for x and y if they are the same, but a rejection
 * otherwise.
 *
 */
Q.join = function (x, y) {
    return Q(x).join(y);
};

Promise.prototype.join = function (that) {
    return Q([this, that]).spread(function (x, y) {
        if (x === y) {
            // TODO: "===" should be Object.is or equiv
            return x;
        } else {
            throw new Error("Q can't join: not the same: " + x + " " + y);
        }
    });
};

/**
 * Returns a promise for the first of an array of promises to become settled.
 * @param answers {Array[Any*]} promises to race
 * @returns {Any*} the first promise to be settled
 */
Q.race = race;
function race(answerPs) {
    return promise(function (resolve, reject) {
        // Switch to this once we can assume at least ES5
        // answerPs.forEach(function (answerP) {
        //     Q(answerP).then(resolve, reject);
        // });
        // Use this in the meantime
        for (var i = 0, len = answerPs.length; i < len; i++) {
            Q(answerPs[i]).then(resolve, reject);
        }
    });
}

Promise.prototype.race = function () {
    return this.then(Q.race);
};

/**
 * Constructs a Promise with a promise descriptor object and optional fallback
 * function.  The descriptor contains methods like when(rejected), get(name),
 * set(name, value), post(name, args), and delete(name), which all
 * return either a value, a promise for a value, or a rejection.  The fallback
 * accepts the operation name, a resolver, and any further arguments that would
 * have been forwarded to the appropriate method above had a method been
 * provided with the proper name.  The API makes no guarantees about the nature
 * of the returned object, apart from that it is usable whereever promises are
 * bought and sold.
 */
Q.makePromise = Promise;
function Promise(descriptor, fallback, inspect) {
    if (fallback === void 0) {
        fallback = function (op) {
            return reject(new Error(
                "Promise does not support operation: " + op
            ));
        };
    }
    if (inspect === void 0) {
        inspect = function () {
            return {state: "unknown"};
        };
    }

    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, args) {
        var result;
        try {
            if (descriptor[op]) {
                result = descriptor[op].apply(promise, args);
            } else {
                result = fallback.call(promise, op, args);
            }
        } catch (exception) {
            result = reject(exception);
        }
        if (resolve) {
            resolve(result);
        }
    };

    promise.inspect = inspect;

    // XXX deprecated `valueOf` and `exception` support
    if (inspect) {
        var inspected = inspect();
        if (inspected.state === "rejected") {
            promise.exception = inspected.reason;
        }

        promise.valueOf = function () {
            var inspected = inspect();
            if (inspected.state === "pending" ||
                inspected.state === "rejected") {
                return promise;
            }
            return inspected.value;
        };
    }

    return promise;
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.then = function (fulfilled, rejected, progressed) {
    var self = this;
    var deferred = defer();
    var done = false;   // ensure the untrusted promise makes at most a
                        // single call to one of the callbacks

    function _fulfilled(value) {
        try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
        } catch (exception) {
            return reject(exception);
        }
    }

    function _rejected(exception) {
        if (typeof rejected === "function") {
            makeStackTraceLong(exception, self);
            try {
                return rejected(exception);
            } catch (newException) {
                return reject(newException);
            }
        }
        return reject(exception);
    }

    function _progressed(value) {
        return typeof progressed === "function" ? progressed(value) : value;
    }

    Q.nextTick(function () {
        self.promiseDispatch(function (value) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_fulfilled(value));
        }, "when", [function (exception) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_rejected(exception));
        }]);
    });

    // Progress propagator need to be attached in the current tick.
    self.promiseDispatch(void 0, "when", [void 0, function (value) {
        var newValue;
        var threw = false;
        try {
            newValue = _progressed(value);
        } catch (e) {
            threw = true;
            if (Q.onerror) {
                Q.onerror(e);
            } else {
                throw e;
            }
        }

        if (!threw) {
            deferred.notify(newValue);
        }
    }]);

    return deferred.promise;
};

Q.tap = function (promise, callback) {
    return Q(promise).tap(callback);
};

/**
 * Works almost like "finally", but not called for rejections.
 * Original resolution value is passed through callback unaffected.
 * Callback may return a promise that will be awaited for.
 * @param {Function} callback
 * @returns {Q.Promise}
 * @example
 * doSomething()
 *   .then(...)
 *   .tap(console.log)
 *   .then(...);
 */
Promise.prototype.tap = function (callback) {
    callback = Q(callback);

    return this.then(function (value) {
        return callback.fcall(value).thenResolve(value);
    });
};

/**
 * Registers an observer on a promise.
 *
 * Guarantees:
 *
 * 1. that fulfilled and rejected will be called only once.
 * 2. that either the fulfilled callback or the rejected callback will be
 *    called, but not both.
 * 3. that fulfilled and rejected will not be called in this turn.
 *
 * @param value      promise or immediate reference to observe
 * @param fulfilled  function to be called with the fulfilled value
 * @param rejected   function to be called with the rejection exception
 * @param progressed function to be called on any progress notifications
 * @return promise for the return value from the invoked callback
 */
Q.when = when;
function when(value, fulfilled, rejected, progressed) {
    return Q(value).then(fulfilled, rejected, progressed);
}

Promise.prototype.thenResolve = function (value) {
    return this.then(function () { return value; });
};

Q.thenResolve = function (promise, value) {
    return Q(promise).thenResolve(value);
};

Promise.prototype.thenReject = function (reason) {
    return this.then(function () { throw reason; });
};

Q.thenReject = function (promise, reason) {
    return Q(promise).thenReject(reason);
};

/**
 * If an object is not a promise, it is as "near" as possible.
 * If a promise is rejected, it is as "near" as possible too.
 * If it’s a fulfilled promise, the fulfillment value is nearer.
 * If it’s a deferred promise and the deferred has been resolved, the
 * resolution is "nearer".
 * @param object
 * @returns most resolved (nearest) form of the object
 */

// XXX should we re-do this?
Q.nearer = nearer;
function nearer(value) {
    if (isPromise(value)) {
        var inspected = value.inspect();
        if (inspected.state === "fulfilled") {
            return inspected.value;
        }
    }
    return value;
}

/**
 * @returns whether the given object is a promise.
 * Otherwise it is a fulfilled value.
 */
Q.isPromise = isPromise;
function isPromise(object) {
    return object instanceof Promise;
}

Q.isPromiseAlike = isPromiseAlike;
function isPromiseAlike(object) {
    return isObject(object) && typeof object.then === "function";
}

/**
 * @returns whether the given object is a pending promise, meaning not
 * fulfilled or rejected.
 */
Q.isPending = isPending;
function isPending(object) {
    return isPromise(object) && object.inspect().state === "pending";
}

Promise.prototype.isPending = function () {
    return this.inspect().state === "pending";
};

/**
 * @returns whether the given object is a value or fulfilled
 * promise.
 */
Q.isFulfilled = isFulfilled;
function isFulfilled(object) {
    return !isPromise(object) || object.inspect().state === "fulfilled";
}

Promise.prototype.isFulfilled = function () {
    return this.inspect().state === "fulfilled";
};

/**
 * @returns whether the given object is a rejected promise.
 */
Q.isRejected = isRejected;
function isRejected(object) {
    return isPromise(object) && object.inspect().state === "rejected";
}

Promise.prototype.isRejected = function () {
    return this.inspect().state === "rejected";
};

//// BEGIN UNHANDLED REJECTION TRACKING

// This promise library consumes exceptions thrown in handlers so they can be
// handled by a subsequent promise.  The exceptions get added to this array when
// they are created, and removed when they are handled.  Note that in ES6 or
// shimmed environments, this would naturally be a `Set`.
var unhandledReasons = [];
var unhandledRejections = [];
var reportedUnhandledRejections = [];
var trackUnhandledRejections = true;

function resetUnhandledRejections() {
    unhandledReasons.length = 0;
    unhandledRejections.length = 0;

    if (!trackUnhandledRejections) {
        trackUnhandledRejections = true;
    }
}

function trackRejection(promise, reason) {
    if (!trackUnhandledRejections) {
        return;
    }
    if (typeof process === "object" && typeof process.emit === "function") {
        Q.nextTick.runAfter(function () {
            if (array_indexOf(unhandledRejections, promise) !== -1) {
                process.emit("unhandledRejection", reason, promise);
                reportedUnhandledRejections.push(promise);
            }
        });
    }

    unhandledRejections.push(promise);
    if (reason && typeof reason.stack !== "undefined") {
        unhandledReasons.push(reason.stack);
    } else {
        unhandledReasons.push("(no stack) " + reason);
    }
}

function untrackRejection(promise) {
    if (!trackUnhandledRejections) {
        return;
    }

    var at = array_indexOf(unhandledRejections, promise);
    if (at !== -1) {
        if (typeof process === "object" && typeof process.emit === "function") {
            Q.nextTick.runAfter(function () {
                var atReport = array_indexOf(reportedUnhandledRejections, promise);
                if (atReport !== -1) {
                    process.emit("rejectionHandled", unhandledReasons[at], promise);
                    reportedUnhandledRejections.splice(atReport, 1);
                }
            });
        }
        unhandledRejections.splice(at, 1);
        unhandledReasons.splice(at, 1);
    }
}

Q.resetUnhandledRejections = resetUnhandledRejections;

Q.getUnhandledReasons = function () {
    // Make a copy so that consumers can't interfere with our internal state.
    return unhandledReasons.slice();
};

Q.stopUnhandledRejectionTracking = function () {
    resetUnhandledRejections();
    trackUnhandledRejections = false;
};

resetUnhandledRejections();

//// END UNHANDLED REJECTION TRACKING

/**
 * Constructs a rejected promise.
 * @param reason value describing the failure
 */
Q.reject = reject;
function reject(reason) {
    var rejection = Promise({
        "when": function (rejected) {
            // note that the error has been handled
            if (rejected) {
                untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
        }
    }, function fallback() {
        return this;
    }, function inspect() {
        return { state: "rejected", reason: reason };
    });

    // Note that the reason has not been handled.
    trackRejection(rejection, reason);

    return rejection;
}

/**
 * Constructs a fulfilled promise for an immediate reference.
 * @param value immediate reference
 */
Q.fulfill = fulfill;
function fulfill(value) {
    return Promise({
        "when": function () {
            return value;
        },
        "get": function (name) {
            return value[name];
        },
        "set": function (name, rhs) {
            value[name] = rhs;
        },
        "delete": function (name) {
            delete value[name];
        },
        "post": function (name, args) {
            // Mark Miller proposes that post with no name should apply a
            // promised function.
            if (name === null || name === void 0) {
                return value.apply(void 0, args);
            } else {
                return value[name].apply(value, args);
            }
        },
        "apply": function (thisp, args) {
            return value.apply(thisp, args);
        },
        "keys": function () {
            return object_keys(value);
        }
    }, void 0, function inspect() {
        return { state: "fulfilled", value: value };
    });
}

/**
 * Converts thenables to Q promises.
 * @param promise thenable promise
 * @returns a Q promise
 */
function coerce(promise) {
    var deferred = defer();
    Q.nextTick(function () {
        try {
            promise.then(deferred.resolve, deferred.reject, deferred.notify);
        } catch (exception) {
            deferred.reject(exception);
        }
    });
    return deferred.promise;
}

/**
 * Annotates an object such that it will never be
 * transferred away from this process over any promise
 * communication channel.
 * @param object
 * @returns promise a wrapping of that object that
 * additionally responds to the "isDef" message
 * without a rejection.
 */
Q.master = master;
function master(object) {
    return Promise({
        "isDef": function () {}
    }, function fallback(op, args) {
        return dispatch(object, op, args);
    }, function () {
        return Q(object).inspect();
    });
}

/**
 * Spreads the values of a promised array of arguments into the
 * fulfillment callback.
 * @param fulfilled callback that receives variadic arguments from the
 * promised array
 * @param rejected callback that receives the exception if the promise
 * is rejected.
 * @returns a promise for the return value or thrown exception of
 * either callback.
 */
Q.spread = spread;
function spread(value, fulfilled, rejected) {
    return Q(value).spread(fulfilled, rejected);
}

Promise.prototype.spread = function (fulfilled, rejected) {
    return this.all().then(function (array) {
        return fulfilled.apply(void 0, array);
    }, rejected);
};

/**
 * The async function is a decorator for generator functions, turning
 * them into asynchronous generators.  Although generators are only part
 * of the newest ECMAScript 6 drafts, this code does not cause syntax
 * errors in older engines.  This code should continue to work and will
 * in fact improve over time as the language improves.
 *
 * ES6 generators are currently part of V8 version 3.19 with the
 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
 * for longer, but under an older Python-inspired form.  This function
 * works on both kinds of generators.
 *
 * Decorates a generator function such that:
 *  - it may yield promises
 *  - execution will continue when that promise is fulfilled
 *  - the value of the yield expression will be the fulfilled value
 *  - it returns a promise for the return value (when the generator
 *    stops iterating)
 *  - the decorated function returns a promise for the return value
 *    of the generator or the first rejected promise among those
 *    yielded.
 *  - if an error is thrown in the generator, it propagates through
 *    every following yield until it is caught, or until it escapes
 *    the generator function altogether, and is translated into a
 *    rejection for the promise returned by the decorated generator.
 */
Q.async = async;
function async(makeGenerator) {
    return function () {
        // when verb is "send", arg is a value
        // when verb is "throw", arg is an exception
        function continuer(verb, arg) {
            var result;

            // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
            // engine that has a deployed base of browsers that support generators.
            // However, SM's generators use the Python-inspired semantics of
            // outdated ES6 drafts.  We would like to support ES6, but we'd also
            // like to make it possible to use generators in deployed browsers, so
            // we also support Python-style generators.  At some point we can remove
            // this block.

            if (typeof StopIteration === "undefined") {
                // ES6 Generators
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    return reject(exception);
                }
                if (result.done) {
                    return Q(result.value);
                } else {
                    return when(result.value, callback, errback);
                }
            } else {
                // SpiderMonkey Generators
                // FIXME: Remove this case when SM does ES6 generators.
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    if (isStopIteration(exception)) {
                        return Q(exception.value);
                    } else {
                        return reject(exception);
                    }
                }
                return when(result, callback, errback);
            }
        }
        var generator = makeGenerator.apply(this, arguments);
        var callback = continuer.bind(continuer, "next");
        var errback = continuer.bind(continuer, "throw");
        return callback();
    };
}

/**
 * The spawn function is a small wrapper around async that immediately
 * calls the generator and also ends the promise chain, so that any
 * unhandled errors are thrown instead of forwarded to the error
 * handler. This is useful because it's extremely common to run
 * generators at the top-level to work with libraries.
 */
Q.spawn = spawn;
function spawn(makeGenerator) {
    Q.done(Q.async(makeGenerator)());
}

// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
/**
 * Throws a ReturnValue exception to stop an asynchronous generator.
 *
 * This interface is a stop-gap measure to support generator return
 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
 * generators like Chromium 29, just use "return" in your generator
 * functions.
 *
 * @param value the return value for the surrounding generator
 * @throws ReturnValue exception with the value.
 * @example
 * // ES6 style
 * Q.async(function* () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      return foo + bar;
 * })
 * // Older SpiderMonkey style
 * Q.async(function () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      Q.return(foo + bar);
 * })
 */
Q["return"] = _return;
function _return(value) {
    throw new QReturnValue(value);
}

/**
 * The promised function decorator ensures that any promise arguments
 * are settled and passed as values (`this` is also settled and passed
 * as a value).  It will also ensure that the result of a function is
 * always a promise.
 *
 * @example
 * var add = Q.promised(function (a, b) {
 *     return a + b;
 * });
 * add(Q(a), Q(B));
 *
 * @param {function} callback The function to decorate
 * @returns {function} a function that has been decorated.
 */
Q.promised = promised;
function promised(callback) {
    return function () {
        return spread([this, all(arguments)], function (self, args) {
            return callback.apply(self, args);
        });
    };
}

/**
 * sends a message to a value in a future turn
 * @param object* the recipient
 * @param op the name of the message operation, e.g., "when",
 * @param args further arguments to be forwarded to the operation
 * @returns result {Promise} a promise for the result of the operation
 */
Q.dispatch = dispatch;
function dispatch(object, op, args) {
    return Q(object).dispatch(op, args);
}

Promise.prototype.dispatch = function (op, args) {
    var self = this;
    var deferred = defer();
    Q.nextTick(function () {
        self.promiseDispatch(deferred.resolve, op, args);
    });
    return deferred.promise;
};

/**
 * Gets the value of a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to get
 * @return promise for the property value
 */
Q.get = function (object, key) {
    return Q(object).dispatch("get", [key]);
};

Promise.prototype.get = function (key) {
    return this.dispatch("get", [key]);
};

/**
 * Sets the value of a property in a future turn.
 * @param object    promise or immediate reference for object object
 * @param name      name of property to set
 * @param value     new value of property
 * @return promise for the return value
 */
Q.set = function (object, key, value) {
    return Q(object).dispatch("set", [key, value]);
};

Promise.prototype.set = function (key, value) {
    return this.dispatch("set", [key, value]);
};

/**
 * Deletes a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to delete
 * @return promise for the return value
 */
Q.del = // XXX legacy
Q["delete"] = function (object, key) {
    return Q(object).dispatch("delete", [key]);
};

Promise.prototype.del = // XXX legacy
Promise.prototype["delete"] = function (key) {
    return this.dispatch("delete", [key]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param value     a value to post, typically an array of
 *                  invocation arguments for promises that
 *                  are ultimately backed with `resolve` values,
 *                  as opposed to those backed with URLs
 *                  wherein the posted value can be any
 *                  JSON serializable object.
 * @return promise for the return value
 */
// bound locally because it is used by other methods
Q.mapply = // XXX As proposed by "Redsandro"
Q.post = function (object, name, args) {
    return Q(object).dispatch("post", [name, args]);
};

Promise.prototype.mapply = // XXX As proposed by "Redsandro"
Promise.prototype.post = function (name, args) {
    return this.dispatch("post", [name, args]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param ...args   array of invocation arguments
 * @return promise for the return value
 */
Q.send = // XXX Mark Miller's proposed parlance
Q.mcall = // XXX As proposed by "Redsandro"
Q.invoke = function (object, name /*...args*/) {
    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
};

Promise.prototype.send = // XXX Mark Miller's proposed parlance
Promise.prototype.mcall = // XXX As proposed by "Redsandro"
Promise.prototype.invoke = function (name /*...args*/) {
    return this.dispatch("post", [name, array_slice(arguments, 1)]);
};

/**
 * Applies the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param args      array of application arguments
 */
Q.fapply = function (object, args) {
    return Q(object).dispatch("apply", [void 0, args]);
};

Promise.prototype.fapply = function (args) {
    return this.dispatch("apply", [void 0, args]);
};

/**
 * Calls the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q["try"] =
Q.fcall = function (object /* ...args*/) {
    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
};

Promise.prototype.fcall = function (/*...args*/) {
    return this.dispatch("apply", [void 0, array_slice(arguments)]);
};

/**
 * Binds the promised function, transforming return values into a fulfilled
 * promise and thrown errors into a rejected one.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q.fbind = function (object /*...args*/) {
    var promise = Q(object);
    var args = array_slice(arguments, 1);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};
Promise.prototype.fbind = function (/*...args*/) {
    var promise = this;
    var args = array_slice(arguments);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};

/**
 * Requests the names of the owned properties of a promised
 * object in a future turn.
 * @param object    promise or immediate reference for target object
 * @return promise for the keys of the eventually settled object
 */
Q.keys = function (object) {
    return Q(object).dispatch("keys", []);
};

Promise.prototype.keys = function () {
    return this.dispatch("keys", []);
};

/**
 * Turns an array of promises into a promise for an array.  If any of
 * the promises gets rejected, the whole array is rejected immediately.
 * @param {Array*} an array (or promise for an array) of values (or
 * promises for values)
 * @returns a promise for an array of the corresponding values
 */
// By Mark Miller
// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
Q.all = all;
function all(promises) {
    return when(promises, function (promises) {
        var pendingCount = 0;
        var deferred = defer();
        array_reduce(promises, function (undefined, promise, index) {
            var snapshot;
            if (
                isPromise(promise) &&
                (snapshot = promise.inspect()).state === "fulfilled"
            ) {
                promises[index] = snapshot.value;
            } else {
                ++pendingCount;
                when(
                    promise,
                    function (value) {
                        promises[index] = value;
                        if (--pendingCount === 0) {
                            deferred.resolve(promises);
                        }
                    },
                    deferred.reject,
                    function (progress) {
                        deferred.notify({ index: index, value: progress });
                    }
                );
            }
        }, void 0);
        if (pendingCount === 0) {
            deferred.resolve(promises);
        }
        return deferred.promise;
    });
}

Promise.prototype.all = function () {
    return all(this);
};

/**
 * Returns the first resolved promise of an array. Prior rejected promises are
 * ignored.  Rejects only if all promises are rejected.
 * @param {Array*} an array containing values or promises for values
 * @returns a promise fulfilled with the value of the first resolved promise,
 * or a rejected promise if all promises are rejected.
 */
Q.any = any;

function any(promises) {
    if (promises.length === 0) {
        return Q.resolve();
    }

    var deferred = Q.defer();
    var pendingCount = 0;
    array_reduce(promises, function (prev, current, index) {
        var promise = promises[index];

        pendingCount++;

        when(promise, onFulfilled, onRejected, onProgress);
        function onFulfilled(result) {
            deferred.resolve(result);
        }
        function onRejected(err) {
            pendingCount--;
            if (pendingCount === 0) {
                var rejection = err || new Error("" + err);

                rejection.message = ("Q can't get fulfillment value from any promise, all " +
                    "promises were rejected. Last error message: " + rejection.message);

                deferred.reject(rejection);
            }
        }
        function onProgress(progress) {
            deferred.notify({
                index: index,
                value: progress
            });
        }
    }, undefined);

    return deferred.promise;
}

Promise.prototype.any = function () {
    return any(this);
};

/**
 * Waits for all promises to be settled, either fulfilled or
 * rejected.  This is distinct from `all` since that would stop
 * waiting at the first rejection.  The promise returned by
 * `allResolved` will never be rejected.
 * @param promises a promise for an array (or an array) of promises
 * (or values)
 * @return a promise for an array of promises
 */
Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
function allResolved(promises) {
    return when(promises, function (promises) {
        promises = array_map(promises, Q);
        return when(all(array_map(promises, function (promise) {
            return when(promise, noop, noop);
        })), function () {
            return promises;
        });
    });
}

Promise.prototype.allResolved = function () {
    return allResolved(this);
};

/**
 * @see Promise#allSettled
 */
Q.allSettled = allSettled;
function allSettled(promises) {
    return Q(promises).allSettled();
}

/**
 * Turns an array of promises into a promise for an array of their states (as
 * returned by `inspect`) when they have all settled.
 * @param {Array[Any*]} values an array (or promise for an array) of values (or
 * promises for values)
 * @returns {Array[State]} an array of states for the respective values.
 */
Promise.prototype.allSettled = function () {
    return this.then(function (promises) {
        return all(array_map(promises, function (promise) {
            promise = Q(promise);
            function regardless() {
                return promise.inspect();
            }
            return promise.then(regardless, regardless);
        }));
    });
};

/**
 * Captures the failure of a promise, giving an oportunity to recover
 * with a callback.  If the given promise is fulfilled, the returned
 * promise is fulfilled.
 * @param {Any*} promise for something
 * @param {Function} callback to fulfill the returned promise if the
 * given promise is rejected
 * @returns a promise for the return value of the callback
 */
Q.fail = // XXX legacy
Q["catch"] = function (object, rejected) {
    return Q(object).then(void 0, rejected);
};

Promise.prototype.fail = // XXX legacy
Promise.prototype["catch"] = function (rejected) {
    return this.then(void 0, rejected);
};

/**
 * Attaches a listener that can respond to progress notifications from a
 * promise's originating deferred. This listener receives the exact arguments
 * passed to ``deferred.notify``.
 * @param {Any*} promise for something
 * @param {Function} callback to receive any progress notifications
 * @returns the given promise, unchanged
 */
Q.progress = progress;
function progress(object, progressed) {
    return Q(object).then(void 0, void 0, progressed);
}

Promise.prototype.progress = function (progressed) {
    return this.then(void 0, void 0, progressed);
};

/**
 * Provides an opportunity to observe the settling of a promise,
 * regardless of whether the promise is fulfilled or rejected.  Forwards
 * the resolution to the returned promise when the callback is done.
 * The callback can return a promise to defer completion.
 * @param {Any*} promise
 * @param {Function} callback to observe the resolution of the given
 * promise, takes no arguments.
 * @returns a promise for the resolution of the given promise when
 * ``fin`` is done.
 */
Q.fin = // XXX legacy
Q["finally"] = function (object, callback) {
    return Q(object)["finally"](callback);
};

Promise.prototype.fin = // XXX legacy
Promise.prototype["finally"] = function (callback) {
    if (!callback || typeof callback.apply !== "function") {
        throw new Error("Q can't apply finally callback");
    }
    callback = Q(callback);
    return this.then(function (value) {
        return callback.fcall().then(function () {
            return value;
        });
    }, function (reason) {
        // TODO attempt to recycle the rejection with "this".
        return callback.fcall().then(function () {
            throw reason;
        });
    });
};

/**
 * Terminates a chain of promises, forcing rejections to be
 * thrown as exceptions.
 * @param {Any*} promise at the end of a chain of promises
 * @returns nothing
 */
Q.done = function (object, fulfilled, rejected, progress) {
    return Q(object).done(fulfilled, rejected, progress);
};

Promise.prototype.done = function (fulfilled, rejected, progress) {
    var onUnhandledError = function (error) {
        // forward to a future turn so that ``when``
        // does not catch it and turn it into a rejection.
        Q.nextTick(function () {
            makeStackTraceLong(error, promise);
            if (Q.onerror) {
                Q.onerror(error);
            } else {
                throw error;
            }
        });
    };

    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
    var promise = fulfilled || rejected || progress ?
        this.then(fulfilled, rejected, progress) :
        this;

    if (typeof process === "object" && process && process.domain) {
        onUnhandledError = process.domain.bind(onUnhandledError);
    }

    promise.then(void 0, onUnhandledError);
};

/**
 * Causes a promise to be rejected if it does not get fulfilled before
 * some milliseconds time out.
 * @param {Any*} promise
 * @param {Number} milliseconds timeout
 * @param {Any*} custom error message or Error object (optional)
 * @returns a promise for the resolution of the given promise if it is
 * fulfilled before the timeout, otherwise rejected.
 */
Q.timeout = function (object, ms, error) {
    return Q(object).timeout(ms, error);
};

Promise.prototype.timeout = function (ms, error) {
    var deferred = defer();
    var timeoutId = setTimeout(function () {
        if (!error || "string" === typeof error) {
            error = new Error(error || "Timed out after " + ms + " ms");
            error.code = "ETIMEDOUT";
        }
        deferred.reject(error);
    }, ms);

    this.then(function (value) {
        clearTimeout(timeoutId);
        deferred.resolve(value);
    }, function (exception) {
        clearTimeout(timeoutId);
        deferred.reject(exception);
    }, deferred.notify);

    return deferred.promise;
};

/**
 * Returns a promise for the given value (or promised value), some
 * milliseconds after it resolved. Passes rejections immediately.
 * @param {Any*} promise
 * @param {Number} milliseconds
 * @returns a promise for the resolution of the given promise after milliseconds
 * time has elapsed since the resolution of the given promise.
 * If the given promise rejects, that is passed immediately.
 */
Q.delay = function (object, timeout) {
    if (timeout === void 0) {
        timeout = object;
        object = void 0;
    }
    return Q(object).delay(timeout);
};

Promise.prototype.delay = function (timeout) {
    return this.then(function (value) {
        var deferred = defer();
        setTimeout(function () {
            deferred.resolve(value);
        }, timeout);
        return deferred.promise;
    });
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided as an array, and returns a promise.
 *
 *      Q.nfapply(FS.readFile, [__filename])
 *      .then(function (content) {
 *      })
 *
 */
Q.nfapply = function (callback, args) {
    return Q(callback).nfapply(args);
};

Promise.prototype.nfapply = function (args) {
    var deferred = defer();
    var nodeArgs = array_slice(args);
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided individually, and returns a promise.
 * @example
 * Q.nfcall(FS.readFile, __filename)
 * .then(function (content) {
 * })
 *
 */
Q.nfcall = function (callback /*...args*/) {
    var args = array_slice(arguments, 1);
    return Q(callback).nfapply(args);
};

Promise.prototype.nfcall = function (/*...args*/) {
    var nodeArgs = array_slice(arguments);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Wraps a NodeJS continuation passing function and returns an equivalent
 * version that returns a promise.
 * @example
 * Q.nfbind(FS.readFile, __filename)("utf-8")
 * .then(console.log)
 * .done()
 */
Q.nfbind =
Q.denodeify = function (callback /*...args*/) {
    if (callback === undefined) {
        throw new Error("Q can't wrap an undefined function");
    }
    var baseArgs = array_slice(arguments, 1);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(callback).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nfbind =
Promise.prototype.denodeify = function (/*...args*/) {
    var args = array_slice(arguments);
    args.unshift(this);
    return Q.denodeify.apply(void 0, args);
};

Q.nbind = function (callback, thisp /*...args*/) {
    var baseArgs = array_slice(arguments, 2);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        function bound() {
            return callback.apply(thisp, arguments);
        }
        Q(bound).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nbind = function (/*thisp, ...args*/) {
    var args = array_slice(arguments, 0);
    args.unshift(this);
    return Q.nbind.apply(void 0, args);
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback with a given array of arguments, plus a provided callback.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param {Array} args arguments to pass to the method; the callback
 * will be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nmapply = // XXX As proposed by "Redsandro"
Q.npost = function (object, name, args) {
    return Q(object).npost(name, args);
};

Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
Promise.prototype.npost = function (name, args) {
    var nodeArgs = array_slice(args || []);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback, forwarding the given variadic arguments, plus a provided
 * callback argument.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param ...args arguments to pass to the method; the callback will
 * be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nsend = // XXX Based on Mark Miller's proposed "send"
Q.nmcall = // XXX Based on "Redsandro's" proposal
Q.ninvoke = function (object, name /*...args*/) {
    var nodeArgs = array_slice(arguments, 2);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
Promise.prototype.ninvoke = function (name /*...args*/) {
    var nodeArgs = array_slice(arguments, 1);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * If a function would like to support both Node continuation-passing-style and
 * promise-returning-style, it can end its internal promise chain with
 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
 * elects to use a nodeback, the result will be sent there.  If they do not
 * pass a nodeback, they will receive the result promise.
 * @param object a result (or a promise for a result)
 * @param {Function} nodeback a Node.js-style callback
 * @returns either the promise or nothing
 */
Q.nodeify = nodeify;
function nodeify(object, nodeback) {
    return Q(object).nodeify(nodeback);
}

Promise.prototype.nodeify = function (nodeback) {
    if (nodeback) {
        this.then(function (value) {
            Q.nextTick(function () {
                nodeback(null, value);
            });
        }, function (error) {
            Q.nextTick(function () {
                nodeback(error);
            });
        });
    } else {
        return this;
    }
};

Q.noConflict = function() {
    throw new Error("Q.noConflict only works when Q is used as a global");
};

// All code before this point will be filtered from stack traces.
var qEndingLine = captureLine();

return Q;

});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/data/chart_data.json":
/*!**********************************!*\
  !*** ./src/data/chart_data.json ***!
  \**********************************/
/*! exports provided: 0, 1, 2, 3, 4, default */
/***/ (function(module) {

module.exports = [{"columns":[["x",1542412800000,1542499200000,1542585600000,1542672000000,1542758400000,1542844800000,1542931200000,1543017600000,1543104000000,1543190400000,1543276800000,1543363200000,1543449600000,1543536000000,1543622400000,1543708800000,1543795200000,1543881600000,1543968000000,1544054400000,1544140800000,1544227200000,1544313600000,1544400000000,1544486400000,1544572800000,1544659200000,1544745600000,1544832000000,1544918400000,1545004800000,1545091200000,1545177600000,1545264000000,1545350400000,1545436800000,1545523200000,1545609600000,1545696000000,1545782400000,1545868800000,1545955200000,1546041600000,1546128000000,1546214400000,1546300800000,1546387200000,1546473600000,1546560000000,1546646400000,1546732800000,1546819200000,1546905600000,1546992000000,1547078400000,1547164800000,1547251200000,1547337600000,1547424000000,1547510400000,1547596800000,1547683200000,1547769600000,1547856000000,1547942400000,1548028800000,1548115200000,1548201600000,1548288000000,1548374400000,1548460800000,1548547200000,1548633600000,1548720000000,1548806400000,1548892800000,1548979200000,1549065600000,1549152000000,1549238400000,1549324800000,1549411200000,1549497600000,1549584000000,1549670400000,1549756800000,1549843200000,1549929600000,1550016000000,1550102400000,1550188800000,1550275200000,1550361600000,1550448000000,1550534400000,1550620800000,1550707200000,1550793600000,1550880000000,1550966400000,1551052800000,1551139200000,1551225600000,1551312000000,1551398400000,1551484800000,1551571200000,1551657600000,1551744000000,1551830400000,1551916800000,1552003200000],["y0",37,20,32,39,32,35,19,65,36,62,113,69,120,60,51,49,71,122,149,69,57,21,33,55,92,62,47,50,56,116,63,60,55,65,76,33,45,64,54,81,180,123,106,37,60,70,46,68,46,51,33,57,75,70,95,70,50,68,63,66,53,38,52,109,121,53,36,71,96,55,58,29,31,55,52,44,126,191,73,87,255,278,219,170,129,125,126,84,65,53,154,57,71,64,75,72,39,47,52,73,89,156,86,105,88,45,33,56,142,124,114,64],["y1",22,12,30,40,33,23,18,41,45,69,57,61,70,47,31,34,40,55,27,57,48,32,40,49,54,49,34,51,51,51,66,51,94,60,64,28,44,96,49,73,30,88,63,42,56,67,52,67,35,61,40,55,63,61,105,59,51,76,63,57,47,56,51,98,103,62,54,104,48,41,41,37,30,28,26,37,65,86,70,81,54,74,70,50,74,79,85,62,36,46,68,43,66,50,28,66,39,23,63,74,83,66,40,60,29,36,27,54,89,50,73,52]],"types":{"y0":"line","y1":"line","x":"x"},"names":{"y0":"#0","y1":"#1"},"colors":{"y0":"#3DC23F","y1":"#F34C44"}},{"columns":[["x",1542412800000,1542499200000,1542585600000,1542672000000,1542758400000,1542844800000,1542931200000,1543017600000,1543104000000,1543190400000,1543276800000,1543363200000,1543449600000,1543536000000,1543622400000,1543708800000,1543795200000,1543881600000,1543968000000,1544054400000,1544140800000,1544227200000,1544313600000,1544400000000,1544486400000,1544572800000,1544659200000,1544745600000,1544832000000,1544918400000,1545004800000,1545091200000,1545177600000,1545264000000,1545350400000,1545436800000,1545523200000,1545609600000,1545696000000,1545782400000,1545868800000,1545955200000,1546041600000,1546128000000,1546214400000,1546300800000,1546387200000,1546473600000,1546560000000,1546646400000,1546732800000,1546819200000,1546905600000,1546992000000,1547078400000,1547164800000,1547251200000,1547337600000,1547424000000,1547510400000,1547596800000,1547683200000,1547769600000,1547856000000,1547942400000,1548028800000,1548115200000,1548201600000,1548288000000,1548374400000,1548460800000,1548547200000,1548633600000,1548720000000,1548806400000,1548892800000,1548979200000,1549065600000,1549152000000,1549238400000,1549324800000,1549411200000,1549497600000,1549584000000,1549670400000,1549756800000,1549843200000,1549929600000,1550016000000,1550102400000,1550188800000,1550275200000,1550361600000,1550448000000,1550534400000,1550620800000,1550707200000,1550793600000,1550880000000,1550966400000,1551052800000,1551139200000,1551225600000,1551312000000,1551398400000,1551484800000,1551571200000,1551657600000,1551744000000,1551830400000,1551916800000,1552003200000],["y0",6706,7579,7798,8307,7866,7736,7816,7630,7536,7105,7178,7619,7917,7483,5772,5700,5435,4837,4716,4890,4753,4820,4538,12162,39444,25765,18012,14421,13249,11310,10377,9399,8917,8259,7902,9442,47596,36160,23866,18500,15488,13722,12270,13413,10574,7092,7159,7880,8821,8306,7780,7963,7837,7611,7334,7413,7015,6742,6557,6593,6680,6725,6345,5988,6365,9911,28833,19694,14873,11911,10498,9708,8893,8365,7960,7694,45529,42858,31508,23289,19147,15874,14551,13124,11778,10809,10522,9918,9436,8617,8765,8194,8035,7865,7573,7422,7047,7147,6861,6669,6363,12073,32381,21390,15311,12819,11655,10696,9678,9143,8296,7852],["y1",3522,4088,4146,4477,4202,4157,4177,4203,4223,3948,3946,3898,3979,4052,3279,3229,3302,3040,3054,2982,3077,2965,2973,5148,22485,13077,9055,7446,6824,5995,5787,5367,4997,4689,4630,4785,22365,15244,10626,8666,7681,6929,6219,6367,5402,4932,4844,5146,5265,4887,4714,4722,4718,4693,4746,4819,4455,4419,4323,4407,4277,11589,6100,5076,4769,8929,14002,9756,7520,6343,5633,5415,5052,4850,4624,4480,14102,24005,14263,10845,9028,7755,7197,7001,6737,6254,6150,5922,5603,5048,5423,5003,5035,4747,4814,4661,4462,4516,4221,4111,4053,12515,15781,10499,8175,6831,6287,5990,5590,5148,4760,4809]],"types":{"y0":"line","y1":"line","x":"x"},"names":{"y0":"#0","y1":"#1"},"colors":{"y0":"#3DC23F","y1":"#F34C44"}},{"columns":[["x",1542412800000,1542499200000,1542585600000,1542672000000,1542758400000,1542844800000,1542931200000,1543017600000,1543104000000,1543190400000,1543276800000,1543363200000,1543449600000,1543536000000,1543622400000,1543708800000,1543795200000,1543881600000,1543968000000,1544054400000,1544140800000,1544227200000,1544313600000,1544400000000,1544486400000,1544572800000,1544659200000,1544745600000,1544832000000,1544918400000,1545004800000,1545091200000,1545177600000,1545264000000,1545350400000,1545436800000,1545523200000,1545609600000,1545696000000,1545782400000,1545868800000,1545955200000,1546041600000,1546128000000,1546214400000,1546300800000,1546387200000,1546473600000,1546560000000,1546646400000,1546732800000,1546819200000,1546905600000,1546992000000,1547078400000,1547164800000,1547251200000,1547337600000,1547424000000,1547510400000,1547596800000,1547683200000,1547769600000,1547856000000,1547942400000,1548028800000,1548115200000,1548201600000,1548288000000,1548374400000,1548460800000,1548547200000,1548633600000,1548720000000,1548806400000,1548892800000,1548979200000,1549065600000,1549152000000,1549238400000,1549324800000,1549411200000,1549497600000,1549584000000,1549670400000,1549756800000,1549843200000,1549929600000,1550016000000,1550102400000,1550188800000,1550275200000,1550361600000,1550448000000,1550534400000,1550620800000,1550707200000,1550793600000,1550880000000,1550966400000,1551052800000,1551139200000,1551225600000,1551312000000,1551398400000,1551484800000,1551571200000,1551657600000,1551744000000,1551830400000,1551916800000,1552003200000],["y0",4747,4849,5045,5184,5746,5400,5424,5576,6436,5337,4840,5379,4678,4736,5074,4897,4349,5089,4543,5033,5047,4871,4812,4723,4545,4723,4721,4384,4277,4682,4805,4001,4610,5241,5113,4059,4529,4673,5291,5154,5123,5535,5540,5161,5666,5584,6999,6854,5083,5361,5863,5792,5586,6106,5481,5532,5853,5809,6244,6156,5596,5426,5422,5413,4795,5113,5279,5530,4939,4983,4984,5527,5765,5001,5818,6061,5956,5288,5837,5703,5440,5238,5957,6432,6389,6064,7065,5981,5779,6567,6320,5634,6023,5702,6066,5797,6163,6182,4906,5637,7073,6679,5831,6015,6266,6128,6156,6218,6050,6140,5877,7147],["y1",4605,5036,4956,5168,5008,5069,5223,5360,5695,5209,4796,5028,4931,5123,4987,4964,4982,5037,5050,5144,5049,4971,4911,4792,4562,4597,4759,4761,4646,4543,4597,4428,4213,4270,3961,4784,4699,4711,4855,4717,4563,4923,5041,4895,4877,5001,5410,5033,5045,5184,4976,5207,5354,5205,4887,4831,5083,5148,5369,5176,5022,4880,4969,5135,4836,4764,4782,4783,4646,4755,4744,4932,5059,4851,4614,4718,5018,5034,5223,5007,4839,4763,4761,5048,5330,5106,5956,5135,5006,4919,5511,5114,5122,5314,5089,5022,4918,4986,4626,4675,4951,4921,5173,5145,5209,4967,5030,5120,5030,4946,4795,5224]],"types":{"y0":"line","y1":"line","x":"x"},"names":{"y0":"#0","y1":"#1"},"colors":{"y0":"#3DC23F","y1":"#F34C44"}},{"columns":[["x",1542412800000,1542499200000,1542585600000,1542672000000,1542758400000,1542844800000,1542931200000,1543017600000,1543104000000,1543190400000,1543276800000,1543363200000,1543449600000,1543536000000,1543622400000,1543708800000,1543795200000,1543881600000,1543968000000,1544054400000,1544140800000,1544227200000,1544313600000,1544400000000,1544486400000,1544572800000,1544659200000,1544745600000,1544832000000,1544918400000,1545004800000,1545091200000,1545177600000,1545264000000,1545350400000,1545436800000,1545523200000,1545609600000,1545696000000,1545782400000,1545868800000,1545955200000,1546041600000,1546128000000,1546214400000,1546300800000,1546387200000,1546473600000,1546560000000,1546646400000,1546732800000,1546819200000,1546905600000,1546992000000,1547078400000,1547164800000,1547251200000,1547337600000,1547424000000,1547510400000,1547596800000,1547683200000,1547769600000,1547856000000,1547942400000,1548028800000,1548115200000,1548201600000,1548288000000,1548374400000,1548460800000,1548547200000,1548633600000,1548720000000,1548806400000,1548892800000,1548979200000,1549065600000,1549152000000,1549238400000,1549324800000,1549411200000,1549497600000,1549584000000,1549670400000,1549756800000,1549843200000,1549929600000,1550016000000,1550102400000,1550188800000,1550275200000,1550361600000,1550448000000,1550534400000,1550620800000,1550707200000,1550793600000,1550880000000,1550966400000,1551052800000,1551139200000,1551225600000,1551312000000,1551398400000,1551484800000,1551571200000,1551657600000,1551744000000,1551830400000,1551916800000,1552003200000],["y0",41,31,62,65,66,79,52,26,42,68,71,86,65,54,33,70,52,68,75,92,69,28,33,84,65,56,42,44,26,34,45,49,83,83,66,31,43,55,57,55,54,45,51,64,27,19,38,38,44,49,42,50,60,73,86,65,51,54,48,61,82,83,53,52,48,64,96,103,68,73,58,42,81,80,76,106,93,65,69,104,75,79,92,73,49,63,76,79,83,70,55,47,42,111,93,74,99,107,52,65,80,82,74,154,106,39,40,77,85,66,52,25],["y1",19,10,36,41,28,39,24,16,14,40,39,37,47,28,16,32,25,29,36,45,38,11,25,37,35,22,25,30,16,20,32,34,37,26,31,10,19,32,34,23,25,22,21,18,11,18,18,23,11,18,22,19,27,27,30,25,27,23,28,30,23,31,27,16,30,21,36,33,25,34,16,24,37,33,26,24,31,21,37,32,35,31,30,27,15,17,38,40,32,34,30,17,21,28,36,30,24,25,20,24,22,42,34,47,40,29,29,31,39,30,29,18]],"types":{"y0":"line","y1":"line","x":"x"},"names":{"y0":"#0","y1":"#1"},"colors":{"y0":"#3DC23F","y1":"#F34C44"}},{"columns":[["x",1520035200000,1520121600000,1520208000000,1520294400000,1520380800000,1520467200000,1520553600000,1520640000000,1520726400000,1520812800000,1520899200000,1520985600000,1521072000000,1521158400000,1521244800000,1521331200000,1521417600000,1521504000000,1521590400000,1521676800000,1521763200000,1521849600000,1521936000000,1522022400000,1522108800000,1522195200000,1522281600000,1522368000000,1522454400000,1522540800000,1522627200000,1522713600000,1522800000000,1522886400000,1522972800000,1523059200000,1523145600000,1523232000000,1523318400000,1523404800000,1523491200000,1523577600000,1523664000000,1523750400000,1523836800000,1523923200000,1524009600000,1524096000000,1524182400000,1524268800000,1524355200000,1524441600000,1524528000000,1524614400000,1524700800000,1524787200000,1524873600000,1524960000000,1525046400000,1525132800000,1525219200000,1525305600000,1525392000000,1525478400000,1525564800000,1525651200000,1525737600000,1525824000000,1525910400000,1525996800000,1526083200000,1526169600000,1526256000000,1526342400000,1526428800000,1526515200000,1526601600000,1526688000000,1526774400000,1526860800000,1526947200000,1527033600000,1527120000000,1527206400000,1527292800000,1527379200000,1527465600000,1527552000000,1527638400000,1527724800000,1527811200000,1527897600000,1527984000000,1528070400000,1528156800000,1528243200000,1528329600000,1528416000000,1528502400000,1528588800000,1528675200000,1528761600000,1528848000000,1528934400000,1529020800000,1529107200000,1529193600000,1529280000000,1529366400000,1529452800000,1529539200000,1529625600000,1529712000000,1529798400000,1529884800000,1529971200000,1530057600000,1530144000000,1530230400000,1530316800000,1530403200000,1530489600000,1530576000000,1530662400000,1530748800000,1530835200000,1530921600000,1531008000000,1531094400000,1531180800000,1531267200000,1531353600000,1531440000000,1531526400000,1531612800000,1531699200000,1531785600000,1531872000000,1531958400000,1532044800000,1532131200000,1532217600000,1532304000000,1532390400000,1532476800000,1532563200000,1532649600000,1532736000000,1532822400000,1532908800000,1532995200000,1533081600000,1533168000000,1533254400000,1533340800000,1533427200000,1533513600000,1533600000000,1533686400000,1533772800000,1533859200000,1533945600000,1534032000000,1534118400000,1534204800000,1534291200000,1534377600000,1534464000000,1534550400000,1534636800000,1534723200000,1534809600000,1534896000000,1534982400000,1535068800000,1535155200000,1535241600000,1535328000000,1535414400000,1535500800000,1535587200000,1535673600000,1535760000000,1535846400000,1535932800000,1536019200000,1536105600000,1536192000000,1536278400000,1536364800000,1536451200000,1536537600000,1536624000000,1536710400000,1536796800000,1536883200000,1536969600000,1537056000000,1537142400000,1537228800000,1537315200000,1537401600000,1537488000000,1537574400000,1537660800000,1537747200000,1537833600000,1537920000000,1538006400000,1538092800000,1538179200000,1538265600000,1538352000000,1538438400000,1538524800000,1538611200000,1538697600000,1538784000000,1538870400000,1538956800000,1539043200000,1539129600000,1539216000000,1539302400000,1539388800000,1539475200000,1539561600000,1539648000000,1539734400000,1539820800000,1539907200000,1539993600000,1540080000000,1540166400000,1540252800000,1540339200000,1540425600000,1540512000000,1540598400000,1540684800000,1540771200000,1540857600000,1540944000000,1541030400000,1541116800000,1541203200000,1541289600000,1541376000000,1541462400000,1541548800000,1541635200000,1541721600000,1541808000000,1541894400000,1541980800000,1542067200000,1542153600000,1542240000000,1542326400000,1542412800000,1542499200000,1542585600000,1542672000000,1542758400000,1542844800000,1542931200000,1543017600000,1543104000000,1543190400000,1543276800000,1543363200000,1543449600000,1543536000000,1543622400000,1543708800000,1543795200000,1543881600000,1543968000000,1544054400000,1544140800000,1544227200000,1544313600000,1544400000000,1544486400000,1544572800000,1544659200000,1544745600000,1544832000000,1544918400000,1545004800000,1545091200000,1545177600000,1545264000000,1545350400000,1545436800000,1545523200000,1545609600000,1545696000000,1545782400000,1545868800000,1545955200000,1546041600000,1546128000000,1546214400000,1546300800000,1546387200000,1546473600000,1546560000000,1546646400000,1546732800000,1546819200000,1546905600000,1546992000000,1547078400000,1547164800000,1547251200000,1547337600000,1547424000000,1547510400000,1547596800000,1547683200000,1547769600000,1547856000000,1547942400000,1548028800000,1548115200000,1548201600000,1548288000000,1548374400000,1548460800000,1548547200000,1548633600000,1548720000000,1548806400000,1548892800000,1548979200000,1549065600000,1549152000000,1549238400000,1549324800000,1549411200000,1549497600000,1549584000000,1549670400000,1549756800000,1549843200000,1549929600000,1550016000000,1550102400000,1550188800000,1550275200000,1550361600000,1550448000000,1550534400000,1550620800000,1550707200000,1550793600000,1550880000000,1550966400000,1551052800000,1551139200000,1551225600000,1551312000000,1551398400000,1551484800000,1551571200000,1551657600000,1551744000000,1551830400000,1551916800000,1552003200000,1552089600000],["y0",2298660,2253410,2515820,2506600,2460240,2408400,2317430,2240100,2295900,2609800,2594200,2626400,2615000,2617800,2394500,2391100,2608300,2676000,2637700,2766600,3186500,3067700,2570700,2935000,2949200,2913500,2763600,3216300,2343500,2361000,2580000,2591800,2595200,2569500,2587700,2372500,2351200,2465600,2625100,2651300,2686700,2783300,2417400,2383800,2736300,2751100,2678900,2622300,2586000,2365700,2407700,2541300,2600400,2581500,2576200,2550100,2334500,2139400,2015400,2019900,2210100,2191800,2240700,2107400,2026900,2258000,2255200,2123200,2267800,2236100,2065700,2093300,2315300,2333200,2349800,2318300,2275000,2110300,2077100,2335200,2357400,2350000,2293800,2303600,2118700,2100300,2219700,2361100,2349500,2347800,2318400,2141600,2178600,2432500,2448700,2440300,2450100,2424100,2229900,2152400,2402600,2401000,2418100,2408600,2408400,2212600,2189000,2450800,2444500,2451900,2451000,2442600,2287900,2221100,2451900,2460200,2460900,2319900,2270300,2183800,2195300,2485000,2460900,2500600,2495300,2479100,2290600,2235800,2459900,2484500,2491000,2525600,2477300,2223700,2146700,2528200,2567800,2556300,2540700,2503000,2301200,2251600,2538600,2596500,2553900,2534200,2527300,2337400,2332900,2688500,2585700,2559600,2651600,2586800,2445700,2472300,2633000,2664600,2649400,2648900,2644600,2406400,2426200,2694000,2740600,2711800,2700900,2645800,2422800,2438500,2697500,2712500,2690300,2684400,2517300,2435300,2444300,2781800,2807800,2804500,2771300,2798800,2633300,2597100,2946300,2889800,2949600,2951400,2928800,2701400,2709900,3012900,3019100,2977200,3012400,2989800,2752100,2749100,3033300,3050400,3023800,3066400,3047800,2792200,2799300,3096100,3132500,3082400,3071200,3021400,2818300,2737500,3037800,3123700,3138900,3181800,3118500,2834500,2826900,3171000,3175900,3184300,3195800,3129100,2834100,2876800,3019000,3214000,3227900,3189600,3187800,2886800,2880500,3218200,3253700,3260400,3243300,3204000,2962700,2968600,3282100,3618900,3017000,3037300,3044500,2758900,2784600,3032900,3132400,3075800,3108200,3076200,2851800,2837800,3107500,3146800,3145100,3145300,3158400,2872100,2823800,3190400,3209300,3170800,3195300,3183000,2910300,2937400,3297100,3293600,3278400,3234200,3224000,3013900,2955300,3303900,3323300,3352600,3348400,3340600,3110600,3066400,3409200,3462100,3394200,3383100,3433700,3184000,3092700,3417400,4505200,3094500,3106100,3083200,3005600,2866700,2984100,2954200,3086800,3070500,3040900,2903500,3592500,3316200,2930500,2961900,3009600,3027200,2871600,2831600,2881700,3054200,3116600,3120800,3157300,2950700,2982700,3192800,3223300,3219500,3235900,3214100,3004400,2963500,3280400,3262400,3256000,3258400,3264900,3107500,3057400,3326600,3332400,3357000,3365100,3359500,3127400,3130200,3367100,3422700,3436400,3431100,3600000,3146100,3170900,3467300,3483400,3473600,3454700,3390200,3213600,3188800,3498200,3498600,3493500,3478900,3446400,3239200,3229100,3559600,3563600,3549800,3577300,3524400,3282500,3271300,3599200,3575200,3554400,3540300,3450600,2812000],["y1",1130400,1065370,1211030,1215590,1206540,1206720,1085450,1047320,1071720,1253170,1261050,1264660,1260240,1264840,1130440,1121660,1294120,1290780,1284540,1302860,1296810,1165450,1128830,1302070,1304470,1307090,1268000,1302160,1159330,1163530,1327140,1320680,1319200,1306810,1287990,1121240,1145070,1132400,1310310,1329340,1340060,1333530,1167040,1153260,1356930,1366500,1375970,1378570,1357460,1192240,1188650,1386450,1400570,1395730,1404160,1378120,1195410,1082000,1189660,1197540,1367850,1389070,1386300,1282240,1209450,1409070,1409450,1271120,1424860,1399990,1240640,1248530,1451770,1460240,1466100,1460990,1446730,1268830,1263270,1473530,1476230,1480760,1460520,1454730,1263910,1227240,1303900,1474760,1473400,1477380,1466790,1285620,1280100,1491820,1499660,1496260,1485990,1473140,1301290,1273440,1487420,1494560,1500790,1508660,1489400,1301960,1297680,1501170,1503000,1488980,1501170,1479060,1367980,1296050,1493920,1487830,1479120,1338410,1318550,1266620,1285640,1487970,1489080,1489580,1475400,1471140,1316010,1271940,1476160,1480670,1491030,1480940,1477640,1305750,1296770,1483400,1494440,1495740,1485900,1484400,1319160,1284010,1488140,1502910,1503450,1485410,1498200,1323200,1303150,1506840,1523440,1521490,1516770,1504300,1327520,1307630,1518100,1521370,1521280,1521660,1517700,1349880,1333010,1543800,1553730,1546490,1541710,1532690,1367020,1354040,1560080,1564990,1565050,1561110,1406570,1340850,1368550,1600180,1630760,1621360,1636580,1652580,1489550,1465750,1731080,1730190,1732260,1730210,1724800,1519480,1520490,1758280,1774530,1770690,1781100,1762270,1551690,1541620,1787290,1795490,1802940,1799130,1778850,1560040,1564580,1822410,1819680,1812390,1814100,1798060,1587880,1589320,1833920,1843420,1851460,1845550,1822980,1596860,1595900,1866000,1860480,1862600,1863950,1827540,1585280,1588970,1683930,1879500,1883300,1879040,1846160,1639090,1632580,1895780,1897620,1906000,1906730,1895290,1670120,1670190,1914360,1932890,1933160,1921800,1898720,1673530,1685190,1937730,1951850,1949900,1949020,1923160,1718450,1704040,1964800,1975140,2002510,1985340,1959000,1736810,1727670,2006070,2013910,2012460,1999630,1977020,1754720,1778560,2060360,2057730,2055990,2036720,2027870,1824680,1794140,2067460,2078290,2094100,2080950,2062080,1836850,1828130,2102920,2112450,2098790,2116900,2080290,1863760,1841050,2105790,2106420,2151300,2098890,2085380,1955580,1819790,1916140,1913670,2080350,2058160,2034960,1911480,1823940,2087990,1774260,1833950,1906680,1902490,1760460,1748060,1775740,1974730,2013790,2026250,2022210,1835820,1835930,2096230,2098020,2095770,2114060,2099370,1902800,1854380,2132520,2143600,2146120,2143820,2157910,1929390,1905550,2183760,2185970,2198030,2198160,2182120,1950150,1931800,2215380,2216240,2226480,2220480,2208790,1972190,1957520,2253470,2247170,2245720,2285890,2220730,1986340,1967720,2264340,2270140,2267210,2268950,2246450,2048760,1994100,2288680,2296010,2313730,2311290,2293790,2034250,2025380,2326190,2323990,2320790,2271600,2244270,1663290],["y2",820900,766050,894390,894540,887590,814490,786610,744660,770920,930330,930190,942060,933690,922280,810770,809760,952010,959070,957020,955890,948250,825710,804970,958480,959090,970200,907010,950150,825240,820890,971020,973560,967940,960360,931820,795020,753860,808740,970000,981020,979810,975840,829690,819300,992290,998040,1006540,1013790,995130,848190,851890,1024210,1032210,1032290,1027510,1010090,850110,741740,844400,850410,1006690,1018470,1011630,916990,861050,1039650,1032640,904200,1045560,1022330,888970,896300,1073460,1074860,1074820,1074880,1057340,909410,906710,1078860,1092760,1083360,1078680,1067310,903090,858360,947540,1089590,1095060,1093130,1070660,915380,916530,1108410,1109460,1097230,1094520,1074630,915520,915750,1101730,1104580,1107930,1116850,1106360,928500,928210,1110530,1103230,1099970,1106180,1096060,982050,932620,1100880,1099970,1080040,959480,951360,902160,916070,1094120,1092530,1089290,1081760,1073320,937320,900010,1084910,1082620,1080960,1074050,1077810,925090,913970,1082900,1089240,1088890,1088720,1084170,938750,904060,1091540,1093660,1104520,1085860,1091880,939720,919790,1098590,1110310,1105580,1105220,1096580,940670,923480,1102360,1102760,1102280,1108680,1109210,955490,944730,1125380,1127440,1123070,1123910,1121160,966340,946940,1141980,1146790,1147420,1132920,990870,946370,964610,1171550,1187000,1186370,1199100,1213000,1062280,1035740,1274070,1276740,1280670,1282770,1257200,1085370,1080510,1293120,1308880,1302170,1317570,1298110,1111780,1106410,1317620,1318010,1332680,1328530,1305330,1113540,1119830,1340410,1348770,1346910,1352950,1324040,1139450,1136680,1355970,1364950,1377510,1375770,1338490,1140310,1151830,1374520,1374330,1378990,1372390,1347390,1135560,1121640,1217410,1390340,1392710,1383070,1372400,1170430,1169550,1404540,1412720,1414110,1417200,1388240,1194260,1188850,1416140,1425890,1426380,1410520,1388600,1197940,1197680,1432620,1448350,1436320,1438890,1412650,1222040,1215220,1454190,1456740,1490670,1470910,1438940,1243620,1241210,1483460,1489950,1488440,1482490,1465050,1261450,1281800,1552680,1527050,1526500,1511360,1497560,1302860,1292930,1547830,1550610,1546490,1547790,1525750,1324580,1321580,1576620,1575060,1570240,1574670,1543830,1341780,1341710,1577840,1565630,1580460,1569570,1543390,1431880,1301600,1401500,1401040,1530910,1526670,1498750,1383070,1284000,1401510,1189880,1309810,1380230,1383630,1254140,1216830,1243860,1442240,1481680,1480680,1490700,1315410,1300930,1530520,1532340,1539150,1541510,1532770,1344910,1325530,1563330,1568490,1580110,1575130,1564880,1369810,1359060,1608230,1605640,1605970,1601640,1590810,1381740,1375190,1625850,1621800,1629910,1628510,1609760,1397880,1392180,1647700,1646770,1644200,1667150,1610910,1408450,1395010,1652870,1658870,1660310,1659060,1629490,1435450,1407720,1675610,1682450,1682070,1693010,1669030,1448500,1439490,1710110,1702690,1707000,1662770,1512800,1101660],["y3",409540,377260,456380,460230,452020,389350,397230,369000,382180,473570,477470,477550,478030,466150,397480,406380,494570,494680,482810,487700,475090,400520,397940,484160,487740,493260,434500,475410,398650,404690,491980,493410,485250,484740,465490,377460,353960,396390,493300,497560,495110,485260,394770,402910,500540,506260,509680,514010,494350,405360,412560,513030,521320,515730,518170,499850,394960,328510,406450,408080,501980,507800,496990,442530,414260,525770,513440,442660,526810,500190,426220,436110,546820,543480,545420,540530,527770,431050,443100,549550,551600,548120,542290,528810,435370,407250,463200,553640,554110,555820,536470,440460,447740,563330,561850,556430,550910,539440,441200,442310,563100,563760,559230,570870,555280,447750,455570,564630,562510,556050,555560,556470,484080,451320,561060,553630,540660,473500,472500,438550,447590,548670,549580,539920,541510,540380,450260,432260,535950,545160,543810,536990,539680,446570,444470,543450,549070,547840,541430,540200,450080,431800,549290,545890,556300,536500,543890,450890,440180,550850,554740,553460,553440,546420,446710,436640,553270,547750,551920,547610,545500,449220,447510,560050,561560,561560,556630,559340,461630,456300,569070,574800,575220,566180,472200,450530,462960,590290,597250,592970,604870,613050,512200,495980,649860,645070,636950,647120,630390,518820,525990,661700,659770,660650,669560,644510,529610,539520,673850,668530,673770,669480,654540,536090,548400,690100,684900,687040,685940,666360,560140,553050,696740,694490,703000,697980,674460,548230,557370,697150,700110,701170,695810,669780,543500,540170,597430,711500,699770,698520,682170,568380,572950,715580,716050,720770,720660,695220,572970,578170,722280,724280,727910,719820,699840,580870,586270,729850,733680,726590,731270,709330,593070,600500,743590,743690,767660,747140,730510,607540,610480,762440,772960,763480,758490,741090,614450,645760,831130,792100,780410,778620,761000,643620,650320,802640,805900,803960,800580,783660,648310,668150,825940,818650,816630,821000,782790,657850,671660,817660,816020,821380,816280,800240,712510,648060,711170,709110,802240,792710,772260,691490,636050,649450,566120,651310,701910,702270,627880,605290,621710,744830,762830,765640,764140,648720,642430,786580,778790,780060,789170,772600,652160,648950,795360,802250,808010,801890,793490,669240,665310,814370,810880,814580,813950,802070,670450,674250,823010,820620,821400,820760,804300,681870,681460,831580,835600,835390,840770,810700,675170,680870,832000,836790,845630,844560,821810,690310,683810,851150,848090,846480,858340,831290,696470,695540,866980,868190,861720,834530,706650,439140]],"types":{"y0":"line","y1":"line","y2":"line","y3":"line","x":"x"},"names":{"y0":"#0","y1":"#1","y2":"#2","y3":"#3"},"colors":{"y0":"#cb513a","y1":"#73c03a","y2":"#65b9ac","y3":"#4682b4"}}];

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_chart_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/chart_data */ "./src/data/chart_data.json");
var _data_chart_data__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../data/chart_data */ "./src/data/chart_data.json", 1);
/* harmony import */ var q__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! q */ "./node_modules/q/q.js");
/* harmony import */ var q__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(q__WEBPACK_IMPORTED_MODULE_1__);





class Chart {

	constructor(data){

		this.lines = {};

		this.x = this.createX(data.columns);

		this.start = this.x[0];

		this.end = this.x[this.x.length - 1];

		this.viewBoxWidth = 100;

		this.totalValues = [];

		this.parseData(data);

		this.layout = new ChartTemplate({
			chart: this
		});

		this.layout.init();

		this.displayedDates = [];
		this.displayedValues = [];


	}


	createLineCoords({id, name, color, coords}){
		this.lines[`${id}`] = {
			name,
			coords,
			color,
			active: true
		}
	}

	createX(columns) {
		for (let column of columns){
			if (column[0] === 'x'){
				column.shift();
				return column;
			}
		}
		return undefined;
	}

	getCoordsFromColumns({key, columns}){

		for(let column of columns){
			if (column[0] === key){
				column.shift();

				this.totalValues.push(...column);

				return column;
			}
		}
		return undefined;

	}

	parseData(data){

		for (let columnId in data.types){
			if (data.types[columnId] === 'line'){
				this.createLineCoords({
					id: columnId,
					name: data.names[columnId],
					color: data.colors[columnId],
					coords: this.getCoordsFromColumns({key: columnId, columns: data.columns})
				})
			}
		}


		// remove all not unique values
		this.totalValues = this.totalValues.filter((v, i, s) => s.indexOf(v) === i);

		// sorting array on values
		this.totalValues.sort();
	}

	getChartMinMaxValueInRange(start, end){

		let min = 99999999999999999;
		let max = 0;

		if (this.getActiveLinesCount() === 0){
			// Prevent the not smooth animation on disable last chart
			return {min: 0, max: this.viewBoxWidth};
		}

		for (let coordIndex in this.x){
			if (this.x[coordIndex] >= start && this.x[coordIndex] <= end){
				for (let lineIndex in this.lines){
					const line = this.lines[lineIndex];
					if (line.active){
						min = line.coords[coordIndex] < min ? line.coords[coordIndex] : min;
						max = line.coords[coordIndex] > max ? line.coords[coordIndex] : max;
					}
				}
			}else{
				for (let lineIndex in this.lines){
					const line = this.lines[lineIndex];
					if (line.active){
						min = line.coords[coordIndex] < min ? line.coords[coordIndex] : min;
					}
				}
			}
		}

		const range = max - min;

		max += range * 0.05;

		if (min > 0 && (min - range * 0.05) < 0){
			min = 0;
		}else{
			min -= range * 0.05;
			min = Math.floor(min / this.convert(min)) * this.convert(min);
		}

		return {min, max};
	}

	getActiveLinesCount(){

		let count = 0;

		for (let lineIndex in this.lines){
			count += this.lines[lineIndex].active ? 1 : 0;
		}

		return count;
	}

	drawDates(target, start, end){

		const monthNames = [
			"Dec", "Jan", "Feb", "Mar",
			"Apr", "May", "Jun", "Jul",
			"Aug", "Sep", "Oct",
			"Nov"
		];


		const range = this.x.slice();
		const totalStartDate = range.shift();
		const totalEndDate = range.pop();



		if (!this.layout.controlsState.mapRangeClicked){

			// const drawCountOfdates = target.clientWidth / 100;

			const coeff = target.viewBox.baseVal.width / target.clientWidth;


			const totalDrawsCount = Math.floor((coeff * target.querySelector('.chart-wrapper').getBoundingClientRect().width) / (100 * coeff));


			const step = Math.floor(((totalEndDate - totalStartDate) / totalDrawsCount));

			let dateValue = totalStartDate;

			this.displayedDates = [];

			for (let i = 0; i < totalDrawsCount; i++){
				dateValue = Math.floor(dateValue / 86400000) * 86400000;
				this.displayedDates.push(dateValue);
				dateValue += step;
			}

			this.displayedDates.push(Math.floor(totalEndDate / 86400000) * 86400000);

			const currentDates = target.getElementsByClassName('date-text');

			for (const currentDate of currentDates){
				if (this.displayedDates.indexOf(Number(currentDate.dataset.date)) === -1){
					currentDate.classList.remove('active-item');
					currentDate.classList.add('removing-item');
				}
			}
		}


		for (const date of this.displayedDates){

			const x = (1 - ((end - date) / (end - start))) * this.viewBoxWidth;

			const shift = (1 - (totalEndDate - date) / (totalEndDate - totalStartDate));

			let text = target.querySelector(`.date-${date}`);

			if (text === null){
				text = document.createElementNS('http://www.w3.org/2000/svg','text');

				const dateValue = new Date(date);
				text.innerHTML = `${monthNames[dateValue.getMonth()]} ${dateValue.getDate()}`;
				text.setAttribute('y', this.viewBoxWidth * (target.clientHeight / target.clientWidth));

				text.dataset.date = date;

				target.querySelector('.dates-wrapper').appendChild(text);
			}
			text.setAttribute('x', x);
			text.setAttributeNS(null, 'class', `date-${date} date-text active-item`);
		}

	}

	convert(n) {
		if (Math.abs(n) > 0){
			const order = Math.floor(Math.log(Math.abs(n)) / Math.LN10 + 0.000000001);
			return Math.pow(10,order);
		}else{
			return 0;
		}
	}

	drawValues(target, chartValuesMinMax){

		const range = chartValuesMinMax.max - chartValuesMinMax.min;

		const countValuesToDisplay = Math.floor(target.clientHeight / 60);

		const stepNotRounded = range / countValuesToDisplay;

		const stepOrder = this.convert(stepNotRounded);

		const step = Math.floor(stepNotRounded / stepOrder) * stepOrder;

		const steps = [];

		const currentStepsClasses = [];

		const min = (chartValuesMinMax.min > step && chartValuesMinMax.min > 0) ? chartValuesMinMax.min : 0;

		for (let i = 0; i <= countValuesToDisplay; i++){
			const value = (step * i) + min;
			steps.push(value);
			currentStepsClasses.push(`value-${value}`);
		}

		this.layout.removeItems('value-item', currentStepsClasses, 'hide');

		for (const value of steps){

			const y = ((((range - (value - chartValuesMinMax.min)) / range) * (this.viewBoxWidth * 0.93))) * (target.clientHeight / target.clientWidth);


			let text = target.querySelector(`.value-${value}-value`);

			let path = target.querySelector(`.value-${value}-text`);

			if (path === null){

				path = document.createElementNS('http://www.w3.org/2000/svg','path');

				path.setAttributeNS(null, 'stroke', '#f2f4f5');
				path.setAttributeNS(null, 'stroke-width', this.viewBoxWidth * 0.001);
				path.setAttributeNS(null, 'fill', 'none');

				target.querySelector('.values-wrapper').appendChild(path);
			}

			path.setAttributeNS(null, 'd', `M${0} ${y} L ${this.viewBoxWidth} ${y}`);
			path.setAttributeNS(null, 'class', `value-item active-item value-${value} value-${value}-value`);

			if (text === null){
				text = document.createElementNS('http://www.w3.org/2000/svg','text');

				text.innerHTML = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
				text.setAttribute('x', 0);
				target.querySelector('.values-wrapper').appendChild(text);
			}

			text.setAttribute('y', (y - target.viewBox.baseVal.height * 0.01));
			text.setAttributeNS(null, 'class', `value-item active-item value-${value} value-${value}-text`);


		}

	}



	drawTooltip(target, {x, values}, clientY = 0){

		if (this.layout.controlsState.chartMove){
			return;
		}

		let start = this.start + ((this.end - this.start) * (this.layout.startChartValue / this.viewBoxWidth));
		let end = this.end - ((this.end - this.start) * (1 - ((this.layout.endChartValue + this.layout.endChartWidth) / this.viewBoxWidth)));


		const xCoord = (1 - ((end - x) / (end - start))) * this.viewBoxWidth;


		const chartValuesMinMax = this.getChartMinMaxValueInRange(start, end);

		const chartHeight = chartValuesMinMax.max - chartValuesMinMax.min;

		let tooltipPath = target.querySelector(`.tooltip-${x}`);


		if (tooltipPath === null){

			this.layout.removeItems('tooltip-item', `tooltip-${x}`);

			const monthNames = [
				"Dec", "Jan", "Feb", "Mar",
				"Apr", "May", "Jun", "Jul",
				"Aug", "Sep", "Oct",
				"Nov"
			];

			const weekdaysNames = [
				"Sun", "Mon",
				"Tue", "Wed",
				"Thu", "Fri",
				"Sat"
			];

			const dateValue = new Date(x);


			let tooltipHTML = ``;
			tooltipHTML += `<span class="tooltip-date">${weekdaysNames[dateValue.getDay()]}, ${monthNames[dateValue.getMonth()]} ${dateValue.getDate()}</span>`;
			tooltipHTML += `<div class="tooltip-values-wrapper">`;

			for (const chartValue of values){

				let circleValue = target.querySelector(`.tooltip-value-${chartValue.y}`);

				const y = ((((chartHeight - (chartValue.y - chartValuesMinMax.min)) / chartHeight) * (this.viewBoxWidth * 0.93))) * (target.clientHeight / target.clientWidth);

				if (circleValue === null){

					circleValue = document.createElementNS('http://www.w3.org/2000/svg','circle');

					circleValue.setAttributeNS(null, 'stroke', chartValue.color);
					circleValue.setAttributeNS(null, 'stroke-width', this.viewBoxWidth * 0.002);
					circleValue.setAttributeNS(null, 'fill', '#fff');
					circleValue.setAttributeNS(null, 'r', this.viewBoxWidth * 0.007);
					circleValue.setAttributeNS(null, 'class', `tooltip-${x} tooltip-value-${chartValue.y} tooltip-item`);

					target.querySelector('.tooltip-wrapper').appendChild(circleValue);

				}

				circleValue.setAttributeNS(null, 'cx', xCoord);
				circleValue.setAttributeNS(null, 'cy', y);
				tooltipHTML += `<div class="tooltip-value-wrapper" style="color: ${chartValue.color}">
					<span class="tooltip-value">${[chartValue.y].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span>
					<span class="tooltip-value-name">${chartValue.name}</span>
				</div>`;

			}

			tooltipHTML += `</div>`;

			tooltipPath = document.createElementNS('http://www.w3.org/2000/svg','path');

			tooltipPath.setAttributeNS(null, 'stroke', '#96a2aa');
			tooltipPath.setAttributeNS(null, 'stroke-width', this.viewBoxWidth * 0.001);
			tooltipPath.setAttributeNS(null, 'fill', 'none');

			tooltipPath.setAttributeNS(null, 'class', `tooltip-${x} tooltip-item`);

			tooltipPath.setAttributeNS(null, 'd', `M${xCoord} 0 L ${xCoord} ${100}`);

			target.querySelector('.tooltip-wrapper').appendChild(tooltipPath);

			let tooltipText = target.querySelector(`.tooltip-text-${x}`);

			if (tooltipText === null){
				tooltipText = document.createElement('div');
				tooltipText.setAttribute('class', `tooltip-text tooltip-${x} tooltip-item`);
			}


			tooltipText.innerHTML = tooltipHTML;
			this.layout.chartWrapper.appendChild(tooltipText);

			const left = (tooltipPath.getBoundingClientRect().left - this.layout.chartWindow.getBoundingClientRect().left) - (tooltipText.clientWidth / 2);
			const top = (clientY - this.layout.chartWindow.getBoundingClientRect().top) - ((tooltipText.clientHeight + 15));

			tooltipText.style.top = `${top}px`;
			tooltipText.style.left = `${left}px`;

		}

	}

	drawLines({target, startPercent = 0, endPercent = this.viewBoxWidth, drawValues = false}){

		let start = this.start + ((this.end - this.start) * (startPercent / this.viewBoxWidth));
		let end = this.end - ((this.end - this.start) * (1 - (endPercent / this.viewBoxWidth)));


		const aspectRatioCoeff = target.clientHeight / target.clientWidth;

		target.setAttribute('viewBox', `0 0 ${this.viewBoxWidth} ${this.viewBoxWidth * aspectRatioCoeff}`);

		// Disable zoom less than 100%
		start = this.start > start ? this.start : start;
		end = this.end < end ? this.end : end;
		const chartWidth = (end - start);

		const chartValuesMinMax = this.getChartMinMaxValueInRange(start, end);
		const chartHeight = chartValuesMinMax.max - chartValuesMinMax.min;

		for (let lineId in this.lines){

			let pathLine = '';

			const yCoords = this.lines[lineId].coords;

			for (let coordIndex in this.x){

				coordIndex = Number(coordIndex);
				let x = this.x[coordIndex];
				let y = yCoords[coordIndex];

				x = (1 - ((end - x) / chartWidth)) * this.viewBoxWidth;
				y = ((((chartHeight - (y - chartValuesMinMax.min)) / chartHeight) * (this.viewBoxWidth * 0.93))) * aspectRatioCoeff;


				pathLine += (coordIndex === 0) ? `M${x} ${y}` : ` L ${x} ${y}`;

			}

			let path = target.querySelector(`.line-${lineId}`);

			if (path === null){
				// Create the chart path if it not exists
				path = document.createElementNS('http://www.w3.org/2000/svg','path');
				path.setAttributeNS(null, 'class', `line-${lineId}`);
				path.setAttributeNS(null, 'stroke', this.lines[lineId].color);
				path.setAttributeNS(null, 'stroke-width', this.viewBoxWidth * 0.004);
				path.setAttributeNS(null, 'fill', 'none');
				target.querySelector('.chart-wrapper').appendChild(path);
			}
			path.setAttributeNS(null, 'd', pathLine);
		}

		if (drawValues){
			setTimeout(() => {
				this.drawDates(target, start, end);
				this.drawValues(target, chartValuesMinMax);
			}, 0);
		}
	}
}


class ChartTemplate {

	constructor({chart, appendTarget = 'body'}){

		this.chart = chart;

		this.layoutID = `chart-layout-${Math.floor(Math.random() * 100000)}`;

		this.appendTarget = document.querySelector(appendTarget);

		this.layout;

		this.layoutContorls = {};

		this.controlsState = {
			startClicked        : false,
			endClicked          : false,
			mapRangeClicked     : false,
			chartMove           : false,
			chartReverceMove    : false,
			startPosition       : 0,
			endPosition         : this.chart.viewBoxWidth,
			clickInitialPosition: 0
		};

		this.chartWindow, this.chartWrapper, this.mapWindow;

	}

	get chartTemplate(){
		return `
			<div class="chart" id="${this.layoutID}">
				<div class="chart__window">
					<svg></svg>
				</div>
				<div class="chart__map">
					<svg></svg>
				</div>
				<div class="chart__buttons"></div>
			</div>
		`;
	}

	init(){

		this.layout = this.initLayout();

		this.chartWindow = this.initChartWindow();

		this.chartWrapper = this.layout.querySelector('.chart__window');

		this.map = this.initMap();

		this.initControlButtons();

	}

	initMap(){



		const map = this.layout.querySelector('.chart__map svg');

		const chartWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g');

		chartWrapper.setAttributeNS(null, 'class', 'chart-wrapper');

		map.appendChild(chartWrapper);

		this.chart.drawLines({target: map});

		this.layoutContorls.viewRange = this.createMapViewRange(map);

		this.layoutContorls.startChartSlider = this.createSlider(map);
		this.layoutContorls.startChartSlider.setAttributeNS(null, 'x', this.controlsState.startPosition);
		this.layoutContorls.startChartSlider.addEventListener('mousedown', () => this.controlsState.startClicked = true);
		this.layoutContorls.startChartSlider.addEventListener('touchstart', () => this.controlsState.startClicked = true);

		this.layoutContorls.endChartSlider = this.createSlider(map);
		this.layoutContorls.endChartSlider.setAttributeNS(null, 'x', this.controlsState.endPosition - this.endChartWidth);
		this.layoutContorls.endChartSlider.addEventListener('mousedown', () => this.controlsState.endClicked = true);
		this.layoutContorls.endChartSlider.addEventListener('touchstart', () => this.controlsState.endClicked = true);

		this.changeMapViewSize();

		this.clearConsrolState();

		return map;
	}

	createSlider(map){
		const chartSlider = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		chartSlider.setAttributeNS(null, 'y', 0);
		chartSlider.setAttributeNS(null, 'width', map.viewBox.baseVal.width * 0.02);
		chartSlider.setAttributeNS(null, 'height', map.viewBox.baseVal.height);
		chartSlider.setAttributeNS(null, 'fill', 'rgba(0,0,0,0)');
		chartSlider.addEventListener('mousedown', event => {
			this.controlsState.clickInitialPosition = event.clientX;
			this.controlsState.chartMove            = true;
		});
		chartSlider.addEventListener('touchstart', event => {
			this.controlsState.clickInitialPosition = event.touches[0].clientX;
			this.controlsState.chartMove            = true;
		});

		map.appendChild(chartSlider);
		return chartSlider;
	}

	createMapViewRange(map){
		const viewRange = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

		viewRange.setAttributeNS(null, 'y', 0 - map.viewBox.baseVal.height * 0.05);
		viewRange.setAttributeNS(null, 'x', 0);
		viewRange.setAttributeNS(null, 'width', 0);
		viewRange.setAttributeNS(null, 'height', map.viewBox.baseVal.height * 1.1);
		viewRange.setAttributeNS(null, 'fill', 'rgba(0,0,0,0)');
		viewRange.setAttributeNS(null, 'stroke', 'rgba(133, 173, 201, .5)');
		viewRange.setAttributeNS(null, 'stroke-width', this.chart.viewBoxWidth * 0.02);
		viewRange.addEventListener('mousedown', event => {
			this.controlsState.clickInitialPosition = event.clientX;
			this.controlsState.mapRangeClicked      = true;
			this.controlsState.chartMove            = true;
			this.controlsState.minMapViewRange      = this.viewRangeWidth;
		});
		viewRange.addEventListener('touchstart', event => {
			this.controlsState.clickInitialPosition = event.touches[0].clientX;
			this.controlsState.mapRangeClicked      = true;
			this.controlsState.chartMove            = true;
			this.controlsState.minMapViewRange      = this.viewRangeWidth;
		});

		map.appendChild(viewRange);
		return viewRange;
	}

	initChartWindow(){


		const chartWindow = this.layout.querySelector('.chart__window svg');

		const datesWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g');

		datesWrapper.setAttributeNS(null, 'class', 'dates-wrapper');

		const valuesWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g');

		valuesWrapper.setAttributeNS(null, 'class', 'values-wrapper');

		const chartWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g');

		chartWrapper.setAttributeNS(null, 'class', 'chart-wrapper');

		const tooltipWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g');

		tooltipWrapper.setAttributeNS(null, 'class', 'tooltip-wrapper');

		chartWindow.appendChild(datesWrapper);
		chartWindow.appendChild(valuesWrapper);
		chartWindow.appendChild(chartWrapper);
		chartWindow.appendChild(tooltipWrapper);

		chartWindow.addEventListener('mousedown', event => {
			this.controlsState.clickInitialPosition = event.clientX;
			this.controlsState.mapRangeClicked      = true;
			this.controlsState.chartMove            = true;
			this.controlsState.chartReverceMove     = true;
			this.controlsState.minMapViewRange      = this.viewRangeWidth;
		});
		chartWindow.addEventListener('touchstart', event => {
			this.controlsState.clickInitialPosition = event.touches[0].clientX;
			this.controlsState.mapRangeClicked      = true;
			this.controlsState.chartMove            = true;
			this.controlsState.chartReverceMove     = true;
			this.controlsState.minMapViewRange      = this.viewRangeWidth;
		});
		chartWindow.addEventListener('mousemove', event => this.initTooltip(event));
		chartWindow.addEventListener('touchmove', event => this.initTooltip(event));

		chartWindow.addEventListener('mouseleave', () => this.removeItems('tooltip-item'));


		this.chart.drawLines({target: chartWindow, drawValues: true});

		return chartWindow;

	}

	get startChartValue(){
		return this.layoutContorls.startChartSlider.x.baseVal.value;
	}
	set startChartValue(value){
		this.layoutContorls.startChartSlider.x.baseVal.value = value;
	}
	get startChartWidth(){
		return this.layoutContorls.startChartSlider.width.baseVal.value;
	}



	get endChartValue(){
		return this.layoutContorls.endChartSlider.x.baseVal.value;
	}
	set endChartValue(value){
		this.layoutContorls.endChartSlider.x.baseVal.value = value;
	}
	get endChartWidth(){
		return this.layoutContorls.endChartSlider.width.baseVal.value;
	}



	get viewRangeWidth(){
		return (this.endChartValue - this.startChartValue) ;
	}

	initControlButtons(){
		for (let line_id in this.chart.lines){

			const button = document.createElement('button');
			button.style.background = this.chart.lines[line_id].color;
			button.innerHTML = this.chart.lines[line_id].name;

			button.addEventListener('click', () => {
				const line = this.chartWindow.querySelector(`.line-${line_id}`);
				if (this.chart.lines[line_id].active){
					this.chart.lines[line_id].active = false;
					line.style.opacity = 0;
				}else{
					this.chart.lines[line_id].active = true;
					line.style.opacity = 1;
				}
				this.chart.drawLines({
					target: this.chartWindow,
					startPercent: this.startChartValue,
					endPercent: this.endChartValue + this.endChartWidth,
					drawValues: true
				});
			});
			this.layout.querySelector('.chart__buttons').appendChild(button);
		}

	}

	changeStartPosition(value){

		const maxOfStartPosition = this.endChartValue - this.controlsState.minMapViewRange;

		value = value > 0 ? value : 0;
		value = value < maxOfStartPosition ? value : maxOfStartPosition;

		this.startChartValue = value;

		this.changeMapViewSize();
	}

	changeEndPosition(value){

		const minOfEndPosition = this.startChartValue + this.controlsState.minMapViewRange;

		value = value > minOfEndPosition ? value : minOfEndPosition;
		value = value + this.endChartWidth < this.chart.viewBoxWidth ? value : this.chart.viewBoxWidth - this.endChartWidth;

		this.endChartValue = value;

		this.changeMapViewSize();

	}

	changeMapViewSize(){
		const left = this.startChartValue + (this.chart.viewBoxWidth * 0.01);
		const width = this.viewRangeWidth;
		this.layoutContorls.viewRange.setAttributeNS(null, 'x', left);
		this.layoutContorls.viewRange.setAttributeNS(null, 'width', width);
	}


	clearConsrolState(){
		this.controlsState.startPosition    = this.startChartValue;
		this.controlsState.endPosition      = this.endChartValue;
		this.controlsState.minMapViewRange  = this.chart.viewBoxWidth * 0.15;
		this.controlsState.startClicked     = false;
		this.controlsState.endClicked       = false;
		this.controlsState.chartReverceMove = false;
		this.controlsState.chartMove        = false;
		this.controlsState.mapRangeClicked  = false;
	}

	initTooltip(event){

		const coordIndex = this.getCoordIndexByClientX(event.clientX);

		const coords = this.getCoordsByIndex(coordIndex);

		if(coords){
			this.chart.drawTooltip(this.chartWindow, coords, event.clientY);
		}
	}

	removeItems(removingClass, drawingID = 'id-of-item-to-not-remove', action = 'remove'){
		return new Promise(resolve => {
			let checkToNotRemove = [];

			if (typeof drawingID === 'string'){
				checkToNotRemove.push(drawingID);
			}else if(Array.isArray(drawingID)){
				checkToNotRemove = drawingID;
			}else{
				Object(q__WEBPACK_IMPORTED_MODULE_1__["reject"])('Wrong value of Drawing ID');
			}

			let items = this.layout.getElementsByClassName(removingClass);

			if (this.remove(items, checkToNotRemove, items.length, action)){
				resolve(true);
			}
		});
	}

	remove(items, checkToNotRemove, countToRemove, action){

		for (const item of items){
			let found = 0;
			for (const checkID of checkToNotRemove){
				found += item.classList.contains(checkID) ? 1 : 0;
			}
			if (found === 0){
				switch (action){
					case 'remove':
						item.remove();
						break;
					case 'hide':
						item.classList.remove('active-item');
						item.classList.add('removing-item');
						break;
				}
				countToRemove--;
			}else{
				countToRemove--;
			}
		}
		if (countToRemove !== 0){
			return this.remove(items, checkToNotRemove, countToRemove, action);
		}else{
			return true;
		}
	}

	getCoordsByIndex(coordIndex){

		const x = this.chart.x[coordIndex];

		const coords = {
			x: x,
			values: []
		};

		for (const lineId in this.chart.lines){
			if (this.chart.lines[lineId].active){
				coords.values.push({
					y: this.chart.lines[lineId].coords[coordIndex],
					color: this.chart.lines[lineId].color,
					name: this.chart.lines[lineId].name
				});
			}
		}

		if (coords.values.length > 0){
			return coords;
		}else{
			return false;
		}



	}

	getCoordIndexByClientX(clientX){

		const chartCoeff = this.chartWindow.querySelector('.chart-wrapper').getBoundingClientRect().width / this.chartWindow.clientWidth;

		// get window start position inside the full chart
		const chartStart = this.chart.viewBoxWidth * (chartCoeff * this.controlsState.startPosition / this.chart.viewBoxWidth);

		const chartFullWidth = this.chart.viewBoxWidth * chartCoeff;

		const chartIntervalWidth = chartFullWidth / this.chart.x.length;

		// get cursor position inside the full chart
		const cursorPositionInChart = chartStart + (clientX - this.chartWindow.getBoundingClientRect().left) / this.chartWindow.clientWidth * this.chart.viewBoxWidth;

		const cursorShift = (((chartFullWidth / 2) - cursorPositionInChart) / chartFullWidth) * chartIntervalWidth;

		const percentCursorPositionInChart = cursorPositionInChart / this.chart.viewBoxWidth / chartCoeff;

		return Math.floor(this.chart.x.length * percentCursorPositionInChart + (cursorShift / chartCoeff));

	}

	moveChart(event){
		const clientX = event.clientX || event.touches[0].clientX;
		if (this.controlsState.startClicked || this.controlsState.mapRangeClicked){

			let valueStart;
			if (this.controlsState.chartReverceMove){
				valueStart = this.controlsState.startPosition + ((this.controlsState.clickInitialPosition - clientX) / this.layout.clientWidth) * this.viewRangeWidth;
			}else{
				valueStart = this.controlsState.startPosition + (0 - (this.controlsState.clickInitialPosition - clientX) / this.layout.clientWidth) * this.chart.viewBoxWidth;
			}

			this.changeStartPosition(valueStart);

		}

		if (this.controlsState.endClicked || this.controlsState.mapRangeClicked){

			let valueEnd;
			if (this.controlsState.chartReverceMove){
				valueEnd = (this.controlsState.endPosition + ((this.controlsState.clickInitialPosition - clientX) / this.layout.clientWidth) * this.viewRangeWidth);
			}else{
				valueEnd = (this.controlsState.endPosition + (0 - (this.controlsState.clickInitialPosition - clientX) / this.layout.clientWidth) * this.chart.viewBoxWidth);
			}

			this.changeEndPosition(valueEnd);

		}


		if(this.controlsState.chartMove){
			this.removeItems('tooltip-item');
			const startPercent = this.startChartValue;
			const endPercent = this.endChartValue + this.endChartWidth;
			const target = this.chartWindow;

			target.classList.add('dragging');
			this.chart.drawLines({target, startPercent, endPercent, drawValues: true});
			setTimeout(() => {
				target.classList.remove('dragging');
			}, 0);
		}
	}

	initLayout(){

		const layout = document.createElement('div');

		layout.classList.add('chart_wrapper');

		layout.innerHTML = this.chartTemplate;

		document.addEventListener('mousemove', (event) => {
			this.moveChart(event);
		});
		document.addEventListener('touchmove', (event) => {
			this.moveChart(event);
			const element = event.touches[0];
			if (element.target !== this.chartWindow){
				this.removeItems('tooltip-item');
			}
		});


		document.addEventListener('mouseup', () => this.clearConsrolState());
		document.addEventListener('touchend', () => this.clearConsrolState());

		this.appendTarget.append(layout);

		return layout;

	}

}


new Chart(_data_chart_data__WEBPACK_IMPORTED_MODULE_0__[0]);
new Chart(_data_chart_data__WEBPACK_IMPORTED_MODULE_0__[1]);
new Chart(_data_chart_data__WEBPACK_IMPORTED_MODULE_0__[2]);
new Chart(_data_chart_data__WEBPACK_IMPORTED_MODULE_0__[3]);
new Chart(_data_chart_data__WEBPACK_IMPORTED_MODULE_0__[4]);

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!******************************************************!*\
  !*** multi ./src/js/script.js ./src/scss/style.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/js/script.js */"./src/js/script.js");
module.exports = __webpack_require__(/*! ./src/scss/style.scss */"./src/scss/style.scss");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map