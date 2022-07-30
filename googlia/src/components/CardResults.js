import AdditionalLinks from "./AdditionalLinks";

export default function CardResults({result}){
    return (
        <div style={{marginLeft:220,textAlign:'left'}}>
            <p style={{marginBottom:0,opacity:0.7}}>{result.cite.domain}</p>
            <h4 style={{margin:0}}>{result.title}</h4>
            <p style={{marginTop:5,marginBottom:6}}>{result.description}</p>
            {
                result.additional_links.map((result,i) => {
                    return <AdditionalLinks result={result} key={i} />
                })
            }
        </div>
    )
}