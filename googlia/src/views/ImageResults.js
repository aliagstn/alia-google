import { useCallback, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import CardImage from "../components/CardImage";
import { TbLoader } from "react-icons/tb";

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
      <div style={{display:'flex'}}>
      {isLoading ? (
          <TbLoader className="loading" size={300} />
        ) : (
          <div className="images">
            {
              searchResults?.map((image, i) => {
                 return <CardImage image={image} key={i} />
              })
            }            
          </div>
        )}
      </div>
    </div>
  );
}
