---
title: Promise
created: '2019-06-11T04:12:28.309Z'
modified: '2019-06-11T06:47:37.991Z'
tags: [FrontEnd/JavaScript, MDN]
---

The **Promise** object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.

To learn about the way promises work and how you can use them, we advise you to read [Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) first.

## Description

A **Promise** is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason. This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future.

A Promise is in one of these states:

- _pending_: initial state, neither fulfilled nor rejected.
- _fulfilled_: meaning that the operation completed successfully.
- _rejected_: meaning that the operation failed.

A pending promise can either be fulfilled with a value, or rejected with a reason (error). When either of these options happens, the associated handlers queued up by a promise's then method are called. If the promise has already been fulfilled or rejected when a corresponding handler is attached, the handler will be called, so there is no race condition between an asynchronous operation completing and its handlers being attached.

As the `Promise.prototype.then()` and `Promise.prototype.catch()` methods return promises, they can be chained.

> **Not to be confused with**: Several other languages have mechanisms for lazy evaluation and deferring a computation, which they also call "promises", e.g. Scheme. Promises in JavaScript represent processes that are already happening, which can be chained with callback functions. If you are looking to lazily evaluate an expression, consider the arrow function with no arguments: f = () => expression to create the lazily-evaluated expression, and f() to evaluate.

> **Note**: A promise is said to be settled if it is either fulfilled or rejected, but not pending. You will also hear the term resolved used with promises — this means that the promise is settled or “locked in” to match the state of another promise. States and fates contains more details about promise terminology.

### Chained Promised

The methods `promise.then()`, `promise.catch()`, and `promise.finally()` are used to associate further action with a promise that becomes settled. These methods also return a newly generated promise object, which can optionally be used for chaining; for example, like this:

```javascript
const myPromise = 
  (new Promise(myExecutorFunc))
  .then(handleFulfilledA,handleRejectedA)
  .then(handleFulfilledB,handleRejectedB)
  .then(handleFulfilledC,handleRejectedC);

// or, perhaps better ...

const myPromise =
  (new Promise(myExecutorFunc))
  .then(handleFulfilledA)
  .then(handleFulfilledB)
  .then(handleFulfilledC)
  .catch(handleRejectedAny);
```

Handling a rejected promise too early has consequences further down the promise chain. Sometimes there is no choice, because an error must be handled immediately. (See throw -999 in the example, below, for a technique to handle the consequences.) On the other hand, in the absence of an immediate need, it is simpler to leave out error handling until a final .catch() statement.

The signatures of these two functions are simple, they accept a single parameter of any type. These functions are written by you, the programmer. The termination condition of these functions determines the "settled" state of the next promise in the chain. Any termination other than a throw creates a "resolved" state, while terminating with a throw creates a "rejected" state.

```javascript
handleFulfilled(value)       { /*...*/; return nextValue;  }
handleRejection(reason)  { /*...*/; throw  nextReason; }
handleRejection(reason)  { /*...*/; return nextValue;  }
```