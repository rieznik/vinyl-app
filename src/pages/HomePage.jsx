import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <h1 style={{ padding: "30px", textAlign: "center" }}>
        Application Home Page
      </h1>
      <Link
        to="/search"
        style={{
          textDecoration: "underline",
          textAlign: "center",
          display: "block",
        }}
      >
        Go to Search Page
      </Link>
    </>
  );
}

export default HomePage;
