import React, { useState } from 'react';
import { evaluate } from 'mathjs'; // math.js에서 evaluate 함수 가져오기

const Calculator = () => {
  const [input, setInput] = useState(''); // 입력된 수식
  const [result, setResult] = useState(null); // 계산 결과

  // input 필드가 변경될 때 상태 업데이트
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // 키보드의 Enter 키를 감지하여 수식을 계산
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick('=');
    }
  };

  // 버튼 클릭 시 처리
  const handleClick = (value) => {
    if (value === '=') {
      // 수식 계산 처리
      try {
        // ×와 ÷를 각각 *와 /로 변환하여 처리
        const sanitizedInput = input.replace(/×/g, '*').replace(/÷/g, '/');
        const calcResult = evaluate(sanitizedInput); // math.js로 수식 계산
        setResult(calcResult);
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      // 초기화
      setInput('');
      setResult(null);
    } else {
      // 연산자 및 숫자 추가
      setInput((prevInput) => prevInput + value);
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-display">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}  // Enter 키를 감지
          placeholder="0"
          className="input-field"
        />
        <div className="result-display">{result !== null ? result : ''}</div> {/* 결과 표시 */}
      </div>
      <div className="calculator-buttons">
        {/* 연산자 버튼 */}
        {['+', '-', '×', '÷'].map((op) => (
          <button key={op} onClick={() => handleClick(op)}>
            {op}
          </button>
        ))}
        <button onClick={() => handleClick('C')}>C</button> {/* 초기화 버튼 */}
      </div>
    </div>
  );
};

export default Calculator;