import { compareTowVdom, findDOM } from "./react-dom";

export const updateQueue = {
  isBacthingUpdate: false,
  updaters: new Set(),
  batchUpdate() {
    this.updaters.forEach((updater) => {
      updater.updateComponent();
    });
    this.updaters.clear();
  },
};

class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    this.pendingState = [];
  }
  addState(partialState) {
    this.pendingState.push(partialState);
    this.emitUpdate();
  }
  emitUpdate() {
    if (updateQueue.isBacthingUpdate) {
      updateQueue.updaters.add(this);
    } else {
      this.updateComponent();
    }
  }
  updateComponent() {
    const { pendingState, classInstance } = this;
    if (pendingState.length) {
      shouldUpdate(classInstance, this.getState());
    }
    pendingState.length = 0;
  }
  getState() {
    const { classInstance, pendingState } = this;
    const currentState = classInstance.state;
    let newState = { ...currentState };
    pendingState.forEach((partialState) => {
      if (typeof partialState === "function") {
        partialState = partialState(newState);
      }
      newState = { ...newState, ...partialState };
    });

    return newState;
  }
}

function shouldUpdate(classInstance, nextState) {
  classInstance.state = nextState;
  classInstance.forceUpdate();
}

class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.updater = new Updater(this);
  }
  setState(partialState) {
    this.updater.addState(partialState);
  }
  forceUpdate() {
    const oldRenderVdom = this.oldRenderVdom;
    const newRenderVdom = this.render();
    const oldDOM = findDOM(oldRenderVdom);

    compareTowVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);
    this.oldRenderVdom = newRenderVdom;
  }
}

export default Component;
