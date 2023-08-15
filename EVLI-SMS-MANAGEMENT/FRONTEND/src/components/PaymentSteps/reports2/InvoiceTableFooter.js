import React from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import Roboto from "./Roboto-Regular.ttf";
import RobotoBold from "./Roboto-Bold.ttf"

Font.register({
family: 'RobotoBold', fonts: [
{ src: Roboto },
{ src: RobotoBold, fontWeight: 600 },
],
format: 'truetype',
});

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    description: {
        width: '100%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    total: {
        width: '25%',
        textAlign: 'right',
        paddingRight: 8,
        },
});


const InvoiceTableFooter = ({ items }) => {
    function separator(numb) {
        var str = numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return str.join(".");
      }

    return (
        <>
            <View style={styles.row}>
                <Text style={styles.description}>Subtotal</Text>
                <Text style={styles.total}>{items.currency.lecurrency} {separator((items.subtotal).toFixed(2))}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.description}>Discount</Text>
                <Text style={styles.total}>{items.currency.lecurrency} {items.discount == null ||   !items.discount ? "0,00" : separator((items.discount).toFixed(2)) }</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.description}>Total</Text>
                <Text style={styles.total}>{items.currency.lecurrency} {separator((items.total).toFixed(2))}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.description}>Amount Paid 1st</Text>
                <Text style={styles.total}>{items.currency.lecurrency} {separator(parseInt(items.firstpayed).toFixed(2))}</Text>
            </View>

           
            
            {
            
            items.total &&
                <View style={styles.row}>
                    <Text style={styles.description}>Balance</Text>
                    <Text style={styles.total}>{items.currency.lecurrency} {separator((parseInt(items.total) - parseInt(items.firstpayed)).toFixed(2))}</Text>
                </View>
            }
            {/* <View style={styles.row}>
                <Text style={styles.description}>Balance</Text>
                <Text style={styles.total}>{separator((items.firstpayed).toFixed(2))}</Text>
            </View> */}
        </>


    )
};

export default InvoiceTableFooter