import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '45%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        width: '20%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });


const InvoiceTableRow = ({items}) => {
    
  function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  }

  

    return (
        <>
        {items && items.registration.length > 0 && items.registration.map( (item, index) => 
            <View style={styles.row} key={index}>
                <Text style={styles.qty}>1</Text>
                <Text style={styles.description}>{item.registrationname}</Text>
                <Text style={styles.rate}>{item.lecurrency} {separator((item.regir).toFixed(2))}</Text>
                <Text style={styles.amount}>{item.lecurrency} {separator((item.regir).toFixed(2))}</Text>
            </View>
        )}
        {items && items.courselist.length > 0 && items.courselist.map( (item, index) => 
            <View style={styles.row} key={index}>
                <Text style={styles.qty}>1</Text>
                <Text style={styles.description}>{item.coursedescription}</Text>
                <Text style={styles.rate}>{item.lecurrency} {separator((item.price).toFixed(2))}</Text>
                <Text style={styles.amount}>{item.lecurrency} {separator((item.price).toFixed(2))}</Text>
            </View>
        )}
        {items && items.length > 0 && items.examlist.map( (item, index) => 
            <View style={styles.row} key={index}>
                <Text style={styles.qty}>1</Text>
                <Text style={styles.description}>{item.examdescription}</Text>
                <Text style={styles.rate}>{item.lecurrency} {separator((item.examprice).toFixed(2))}</Text>
                <Text style={styles.amount}>{item.lecurrency} {separator((item.examprice).toFixed(2))}</Text>
            </View>
        )}
        {items && items.purchaselist.length > 0 && items.purchaselist.map( (item, index) => 
            <View style={styles.row} key={index}>
                <Text style={styles.qty}>1</Text>
                <Text style={styles.description}>{item.purchasedescription}</Text>
                <Text style={styles.rate}>{item.lecurrency} {separator((item.purchaseprice).toFixed(2))}</Text>
                <Text style={styles.amount}>{item.lecurrency} {separator((item.purchaseprice).toFixed(2))}</Text>
            </View>
        )}
        {items && items.otherlist.length > 0 && items.otherlist.map( (item, index) => 
            <View style={styles.row} key={index}>
                <Text style={styles.qty}>{item.purchasetimes}</Text>
                <Text style={styles.description}>{item.otherfeedescription}</Text>
                <Text style={styles.rate}>{item.lecurrency} {separator((item.otherfeeprice).toFixed(2))}</Text>
                <Text style={styles.amount}>{item.lecurrency} {separator((item.otherfeeprice * item.purchasetimes).toFixed(2))}</Text>
            </View>
        )}
        {items && items.accolist.length > 0 && items.accolist.map( (item, index) => 
            <View style={styles.row} key={index}>
                <Text style={styles.qty}>{item.accotimes}</Text>
                <Text style={styles.description}>{item.accodescription}</Text>
                <Text style={styles.rate}>{item.lecurrency} {separator((item.accoprice * item.accotimes).toFixed(2))}</Text>
                <Text style={styles.amount}>{item.lecurrency} {separator((item.accoprice).toFixed(2))}</Text>
            </View>
        )}
        </> 
    )
};
  
  export default InvoiceTableRow