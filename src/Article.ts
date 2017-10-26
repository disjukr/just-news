export interface Timestamp {
  created?: Nullable<Date>;
  lastModified?: Nullable<Date>;
}

export interface Reporter {
  name?: Nullable<string>;
  mail?: Nullable<string>;
}

export default interface Article {
  title?: Nullable<string>;
  subtitle?: Nullable<string>;
  content?: Nullable<string>;
  timestamp?: Nullable<Timestamp>;
  reporters?: Nullable<Reporter[]>;
  cleanup?: Nullable<() => void>;
}
