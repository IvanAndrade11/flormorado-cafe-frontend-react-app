export interface ISession {
  loader: boolean;
  categoryTitle: string;
}

export interface IMainState {
  session: ISession;
  flags: any;
}
