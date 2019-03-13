import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'BaxSurveyWebPartStrings';
import BaxSurvey from './components/BaxSurvey';
import { IBaxSurveyProps } from './components/IBaxSurveyProps';

export interface IBaxSurveyWebPartProps {
  description: string;
}

export default class BaxSurveyWebPart extends BaseClientSideWebPart<IBaxSurveyWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBaxSurveyProps > = React.createElement(
      BaxSurvey,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
