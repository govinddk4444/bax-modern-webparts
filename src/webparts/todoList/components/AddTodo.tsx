import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import styles from "./TodoList.module.scss";

export default class AddTodo extends React.Component<any, {}> {
  state = {
    newTodo: ""
  };

  /** On change of the Add Todo Task input field */
  inputChange = e => {
    this.setState({
      newTodo: e.target.value
    });
  };

  /** On Click of the Submit Button */
  submitTodo = e => {
    e.preventDefault();
    this.props.addTodo(this.state.newTodo);
  };

  render(): React.ReactElement<any> {
    return (
      <form className={styles.addTodoStyle}>
        <input
          placeholder="Add Todo..."
          onChange={this.inputChange}
          style={{ flex: "10" }}
        />
        <PrimaryButton style={{ flex: "1" }} onClick={this.submitTodo}>
          Submit
        </PrimaryButton>
      </form>
    );
  }
}
