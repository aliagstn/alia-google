import AdditionalLinks from "./AdditionalLinks";

export default function CardResults({ result }) {
  return (
    <div className="card-results">
      <a href={result.link}>
        <p className="domain-result">{result.cite.domain}</p>
        <h4>{result.title}</h4>
      </a>
      <p style={{ marginTop: 5, marginBottom: 6, color: "#697184" }}>{result.description}</p>
      {result.additional_links.map((result, i) => {
        return <AdditionalLinks result={result} key={i} />;
      })}
    </div>
  );
}
