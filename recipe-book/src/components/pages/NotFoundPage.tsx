import { Link } from "react-router-dom";
export const NotFoundPage = () => {
  return (
    <section className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>This page does not exist.</p>
      <Link to="/" className="btn">
        Go back to home
      </Link>
    </section>
  );
};
