import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataGrid from './pages/datagrid';
import Dashboard from './pages/StockDashboard';
import DataGridWrapper from './pages/test';
import RightNavbar from './components/Navbar'; // Import the RightNavbar component

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <RightNavbar /> {
                  <div style={{ flexGrow: 1 }}>
                  <Routes>
                    <Route path="/" element={<DataGrid />} />
                    <Route path="/dashboard/:ticker" element={<Dashboard />} />
                    <Route path="/test" element={<DataGridWrapper />} />
                  </Routes>
                </div>
        }
      </div>
    </Router>
  );
}

export default App;