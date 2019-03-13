import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps
} from "react-router-dom";
import styles from "./TodoList.module.scss";
import pnp, { ItemAddResult } from "sp-pnp-js";
import { ITodoListProps } from "./ITodoListProps";
import Todos from "./Todos";
import AddTodo from "./AddTodo";
import { escape } from "@microsoft/sp-lodash-subset";
import Header from "./layout/header";
import About from "./pages/about";

export default class TodoList extends React.Component<ITodoListProps, any> {
  constructor(props: ITodoListProps, state: any) {
    super(props, state);
    this.state = {
      todos: [],
      taskTrackerList: this.props.taskTrackerList
    };
  }

  /** Toggle the strike-through based on the check box */
  public toggleComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
          pnp.sp.web.lists
            .getByTitle(this.state.taskTrackerList)
            .items.getById(id)
            .update({
              Completed: todo.completed
            });
        }
        return todo;
      })
    });
  };

  /** Delete the Todo Task */
  public delTodo = id => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    });
    pnp.sp.web.lists
      .getByTitle(this.state.taskTrackerList)
      .items.getById(id)
      .delete();
  };

  /** Add a Todo Task */
  public addTodo = newEntry => {
    const newTodo = {
      title: newEntry,
      completed: false
    };
    pnp.sp.web.lists
      .getByTitle(this.state.taskTrackerList)
      .items.add({
        Title: newTodo.title,
        Completed: newTodo.completed
      })
      .then((result: ItemAddResult) => {
        let spListTodo = {};
        spListTodo["title"] = result.data.Title;
        spListTodo["id"] = result.data.ID;
        spListTodo["completed"] = result.data.Completed;
        spListTodo["author"] = result.data.AuthorId;
        this.setState({
          todos: [...this.state.todos, spListTodo]
        });
      });
  };

  /** On Mounting the component */
  public componentDidMount(): void {
    pnp.sp.web.lists
      .getByTitle(this.state.taskTrackerList)
      .items.select("Title", "Completed", "ID", "Author/Id")
      .expand("Author")
      .filter("Author/Id eq " + this.props.currentUserId)
      .get()
      .then((items: any[]) => {
        items.map(item => {
          let spListTodo = {};
          spListTodo["title"] = item.Title;
          spListTodo["id"] = item.ID;
          spListTodo["completed"] = item.Completed;
          spListTodo["author"] = item.Author.Id;
          this.setState({
            todos: [...this.state.todos, spListTodo]
          });
        });
      });
  }

  public render(): React.ReactElement<ITodoListProps> {
    return (
      <Router>
        <div className={styles.todoList}>
          <div className={styles.container}>
            <Header
              webPartTitle={this.props.webPartTitle}
              description={escape(this.props.description)}
              currentSiteRelativeUrl={this.props.currentSiteRelativeUrl}
            />
            <Route
              exact
              path={this.props.currentSiteRelativeUrl}
              render={props => (
                <div>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    toggleComplete={this.toggleComplete}
                    delTodo={this.delTodo}
                  />
                </div>
              )}
            />
            <Route
              path={this.props.currentSiteRelativeUrl + "/about"}
              component={About}
            />
          </div>
        </div>
      </Router>
    );
  }
}
