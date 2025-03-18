// Calculator.tsx
import React, { useState } from 'react';
import './Calculator.css';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [expression, setExpression] = useState<string>('0');
  const [calculated, setCalculated] = useState<boolean>(false);

  const appendCharacter = (char: string): void => {
    if (calculated) {
      // If we just calculated a result and user types a number,
      // start a new calculation
      if (/[0-9]/.test(char)) {
        setExpression(char);
        setDisplay(char);
        setCalculated(false);
      } else {
        // Otherwise continue with the result
        setExpression(display + char);
        setDisplay(display + char);
        setCalculated(false);
      }
    } else {
      if (expression === '0' && char !== '.') {
        setExpression(char);
        setDisplay(char);
      } else {
        setExpression(expression + char);
        setDisplay(display + char);
      }
    }
  };

  const clearDisplay = (): void => {
    setExpression('0');
    setDisplay('0');
    setCalculated(false);
  };

  const backspace = (): void => {
    if (expression.length > 1) {
      setExpression(expression.slice(0, -1));
      setDisplay(display.slice(0, -1));
    } else {
      setExpression('0');
      setDisplay('0');
    }
  };

  const calculate = (): void => {
    try {
      // Replace × with * for JavaScript evaluation
      const sanitizedExpression = expression.replace(/×/g, '*');
      
      // Use Function instead of eval for better security
      // eslint-disable-next-line no-new-func
      const result = Function(`'use strict'; return (${sanitizedExpression})`)();
      
      // Format the result
      const formattedResult = typeof result === 'number' 
        ? Number.isInteger(result)
          ? result.toString()
          : parseFloat(result.toFixed(8)).toString()
        : 'Error';
      
      setDisplay(formattedResult);
      setExpression(formattedResult);
      setCalculated(true);
    } catch (error) {
      setDisplay('Error');
      setTimeout(clearDisplay, 1000);
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button className="clear" onClick={clearDisplay}>C</button>
        <button onClick={() => appendCharacter('(')}>(</button>
        <button onClick={() => appendCharacter(')')}>)</button>
        <button className="operator" onClick={() => appendCharacter('/')}>/</button>
        
        <button onClick={() => appendCharacter('7')}>7</button>
        <button onClick={() => appendCharacter('8')}>8</button>
        <button onClick={() => appendCharacter('9')}>9</button>
        <button className="operator" onClick={() => appendCharacter('×')}>×</button>
        
        <button onClick={() => appendCharacter('4')}>4</button>
        <button onClick={() => appendCharacter('5')}>5</button>
        <button onClick={() => appendCharacter('6')}>6</button>
        <button className="operator" onClick={() => appendCharacter('-')}>-</button>
        
        <button onClick={() => appendCharacter('1')}>1</button>
        <button onClick={() => appendCharacter('2')}>2</button>
        <button onClick={() => appendCharacter('3')}>3</button>
        <button className="operator" onClick={() => appendCharacter('+')}>+</button>
        
        <button onClick={() => appendCharacter('0')}>0</button>
        <button onClick={() => appendCharacter('.')}>.</button>
        <button onClick={backspace}>←</button>
        <button className="equals" onClick={calculate}>=</button>
      </div>
    </div>
  );
};

export default Calculator;