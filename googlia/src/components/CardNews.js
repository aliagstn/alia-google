import { useContext, useEffect, useState } from "react";
import { BsBookmarkPlus, BsBookmarkDashFill } from "react-icons/bs";
import { Bookmark } from "../Context";
import {AiOutlineRead, AiFillRead} from 'react-icons/ai'
export default function CardNews({ news }) {
  const [context, setContext] = useContext(Bookmark);
  const [mark, setMark] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  useEffect(() => {
    let checkBookmark = context.find((el) => el.id === news.id);
    if (checkBookmark) {
      setMark(true);
    } else {
      setMark(false);
    }
    // eslint-disable-next-line
  }, [context]);
  const toSetBookmark = () => {
    if (context.length) {
      setContext((context) => [...context, news]);
    } else {
      setContext([news]);
    }
  };
  const toDeleteBookmark = () => {
    let filteredNews = context.filter((el) => el.id !== news.id);
    setContext(filteredNews);
  };
  return (
    <div className="a-news">
      <p className="news-attributes">{news.source.title}</p>
      <p className="news-attributes">{news.published}</p>
      <h2>{news.title}</h2>
      <div className="buttons-on-news">
        {mark ? (
        <div className="tool" data-tip="Delete">
            <BsBookmarkDashFill
              size={20}
              onClick={toDeleteBookmark}
              style={{ cursor: "pointer" }}
            />
        </div>
        ) : (
            <div className="tool" data-tip="Save">
                <BsBookmarkPlus
                  size={20}
                  onClick={toSetBookmark}
                  style={{ cursor: "pointer" }}
                />
            </div>
        )}
        {
            showSummary ? 
            (
                <div className="tool" data-tip="Close Summary">
                    <AiFillRead size={25} style={{ cursor: "pointer" }} onClick={() => setShowSummary(false)}/>
                </div>
            ) : 
            (
                <div className="tool" data-tip="Read Summary">
                <AiOutlineRead size={25} style={{ cursor: "pointer" }} onClick={() => setShowSummary(true)}/>
                </div>
            )
        }
      </div>
      {showSummary && (
        <div className="summary">
          <p dangerouslySetInnerHTML={{ __html: news.summary }}></p>
          <a href={news.link}>
            <button>Read More</button>
          </a>
        </div>
      )}
    </div>
  );
}
