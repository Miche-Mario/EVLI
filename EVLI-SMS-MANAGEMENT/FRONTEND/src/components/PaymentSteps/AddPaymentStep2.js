import React, { useEffect, useState, useContext, Component, Fragment } from 'react'
import { StepperContext } from '../../contexts/stepperContext'
import {PDFViewer} from '@react-pdf/renderer'
import Invoice from './reports/Invoice'

import { Player } from '@lottiefiles/react-lottie-player';

import Icone from "./NoPayment.json"


// import logo from './logo.svg';
import './index.css';

const AddPaymentStep2 = () => {

    const { studentData, setStudentData } = useContext(StepperContext)
console.log(studentData.paymentstatus);

    return (
        <>
            
           { studentData.paymentstatus == 1 ? 
           
           (
            <div className='flex flex-col justify-center items-center'>
                <p className=' font-bold text-2xl'>Payment pending</p>
                <Player
                              src={Icone}
                              className="player pt-5 w-[15rem]"
                              loop
                              autoplay
                            />
            </div>
           )
           : 
            <PDFViewer width="1000" height="600" className="app" >
                <Invoice studentData={studentData}/>
            </PDFViewer>
}
        
        </>
    );
}

export default AddPaymentStep2;