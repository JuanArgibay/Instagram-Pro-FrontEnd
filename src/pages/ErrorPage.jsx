import { Link } from "react-router-dom";

export const NotFoundPage = ({ error, className }) => {
  return (
    <section
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>{error}</h1>
      <Link to={"/"}>HOME</Link>
    </section>
  );
};
