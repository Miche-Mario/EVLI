import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader'
import InvoiceTableRow from './InvoiceTableRow'
import InvoiceTableBlankSpace from './InvoiceTableBlankSpace'
import InvoiceTableFooter from './InvoiceTableFooter'

const tableRowsCount = 11;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: '#bff0fd',
  },
  header: {
    marginTop: 24,
  }
});

const InvoiceItemsTable = ({ studentData }) => (
  <View>
    <View style={styles.header}>
      <View style={{display: "flex", flexDirection: "row"}}>
        <View>
          <Text>Receive from:</Text>
        </View>
        <View style={{marginLeft: "2%", }}>
          <Text style={{textTransform: "uppercase", fontSize: 10}}>{studentData && studentData.prospectdata.surnameg && studentData.prospectdata.surnameg} {studentData && studentData.prospectdata.forenamesg && studentData.prospectdata.forenamesg}</Text>
        </View>
      </View>
      <View style={{width: "70%"}}>
        <Text style={{textTransform: "uppercase", marginLeft: "15%", fontSize: 9}}>
          {studentData.invoicedata && studentData.invoicedata.courselist.length > 0 && studentData.invoicedata.courselist[0].lesubcoursename}
          {studentData.invoicedata && studentData.invoicedata.courselist.length > 0 && " ENGLISH PROGRAMS"}
          {studentData.invoicedata && studentData.invoicedata.courselist.length > 1 && "WITH "}
          {studentData.invoicedata && studentData.invoicedata.courselist.length > 1 && studentData.invoicedata.courselist[1].lesubcoursename}
          {studentData.invoicedata && studentData.invoicedata.courselist.length > 1 && " PREPARATIONS"}
          {studentData.invoicedata && studentData.invoicedata.courselist.length > 2 && " WITH " + studentData.invoicedata.courselist[2].laduration + " WEEKS COMPUTER LITERACY"}
          {studentData.invoicedata && studentData.invoicedata.courselist.length > 0 && " WITH "}
          {studentData.invoicedata && studentData.invoicedata.examlist.length > 0 && studentData.invoicedata.examlist[0].lexamname}
          {studentData.invoicedata && studentData.invoicedata.accolist.length > 0 && " WITH " + studentData.invoicedata.accolist[0].acotimes + " WEEKS ACCOMODATION"}
        </Text>
      </View>
      
    </View>
    <View style={styles.tableContainer}>
      <InvoiceTableHeader />
      <InvoiceTableRow items={studentData.invoicedata} />
      <InvoiceTableBlankSpace rowsCount={0} />
      <InvoiceTableFooter items={studentData} />
    </View>
  </View>
);

export default InvoiceItemsTable