

import React, { useState, useEffect, useContext } from 'react'

import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';
import Logo from '../../assets/logoo.png'
import { StepperContext } from '../../contexts/stepperContext'
import axios from 'axios'


const styles = StyleSheet.create({
    page: { paddingLeft: 0, paddingRight: 0, display: 'flex', backgroundColor: 'white', margin: 10 },
    header: { marginTop: 20, flexDirection: "row", marginHorizontal: 26, alignItems: 'center' },
    headerLogo: { width: 200 },
    headerTitle: { fontSize: 25, color: "green" },
    sectionFirst: { marginHorizontal: 32, marginTop: 10, flexDirection: "row", alignItems: 'center' },
    line1: { backgroundColor: "white", padding: 4, color: "black", marginHorizontal: 30, flexDirection: "row", alignItems: 'center' },
    line2: { backgroundColor: "#E7F0FF", padding: 4, color: "black", marginHorizontal: 30, flexDirection: "row", alignItems: 'center' }
});


const Invoice = (props) => {
    const { courseList, examList, purchaseList, accoList, otherFeeList, total, subtotal, registrationList, currency, studdiscount, surnameg, addresshomeg, forenamesg, passportidg, citizenshipg } = props.studentData


    function separator(numb) {
        var str = numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return str.join(".");
    }

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    let text = '';
  
   
    
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View>
                        <Image style={styles.headerLogo} src={Logo} />
                    </View>
                    <View style={{ marginLeft: 150 }}>
                        <Text style={styles.headerTitle}>INVOICE</Text>
                    </View>
                </View>
                <View style={styles.sectionFirst}>
                    <View style={{ width: 240 }}>
                        <Text style={{ fontSize: 9 }}>EAGLE VISION LANGUAGE INSTITUTE </Text>
                        <Text style={{ fontSize: 9, marginTop: 2 }}>45 Manye Adorkor Avenue New Achimota </Text>
                        <Text style={{ fontSize: 9, marginTop: 2 }}>P.0 box MS 474 Mile 7 New-Achimota Accra</Text>
                        <Text style={{ fontSize: 9, marginTop: 2 }}>Tel. +233302405496</Text>
                        <Text style={{ fontSize: 9, marginTop: 2 }}>Email: jodan@eaglevisionworld.com</Text>
                    </View>
                    <View style={{ marginTop: 5, flexDirection: "row", marginLeft: 130 }}>
                        <View style={{ flexDirection: "column", alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 8, color: "green", marginTop: 2 }}>Invoice No : </Text>
                            <Text style={{ fontSize: 8, color: "green", marginTop: 2 }}>Date : </Text>

                        </View>
                        <View style={{ flexDirection: "column", alignItems: "start" }}>
                            <Text style={{ fontSize: 9, fontWeight: "bold", marginHorizontal: 4, marginTop: 2 }}>EVLI{passportidg} </Text>
                            <Text style={{ fontSize: 9, fontWeight: "bold", marginHorizontal: 4, marginTop: 2 }}>{+day + "/" + month + "/" + year} </Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 20, marginHorizontal: 30 }}>
                    <Text style={{ marginTop: 3, fontSize: "10", fontWeight: "800" }}>{surnameg} {forenamesg}</Text>
                    <Text style={{ marginTop: 3, fontSize: "9" }}>{addresshomeg}</Text>
                    <Text style={{ marginTop: 3, fontSize: "9" }}>{citizenshipg}</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={{ backgroundColor: "#2E74B4", padding: 10, color: "white", marginHorizontal: 30, flexDirection: "row", alignItems: 'center' }}>
                      
                        <View style={{ width: 430 }}>
                            <Text style={{ fontSize: 9 }}>Service</Text>
                        </View>
                        <View style={{ width: 150, }}>
                            <Text style={{ fontSize: 9, paddingLeft: 2 }}>Payment Terms</Text>
                        </View>
                        <View style={{ width: 150 }}>
                            <Text style={{ fontSize: 9, paddingLeft: 4 }}></Text>
                        </View>

                    </View>
                    <View style={{ backgroundColor: "#E7F0FF", color: "black", marginHorizontal: 30, flexDirection: "row", alignItems: 'center' }}>
                        
                        <View style={{ width: 430 }}>
                            <Text style={{ fontSize: 10, paddingLeft: 5 }}>
                                <Text style={{ textTransform: "uppercase", marginLeft: "15%", fontSize: 9 }}>

                                {courseList.length === 1  && courseList[0].coursedescription}

                                {courseList.length > 1 && courseList[0].coursedescription}
                                {courseList.length >= 2 && " WITH "}
                                {courseList.length >= 2 && courseList[1].coursedescription}
                                {courseList.length >= 2 && " PREPARATIONS"}
                                {courseList.length >= 3 && " WITH "}
                                {courseList.length >= 3 && courseList[2].laduration + " WEEKS COMPUTER LITERACY"}

                                { courseList.length > 0 && examList.length > 0 && " WITH "}
                                {examList.length > 0 && examList[0].examdescription}

                                {((courseList.length > 0 || examList.length > 0) && accoList.length > 0)&& " WITH "}
                                {accoList.length > 0 && accoList[0].acotimes + " MONTHS ACCOMODATION"}

                                </Text>
                            </Text>
                        </View>
                        <View style={{ width: 150 }}>
                            <Text style={{ fontSize: 9 }}>Due Upon Receipt</Text>
                        </View>
                        <View style={{ width: 150 }}>
                            <Text style={{ fontSize: 9 }}></Text>
                        </View>
                    </View>

                </View>

                <View style={{ marginTop: 8, }}>
                    <View style={{ backgroundColor: "#2E74B4", padding: 10, color: "white", marginHorizontal: 30, flexDirection: "row", alignItems: 'center' }}>
                        <View style={{ width: 150 }}>
                            <Text style={{ fontSize: 9 }}>Quantity</Text>
                        </View>
                        <View style={{ width: 280 }}>
                            <Text style={{ fontSize: 9 }}>Description</Text>
                        </View>
                        <View style={{ width: 150 }}>
                            <Text style={{ fontSize: 9 }}>Unit Price</Text>
                        </View>
                        <View style={{ width: 150 }}>
                            <Text style={{ fontSize: 9, paddingLeft: 3 }}>Line Total</Text>
                        </View>

                    </View>
                    {registrationList !== 0 &&
                        registrationList.map((regist, index) => (
                            <View style={[index % 2 === 0 && styles.line1, index % 2 !== 0 && styles.line2]}>
                                <View style={{ width: 150 }}>
                                    <Text style={{ fontSize: 9, paddingLeft: 5 }}>1</Text>
                                </View>
                                <View style={{ width: 280 }}>
                                    <Text style={{ fontSize: 9 }}>{regist.registrationname}</Text>
                                </View>
                                <View style={{ width: 150 }}>
                                    <Text style={{ fontSize: 9, fontWeight: "extralight" }}>{regist.lecurrency} {separator(regist.regir)}</Text>
                                </View>
                                <View style={{ width: 150 }}>
                                    <Text style={{ fontSize: 9 }}>{regist.lecurrency} {separator(regist.regir)} </Text>
                                </View>
                            </View>
                        ))

                    }


                    {courseList !== 0 &&
                        courseList.map((courses, index) => (
                            <View style={[index % 2 === 0 && styles.line1, index % 2 !== 0 && styles.line2]}>
                                <View style={{ width: 150 }}>
                                    <Text style={{ fontSize: 9, paddingLeft: 5 }}>1</Text>
                                </View>
                                <View style={{ width: 280 }}>
                                    <Text style={{ fontSize: 9 }}> {courses.coursedescription}</Text>
                                </View>
                                <View style={{ width: 150 }}>
                                    <Text style={{ fontSize: 9, fontWeight: "extralight" }}>{courses.lecurrency} {separator(courses.price)}</Text>
                                </View>
                                <View style={{ width: 150 }}>
                                    <Text style={{ fontSize: 9 }}>{courses.lecurrency} {separator(courses.price)} </Text>
                                </View>
                            </View>
                        ))

                    }
                    {examList !== 0 &&
                        examList.map((exam, index) => (
                            <View style={[index % 2 === 0 && styles.line1, index % 2 !== 0 && styles.line2]}>
                                <View style={{ width: 150 }}>
                                    <Text style={{ fontSize: 9, paddingLeft: 5 }}>1</Text>
                                </View>
                                <View style={{ width: 280 }}>
                                    <Text style={{ fontSize: 9 }}> {exam.examdescription}</Text>
                                </View>
                                <View style={{ width: 150 }}>
                                    <Text style={{ fontSize: 9, fontWeight: "extralight" }}>{exam.lecurrency} {separator(exam.examprice)}</Text>
                                </View>
                                <View style={{ width: 150 }}>
                                    <Text style={{ fontSize: 9 }}>{exam.lecurrency} {separator(exam.examprice)} </Text>
                                </View>
                            </View>
                        ))

                    }


                    {purchaseList !== 0 &&
                        purchaseList.map((item, index) => (
                            <View style={[index % 2 === 0 && styles.line2, index % 2 !== 0 && styles.line1]}>
                                <View style={{ width: 150 }}>
                                    <Text style={{ fontSize: 9, paddingLeft: 5 }}>{item.purchasetimes}</Text>
                                </View>
                                <View style={{ width: 280 }}>
                                    <Text style={{ fontSize: 9 }}> {item.purchasedescription}</Text>
                                </View>
                                <View style={{ width: 150 }}>
                                    <Text style={{ fontSize: 9, fontWeight: "extralight" }}>{item.lecurrency} {separator(item.purchaseprice)}</Text>
                                </View>
                                <View style={{ width: 150 }}>
                                    <Text style={{ fontSize: 9 }}>{item.lecurrency} {separator(item.purchaseprice * item.purchasetimes)} </Text>
                                </View>
                            </View>
                        ))

                    }

                    {accoList !== 0 &&
                        accoList.map((acco, index) => (
                            <View style={[index % 2 === 0 && styles.line1, index % 2 !== 0 && styles.line2]}>
                                <View style={{ width: 150 }}>
                                    <Text style={{ fontSize: 9, paddingLeft: 5 }}>{acco.acotimes}</Text>
                                </View>
                                <View style={{ width: 280 }}>
                                    <Text style={{ fontSize: 9 }}> {acco.accodescription}</Text>
                                </View>
                                <View style={{ width: 150 }}>
                                    <Text style={{ fontSize: 9, fontWeight: "extralight" }}>{acco.lecurrency} {separator(acco.accoprice)}</Text>
                                </View>
                                <View style={{ width: 150 }}>
                                    <Text style={{ fontSize: 9 }}>{acco.lecurrency} {separator(acco.acotimes * acco.accoprice)} </Text>
                                </View>
                            </View>
                        ))

                    }


                    {otherFeeList !== 0 &&
                        otherFeeList.map((fee, index) => (
                            <View style={[index % 2 === 0 && styles.line2, index % 2 !== 0 && styles.line1]}>
                                <View style={{ width: 150 }}>
                                    <Text style={{ fontSize: 9, paddingLeft: 5 }}>1</Text>
                                </View>
                                <View style={{ width: 280 }}>
                                    <Text style={{ fontSize: 9 }}> {fee.otherfeedescription}</Text>
                                </View>
                                <View style={{ width: 150 }}>
                                    <Text style={{ fontSize: 9, fontWeight: "extralight" }}>{fee.lecurrency} {separator(fee.otherfeeprice)}</Text>
                                </View>
                                <View style={{ width: 150 }}>
                                    <Text style={{ fontSize: 9 }}>{fee.lecurrency} {separator(fee.otherfeeprice)} </Text>
                                </View>
                            </View>
                        ))

                    }

                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={{ width: 80, marginTop: 15, fontSize: 8, lineHeight: 1.3, marginHorizontal: 30 }}>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 0.5,
                                marginBottom: 3,
                                marginTop: 10
                            }}
                        />
                        <Text>For payment</Text><br />
                        <Text style={{ margintTop: 2 }}>throug the bank,</Text><br />
                        <Text style={{ margintTop: 2 }}>Use the details below</Text><br />

                    </View>

                    <View style={{ fontSize: 9, marginLeft: 203, }}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <View style={{ display: "flex", flexDirection: 'column', }}>
                                <Text style={{ padding: 5, color: 'black' }}>Sutotal</Text>
                                <Text style={{ padding: 5, color: 'black' }}>Discount</Text>
                                <Text style={{ padding: 5, color: 'black' }}>Sales Tax @ 0.00%</Text>
                                <Text style={{ padding: 5, color: 'black' }}>Total</Text>
                            </View>
                            <View style={{ marginLeft: 20, display: "flex", flexDirection: 'column' }}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 5, paddingBottom: 5, backgroundColor: "#AED8E6", width: 115 }}>
                                    <Text >{currency.lecurrency} {separator(subtotal)}</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: "#AED8E6", paddingTop: 5, paddingBottom: 5, width: 115 }}>
                                    <Text>{studdiscount.groupdiscount && courseList.length >= 1 ? (courseList.length - 1) * studdiscount.groupdiscount : "0,00"}%</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: "#03BFFF", paddingTop: 5, paddingBottom: 5, width: 115 }}>
                                    <Text>{currency.lecurrency} 0.00</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: "#0073CF", paddingTop: 5, paddingBottom: 5, width: 115 }}>
                                    <Text>{currency.lecurrency} {separator(total)}</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>
                <View style={{ marginTop: -20, width: 290, padding: 3, height: "auto", borderWidth: 1, marginHorizontal: 30 }}>

                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View>
                            <Text style={{ fontSize: 9 }}>Account name:</Text>
                        </View>
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ fontSize: 10 }}>EAGLE VISION LANGUAGE INSTITUTE LTD</Text>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
                        <View>
                            <Text style={{ fontSize: 9 }}>Account number:</Text>
                        </View>
                        <View style={{ marginLeft: 12 }}>
                            <Text style={{ fontSize: 10 }}>9040002893635</Text>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
                        <View>
                            <Text style={{ fontSize: 9 }}>Bank</Text>
                        </View>
                        <View style={{ marginLeft: 60 }}>
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>STANBIC BANK GHANA LIMITED</Text>
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>AIRPORT CITY STANBIC HEIGHTS</Text>
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>ACCRA</Text>
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>GHANA</Text>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
                        <View>
                            <Text style={{ fontSize: 9 }}>Swift Code:</Text>
                        </View>
                        <View style={{ marginLeft: 35 }}>
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>SBICGHAC</Text>
                        </View>
                    </View>

                </View>
                <View style={{ display: 'flex', marginHorizontal: 48, width: 280 }}>
                    <Text style={{ textAlign: 'center', fontSize: 9 }}>THANK YOU FOR YOUR BUSINESS</Text>
                </View>
            </Page>
        </Document>
    )
}

export default Invoice