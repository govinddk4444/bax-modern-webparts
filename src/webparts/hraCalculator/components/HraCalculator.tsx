import * as React from "react";
import styles from "./HraCalculator.module.scss";
import { IHraCalculatorProps } from "./IHraCalculatorProps";
import { escape } from "@microsoft/sp-lodash-subset";

export default class HraCalculator extends React.Component<
  IHraCalculatorProps,
  {}
> {
  constructor(props: IHraCalculatorProps) {
    super(props);
  }

  public render(): React.ReactElement<IHraCalculatorProps> {
    return (
      <div className={styles.hraCalculator}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column} />
          </div>
        </div>
      </div>
    );
  }
}
