// Error Component
import {
    Alert,
    AlertTitle,
    Button
  } from '@mui/material';
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

export default ErrorMessage;