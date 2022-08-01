import { useCallback, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import CardImage from "../components/CardImage";
import { TbLoader } from "react-icons/tb";
import { BsSearch } from "react-icons/bs";

export default function ImageResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputSearch, setInputSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const gettingResults = useCallback(async () => {
    try {
      let query = searchParams.get("search");
      let response = await axios({
        method: "GET",
        url: `https://google-search3.p.rapidapi.com/api/v1/image/q=${query}`,
        headers: {
          "X-RapidAPI-Key": `${process.env.REACT_APP_KEY}`,
          "X-RapidAPI-Host": "google-search3.p.rapidapi.com",
          "X-Proxy-Location": "ID",
        },
      });
      if (response.data.image_results) {
        setSearchResults(response.data.image_results);
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
    setSearchParams({ search: inputSearch });
  };

  return (
    <div style={{ backgroundColor: "#fbfbfb",overflowX:'hidden',marginRight:'0px' }}>
      <div style={{position:'absolute',zIndex:100,width:'100vw'}}>
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
        <hr />
      </div>
      <div className="results" >
        {isLoading ? (
          <div className="loading-container">
            <TbLoader className="loading" size={100} />
          </div>
        ) : (
          <div style={{marginTop:'100px'}}>
          <div className="images">
            {
              searchResults?.map((image, i) => {
                 return <CardImage image={image} key={i} />
              })
            }            
          </div>
          </div>
        )}
      </div>
    </div>
  );
}
