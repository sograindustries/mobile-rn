import * as React from 'react';
import { Api, makeApi } from '.';

export interface WithApiProps {
  api: Api;
}

const api = makeApi();
export const withApi = <P extends {}>(
  Component: React.ComponentType<P & WithApiProps>
) =>
  class WithApi extends React.Component<P, {}> {
    render() {
      return <Component {...this.props} api={api} />;
    }
  };
