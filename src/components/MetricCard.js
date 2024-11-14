import {
    Typography,
    Card,
    CardContent,
  } from '@mui/material';

// Reusable components remain the same
const MetricCard = ({ title, value, change }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {typeof value === 'number' ? value.toFixed(2) : value}
        </Typography>
        {change !== undefined && (
          <Typography 
            color={change >= 0 ? 'success.main' : 'error.main'}
            variant="body2"
          >
            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
          </Typography>
        )}
      </CardContent>
    </Card>
  );

export default MetricCard;