import { useState } from 'react';
import {BiSearchAlt} from 'react-icons/bi'
import { createSearchParams, useNavigate } from 'react-router-dom';
export default function HomeSearch() {
    const navigate = useNavigate()
    const [defaultSearch, setDefaultSearch] = useState(true)
    const [imageSearch, setImageSearch] = useState(false)
    const [newsSearch, setNewsSearch] = useState(false)
    const [searhInput, setSearchInput] = useState("")
    const toSetImageSearch = () => {
        setDefaultSearch(false)
        setNewsSearch(false)
        setImageSearch(true)
    }
    const toSetNewsSearch = () => {
        setDefaultSearch(false)
        setImageSearch(false)
        setNewsSearch(true)
    }
    const toSetDefaultSearch = () => {
        setNewsSearch(false)
        setImageSearch(false)
        setDefaultSearch(true)
    }
    const toSearch = () => {
        if(defaultSearch){
            navigate({
                pathname: "/search",
                search: `?${createSearchParams({search:searhInput,page:1})}`
            })
        }
    }
  return (
    <div className="container-home">
      <nav id="navbar">
        <div>
          <button style={{ margin: 20 }} onClick={toSetDefaultSearch}>googlia</button>
        </div>
        <div>
          <button style={{ margin: 20 }} onClick={toSetImageSearch}>images</button>
          <button style={{ margin: 20 }} onClick={toSetNewsSearch}>news</button>
        </div>
      </nav>
      <div className="App-header">
        {
            defaultSearch &&
            <h1 id="googlia">googlia</h1>
        }
        {
            imageSearch &&
            <h1 id="googlia">googlia <small style={{fontSize:20}}>images</small></h1>
        }
        {
            newsSearch &&
            <h1 id="googlia">googlia <small style={{fontSize:20}}>news</small></h1>
        }
        <div>
          <input type="text" name="search" id="" onChange={(e) => setSearchInput(e.target.value)} />
          <button onClick={toSearch}><BiSearchAlt color='' /></button>
        </div>
      </div>
    </div>
  );
}
