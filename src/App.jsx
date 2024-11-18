import { useEffect, useRef, useState } from 'react'
import './App.css'

export default function App() {
  const [value, setValue] = useState('');
  const inputRef = useRef();
  const calculate = () => {
    try {
      // Use eval to calculate the result. Use caution as eval can execute arbitrary code.
      setValue(eval(value).toString());
    } catch (error) {
      console.log('Calculation Error:', error)
      setValue('Error')
    }
  };


  const toggleSign = () =>{
    if(!value) return;// If the input is empty, do nothing
    
    setValue((prev) => {
      
      const match = prev.match(/([*/+-]?)\s*([0-9.]+)$/);  // Match last number with operator before it
      if (!match) return prev; // If no valid operand is found, return unchanged
  
      const [, operator, lastOperand] = match;

      let updatedOperand;
      if (lastOperand.startsWith('-(')) {
        updatedOperand = lastOperand.slice(2, -1); // Remove parentheses to make it positive (e.g., -(-4) -> 4)
      } else if (lastOperand.startsWith('(') || lastOperand.startsWith('-')) {
        updatedOperand = lastOperand.slice(1); // Remove '-' and parentheses to make it positive (e.g., -4 -> 4)
      } else {
        updatedOperand = `(-${lastOperand})`; // Wrap in parentheses and add '-' (e.g., 4 -> (-4))
      }

      if (!operator) {
        return `-${lastOperand}`; // For single numbers like `4` or `-4`
      }
  
      // If the operand is part of an expression (e.g., `-4+5`), toggle only the operand
      return prev.slice(0, -lastOperand.length) + updatedOperand;
    });
  };

  useEffect(()=>{
    if(inputRef.current){
      inputRef.current.focus();
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  },[value]);

  const styleMethod = {
    display:"flex",
  }

  return (
      <div className='container'>
        <div className='calculator'>
          <form action='' onSubmit={(e) => e.preventDefault()}>
            <div className='display'>
              <input type='text' value={value} onChange={(e)=>setValue(e.target.value)} ref={inputRef}/>
            </div>
            <div style={styleMethod}>
              <input type='button' value='AC' onClick={() => setValue('')} />
              <input type='button' value='DE' onClick={() => setValue(value.slice(0, -1))} />
              <input type='button' value='+/-' onClick={() => toggleSign()} />
              <input type='button' value='/' onClick={e => setValue(value + e.target.value)} />
            </div>
            <div style={styleMethod}>
              <input type='button' value='7' onClick={e => setValue(value + e.target.value)} />
              <input type='button' value='8' onClick={e => setValue(value + e.target.value)} />
              <input type='button' value='9' onClick={e => setValue(value + e.target.value)} />
              <input type='button' value='*' onClick={e => setValue(value + e.target.value)} />
            </div>
            <div style={styleMethod}>
              <input type='button' value='4' onClick={e => setValue(value + e.target.value)} />
              <input type='button' value='5' onClick={e => setValue(value + e.target.value)} />
              <input type='button' value='6' onClick={e => setValue(value + e.target.value)} />
              <input type='button' value='+' onClick={e => setValue(value + e.target.value)} />
            </div>
            <div style={styleMethod}>
              <input type='button' value='1' onClick={e => setValue(value + e.target.value)} />
              <input type='button' value='2' onClick={e => setValue(value + e.target.value)} />
              <input type='button' value='3' onClick={e => setValue(value + e.target.value)} />
              <input type='button' value='-' onClick={e => setValue(value + e.target.value)} />
            </div>
            <div style={styleMethod}>
              <input type='button' value='00' onClick={e => setValue(value + e.target.value)} />
              <input type='button' value='0' onClick={e => setValue(value + e.target.value)} />
              <input type='button' value='.' onClick={e => setValue(value + e.target.value)} />
              <input type='button' value='=' className='equal' onClick={calculate} />
            </div>
          </form>
        </div>
      </div>
  )
}


//Other Method

/*const handleClick = (input) => {
  if (input === '=') {
    setValue(calculateExpression(value)); // Use the reusable method
  } else if (input === 'AC') {
    setValue('');
  } else if (input === 'DE') {
    setValue(value.slice(0, -1));
  } else {
    setValue(value + input);
  }
};

onClick={() => handleClick('value')} */
