import { useEffect, useState } from "react"

export default function CardImage({ image }) {
  const [displayTitle, setDisplayTitle] = useState("")
    useEffect(() => {
        if(image.link.title){
            let indexLink = image.link.title.indexOf("www")
            setDisplayTitle(image.link.title.slice(0,+indexLink))
        }
    },[image])
  return (
    <div className="image">
        <img src={image.image.src} alt={image.image.alt} />
        <div className="overlay">
          <p style={{color:'white'}}>{displayTitle}</p>
          <a href={image.link.href}>
            <button style={{cursor:'pointer'}}>Visit</button>
          </a>
        </div>
    </div>
  );
}
