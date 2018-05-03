"use strict";
const { defineProperty, getPrototypeOf } = Object;
const extraData = new WeakMap;

function once() {
  const { cb, base } = extraData.get(this);
  extraData.delete(this);
  try { return cb.apply(this, arguments); }
  catch(e) { throw e; }
  finally { base.unhook(this); }
}

function hookOnce() {
  const argsLen = arguments.length - 1;
  const copy = Array(argsLen + 1);
  let i = -1;
  while(++i < argsLen) copy[i] = arguments[i];
  const cb = arguments[i];
  if (typeof cb !== "function") {
    throw new TypeError("last argument not a function");
  }

  copy[i] = once;
  const { base } = this;
  const hook = base.hook.apply(base, copy);
  extraData.set(hook, { cb, base });

  return hook;
}

hookOnce.fixed = true;

function fixHookOnce(dispatch) {
  const proto = getPrototypeOf(dispatch);
  if (proto.hookOnce.fixed) return;
  defineProperty(proto, "hookOnce", {
    value: hookOnce,
    writeable: true,
    enumerable: true,
    configurable: true,
  });
}

module.exports = fixHookOnce;
