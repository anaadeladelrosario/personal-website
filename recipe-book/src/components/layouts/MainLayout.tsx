import { Outlet } from "react-router-dom";
import { AppHeader } from "../AppHeader";

export const MainLayout = () => {
  return (
    <div
      style={{
        backgroundSize: "30px 30px",
        backgroundPosition: "0 0, 15px 15px",
        backgroundImage:
          "linear-gradient(90deg,rgba(214, 79, 41, 0.4) 50%,transparent 0),linear-gradient(0deg, rgba(214, 79, 41, 0.4) 50%, transparent 0)",
      }}
      className="landing-page"
    >
      <AppHeader />
      {/* <Outlet /> is used to render child routes dynamically within the MainLayout, allowing for a consistent layout while displaying different content based on the active route. */}
      <Outlet />
      <div className="footer">
        <p>Footer</p>
      </div>
    </div>
  );
};
