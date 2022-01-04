import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { ListItemButton } from '@mui/material';

const ME_QUERY = gql`
    query me {
        me {
            isManaged
        }
    }
`;

const drawerWidth = 200;

export const AdminContainer = ({children}) => {
  const [data,setData] = useState("");
  const [selectedIndex, setSelectedIndex] = useState("");
  
  const history = useHistory();
  const {data:Me} = useQuery(ME_QUERY);
  useEffect(()=>{
      if(Me?.me?.isManaged === false && Me?.me?.isManaged === undefined){
          history.push("/");
      }
      
  },[Me]);

  const onClick = (data,index) => {
    setData(data);
    setSelectedIndex(index);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <h1>회원</h1>
          {['전체','여자'].map((text, index) => (
            <ListItemButton key={text} value={text} selected={selectedIndex === `회원${index}`} onClick={() => onClick(text,`회원${index}`)}>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItemButton button key={text}value={text}  onClick={() => onClick(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <div>1</div> : <div>2</div>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {React.cloneElement(children,{data})}
      </Box>
    </Box>
  );
}