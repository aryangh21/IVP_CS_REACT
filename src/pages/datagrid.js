import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Box,
    CircularProgress,
    Alert,
    AlertTitle,
    Button,
    TextField,
    InputAdornment
} from '@mui/material';
import { format, parseISO } from 'date-fns';
import { Search } from 'lucide-react';
import { fetchStockData } from '../services/api'; // Ensure this function is correctly implemented
import { useDispatch } from 'react-redux';
import { setTicker } from '../redux/stockSlice'; // Import the setTicker action

// Loading overlay component
const LoadingOverlay = () => (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
    </Box>
);

// Error message component
const ErrorMessage = ({ error, onRetry }) => (
    <Alert 
        severity="error" 
        action={
            <Button color="inherit" size="small" onClick={onRetry}>
                RETRY
            </Button>
        }
    >
        <AlertTitle>Error</AlertTitle>
        {error.message || 'An error occurred while fetching data'}
    </Alert>
);

const DataGrid = () => {
    const { dateFilter } = useParams(); // Get date filter from URL params
    const navigate = useNavigate(); // To navigate to different pages
    const dispatch = useDispatch(); // Get the dispatch function from Redux
    const [stockData, setStockData] = useState(null); // State for stock data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [page, setPage] = useState(1); // Current page state
    const [rowsPerPage, setRowsPerPage] = useState(20); // Rows per page state
    const [search, setSearch] = useState(''); // Search query for date filtering

    // Fetch data from the API
    const fetchData = async () => {
        try {
            setLoading(true); // Set loading to true when starting the fetch
            setError(null); // Reset the error state
            const response = await fetchStockData(page + 1, rowsPerPage, dateFilter); // Fetch stock data from the API
            setStockData(response); // Store the response data
        } catch (err) {
            setError(err); // Set the error if the fetch fails
        } finally {
            setLoading(false); // Set loading to false after the fetch is complete
        }
    };

    // UseEffect hook to fetch data whenever page, rowsPerPage, or dateFilter changes
    useEffect(() => {
        fetchData();
    }, [page, rowsPerPage, dateFilter]);

    // Handle page change in the pagination component
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change in the pagination component
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10)); // Update rows per page
        setPage(0); // Reset to the first page when rows per page changes
    };

    // Handle row click event (when a user clicks a row)
    const handleRowClick = (row) => {
        dispatch(setTicker(row.ticker)); // Dispatch the setTicker action with the row's ticker
        navigate(`/dashboard/${row.ticker}`); // Navigate to the stock details page based on the ticker
    };

    // Filter data based on the search query (search by date)
    const filteredData = stockData?.data.filter((row) => {
        const date = parseISO(row.asOfDate); // Parse the date string to a Date object
        return format(date, 'yyyy-MM-dd').includes(search); // Filter by date
    });

    // Render loading, error, or data depending on the current state
    if (loading && !stockData) return <LoadingOverlay />;
    if (error) return <ErrorMessage error={error} onRetry={fetchData} />;
    if (!stockData?.data?.length) return <Alert severity="info">No data available</Alert>;

    return (
        <Box sx={{ width: '100%', p: 3 }}>
            <Paper>
                {/* Search bar */}
                <Box p={2}>
                    <TextField
                        label="Search by date"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} // Update search query on input change
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            )
                        }}
                        fullWidth
                    />
                </Box>

                {/* Table displaying the stock data */}
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Ticker</TableCell>
                                <TableCell>Security</TableCell>
                                <TableCell>Sector</TableCell>
                                <TableCell>Open</TableCell>
                                <TableCell>Close</TableCell>
                                <TableCell>Daily Change</TableCell>
                                <TableCell>MTD Change</TableCell>
                                <TableCell>YTD Change</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData?.map((row) => (
                                <TableRow 
                                    hover 
                                    key={row.asOfDate + row.ticker} // Use a unique key for each row
                                    onClick={() => handleRowClick(row)} // Handle row click
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell>{format(parseISO(row.asOfDate), 'MMM dd, yyyy')}</TableCell>
                                    <TableCell>{row.ticker}</TableCell>
                                    <TableCell>{row.security}</TableCell>
                                    <TableCell>{row.gicsSector}</TableCell>
                                    <TableCell>{row.open.toFixed(2)}</TableCell>
                                    <TableCell>{row.close.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Box color={row.dtdChange >= 0 ? 'success.main' : 'error.main'}>
                                            {row.dtdChange >= 0 ? '+' : ''}{row.dtdChange.toFixed(2)}%
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box color={row.mtdChange >= 0 ? 'success.main' : 'error.main'}>
                                            {row.mtdChange >= 0 ? '+' : ''}{row.mtdChange.toFixed(2)}%
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box color={row.ytdChange >= 0 ? 'success.main' : 'error.main'}>
                                            {row.ytdChange >= 0 ? '+' : ''}{row.ytdChange.toFixed(2)}%
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    component="div"
                    count={stockData.totalRecords}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default DataGrid;
