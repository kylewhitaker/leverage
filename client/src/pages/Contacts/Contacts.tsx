import { Add, ExitToApp } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ContactsTable } from '../../components/ContactsTable';
import { getContacts } from '../../redux/contactsSlice';
import { RootState } from '../../redux/store';
import { clearUser } from '../../redux/userSlice';

interface Props {}

export const Contacts: React.FC<Props> = (props) => {
  const user = useSelector((state: RootState) => state.user.value);
  const contacts = useSelector((state: RootState) => state.contacts.value);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const onAddNewContact = () => {
    history.push('/new-contact');
  };

  const onLogOut = async () => {
    await Auth.signOut();
    dispatch(clearUser());
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <Typography variant="h4" style={{ margin: '2rem' }}>
          👋 {user?.name || 'there'}!
        </Typography>
        <Button
          id="button-add-new-contact"
          variant="contained"
          color="primary"
          onClick={onAddNewContact}
          startIcon={<Add />}
        >
          Add new contact
        </Button>
        <Button
          id="button-log-out"
          variant="contained"
          color="secondary"
          onClick={onLogOut}
          startIcon={<ExitToApp />}
          style={{ marginLeft: '1rem' }}
        >
          Log out
        </Button>
      </Box>
      <Box style={{ margin: '1rem' }}>
        <ContactsTable contacts={contacts} />
      </Box>
    </>
  );
};
