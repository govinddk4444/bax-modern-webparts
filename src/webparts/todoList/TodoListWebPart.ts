import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";
import pnp from "sp-pnp-js";
import * as strings from "TodoListWebPartStrings";
import TodoList from "./components/TodoList";
import { ITodoListProps } from "./components/ITodoListProps";

export interface ITodoListWebPartProps {
  description: string;
  title: string;
  taskList: string | string[];
}

export default class TodoListWebPart extends BaseClientSideWebPart<
  ITodoListWebPartProps
> {
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      pnp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<ITodoListProps> = React.createElement(
      TodoList,
      {
        description: this.properties.description,
        webPartTitle: this.properties.title,
        currentUserId: this.context.pageContext.legacyPageContext["userId"],
        currentSiteRelativeUrl: this.context.pageContext.legacyPageContext[
          "siteServerRelativeUrl"
        ],
        taskTrackerList: this.properties.taskList
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("title", {
                  label: strings.WebPartTitleFieldLabel
                }),
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField("taskList", {
                  label: strings.TaskListFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
