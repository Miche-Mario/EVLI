import React, { useEffect, useState, useContext, Component, Fragment } from 'react'
import { StepperContext } from '../../contexts/stepperContext'
import {PDFViewer} from '@react-pdf/renderer'
import Invoice from './reports/Invoice'


// import logo from './logo.svg';
import './index.css';

const AddPaymentStep2 = () => {

    const { studentData, setStudentData } = useContext(StepperContext)

console.log(studentData)

    return (
        <Fragment>
            <PDFViewer width="1000" height="600" className="app" >
                <Invoice studentData={studentData}/>
            </PDFViewer>
        </Fragment>
    );
}

export default AddPaymentStep2;