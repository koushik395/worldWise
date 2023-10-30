import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useAuth } from "../contexts/FakeAuthContext";

function PageNav() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/Product">Product</NavLink>
        </li>
        <li>
          <NavLink
            to={isAuthenticated ? "/" : "/login"}
            className={styles.ctaLink}
            onClick={() => {
              isAuthenticated ? logout() : {};
            }}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
