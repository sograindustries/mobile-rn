import Footer from '../components/Footer';
import { connect } from 'react-redux';
import { updateTab } from '../store/navigation/actions';
import { AppState } from '../store';

export default connect(
  (state: AppState) => ({
    tab: state.navigation
  }),
  dispatch => ({
    onProfilePress: () => {
      dispatch(updateTab('home'));
    },
    onSummaryPress: () => {
      dispatch(updateTab('summary'));
    },
    onDoctorPress: () => {
      dispatch(updateTab('doctor'));
    },
    onSettingsPress: () => {
      dispatch(updateTab('settings'));
    }
  })
)(Footer);
