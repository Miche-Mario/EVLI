import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
   
    titleContainer:{
        display: "flex",
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginTop: 40
    },
    reportTitle:{
        fontSize: 11,
    }
  });


  const InvoiceThankYouMsg = () => (
    <View style={styles.titleContainer}>
        <View>
            <Text style={styles.reportTitle}>Customer's signature:</Text>
        </View>
        <View style={{marginTop: 10}}>
            <Text style={styles.reportTitle}>Phone Number:</Text>
        </View>
    </View>
  );
  
  export default InvoiceThankYouMsg