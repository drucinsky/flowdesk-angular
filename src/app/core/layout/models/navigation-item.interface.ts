export interface INavigationItem {
  readonly label: string;
  readonly path: string;
  readonly icon: string;
  readonly exact?: boolean;
}
