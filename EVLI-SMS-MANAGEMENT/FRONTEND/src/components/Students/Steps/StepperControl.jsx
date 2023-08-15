import React from 'react'

const StepperControl = ({handleClick,handleProceed, currentStep, steps}) => {

  return (
    <div className='container -mt-8 flex justify-around'>
        <button 
          onClick={()=> handleClick()}
          className={`bg-white text-slate-400 uppercase py-2 px-4
          rounded-xl font-semibold cursor-pointer border-2 border-slate-300
          hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out
          ${currentStep ==1 ? "opacity-50 cursor-not-allowed"
          : ""}`}
        >
            back
        </button>
        <button 
          onClick={()=>{ handleClick('next'); }}
          className='bg-green-500 text-white  uppercase py-2 px-4
          rounded-xl font-semibold cursor-pointer  
          hover:bg-blue-700 hover:text-white transition duration-200 ease-in-out '
          id="box"
        >
            {currentStep == steps.length ? "Proceed" : "Next"}
        </button>
    </div>
  )
}

export default StepperControl