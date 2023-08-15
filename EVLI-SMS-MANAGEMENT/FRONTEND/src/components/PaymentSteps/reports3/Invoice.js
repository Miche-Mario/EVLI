import React from 'react';
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import BillTo from './BillTo'
import InvoiceItemsTable from './InvoiceItemsTable'
import InvoiceThankYouMsg from './InvoiceThankYouMsg'


const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:40,
        paddingRight:40,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });
  
  const Invoice = ({studentData}) => (
            <Document>
                <Page size="A4" style={styles.page}>
                    <BillTo title='OFFICIAL RECEIPT' studentData={studentData}/>
                    <InvoiceItemsTable studentData={studentData} />
                    <InvoiceThankYouMsg />
                </Page>
            </Document>
        );
  
  export default Invoice