import React, {useState, useEffect} from 'react'
import Layout from '../components/Screens/Layout'
import Stepper from '../components/PaymentSteps/Stepper'
import StepperControl from '../components/PaymentSteps/StepperControl'

import { StepperContext } from '../contexts/stepperContext'


import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/auth/authSlice'
import AddPaymentStep2 from '../components/PaymentSteps/AddPaymentStep2'
import AddPaymentStep1 from '../components/PaymentSteps/AddPaymentStep1'


const AddPayment = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch])

  useEffect(() => {
    if(isError) {
      navigate("/")
    }
  }, [isError, navigate
  ])


  const [currentStep, setCurrentStep] = useState(1);
  const [studentData, setStudentData] = useState('');
  const [finalData, setFinalData] = useState([]);
  const [open, setOpen] = useState(false)

  const steps = [
    "Add Payment",
    "Receipt"
    
  ]

  const displayStep = (step) => {
    switch(step) {
      case 1:
        return <AddPaymentStep1 open={open} setOpen={setOpen}/>
      case 2:
        return <AddPaymentStep2/>
    }
  }

  const handleClick = (direction) => {
    let newStep = currentStep;
  
    direction == "next" ? newStep++ : newStep-- ;
  
    //Check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  }

  const clickk = (e) => {
    e.preventDefault()
    setOpen(false)
  }
  
    return (
      <Layout>
        <div className='w-full mx:auto p-2 shadow-xl rounded-2xl bg-gray-100'>
          <div className='container horizontal'>
          <Stepper
              steps={steps}  
              currentStep={currentStep}
          />
          <div className='my-10 p-2 pb-0'>
            <StepperContext.Provider value={{
              studentData,
              setStudentData,
              finalData,
              setFinalData

            }}>
              {displayStep(currentStep)}
            </StepperContext.Provider>
          </div>
       
          <StepperControl
                   handleClick={handleClick}
                   currentStep={currentStep}
                   steps={steps}
                   open={open}
                   clickk={clickk}
          />
          </div>
         
        </div>
</Layout>
    )
}

export default AddPayment