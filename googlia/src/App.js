import './App.css';
import {Route, Routes} from 'react-router-dom'
import HomeSearch from './views/HomeSearch';
import SearchResults from './views/SearchResults';
import ImageResults from './views/ImageResults';
import NewsResults from './views/NewsResults';
import { Bookmark } from './Context';
import { useState } from 'react';

function App() {
  const [bookmark, setBookmark] = useState([])
  return (
    <div className="App">
      <Bookmark.Provider value={[bookmark, setBookmark]} >
      <Routes>
        <Route path='/' element={<HomeSearch/>}/>
        <Route path='/search' element={<SearchResults/>}/>
        <Route path='/images' element={<ImageResults/>}/>
        <Route path='/news' element={<NewsResults/>}/>
      </Routes>
      </Bookmark.Provider>
    </div>
  );
}

export default App;
