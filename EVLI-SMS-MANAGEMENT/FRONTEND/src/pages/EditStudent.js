import React, {useState, useEffect} from 'react'
import Layout from '../components/Screens/Layout'
import Stepper from '../components/Students/Steps/Stepper'
import StepperControl from '../components/Students/EditStudent/StepperControl'
import GeneralStudInfo from "../components/Students/EditStudent/GeneralStudInfo"
import GuardianStudInfo from "../components/Students/EditStudent/GuardianStudInfo"
import { StepperContext } from '../contexts/stepperContext'
import CoursePurchasesExam from '../components/Students/Steps/CoursesPurchasesExam'
import axios from 'axios'
import { useParams } from 'react-router-dom';


import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/auth/authSlice'


const EditStudent = () => {

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

  const [msg, setMsg] = useState("");
  
  const { id } = useParams();
  const getStudentData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/students/${id}`);
    setStudentData(response.data);
  }


  useEffect(() => {
    getStudentData();
  }, [])



  const steps = [
    "General",
    "Guardian and emergency"
  ]

  const displayStep = (step) => {
    switch(step) {
      case 1:
        return <GeneralStudInfo studentData={studentData} />
      case 2:
        return <GuardianStudInfo />
    }
  }

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction == "next" ? newStep++ : newStep-- ;
    newStep == steps.length + 1 && navigate('/payment')
    //Check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  }

  
    return (
      <Layout>
        <div className='w-full mx:auto p-2 shadow-xl rounded-2xl bg-gray-100'>
          <div className='container horizontal mt-2'>
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
          />
     
          </div>
         
        </div>
</Layout>
    )
}

export default EditStudent