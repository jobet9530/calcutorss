import React, { useState } from "react";
import "./styles.css";

const App = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [isScientific, setIsScientific] = useState(false);

  const customButtonPress = (value) => {
    if (value === "C") {
      setText("");
      setResult("");
    } else if (value === "=") {
      try {
        const evaluatedResult = evaluateExpression(text);
        setResult(evaluatedResult.toString());
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "⌫") {
      if (text.length > 0) {
        setText(text.substring(0, text.length - 1));
      }
    } else if (value === "+/-") {
      if (text.length > 0 && !text.startsWith("-")) {
        setText("-" + text);
      } else if (text.length > 0 && text.startsWith("-")) {
        setText(text.substring(1));
      }
    } else if (value === "%") {
      try {
        const percentageResult = (evaluateExpression(text) / 100).toString();
        setResult(percentageResult);
      } catch (error) {
        setResult("Error");
      }
    } else {
      setText(text + value);
    }
  };

  const evaluateExpression = (expression) => {
    try {
      const result = eval(expression);
      if (isNaN(result)) {
        throw new Error("Invalid expression");
      }
      return result;
    } catch (error) {
      console.error("Error evaluating expression:", error);
      throw new Error("Invalid expression");
    }
  };

  const renderButtons = () => {
    const rows = [
      ["C", "7", "8", "9", "/"],
      ["⌫", "4", "5", "6", "x"],
      ["+/-", "1", "2", "3", "+"],
      ["%", "0", ".", "="],
    ];

    if (isScientific) {
      rows.push(["sin", "cos", "tan", "sqrt"]);
    }

    return rows.map((row, rowIndex) => (
      <div key={rowIndex} className="buttonRow">
        {row.map((value) => (
          <button
            key={value}
            className="button"
            onClick={() => customButtonPress(value)}
          >
            {value}
          </button>
        ))}
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="resultContainer">
        <p className="resultText">{result === "" ? text : result}</p>
      </div>
      <div className="buttonContainer">{renderButtons()}</div>
      <div className="switchContainer">
        <label>
          Regular
          <input
            type="checkbox"
            checked={isScientific}
            onChange={(e) => setIsScientific(e.target.checked)}
          />
          Scientific
        </label>
      </div>
    </div>
  );
};

export default App;
