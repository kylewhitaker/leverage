import { Box, Button, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { InputText } from '../../components/InputText';
import { addContact } from '../../redux/contactsSlice';
import { RootState } from '../../redux/store';

interface Props {}

export const NewContact: React.FC<Props> = (props) => {
  const [state, setState] = useState<{ name: string; email: string; phone: string }>({
    name: '',
    email: '',
    phone: '',
  });
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      dispatch(addContact(state));
      history.push('/contacts');
    },
    [state, dispatch, history]
  );

  return (
    <>
      <Box display="flex" alignItems="center">
        <Typography variant="h4" style={{ margin: '2rem' }}>
          👋 {user?.name || 'there'}!
        </Typography>
        <Button id="button-add-new-contact" variant="contained" color="primary" disabled>
          Add new contact
        </Button>
      </Box>
      <Box style={{ margin: '1rem', maxWidth: '500px' }}>
        <InputText
          id="new-contact-name"
          label="Name"
          type="text"
          variant="filled"
          onChange={(event) => setState((prev) => ({ ...prev, name: event.target.value }))}
          fullWidth
        />
        <InputText
          id="new-contact-email"
          label="Email"
          type="email"
          variant="filled"
          onChange={(event) => setState((prev) => ({ ...prev, email: event.target.value }))}
          fullWidth
        />
        <InputText
          id="new-contact-phone"
          label="Phone"
          type="tel"
          variant="filled"
          onChange={(event) => setState((prev) => ({ ...prev, phone: event.target.value }))}
          fullWidth
        />
        <Box display="flex">
          <Button
            id="new-contact-button"
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            style={{ marginTop: 11 }}
            onClick={handleSubmit}
          >
            Create new contact
          </Button>
          <Button
            id="new-contact-button"
            type="submit"
            color="primary"
            variant="text"
            size="large"
            style={{ marginTop: 11 }}
            onClick={() => history.push('/contacts')}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
};
