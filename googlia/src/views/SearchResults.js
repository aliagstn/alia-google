import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TbLoader } from "react-icons/tb";
import CardResults from "../components/CardResults";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { GrPrevious, GrNext } from "react-icons/gr";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputSearch, setInputSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [pages, setPages] = useState([]);
  const gettingResults = useCallback(async () => {
    try {
      let query = searchParams.get("search");
      let page = +searchParams.get("page") * 10;
      let response = await axios({
        method: "GET",
        url: `https://google-search3.p.rapidapi.com/api/v1/search/q=${query}&num=10&start=${page}`,
        headers: {
          "X-RapidAPI-Key": `${process.env.REACT_APP_KEY}`,
          "X-RapidAPI-Host": "google-search3.p.rapidapi.com",
          "X-Proxy-Location": "ID",
        },
      });
      if (response.data.results) {
        setSearchResults(response.data.results);
      }
      let currentPage = searchParams.get("page");
      setPages([currentPage, +currentPage + 1, +currentPage + 2]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    gettingResults();
  }, [gettingResults]);

  const toSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSearchParams({ search: inputSearch, page: 1 });
  };

  const handlePageClick = (data) => {
    setIsLoading(true);
    setSearchParams({
      search: searchParams.get("search"),
      page: +data,
    });
  };
  const handleNextPage = () => {
    setIsLoading(true);
    setSearchParams({
      search: searchParams.get("search"),
      page: +searchParams.get("page") + 1,
    });
  };
  const handlePreviousPage = () => {
    setIsLoading(true);
    setSearchParams({
      search: searchParams.get("search"),
      page: +searchParams.get("page") - 1,
    });
  };
  return (
    <div style={{ backgroundColor: "#F2E6D5",overflowX:'hidden' }}>
      <div style={{position:'absolute',zIndex:100,width:'100vw'}}>
        <div className="navbar-search-results">
          <div>
            <h2 style={{ color: "#dcb1b3" }}>googlia</h2>
          </div>
          <form className="form-search nav-search" action=".">
            <BsSearch color="#bbb1a6" size={20} style={{ margin: "5px" }} />
            <input
              type="search"
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
        <hr />
      </div>
      <div className="results" >
        {isLoading ? (
          <div className="loading-container">
            <TbLoader className="loading" size={100} />
          </div>
        ) : (
          <div style={{marginTop:'100px'}}>
            {searchResults?.map((result, i) => {
              return <CardResults result={result} key={i} />;
            })}
            <div className="pagination">
              {+pages[0] !== 1 && (
                <GrPrevious
                  onClick={handlePreviousPage}
                  style={{ cursor: "pointer" }}
                />
              )}
              <>
                {pages.map((page, i) => {
                  return (
                    <p
                      key={i}
                      className={
                        searchParams.get("page") === page
                          ? "currentpage"
                          : undefined
                      }
                      onClick={() => handlePageClick(page)}
                    >
                      {page}
                    </p>
                  );
                })}
              </>
              <GrNext onClick={handleNextPage} style={{ cursor: "pointer" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
