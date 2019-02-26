import * as React from "react";
import styles from "../TodoList.module.scss";

export default class About extends React.Component<any, {}> {
  render(): React.ReactElement<any> {
    return (
      <div>
        <h1>About</h1>
        <p>
          This webpart is designed to save your Todo Tasks in SharePoint. You
          can add, remove and strike off any or all tasks that are under your
          name. This is built using the SharePoint Framework using React JS and
          Typescript.
        </p>
      </div>
    );
  }
}
