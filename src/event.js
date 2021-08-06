import { updateQueue } from "./Component";

function addEvent(dom, eventType, handler) {
  const store = dom.store || (dom.store = {});
  const type = eventType.toLowerCase();
  store[type] = handler;

  if (!document[type]) {
    document[type] = dispatchEvent;
  }
}

function dispatchEvent(event) {
  let target = event.target;
  const eventType = `on${event.type}`;
  const synthetivEvent = createSyntheticEvent(event);
  updateQueue.isBacthingUpdate = true;
  while (target) {
    const store = target.store;
    if (store?.[eventType]) {
      store[eventType].call(target, synthetivEvent);
    }
    target = target.parentNode;
  }
  updateQueue.isBacthingUpdate = false;
  updateQueue.batchUpdate();
}

function createSyntheticEvent(event) {
  const syntheticEvent = {};
  for (let key in event) {
    syntheticEvent[key] = event[key];
  }

  return syntheticEvent;
}

export default addEvent;
