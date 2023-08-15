import React, {useState, useEffect} from 'react'
import Layout from '../components/Screens/Layout'
import Stepper from '../components/PaymentSteps/Stepper'
import StepperControl from '../components/PaymentSteps/AddPaymentByStudentId.js/StepperControl'

import { StepperContext } from '../contexts/stepperContext'


import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/auth/authSlice'

import CoursesPurchasesExam from '../components/PaymentSteps/AddPaymentByStudentId.js/CoursesPurchasesExam'
import Complete from '../components/PaymentSteps/AddPaymentByStudentId.js/Complete'
import PaymentByStudentId from '../components/PaymentSteps/AddPaymentByStudentId.js/PaymentByStudenId'


const AddPaymentByStudentId = () => {

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
    "Courses and Purchases",
    "Add Payment",
    "Receipt"
    
  ]

  const displayStep = (step) => {
    switch(step) {
      case 1:
        return <CoursesPurchasesExam click={click}/>
      case 2:
        return <PaymentByStudentId handleClick={handleClick}/>
      case 3:
        return <Complete click={click}/>
    }
  }

  const handleClick = (direction) => {
    let newStep = currentStep;
  
    direction == "next" ? newStep++ : newStep-- ;

    newStep == steps.length + 1 && navigate('/studentpayment')
  
    //Check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  }
  const click = (e) => {
    e.preventDefault()
    setOpen(!open)
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
                   click={click}
                   clickk={clickk}
          />
          </div>
         
        </div>
</Layout>
    )
}

export default AddPaymentByStudentId