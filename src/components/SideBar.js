import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Toolbar } from '@mui/material';
import { Dashboard, Analytics, Settings } from '@mui/icons-material';

const drawerWidth = 240;

function Sidebar() {
  return (
    <Drawer
      sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth } }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List>
        <ListItem button>
          <ListItemIcon><Dashboard /></ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Analytics /></ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        {/* Add more items as needed */}
      </List>
    </Drawer>
  );
}

export default Sidebar;
