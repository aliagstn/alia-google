import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TbLoader } from "react-icons/tb";
import CardResults from "../components/CardResults";
import axios from "axios";
import ReactPaginate from "react-paginate";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputSearch, setInputSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const gettingResults = useCallback(async () => {
    try {
      let query = searchParams.get("search");
      let page = +searchParams.get("page") * 10;
      let response = await axios({
        method: "GET",
        url: `https://google-search3.p.rapidapi.com/api/v1/search/q=${query}&num=10&start=${page}`,
        headers: {
          "X-RapidAPI-Key":
            "85b8e54450msh5d92cc2cdcbddf4p148241jsn36440a14b7a9",
          "X-RapidAPI-Host": "google-search3.p.rapidapi.com",
          "X-Proxy-Location": "ID",
        },
      });
      if (response.data.results) {
        setSearchResults(response.data.results);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    gettingResults();
  }, [gettingResults]);

  const toSearch = () => {
    setIsLoading(true);
    setSearchParams({ search: inputSearch, page: 1 });
  };

  const handlePageClick = (data) => {
    setIsLoading(true);
    setSearchParams({
      search: searchParams.get("search"),
      page: +data.selected + 1,
    });
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
      <hr />
      <div className="results">
        {isLoading ? (
          <TbLoader className="loading" size={300} />
        ) : (
          <>
            {searchResults?.map((result, i) => {
              return <CardResults result={result} key={i} />;
            })}
            <nav className="footer-pagination">
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={30}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="active"
                forcePage={searchParams.get("page")}
              />
            </nav>
          </>
        )}
      </div>
    </div>
  );
}
