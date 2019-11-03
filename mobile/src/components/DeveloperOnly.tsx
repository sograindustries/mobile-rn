import * as React from 'react';
import { AppState } from '../store';
import { connect } from 'react-redux';

interface Props {
  isDeveloperModeEnabled: boolean;
  children: any;
}

function DeveloperOnly(props: Props) {
  if (props.isDeveloperModeEnabled) {
    return props.children;
  }

  return null;
}

export default connect((state: AppState) => {
  return {
    isDeveloperModeEnabled: state.settings.developerMode
  };
})(DeveloperOnly);
