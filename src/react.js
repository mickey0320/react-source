import { wrapToVdom, REACT_FORWORD_REF } from "./util";
import Component from "./Component";

function createElement(type, config = {}, children) {
  let ref, key;
  const props = { ...config };
  ref = props.ref;
  key = props.key;
  delete props.ref;
  delete props.key;

  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
  } else {
    props.children = wrapToVdom(children);
  }

  return {
    type,
    props,
    key,
    ref,
  };
}

function createRef(){
  return { current: null}
}
function forwardRef(render){
  return {
    $$typeof: REACT_FORWORD_REF,
    render,
  }; 
}

const React = {
  createElement,
  Component,
  createRef,
  forwardRef
};

export default React;
