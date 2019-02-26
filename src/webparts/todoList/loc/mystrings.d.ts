declare interface ITodoListWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  WebPartTitleFieldLabel: string;
}

declare module "TodoListWebPartStrings" {
  const strings: ITodoListWebPartStrings;
  export = strings;
}
