export interface UniversalTableColumn {
  field: string;
  header: string;
  translatedHeader?: string;
  subField?: string;
  secondField?: string;
  style?: any;
  lp?: number;
  label?: string;
  name?: string;
  hidden?: boolean;
  onylExport?: boolean;
  exportable?: boolean;
  summaryResult?: object;
  prefix?: string;
  suffix?: string;
  dateFormat?: string;
  colorBlock?: boolean;
}
