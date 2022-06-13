import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  /*this hook is going to fired every 
    time the navigation value changes i.e the value 
    of usestate(0)
  */
  const navigate = useNavigate();
  useEffect(()=>{
    if(value === 0) navigate("/");
    else if(value === 1) navigate("/movies");
    else if(value === 2) navigate("/series");
    else if(value === 3) navigate("/search");
  },[value,navigate])
  return (
    <Box sx={{ 
      width: "100%",
      position: "fixed",
      bottom: 0,
      backgroundColor: "#2d313a",
      zIndex: 100
     }}>
      <BottomNavigation
        sx={{ backgroundColor: "#2d313a"}}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction  
          sx={{ color:'white' }}
          label="Trending" 
          icon={<WhatshotIcon />} 
        />
        
        <BottomNavigationAction 
          sx={{ color:'white' }} 
          label="Movies" 
          icon={<MovieCreationIcon />} 
        />
         <BottomNavigationAction 
          sx={{ color:'white' }} 
          label="TV Series" 
          icon={<TvIcon />} 
        />
         <BottomNavigationAction 
          sx={{ color:'white' }} 
          label="Search" 
          icon={<SearchIcon />} 
        />
      </BottomNavigation>
    </Box>
  );
}
