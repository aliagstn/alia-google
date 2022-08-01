import { useCallback, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TbLoader } from "react-icons/tb";
import axios from "axios";
import CardNews from "../components/CardNews";
import { Bookmark } from "../Context";

export default function NewsResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputSearch, setInputSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [topSearch, setTopSearch] = useState(true);
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
    <div>
      <div className="navbar-search-results">
        <div style={{ marginLeft: 50 }}>
          <h2>googlia</h2>
        </div>
        <div
          style={{
            marginLeft: 70,
            border: 1,
            height: 25,
            backgroundColor: "pink",
            width: 500,
            borderRadius: 20,
          }}
        >
          <input
            type="text"
            onChange={(e) => setInputSearch(e.target.value)}
            defaultValue={searchParams.get("search")}
            style={{ border: "none", width: 400 }}
          />
          <button onClick={toSearch}>search</button>
        </div>
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
            <TbLoader className="loading" size={300} />
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
