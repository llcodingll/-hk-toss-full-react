import { evaluate } from "mathjs";
import { useState } from "react"

const Calculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");

    const handleClick = (value) => {
        setInput((prev) => prev + value);
    };

    const clearInput = () => {
        setInput("");
        setResult("");
    };

    const calculateResult = () => {
        try{
            setResult(evaluate(input));
        } catch{
            setResult("Error");
        }
    };

    const buttons = [
        'C', '/', '*', '-', 
        '7', '8', '9', '+',
        '4', '5', '6', '=',
        '1', '2', '3', '0', '.'
    ];

    return(
        <div className="calculator">
        <div className="display">
            {input || '0'}
            <div className="result">{result}</div>
      </div>
      <div className="buttons">
        {buttons.map((btn, i) => (
          <button
            key={i}
            value={btn}
            onClick={
              btn === 'C'
                ? clearInput
                : btn === '='
                ? calculateResult
                : () => handleClick(btn)
            }
          />
        ))}
      </div>
    </div>
    );
};

export default Calculator;