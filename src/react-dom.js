function render(vnode, container) {
  const el = createNode(vnode);

  container.appendChild(el);
}

function createNode(vnode) {
  const { type, props } = vnode;
  let el;
  if (typeof type === "string") {
    el = document.createElement(type);
    updateProps(el, props);
  }
  if (props.children) {
    let children;
    if (!Array.isArray(props.children)) {
      children = [props.children];
    }
    children.forEach((childVnode) => {
      render(childVnode, el);
    });
  }

  return el;
}

function updateProps(el, props) {
  for (let prop in props) {
    if (prop === "style") {
      for (let key in props["style"]) {
        el.style[key] = props["style"][key];
      }
    } else {
      el.setAttribute(prop, props[prop]);
    }
  }
}

module.exports = {
  render,
};
