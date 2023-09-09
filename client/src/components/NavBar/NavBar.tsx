import { useSelector } from "react-redux";
import { RootState, store } from "../../redux/Store";
import { setLogoutAction } from "../../redux/AuthReducer";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./NavBar.css"

const NavBar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const fullName = `${user?.firstName} ${user?.lastName}`;
  const location = useLocation();
  const isAdmin = user?.level === 1 ? true : false;
  const pages = [
    { label: "vacations", path: "home" },
    ...(isAdmin
      ? [
          { name: "Add Vacation", path: "addVacation" },
          { name: "Followers Graph", path: "followersChart" },
        ]
      : []),
  ];

  const handleLogout = () => {
    store.dispatch(setLogoutAction());
    navigate("/");
  };

  return (
    <div
      className="navbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        backgroundColor: "#282c34",
        color: "white",
      }}>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <h1
          style={{ margin: 0, cursor: "pointer" }}
          onClick={() => navigate("/home")}>
          Vacations
        </h1>
        {pages.map((page, index) => (
          <h4
            className={location.pathname === page.path ? "active" : ""}
            style={{ margin: "0", cursor: "pointer" }}
            onClick={() => navigate(page.path)}
            key={index}>
            {page.name}
          </h4>
        ))}
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        <h3 style={{ margin: "0", alignSelf: "center" }}>{fullName}</h3>
        <button  className="logout"
  
  onClick={handleLogout}
>
  Logout
</button>

      </div>
    </div>
  );
};

export default NavBar;