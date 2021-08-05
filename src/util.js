const REACT_TEXT = Symbol("REACT_TEXT");

export const wrapToVdom = (element) => {
  return typeof element === "string" || typeof element === "number"
    ? {
        type: REACT_TEXT,
        props: {
          content: element,
        },
      }
    : element;
};
