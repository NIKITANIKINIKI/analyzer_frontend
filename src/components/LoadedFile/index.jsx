import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent(tableHeaders) {
  const headers = Object.values(tableHeaders)
  console.log(tableHeaders)
  return (
    <TableRow>
      {headers.map((header, index) => (
        <TableCell
          key={index}
          variant="head"
          align="left"
          style={{ width: 120 }} // You may adjust the width according to your requirement
        >
          {header}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(tableHeaders, tableData, rowIndex) {
  return (
    <React.Fragment>
      {tableHeaders.map((header, index) => (
        <TableCell
          key={index}
          align="left"
        >
          {tableData[rowIndex][index]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function LoadedFile({ tableHeaders, tableData }) {
  return (
    <Paper style={{ height: 400, width: '100%', marginTop:'20px' }}>
      <TableVirtuoso
        data={tableData}
        components={VirtuosoTableComponents}
        fixedHeaderContent={() => fixedHeaderContent(tableHeaders)}
        itemContent={(index) => rowContent(tableHeaders, tableData, index)}
      />
    </Paper>
  );
}