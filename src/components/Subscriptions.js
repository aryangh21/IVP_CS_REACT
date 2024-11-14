import React from 'react';
import { Paper, List, ListItem, ListItemText, ListItemIcon, Typography, Chip } from '@mui/material';
import { CheckCircle, Error, Cancel } from '@mui/icons-material';

const subscriptions = [
  { name: 'Supabase', price: '$599/year', status: 'Paid' },
  { name: 'Vercel', price: '$20/month', status: 'Expiring' },
  { name: 'Auth0', price: '$20-80/month', status: 'Canceled' },
  { name: 'Google Cloud', price: '$100-200/month', status: 'Paid' },
  { name: 'Stripe', price: '$70/month', status: 'Paid' },
];

function Subscriptions() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Our subscriptions</Typography>
      <List>
        {subscriptions.map((sub) => (
          <ListItem key={sub.name}>
            <ListItemIcon>
              {sub.status === 'Paid' ? (
                <CheckCircle color="success" />
              ) : sub.status === 'Expiring' ? (
                <Error color="warning" />
              ) : (
                <Cancel color="error" />
              )}
            </ListItemIcon>
            <ListItemText primary={sub.name} secondary={sub.price} />
            <Chip label={sub.status} color={sub.status === 'Paid' ? 'success' : sub.status === 'Expiring' ? 'warning' : 'error'} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default Subscriptions;
