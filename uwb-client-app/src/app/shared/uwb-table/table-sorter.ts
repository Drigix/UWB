import { SortOrder } from "./table-sort-order";

export class TableSorter {

  static sort(datasource: any[], sortField?: string, sortOrder: SortOrder = SortOrder.ASC, numeric = true): any[] {
      const collator = new Intl.Collator(navigator.language, { numeric });
      if (!sortField || datasource.length < 2) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return datasource;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return [...datasource].sort((recordOne, recordTwo) => {
          const subFields = sortField.split('.');
          let recordOneValue: any | null = null;
          let recordTwoValue: any | null = null;
          subFields.forEach((field) => {
              recordOneValue = recordOneValue === null ? recordOne[field] : recordOneValue[field];
              recordTwoValue = recordTwoValue === null ? recordTwo[field] : recordTwoValue[field];
          });
          if (recordOneValue === recordTwoValue) {
              return 0;
          }
          if (recordOneValue === null) {
              return (sortOrder === SortOrder.DESC) ? 1 : -1;
          } else if (recordTwoValue === null) {
              return (sortOrder === SortOrder.DESC) ? -1 : 1;
          }
          if (sortOrder === SortOrder.DESC) {
              return collator.compare(recordTwoValue, recordOneValue);
          }
          return collator.compare(recordOneValue, recordTwoValue);
      });
  }
}
