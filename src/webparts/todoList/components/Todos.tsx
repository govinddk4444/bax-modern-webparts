import * as React from "react";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.scss";

export class Todos extends React.Component<any, any> {
  public render(): React.ReactElement<any> {
    return (
      <div>
        {this.props.todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={this.props.toggleComplete}
            delTodo={this.props.delTodo}
          />
        ))}
      </div>
    );
  }
}

export default Todos;
