import {
  Box,
  CircularProgress,
} from '@mui/material';// Loading Component
const LoadingOverlay = () => (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="400px"
    >
      <CircularProgress />
    </Box>
  );

export default LoadingOverlay;