import { useEffect, useState } from "react";

export default function AdditionalLinks({ result }) {
    const [displayText, setDisplayText] = useState("")
    const [displayLink, setDisplayLink] = useState("")
    useEffect(() => {
        if(result.text){
            let indexLink = result.text.indexOf("http")
            let text = result.text.slice(0,+indexLink)
            let link = result.text.slice(+indexLink)
            if(text.length > 3 && link.length > 3){
              setDisplayText(text)
              setDisplayLink(link)
            }
        }
    },[result])

  return (
    <div className="additional-links">
      {displayText && (
        <>
          <a href={result.href}>
            <p>{displayLink}</p>
            <h5 style={{margin:0,color:"#697184"}}>{displayText}</h5>
          </a>
        </>
      )}
    </div>
  );
}
