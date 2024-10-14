import React from "react";
import Buttons from "./Button";
import Output from "./Output";
import Formula from "./Formula";
import './styles/Calculator.css';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: "0",
      prevVal: "0",
      formula: "",
      currentSign: "pos",
      lastClicked: "",
      evaluated: false,
    };
    this.maxDigitWarning = this.maxDigitWarning.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.initialize = this.initialize.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
  }

  maxDigitWarning() {
    this.setState({ currentVal: "Digit Limit Met", prevVal: this.state.currentVal });
    setTimeout(() => this.setState({ currentVal: this.state.prevVal }), 1000);
  }

  handleEvaluate() {
    if (!this.state.currentVal.includes("Limit")) {
        let expression = this.state.formula;
        
        // Remove any trailing operators except minus for cases like "5*-5"
        while (/[x/+]-$/.test(expression) || /[x/+]$/.test(expression)) {
            expression = expression.slice(0, -1);
        }

        expression = expression.replace(/x/g, "*").replace(/--/g, "+");
        
        try {
            let answer = Math.round(1e12 * eval(expression)) / 1e12;
            this.setState({
                currentVal: answer.toString(),
                formula: expression.replace(/\*/g, "⋅").replace(/(x|\/|\+)-/, "$1-") + "=" + answer,
                prevVal: answer,
                evaluated: true,
            });
        } catch (error) {
            this.setState({ currentVal: "Error", formula: "" });
        }
    }
}


handleOperators(e) {
  if (!this.state.currentVal.includes("Limit")) {
      const value = e.target.value;
      const { formula, prevVal, evaluated } = this.state;
      this.setState({ currentVal: value, evaluated: false });

      if (evaluated) {
          this.setState({ formula: prevVal + value });
      } else {
          const endsWithOperator = /[x/+-]$/;
          const endsWithNegative = /[x/+]-(?![\d])/;

          if (endsWithOperator.test(formula)) {
              if (value === "-") {
                  // Allow patterns like "*-" or "/-"
                  this.setState({ formula: formula + value });
              } else if (endsWithNegative.test(formula)) {
                  // Replace only the last non-minus operator
                  this.setState({ formula: formula.slice(0, -2) + value });
              } else {
                  // Replace the last operator with the new one
                  this.setState({ formula: formula.slice(0, -1) + value });
              }
          } else {
              // Append the new operator to the formula
              this.setState({ formula: formula + value });
          }
      }
  }
}


  

  handleNumbers(e) {
    if (!this.state.currentVal.includes("Limit")) {
      const { currentVal, formula, evaluated } = this.state;
      const value = e.target.value;
      this.setState({ evaluated: false });

      if (currentVal.length > 21) {
        this.maxDigitWarning();
      } else if (evaluated) {
        this.setState({ currentVal: value, formula: value !== "0" ? value : "" });
      } else {
        this.setState({
          currentVal: currentVal === "0" || /[x/+-]/.test(currentVal) ? value : currentVal + value,
          formula: currentVal === "0" && value === "0" ? formula : /([^.0-9]0|^0)$/.test(formula) ? formula.slice(0, -1) + value : formula + value,
        });
      }
    }
  }

  handleDecimal() {
    if (this.state.evaluated) {
      this.setState({ currentVal: "0.", formula: "0.", evaluated: false });
    } else if (!this.state.currentVal.includes(".") && !this.state.currentVal.includes("Limit")) {
      this.setState({ evaluated: false });

      if (this.state.currentVal.length > 21) {
        this.maxDigitWarning();
      } else if (/[x/+-]$/.test(this.state.formula) || (this.state.currentVal === "0" && this.state.formula === "")) {
        this.setState({ currentVal: "0.", formula: this.state.formula + "0." });
      } else {
        this.setState({ currentVal: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + ".", formula: this.state.formula + "." });
      }
    }
  }
  initialize() {
    this.setState({ currentVal: "0", prevVal: "0", formula: "", currentSign: "pos", lastClicked: "", evaluated: false });
  }

  render() {
    return (
      <div>
        <div className="calculator">
          <Formula formula={this.state.formula.replace(/x/g, "⋅")} />
          <Output currentValue={this.state.currentVal} />
          <Buttons
            decimal={this.handleDecimal}
            evaluate={this.handleEvaluate}
            initialize={this.initialize}
            numbers={this.handleNumbers}
            operators={this.handleOperators}
          />
        </div>
        <div className="author">
          Designed and Coded By <br />
          <a href="https://www.freecodecamp.org/devFredrickmureti" target="_blank" rel="noreferrer">Fredrick Mureti</a>
        </div>
      </div>
    );
  }
}

export default Calculator;
