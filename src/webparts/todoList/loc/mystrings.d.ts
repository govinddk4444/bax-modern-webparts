declare interface ITodoListWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  WebPartTitleFieldLabel: string;
  TaskListFieldLabel: string;
}

declare module "TodoListWebPartStrings" {
  const strings: ITodoListWebPartStrings;
  export = strings;
}
