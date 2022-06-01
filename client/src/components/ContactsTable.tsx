import { Delete } from '@mui/icons-material';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Contact } from '../core/interfaces';
import { deleteContact } from '../redux/contactsSlice';

interface Props {
  contacts: Contact[];
}

export const ContactsTable: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const handleDelete = useCallback(
    (id: string) => () => {
      dispatch(deleteContact(id));
    },
    [dispatch]
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.contacts.map((row, idx) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell id={`contact-name-${idx}`}>{row.name}</TableCell>
              <TableCell id={`contact-email-${idx}`}>{row.email}</TableCell>
              <TableCell id={`contact-phone-${idx}`}>{row.phone}</TableCell>
              <TableCell>
                <Button
                  id={`contact-delete-${idx}`}
                  variant="contained"
                  color="error"
                  startIcon={<Delete />}
                  onClick={handleDelete(row.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
