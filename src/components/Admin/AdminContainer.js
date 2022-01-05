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
import { Link, useHistory } from "react-router-dom";
import { useState } from 'react';
import { ListItemButton } from '@mui/material';
import routes from '../../routes';

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
        <Toolbar>
          <Link to={routes.home}>바로가기</Link>
        </Toolbar>
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
          <h1>결제</h1>
          {['결제전체', '성공', '실패','[구글결제]'].map((text, index) => (
            <ListItemButton key={text} value={text} selected={selectedIndex === `결제${index}`} onClick={() => onClick(text,`결제${index}`)}>
            <ListItemText primary={text} />
          </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          <h1>환급</h1>
          {['신청중', '완료'].map((text, index) => (
            <ListItemButton key={text} value={text} selected={selectedIndex === `환급${index}`} onClick={() => onClick(text,`환급${index}`)}>
            <ListItemText primary={text} />
          </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          <h1>푸쉬</h1>
          {['푸쉬보내기','푸쉬보내기(중년휴게텔)' ].map((text, index) => (
            <ListItemButton key={text} value={text} selected={selectedIndex === `푸쉬${index}`} onClick={() => onClick(text,`푸쉬${index}`)}>
            <ListItemText primary={text} />
          </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          <h1>포인트</h1>
          {['포인트 목록'].map((text, index) => (
            <ListItemButton key={text} value={text} selected={selectedIndex === `포인트${index}`} onClick={() => onClick(text,`포인트${index}`)}>
            <ListItemText primary={text} />
          </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          <h1>통화내역</h1>
          {['통화 목록'].map((text, index) => (
            <ListItemButton key={text} value={text} selected={selectedIndex === `통화내역${index}`} onClick={() => onClick(text,`통화내역${index}`)}>
            <ListItemText primary={text} />
          </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          <h1>게시판</h1>
          {['ARS게시판(1)','ARS게시판(2)','ARS게시판(3)','ARS게시판(4)','고객문의','계좌이체','공지사항' ].map((text, index) => (
            <ListItemButton key={text} value={text} selected={selectedIndex === `게시판${index}`} onClick={() => onClick(text,`게시판${index}`)}>
            <ListItemText primary={text} />
          </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          <h1>관리자 설정</h1>
          {['비번 변경', '관리자 추가'].map((text, index) => (
            <ListItemButton key={text} value={text} selected={selectedIndex === `관리자${index}`} onClick={() => onClick(text,`관리자${index}`)}>
            <ListItemText primary={text} />
          </ListItemButton>
          ))}
        </List>
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