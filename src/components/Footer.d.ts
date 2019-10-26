import { Tab } from '../store/navigation/types';
interface Props {
    tab: Tab;
    onProfilePress: () => void;
    onSummaryPress: () => void;
    onDoctorPress: () => void;
    onSettingsPress: () => void;
}
declare const Footer: (props: Props) => JSX.Element;
export default Footer;
