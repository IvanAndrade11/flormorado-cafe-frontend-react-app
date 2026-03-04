export interface ISession {
  loader: boolean;
}

export interface IMainState {
  session: ISession;
  flags: any;
}
