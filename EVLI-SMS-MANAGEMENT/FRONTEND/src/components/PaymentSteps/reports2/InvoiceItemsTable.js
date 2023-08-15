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
          <Text style={{textTransform: "uppercase", fontSize: 10}}>{studentData &&  studentData.surnameg} {studentData && studentData.forenamesg}</Text>
        </View>
      </View>
      <View style={{width: "70%"}}>
        <Text style={{textTransform: "uppercase", marginLeft: "15%", fontSize: 9}}>
          {studentData && studentData.courseList.length > 0 && studentData.courseList[0].lesubcoursename}
          {studentData && studentData.courseList.length > 0 && " ENGLISH PROGRAMS"}
          {studentData && studentData.courseList.length > 1 && "WITH "}
          {studentData && studentData.courseList.length > 1 && studentData.courseList[1].lesubcoursename}
          {studentData && studentData.courseList.length > 1 && " PREPARATIONS"}
          {studentData && studentData.courseList.length > 2 && " WITH " + studentData.courseList[2].laduration + " WEEKS COMPUTER LITERACY"}
          {studentData && studentData.courseList.length > 0 && " WITH "}
          {studentData && studentData.examList.length > 0 && studentData.examList[0].lexamname}
          {studentData && studentData.accoList.length > 0 && " WITH " + studentData.accoList[0].acotimes + " WEEKS ACCOMODATION"}
        </Text>
      </View>
      
    </View>
    <View style={styles.tableContainer}>
      <InvoiceTableHeader />
      <InvoiceTableRow items={studentData} />
      <InvoiceTableBlankSpace rowsCount={0} />
      <InvoiceTableFooter items={studentData} />
    </View>
  </View>
);

export default InvoiceItemsTable