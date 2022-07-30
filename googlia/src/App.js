import './App.css';
import {Route, Routes} from 'react-router-dom'
import HomeSearch from './views/HomeSearch';
import SearchResults from './views/SearchResults';
import ImageResults from './views/ImageResults';
import NewsResults from './views/NewsResults';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomeSearch/>}/>
        <Route path='/search' element={<SearchResults/>}/>
        <Route path='/images' element={<ImageResults/>}/>
        <Route path='/news' element={<NewsResults/>}/>
      </Routes>
    </div>
  );
}

export default App;
