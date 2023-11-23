import React, { useReducer } from 'react';
import "./Upload.css"

const initialState = 0

const reducer = (state, action) => {
  if(action.type === 'Increment'){
    return state + 1

  }
  if(action.type === 'Decrement'){
    return state - 1

  }

 
  
return state

}; 

export default function Upload() {

  const [state, dispatch] = useReducer(reducer, initialState);

return (
 <>
 <div className='container'>
  <p className='para'>{state}</p>
  <div className='btnstyleproperty'>
    <button className='btn btn-primary mx-5' onClick={() => dispatch({type: 'Increment'})}>Increment</button>
    <button className='btn btn-primary' onClick={() => dispatch({type: 'Decrement'})}>Decrement</button>
  </div>



 </div>
 </>
  )
}

