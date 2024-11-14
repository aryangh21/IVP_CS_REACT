import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';

const DataGrid = ({
  data,
  totalRecords,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  loading
}) => {
  if (loading) return <Typography> Loading... </Typography>;

  console.log('DataGrid Rendered');
  console.log('Current Page:', page);
  console.log('Rows per Page:', rowsPerPage);
  console.log('Data:', data);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Open</TableCell>
              <TableCell>Close</TableCell>
              <TableCell>Daily Change</TableCell>
              <TableCell>MTD Change</TableCell>
              <TableCell>YTD Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow hover key={row.asOfDate}>
                <TableCell>{row.asOfDate}</TableCell>
                <TableCell>{row.open.toFixed(2)}</TableCell>
                <TableCell>{row.close.toFixed(2)}</TableCell>
                <TableCell>
                  <Typography color={row.dtdChange >= 0 ? 'success.main' : 'error.main'}>
                    {row.dtdChange.toFixed(2)}%
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color={row.mtdChange >= 0 ? 'success.main' : 'error.main'}>
                    {row.mtdChange.toFixed(2)}%
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color={row.ytdChange >= 0 ? 'success.main' : 'error.main'}>
                    {row.ytdChange.toFixed(2)}%
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50]}
        component="div"
        count={totalRecords}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
};

const DataGridWrapper = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(100); // Set the total number of records

  const fetchDataForPage = async (page, rowsPerPage) => {
    // Mock data fetching function
    console.log(`Fetching data for page ${page}, rowsPerPage ${rowsPerPage}`);
    setLoading(true);
    // Simulating an API call or data fetch with a delay
    const simulatedData = Array.from({ length: rowsPerPage }, (_, i) => ({
      asOfDate: new Date().toISOString(),
      open: Math.random() * 100,
      close: Math.random() * 100,
      dtdChange: Math.random() * 10 - 5, // Daily change between -5 and 5
      mtdChange: Math.random() * 20 - 10, // MTD change between -10 and 10
      ytdChange: Math.random() * 30 - 15, // YTD change between -15 and 15
    }));
    const simulatedTotalRecords = 100; // Mock total records
    setData(simulatedData);
    setTotalRecords(simulatedTotalRecords);
    setLoading(false);
    console.log('Fetched data:', simulatedData);
  };

  useEffect(() => {
    // Fetch data when page or rowsPerPage changes
    console.log('useEffect: Page or RowsPerPage changed');
    fetchDataForPage(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handlePageChange = (event, newPage) => {
    console.log(`Page changed to ${newPage}`);
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    console.log(`Rows per page changed to ${newRowsPerPage}`);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to first page when rows per page changes
  };

  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  console.log('Paginated Data:', paginatedData);

  return (
    <DataGrid
      data={paginatedData}
      totalRecords={totalRecords}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      loading={loading}
    />
  );
};

export default DataGridWrapper;
