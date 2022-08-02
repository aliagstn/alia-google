import { useCallback, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TbLoader } from "react-icons/tb";
import axios from "axios";
import CardNews from "../components/CardNews";
import { Bookmark } from "../Context";
import { BsSearch } from "react-icons/bs";

export default function NewsResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputSearch, setInputSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [topSearch, setTopSearch] = useState(true);
  // eslint-disable-next-line
  const [context, setContext] = useContext(Bookmark)
  
  const gettingResults = useCallback(async () => {
    try {
      let query = searchParams.get("search");
      let response = await axios({
        method: "GET",
        url: `https://google-search3.p.rapidapi.com/api/v1/news/q=${query}`,
        headers: {
          "X-RapidAPI-Key": `${process.env.REACT_APP_KEY}`,
          "X-RapidAPI-Host": "google-search3.p.rapidapi.com",
          "X-Proxy-Location": "ID",
        },
      });
      if (response.data.entries) {
        setSearchResults(response.data.entries);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    gettingResults();
  }, [gettingResults, context]);

  const toSearch = () => {
    setIsLoading(true);
    setSearchParams({ search: inputSearch });
  };
  return (
    <div style={{ backgroundColor: "#F2E6D5",overflowX:'hidden',marginRight:'0px' }}>
      <div style={{position:'relative',zIndex:100,width:'100vw'}}>
        <div className="navbar-search-results">
          <div>
            <h2 style={{ color: "#dcb1b3" }}>googlia</h2>
          </div>
          <form className="form-search nav-search">
            <BsSearch color="#bbb1a6" size={20} style={{ margin: "5px" }} />
            <input
              type="text"
              onChange={(e) => setInputSearch(e.target.value)}
              defaultValue={searchParams.get("search")}
              className="search-input"
            />
            <input
              type="submit"
              onClick={toSearch}
              style={{ display: "none" }}
            />
          </form>
        </div>
        <hr style={{display:'none'}} />
      </div>
      <div className="content-news">
        <div className="navbar-news">
          <h2
            className={topSearch ? "h2-clicked" : "navbar-news-h2"}
            onClick={() => setTopSearch(true)}
          >
            Top Search
          </h2>
          <h2
            className={!topSearch ? "h2-clicked" : "navbar-news-h2"}
            onClick={() => setTopSearch(false)}
          >
            My Bookmark
          </h2>
        </div>
        <div className="news">
          {isLoading ? (
            <div className="loading-container">
            <TbLoader className="loading" size={100} />
          </div>
          ) : (
            <>
              {topSearch ? (
                <>
                  {searchResults?.map((news, i) => {
                    return <CardNews news={news} key={i} />;
                  })}
                </>
              ) : (
                <>
                  {context?.map((news, i) => {
                    return <CardNews news={news} key={i} />;
                  })}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}