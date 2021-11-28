export interface InputProps {
  name: string;
  label: string;
  lebar?: number;
  value?: any;
  disable?: boolean;
  currency?: CURR;
  unit?: string;
  idcolumn?: string;
  apiurl?: string;
  apitoken?: string;
  selectionhandler?: (data: any) => void
  handlefunc?: (name: string, value: any) => void;
}

export enum CURR {
  IDR = "IDR",
  USD = "USD",
  SGD = "SGD",
}
