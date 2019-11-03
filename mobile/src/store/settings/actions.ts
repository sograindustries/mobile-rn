import { action } from 'typesafe-actions';

export function setDeveloperMode(isEnabled: boolean) {
  return action('ACTION_SET_DEVELOPER_MODE', isEnabled);
}

export type SettingsAction = ReturnType<typeof setDeveloperMode>;
