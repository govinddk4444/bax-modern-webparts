import * as React from "react";
import styles from "./TodoList.module.scss";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import {
  DefaultButton,
  PrimaryButton,
  IButtonProps
} from "office-ui-fabric-react/lib/Button";

export class TodoItem extends React.Component<any, {}> {
  /** Get Dynamic styles for the Todo Task */
  getStyle = (): object => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: this.props.todo.completed ? "line-through" : "none"
    };
  };

  render(): React.ReactElement<any> {
    const { id, title } = this.props.todo;
    return (
      <div style={this.getStyle()}>
        <p>
          <input
            type="checkbox"
            onChange={this.props.toggleComplete.bind(this, id)}
          />{" "}
          {title}
          <DefaultButton
            className={styles.deleteButton}
            text="x"
            onClick={this.props.delTodo.bind(this, id)}
          />
        </p>
      </div>
    );
  }
}

export default TodoItem;
