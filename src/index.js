import React from "./react";
import ReactDOM from "./react-dom";

// const Hello = React.createElement('div', {style: {color: 'red'}}, 'hello')
// const Hello = (
//   <div style={{ color: "red" }}>
//     hello<span>world</span>
//   </div>
// );
// function Hello(props) {
//   return (
//     <div style={{ color: props.color }}>
//       hello<span>react</span>
//     </div>
//   );
// }
function TextInput(props, forwardRef) {
  return <input ref={forwardRef} />;
}

const ForwardRefInput = React.forwardRef(TextInput);
class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  state = {
    number: 0,
  };
  handleClick = () => {
    // this.setState((prevState) => {
    //   console.log(prevState);
    //   return {
    //     number: prevState.number + 1,
    //   };
    // });
    // this.setState({
    //   number: this.state.number + 1,
    // });
  };
  render() {
    return (
      <div style={{ color: this.props.color }} onClick={this.handleClick}>
        {/* {this.state.number} */}
        <ForwardRefInput ref={this.inputRef} />
        <button onClick={() => this.inputRef.current.focus()}>focus</button>
      </div>
    );
  }
}

ReactDOM.render(<Hello color="red" />, document.getElementById("root"));
