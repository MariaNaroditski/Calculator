import React, { Component } from "react";
import { create, all } from "mathjs";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import ClearButton from "./components/ClearButton";
import Display from "./components/Display";
import Title from "./components/Title";
import DeleteButton from "./components/DeleteButton";

class App extends Component {
  initState = {
    mathExpresstion: "0",
    input: "0",
    isFirst: true,
    countBruckets: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.initState,
    };
  }

  // this function accepts number and add it to the input line. if this is the first time it is called
  // we will replace the 0 with the number. otherwise, we will concat the number to existing input
  addToInput = (val) => {
    if (val !== "0" || this.state.input !== "0") {
      if (this.state.isFirst && this.state.input === "0") {
        this.setState({ isFirst: false, input: val, mathExpresstion: val });
      } else {
        this.setState({
          input: this.state.input + val,
          mathExpresstion: this.state.mathExpresstion + val,
        });
      }
    }
  };

  addDecimal = (val) => {
    //only add decimal if there is no current decimal point present in the input area
    if (this.state.input.indexOf(".") === -1) {
      this.setState({
        input: this.state.input + val,
        isFirst: false,
        mathExpresstion: this.state.mathExpresstion + val,
      });
    }
  };

  clearInput = () => {
    this.setState({ ...this.initState });
  };

  add = () => {
    this.setState({
      input: "",
      mathExpresstion: this.state.mathExpresstion + "+",
    });
  };

  subtract = () => {
    this.setState({
      input: "",
      mathExpresstion: this.state.mathExpresstion + "-",
    });
  };

  multiply = () => {
    this.setState({
      input: "",
      mathExpresstion: this.state.mathExpresstion + "*",
    });
  };

  divide = () => {
    this.setState({
      input: "",
      mathExpresstion: this.state.mathExpresstion + "/",
    });
  };

  openBrucket = () => {
    if (this.state.isFirst) {
      this.setState({
        input: "",
        mathExpresstion: "(",
        isFirst: false,
        countBruckets: this.state.countBruckets + 1,
      });
    } else {
      this.setState({
        input: "",
        mathExpresstion: this.state.mathExpresstion + "(",
        countBruckets: this.state.countBruckets + 1,
      });
    }
  };

  closeBrucket = () => {
    this.setState({
      input: "",
      mathExpresstion: this.state.mathExpresstion + ")",
      countBruckets: this.state.countBruckets - 1,
    });
  };

  delete = () => {
    if (this.state.mathExpresstion.length > 1) {
      const mathExpresstion = this.state.mathExpresstion.substring(
        0,
        this.state.mathExpresstion.length - 1
      );

      let i = mathExpresstion.length - 1;
      let input = "";

      if (!isNaN(mathExpresstion[i])) {
        while (i > 0 && !isNaN(mathExpresstion[i])) {
          i--;
        }

        if (isNaN(mathExpresstion[i])) {
          i++;
        }

        input = mathExpresstion.substring(i);
      }

      if (
        this.state.mathExpresstion[this.state.mathExpresstion.length - 1] ===
        ")"
      ) {
        this.setState({
          countBruckets: this.state.countBruckets + 1,
        });
      }

      this.setState({
        input,
        mathExpresstion,
      });
    } else {
      this.clearInput();
    }
  };

  evaluate = () => {
    const config = {};
    const math = create(all, config);
    let tempRes;
    try {
      tempRes = math.evaluate(this.state.mathExpresstion);

      // set the property isFirst to true so if we click on number after evaluation,
      // the input will be replaced with the new number.
      this.setState({
        input: tempRes.toString(),
        isFirst: true,
        mathExpresstion: tempRes.toString(),
      });
    } catch (error) {
      this.setState({
        input: "Invalid Calculation",
        mathExpresstion: "Invalid-Calculation",
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Title />
        <div className="calc-wrapper">
          <div className="row">
            <Display expression={this.state.mathExpresstion}></Display>
          </div>
          <div className="row">
            <Input>{this.state.input}</Input>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>7</Button>
            <Button handleClick={this.addToInput}>8</Button>
            <Button handleClick={this.addToInput}>9</Button>
            <Button handleClick={this.divide}>/</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>4</Button>
            <Button handleClick={this.addToInput}>5</Button>
            <Button handleClick={this.addToInput}>6</Button>
            <Button handleClick={this.multiply}>*</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>1</Button>
            <Button handleClick={this.addToInput}>2</Button>
            <Button handleClick={this.addToInput}>3</Button>
            <Button handleClick={this.add}>+</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addDecimal}>.</Button>
            <Button handleClick={this.addToInput}>0</Button>
            <Button handleClick={this.evaluate}>=</Button>
            <Button handleClick={this.subtract}>-</Button>
          </div>
          <div className="row">
            <DeleteButton
              handleClick={this.delete}
              disable={this.state.isFirst || this.state.mathExpresstion === "0"}
            />
            <ClearButton handleClick={this.clearInput}>Clear</ClearButton>
            <Button handleClick={this.openBrucket}>(</Button>
            <Button
              handleClick={this.closeBrucket}
              disable={!this.state.countBruckets}
            >
              )
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
