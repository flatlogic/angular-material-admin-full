export interface FilterConfig {
  value?: string;
  valueFrom?: number | string;
  valueTo?: number | string;
  filter?: string;
  number?: boolean | string;
}

export interface FilterItems {
  label?: string;
  title?: string;
  number?: string;
}

export interface AutoCompleteItem {
  id: string;
  label: string;
}
