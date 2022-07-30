import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdditionalLinks({ result }) {
    const [displayText, setDisplayText] = useState("")
    const [displayLink, setDisplayLink] = useState("")
    useEffect(() => {
        if(result.text){
            let indexLink = result.text.indexOf("http")
            let text = result.text.slice(0,+indexLink)
            let link = result.text.slice(+indexLink)
            setDisplayText(text)
            setDisplayLink(link)
        }
    },[result])

  return (
    <div style={{margin:5,color:'black'}}>
      {displayText && (
        <>
          <Link to={result.href} style={{textDecoration:'none'}}>
            <p style={{fontSize:12,opacity:0.7,margin:0,color:'black'}}>{displayLink}</p>
            <h5 style={{margin:0}}>{displayText}</h5>
          </Link>
        </>
      )}
    </div>
  );
}
