import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setTicker } from '../redux/stockSlice'; // Adjust the import path as necessary

const SP500AnalysisTable = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0); // Use 0-based page for React state
    const [pageSize, setPageSize] = useState(20);
    const [rowCount, setRowCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const columns = [
        { field: 'asOfDate', headerName: 'Date', width: 150 },
        { field: 'ticker', headerName: 'Ticker', width: 100 },
        { field: 'security', headerName: 'Security', width: 150 },
        { field: 'gicsSector', headerName: 'Sector', width: 150 },
        { field: 'gicsSubIndustry', headerName: 'Sub Industry', width: 200 },
        { field: 'headquartersLocation', headerName: 'Headquarters', width: 200 },
        { field: 'founded', headerName: 'Founded', width: 100 },
        { field: 'open', headerName: 'Open', width: 120 },
        { field: 'close', headerName: 'Close', width: 120 },
        { field: 'dtdChange', headerName: 'DTD Change', width: 150 },
        { field: 'mtdChange', headerName: 'MTD Change', width: 150 },
        { field: 'qtdChange', headerName: 'QTD Change', width: 150 },
        { field: 'ytdChange', headerName: 'YTD Change', width: 150 },
    ];

    const fetchData = async () => {
        setLoading(true);
        try {
            console.log(`Fetching page ${page + 1}, pageSize ${pageSize}`);
            const response = await axios.get(`https://localhost:7241/api/SP500Analysis`, {
                params: { pageNumber: page + 1, pageSize: pageSize }, // assuming 1-based indexing
            });
            
            const responseData = response.data;
            console.log("Response data:", responseData);

            setData(responseData.data); 
            setRowCount(responseData.totalRecords);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, pageSize]);

    return (
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={pageSize}
                paginationMode="server"
                rowCount={rowCount}
                rowsPerPageOptions={[10, 20, 50, 100]}
                pagination
                loading={loading}
                page={page}
                onPageChange={(newPage) => {
                    console.log("Page changed to:", newPage);
                    setPage(newPage);
                }}
                onPaginationModelChange={(params) => {
                        console.log("Pagination model changed:", params);
                        setPage(params.page);
                        setPageSize(params.pageSize);
                }}
                onPageSizeChange={(newPageSize) => {
                    console.log("Page size changed to:", newPageSize);
                    setPageSize(newPageSize);
                    setPage(0); // Reset to first page on page size change
                }}
                getRowId={(row) => `${row.ticker}-${row.asOfDate}`} 
                onRowClick={(params) => {
                    console.log("Row clicked:", params.row);
                    dispatch(setTicker(params.row.ticker));
                }}
            />
        </div>
    );
};

export default SP500AnalysisTable;
