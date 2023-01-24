import "./sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/dashboard" className="link">
              <li className="sidebarListItem ">
                <i class="fa-solid fa-house-user sidebarIcon"></i>
                Overview
              </li>
            </Link>
            <li className="sidebarListItem">
              <i class="fa-solid fa-chart-line sidebarIcon"></i>
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/admin/users" className="link">
              <li className="sidebarListItem">
                <i class="fa-solid fa-users sidebarIcon"></i>
                Users
              </li>
            </Link>
            <Link to="/admin/products" className="link">
              <li className="sidebarListItem">
                <i class="fa-solid fa-shop sidebarIcon"></i>
                Products
              </li>
            </Link>
            <Link to="/admin/orders" className="link">
              <li className="sidebarListItem">
                <i class="fa-solid fa-basket-shopping sidebarIcon"></i>
                Orders
              </li>
            </Link>
            <Link to="/admin/reviews" className="link">
              <li className="sidebarListItem">
                <i class="fa-regular fa-star-half-stroke sidebarIcon"></i>
                Reviews
              </li>
            </Link>

          </ul>

        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
            <i class="fa-solid fa-envelope sidebarIcon"></i>
              Mail
            </li>
            <li className="sidebarListItem">
            <i class="fa-solid fa-comments sidebarIcon"></i>
              Feedback
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">

              Manage
            </li>
            <li className="sidebarListItem">

              Analytics
            </li>
            <li className="sidebarListItem">

              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
