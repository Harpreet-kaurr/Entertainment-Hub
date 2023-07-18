import { Button, Tab, Tabs, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  primary: {
    main: "#fff",
  },
});

const Search = () => {
  const [type, setType] = useState(0);
  const [page,setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [hasPage,setHasPage] = useState(false);

  const fetchSearch = async () => {
      const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        );
        if(data.total_pages>1)
         setHasPage(true)

      setContent(data.results);
  };
  
  useEffect(()=>{
    window.scroll(0,0)
    fetchSearch();
    //eslint-disable-react-line
  },[page,type])

  return (
    <div>
        <ThemeProvider theme={darkTheme}>
        <div style={{display:'flex',margin:"15px 0"}}>
          <TextField
              style={{ flex: 1 }}
              className="searchBox"
              label="Search"
              variant="filled"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button 
              variant='contained' 
              style={{marginLeft:10}}
              onClick ={fetchSearch}
            > 
            <SearchIcon></SearchIcon> 
            </Button>
        </div>

        <Tabs 
          value={type} 
          indicatorColor='primary' 
          textColor='primary'
          onChange={(event, newValue) =>{
            setType(newValue);
            setPage(1);
          }}
          style={{paddingBottom:5}}
          aria-label="disabled tabs example"
          >
          <Tab style={{width:"50%"}} label="Search Movies"></Tab>
          <Tab style={{width:"50%"}} label="Search Tv Series"></Tab>
        </Tabs>
        </ThemeProvider>
        <div className='trending'>
            {content && content.map((c) =>(           
                <SingleContent
                    key={c.id}
                    id={c.id} 
                    poster={c.poster_path} 
                    title ={c.title || c.name} 
                    date={c.first_air_date || c.release_date}
                    media_type ={type ? 'tv' : 'movie'}
                    vote_average ={c.vote_average}
                />
            ))}
            {searchText && !content && (type ? <h2>No Series Found</h2>:<h2>No Movies Found</h2>)}
        </div>
        {hasPage && (
          <CustomPagination setPage={setPage} />
        )}
    </div>
  )
}

export default Search