import ChartsIcon from "./charts.svg";
import FormsIcon from "./forms.svg";

export { ChartsIcon, FormsIcon };

interface IIcon {
  icon: string;
  [key: string]: string | undefined;
}

export type { IIcon };
