import React, { useEffect, useState, useContext, Component, Fragment } from 'react'
import { StepperContext } from '../../../contexts/stepperContext'
import {PDFViewer} from '@react-pdf/renderer'
import Invoice from '../reports3/Invoice'
import axios from 'axios'
import { useParams } from 'react-router-dom'



// import logo from './logo.svg';
import '../index.css';

const AddPaymentStep2 = () => {

    const { studentData, setStudentData } = useContext(StepperContext)

   /*  const { id } = useParams();
    const getPayment = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/paymentbyid/${id}`);
         
          setStudentData({ ...studentData, timepaymentnow: response.data.timepayment })
    
    }
    useEffect(() => {
        getPayment()
    })
    console.log(studentData)
 */
    return (
        <Fragment>
            <PDFViewer width="1000" height="600" className="app" >
                <Invoice studentData={studentData}/>
            </PDFViewer>
        </Fragment>
    );
}

export default AddPaymentStep2;