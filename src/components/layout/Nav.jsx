import React from "react";

import { NavLink } from "react-router-dom";

import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <i className="fas fa-home"></i>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/posts"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <i className="far fa-newspaper"></i>
            Posts
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/useful"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <i className="fas fa-file-alt"></i>
            Useful
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <i className="fas fa-user"></i>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
