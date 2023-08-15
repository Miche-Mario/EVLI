import React from 'react'

const StepperControl = ({handleClick, currentStep, steps, click, open, clickk}) => {

  return (
    <div className='container mt[2rem] mb-5 m-3  flex justify-between'>
       <div></div>
       { steps.length -1 && <button 
          onClick={(e)=> {handleClick("next")}}
          className={`mr-32 bg-green-400 text-white  uppercase py-2 px-4
          rounded-xl font-semibold cursor-pointer  
          hover:bg-green-600 hover:text-white transition duration-200 ease-in-out
          
          ${!open  && currentStep == steps.length - 1 ? " hidden"
          : "block"}`} 
        >
            {currentStep == steps.length -1  && "Confirm" }
        </button>}
    </div>
  )
}

export default StepperControl