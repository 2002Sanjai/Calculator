import { useState } from 'react'
import './App.css'

export default function App() {
  const [value , setValue] = useState('');
  const calculate = () =>{
    try{
      // Use eval to calculate the result. Use caution as eval can execute arbitrary code.
      setValue(eval(value).toString());
    }catch(error){
      console.log('Calculation Error:',error)
      setValue('Error')
    }
  }
  return (
    <div className='container'>
      <div className='calculator'>
        <form action='' onSubmit={(e) => e.preventDefault()}>
          <div className='display'>
            <input type='text' value={value} readOnly/>
          </div>
          <div>
            <input type='button' value='AC' onClick={() =>setValue('')}/>
            <input type='button' value='DE' onClick={() =>setValue(value.slice(0,-1))}/>
            <input type='button' value='.' onClick={e => setValue(value + e.target.value)}/>
            <input type='button' value='/' onClick={e => setValue(value + e.target.value)}/>
          </div>
          <div>
            <input type='button' value='7' onClick={e => setValue(value + e.target.value)} />
            <input type='button' value='8' onClick={e => setValue(value + e.target.value)}/>
            <input type='button' value='9' onClick={e => setValue(value + e.target.value)}/>
            <input type='button' value='*' onClick={e => setValue(value + e.target.value)}/>
          </div>
          <div>
            <input type='button' value='4' onClick={e => setValue(value + e.target.value)}/>
            <input type='button' value='5' onClick={e => setValue(value + e.target.value)}/>
            <input type='button' value='6' onClick={e => setValue(value + e.target.value)}/>
            <input type='button' value='+' onClick={e => setValue(value + e.target.value)}/>
          </div>
          <div>
            <input type='button' value='1' onClick={e => setValue(value + e.target.value)}/>
            <input type='button' value='2' onClick={e => setValue(value + e.target.value)}/>
            <input type='button' value='3' onClick={e => setValue(value + e.target.value)}/>
            <input type='button' value='-' onClick={e => setValue(value + e.target.value)}/>
          </div>
          <div>
            <input type='button' value='00' onClick={e => setValue(value + e.target.value)}/>
            <input type='button' value='0' onClick={e => setValue(value + e.target.value)}/>
            <input type='button' value='3' onClick={e => setValue(value + e.target.value)}/>
            <input type='button' value='=' className='equal' onClick={calculate}/>
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
