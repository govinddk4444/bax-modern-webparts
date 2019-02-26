import * as React from "react";
import { Link } from "react-router-dom";
import styles from "../TodoList.module.scss";
import { ITodoListProps } from "../ITodoListProps";

export class Header extends React.Component<any, {}> {
  render(): React.ReactElement<any> {
    return (
      <div>
        <header className={styles.header}>
          <h1>{this.props.webPartTitle}</h1>
          <Link to="/" className={styles.linkStyle}>
            Open Todo List
          </Link>{" "}
          |{" "}
          <Link className={styles.linkStyle} to="/about">
            About
          </Link>
          <p className={styles.subHeader}>{this.props.description}</p>
        </header>
      </div>
    );
  }
}

export default Header;
