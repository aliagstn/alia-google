import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { createSearchParams, useNavigate } from "react-router-dom";
export default function HomeSearch() {
  const navigate = useNavigate();
  const [defaultSearch, setDefaultSearch] = useState(true);
  const [imageSearch, setImageSearch] = useState(false);
  const [newsSearch, setNewsSearch] = useState(false);
  const [searhInput, setSearchInput] = useState("");
  const toSetImageSearch = () => {
    setDefaultSearch(false);
    setNewsSearch(false);
    setImageSearch(true);
  };
  const toSetNewsSearch = () => {
    setDefaultSearch(false);
    setImageSearch(false);
    setNewsSearch(true);
  };
  const toSetDefaultSearch = () => {
    setNewsSearch(false);
    setImageSearch(false);
    setDefaultSearch(true);
  };
  const toSearch = () => {
    if (defaultSearch) {
      navigate({
        pathname: "/search",
        search: `?${createSearchParams({ search: searhInput, page: 1 })}`,
      });
    }
    if (imageSearch) {
      navigate({
        pathname: "/images",
        search: `?${createSearchParams({ search: searhInput })}`,
      });
    }
    if (newsSearch) {
      navigate({
        pathname: "/news",
        search: `?${createSearchParams({ search: searhInput })}`,
      });
    }
  };
  return (
    <div style={{height:'100vh',overflow:'hidden'}}>
      <div >
        <nav id="navbar">
          <h4
            onClick={toSetDefaultSearch}
            className={defaultSearch ? "nav-clicked" : undefined}
          >
            All
          </h4>
          <h4
            onClick={toSetImageSearch}
            className={imageSearch ? "nav-clicked" : undefined}
          >
            Image
          </h4>
          <h4
            onClick={toSetNewsSearch}
            className={newsSearch ? "nav-clicked" : undefined}
          >
            News
          </h4>
        </nav>
      </div>
      <section className="App-header">
        {defaultSearch && <h1 className="googlia">googlia</h1>}
        {imageSearch && (
          <h1 className="googlia">
            googlia <small style={{ fontSize: 20 }}>images</small>
          </h1>
        )}
        {newsSearch && (
          <h1 className="googlia">
            googlia <small style={{ fontSize: 20 }}>news</small>
          </h1>
        )}
        <form className="form-search">
          <BiSearchAlt color="" size={30} style={{ margin: "5px" }} />
          <input
            type="text"
            name="search"
            className="search-input-home"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <input
            type="submit"
            onClick={toSearch}
            style={{ display: "none" }}
          ></input>
        </form>
      </section>
    </div>
  );
}
