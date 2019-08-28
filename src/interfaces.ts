export interface FackerRplacer {
  (url: string): string
}

export type Condition = string | string[] | RegExp | RegExp[] | ((url: string) => boolean);

export interface FackerConfig {
  fackerUrl: string | FackerRplacer;
  enabled: boolean;
  include?: any;
  exclude?: any;
}

export interface RequestConf {
  url: string;
}
