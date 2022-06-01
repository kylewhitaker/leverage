import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../../redux/contactsSlice';
import { RootState } from '../../redux/store';

interface Props {}

export const Contacts: React.FC<Props> = (props) => {
  const user = useSelector((state: RootState) => state.user.value);
  const contacts = useSelector((state: RootState) => state.contacts.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h3" style={{ margin: '2rem' }}>
        Hello {user?.name || 'there'}!
      </Typography>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={`contact${contact.id}`}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
