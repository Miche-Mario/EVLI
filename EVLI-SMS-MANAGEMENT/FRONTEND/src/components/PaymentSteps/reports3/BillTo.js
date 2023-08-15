import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../../../assets/logoo.png'

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 36
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    }, 
    logo: {
        width: 220,
        height: 70,
        marginBottom: 10
    },
    reportTitle:{
        color: '#61dafb',
        letterSpacing: 4,
        fontSize: 25,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
});


const BillTo = ({ studentData, title}) => (
    <>
        <View style={styles.headerContainer}>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <View>
                    <Image style={styles.logo} src={logo} />
                </View>
                <View style={{ marginTop: "2%"}}>
                    <Text style={{textTransform: "uppercase",fontSize: 10}}>{title}</Text>
                </View>
            </View>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <View>
                    <Text>45 Manye Adorkor Avenue New Achimota</Text>
                    <Text>Tel. +233302405496, PMB 338 Accra North</Text>
                </View>
                <View style={{display: "flex",flexDirection: "column", justifyContent: "flex-end", alignItems: 'flex-end'}}>
                    <View>
                        <Text style={{fontSize: 9}}>Tuesday, June 21, 2022</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 9}}>EVLI-6-003848</Text>
                    </View>
                </View>
            </View>
            
        </View>
    </>
);

export default BillTo