import { useNavigate } from "react-router-dom";
import "./Page404.css"

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1>Page not found</h1>
      <button className="btnBackHome" onClick={() => navigate("/home")}>Back to Home</button>
    </div>
  );
};

export default Page404;