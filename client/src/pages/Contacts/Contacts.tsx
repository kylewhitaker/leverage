import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface Props {}

export const Contacts: React.FC<Props> = (props) => {
  const user = useSelector((state: RootState) => state.user.value);

  return <>Welcome to rolladex, {user?.name}. Here are your contacts:</>;
};
