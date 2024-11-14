// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, Typography, Chip, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MetricCard from '../components/MetricCard';
import PriceChart from '../components/PriceChart';
import LoadingOverlay from '../components/LoadingOverlay';
import ErrorMessage from '../components/ErrorMessage';
import { fetchStockDataByTicker } from '../services/api';


const Dashboard = () => {
    const ticker = useSelector((state) => state.stock.ticker); // Get ticker from Redux store
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0); // Local page state (starts at page 0)
    const [rowsPerPage, setRowsPerPage] = useState(20); // Default to 20 rows per page
    const [totalRecords, setTotalRecords] = useState(0); // To keep track of total records


    // Fetch data on ticker change, page, or rows per page change
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetchStockDataByTicker(ticker);
                console.log('Fetched data:', response);
                setData(response); // Assuming `data` is in response.data
                setTotalRecords(response.totalRecords); // Assuming `totalRecords` is in response.totalRecords
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };


        if (ticker) {
            fetchData();
        }
    }, [ticker, page, rowsPerPage]);


    if (loading && !data.length) return <LoadingOverlay />;
    if (error) return <ErrorMessage error={error} onRetry={() => setPage(0)} />;
    if (!data?.length) return <Alert severity="info">No data available</Alert>;


    const latestData = data[data.length - 1]; // Get the latest data for the dashboard summary
    const logoUrl = `https://img.logo.dev/ticker/${ticker}?token=pk_bm9r9vmpQ3i57d6WFWgMjA`; // Updated URL for company logo

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} display="flex" alignItems="center" gap={2}>
                    <img src={logoUrl} alt={`${latestData.security} logo`} style={{ width: 50, height: 50 }} />
                    <Box>
                        <Typography variant="h4" gutterBottom>
                            {latestData.security} ({latestData.ticker}) Dashboard
                        </Typography>
                        <Chip label={latestData.gicsSector} color="primary" sx={{ mr: 1 }} />
                        <Chip label={latestData.gicsSubIndustry} variant="outlined" />
                    </Box>
                </Grid>


                <Grid item xs={12} md={3}>
                    <MetricCard title="Latest Close" value={latestData.close} change={latestData.dtdChange} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <MetricCard title="MTD Change" value={latestData.mtdChange} change={latestData.mtdChange} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <MetricCard title="YTD Change" value={latestData.ytdChange} change={latestData.ytdChange} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <MetricCard title="Founded" value={latestData.founded} />
                </Grid>


                <Grid item xs={12}>
                    <PriceChart data={data} />
                </Grid>


                <Grid item xs={12}>
                    <DataGrid
                        rows={data}
                        columns={[
                            { field: 'asOfDate', headerName: 'As Of Date', flex: 1 },
                            { field: 'ticker', headerName: 'Ticker', flex: 1 },
                            { field: 'security', headerName: 'Security', flex: 1 },
                            { field: 'close', headerName: 'Close', flex: 1 },
                            { field: 'dtdChange', headerName: 'D/D Change', flex: 1 },
                            { field: 'mtdChange', headerName: 'MTD Change', flex: 1 },
                            { field: 'ytdChange', headerName: 'YTD Change', flex: 1 },
                        ]}
                        getRowId={(row) => `${row.ticker}-${row.asOfDate}`} // Unique ID for rows
                    />
                </Grid>
            </Grid>
        </Box>
    );
};


export default Dashboard;





