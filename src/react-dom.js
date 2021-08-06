import { REACT_TEXT } from "./util";
import addEvent from "./event";

function render(vnode, container) {
  const el = createDOM(vnode);

  container.appendChild(el);
}

export function createDOM(vnode) {
  const { type, props } = vnode;
  let el;
  if (type === REACT_TEXT) {
    el = document.createTextNode(props.content);
  } else if (typeof type === "string") {
    el = document.createElement(type);
    if (props) {
      updateProps(el, {}, props);
    }
  } else if (typeof type === "function") {
    if (type.isReactComponent) {
      el = mountClassComponent(vnode);
    } else {
      el = mountFunctionComponent(vnode);
    }
  }
  
  if (props?.children) {
    let children = props.children;
    if (!Array.isArray(props.children)) {
      children = [props.children];
    }
    children.forEach((childVnode) => {
      render(childVnode, el);
    });
  }
  vnode.dom = el;
  return el;
}

function updateProps(el, oldProps, newProps) {
  for (let prop in newProps) {
    if (prop === "children") {
      continue;
    } else if (prop === "style") {
      for (let key in newProps["style"]) {
        el.style[key] = newProps["style"][key];
      }
    } else if (prop.startsWith("on")) {
      addEvent(el, prop, newProps[prop]);
    } else {
      el.setAttribute(prop, newProps[prop]);
    }
  }
}

function mountFunctionComponent(vnode) {
  const { type, props } = vnode;
  const renderVdom = type(props);
  vnode.oldRenderVdom = renderVdom;

  return createDOM(renderVdom);
}

function mountClassComponent(vnode) {
  const { type, props } = vnode;
  const classInstance = new type(props);
  const renderVdom = classInstance.render();
  classInstance.oldRenderVdom = vnode.oldRenderVdom = renderVdom;

  return createDOM(renderVdom);
}

export function findDOM(vdom) {
  if (!vdom) return null;
  if (vdom.dom) {
    return vdom.dom;
  } else {
    return findDOM(vdom.oldRenderVdom);
  }
}

export function compareTowVdom(parentNode, oldRenderVdom, newRenderVdom) {
  const oldDOM = findDOM(oldRenderVdom);
  const newDOM = createDOM(newRenderVdom);

  parentNode.replaceChild(newDOM, oldDOM);
}

const ReactDOM = {
  render,
};
export default ReactDOM;
