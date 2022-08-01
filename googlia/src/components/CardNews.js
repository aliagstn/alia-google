import { useContext, useEffect, useState } from 'react'
import {BsBookmarkPlus, BsBookmarkDashFill} from 'react-icons/bs'
import { Bookmark } from '../Context'
export default function CardNews({news}){
    const [context, setContext] = useContext(Bookmark)
    const [mark, setMark] = useState(false)
    useEffect(() => {
        let checkBookmark = context.find(el => el.id === news.id)
        if(checkBookmark){
            setMark(true)
        }else{
            setMark(false)
        }
    }, [context])
    const toSetBookmark = () => {
        if(context.length){
            setContext(context => [...context, news])
        }else{
            setContext([news])
        }
    }
    const toDeleteBookmark = () => {
        let filteredNews = context.filter(el => el.id != news.id)
        setContext(filteredNews)
        console.log(filteredNews, "<<todelete")
    }
    return (
        <div className="a-news">
            <p><small>{news.source.title}</small></p>
            <p><small>{news.published}</small></p>
            <h2>{news.title}</h2>
            <div className="buttons-on-news">
                {
                    mark ?
                    <BsBookmarkDashFill size={20} onClick={toDeleteBookmark} style={{cursor:'pointer'}} />
                    :
                    <BsBookmarkPlus size={20} onClick={toSetBookmark} style={{cursor:'pointer'}} />
                }
                <button>read summary</button>
            </div>
            <p dangerouslySetInnerHTML={{__html: news.summary}}></p>
            <a href={news.link}>
                <button>Read More</button>
            </a>
        </div>
    )
}