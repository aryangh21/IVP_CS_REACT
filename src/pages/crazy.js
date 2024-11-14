import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, Typography, Chip, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CandlestickChart from 'react-candlestick-chart';
import MetricCard from '../components/MetricCard';
import LoadingOverlay from '../components/LoadingOverlay';
import ErrorMessage from '../components/ErrorMessage';
import { fetchStockDataByTicker } from '../services/api';


const Dashboard = () => {
    const ticker = useSelector((state) => state.stock.ticker);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [totalRecords, setTotalRecords] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetchStockDataByTicker(ticker);
                console.log('Fetched data:', response);
                setData(response);
                setTotalRecords(response.totalRecords);
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


    // Transform data for candlestick chart with proper date formatting
    const candlestickData = data.map(item => {
        // Convert asOfDate to timestamp if it's not already
        let dateTimestamp;
        if (typeof item.asOfDate === 'string') {
            // Parse the date string and convert to timestamp
            dateTimestamp = new Date(item.asOfDate).getTime();
        } else {
            dateTimestamp = item.asOfDate;
        }


        return {
            date: dateTimestamp, // Use timestamp instead of date string
            open: Number(item.close), // Convert to number and fallback to close
            high: Number(item.close), // Convert to number and fallback to close
            low: Number(item.close),  // Convert to number and fallback to close
            close: Number(item.close) // Convert to number
        };
    }).sort((a, b) => a.date - b.date); // Ensure data is sorted by date


    // Custom color palette matching Material-UI theme
    const colorPalette = {
        background: "#ffffff",
        grid: "#f5f5f5",
        tick: "#666666",
        selectorLine: "rgba(25, 118, 210, 0.5)",
        selectorLabelBackground: "#1976d2",
        selectorLabelText: "#ffffff",
        greenCandle: "#2e7d32",
        redCandle: "#d32f2f",
        longPosition: "#1976d2",
        shortPosition: "#ed6c02",
        sl: "#f44336",
        tp: "#2196f3",
        RSChartStroke: "#1976d2",
        RSChartOverlay: "#ffffff",
        RSChartOverlayResize: "#ed6c02",
        resetButtonColor: "#1976d2"
    };


    if (loading && !data.length) return <LoadingOverlay />;
    if (error) return <ErrorMessage error={error} onRetry={() => setPage(0)} />;
    if (!data?.length) return <Alert severity="info">No data available</Alert>;


    const latestData = data[data.length - 1];


    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        {latestData.security} ({latestData.ticker}) Dashboard
                    </Typography>
                    <Chip label={latestData.gicsSector} color="primary" sx={{ mr: 1 }} />
                    <Chip label={latestData.gicsSubIndustry} variant="outlined" />
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
                    <Box sx={{ height: 600, width: '100%', bgcolor: 'background.paper' }}>
                        <CandlestickChart
                            data={candlestickData}
                            id={`${ticker}-candlestick`}
                            width={1200}
                            height={600}
                            decimal={2}
                            scrollZoom={{
                                enable: true,
                                max: 20,
                            }}
                            rangeSelector={{
                                enable: true,
                                height: 150,
                                initialRange: { 
                                    type: "month", 
                                    value: 1 
                                },
                            }}
                            responsiveBreakPoint={768}
                            enableResetButton={true}
                            ColorPalette={colorPalette}
                        />
                    </Box>
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
                        getRowId={(row) => `${row.ticker}-${row.asOfDate}`}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};


export default Dashboard;



