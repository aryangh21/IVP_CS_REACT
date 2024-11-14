import axios from 'axios';

const API_URL = 'https://localhost:7241/api/SP500Analysis';

// Fetch data with pagination and optional date filter
export const fetchStockData = async (pageNumber = 1, pageSize = 20, dateFilter = null) => {
  let url = `${API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  if (dateFilter) {
    url += `&date=${dateFilter}`;
  }
  console.log(`Fetching data from: ${url}`);
  try {
    const response = await axios.get(url);
    console.log('Fetched data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error; // You can handle this error in your component
  }
};

// Fetch data for a specific ticker
export const fetchStockDataByTicker = async (ticker) => {
  const url = `${API_URL}/ticker?ticker=${ticker}`;
  console.log(`Fetching data for ticker: ${ticker} from: ${url}`);
  try {
    const response = await axios.get(url);
    console.log('Fetched data for ticker:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ticker ${ticker}:`, error);
    throw error; // Handle error as needed in your component
  }
};
