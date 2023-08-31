import React from 'react'

const StepperControl = ({handleClick, currentStep, steps, click, open, clickk}) => {


  
  return (
    <div className='container mt[2rem] mb-5 m-3  flex justify-between'>
       { currentStep == steps.length  ?
       
       <div></div>
       :
       <button 
          onClick={(e)=> {handleClick(); clickk(e)}}
          className={`ml-32 btn btn-outline-secondary border border-black w-48 p-2 bg-gray-100 text-gray-700 
          ${currentStep == 1 ? "p-2 cursor-not-allowed text-gray-300"
          : ""} 
          
        `}
        >
            Back
        </button>}
{ currentStep == 1  &&    <button 
          onClick={(e)=> {handleClick("next")}}
          className={`mr-32 bg-green-400 text-white  uppercase py-2 px-4
          rounded-xl font-semibold cursor-pointer  
          hover:bg-green-600 hover:text-white transition duration-200 ease-in-out block`} 
        >
            Next
        </button>}

        { open  &&    <button 
          onClick={(e)=> {handleClick("next")}}
          className={`mr-32 bg-green-400 text-white  uppercase py-2 px-4
          rounded-xl font-semibold cursor-pointer  
          hover:bg-green-600 hover:text-white transition duration-200 ease-in-out block`} 
        >
            Receipt
        </button>}
      

        {  currentStep == steps.length &&     <button 
          onClick={(e)=> window.location.reload()}
          className={`mr-32 bg-green-400 text-white  uppercase py-2 px-4
          rounded-xl font-semibold cursor-pointer  
          hover:bg-green-600 hover:text-white transition duration-200 ease-in-out block`} 
        >
            Go back
        </button>}
    </div>
  )
}

export default StepperControl