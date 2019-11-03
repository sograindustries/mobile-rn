import { action } from 'typesafe-actions';

export function setDeveloperMode(isEnabled: boolean) {
  return action('ACTION_SET_DEVELOPER_MODE', isEnabled);
}

export function setSimulateFob(isEnabled: boolean) {
  return action('ACTION_SET_SIMULATE_FOB', isEnabled);
}

export type SettingsAction = ReturnType<
  typeof setDeveloperMode | typeof setSimulateFob
>;
