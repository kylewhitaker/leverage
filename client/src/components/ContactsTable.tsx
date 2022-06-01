import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Contact } from '../core/interfaces';

interface Props {
  contacts: Contact[];
}

export const ContactsTable: React.FC<Props> = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.contacts.map((row, idx) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell id={`contact-name-${idx}`}>{row.name}</TableCell>
              <TableCell id={`contact-email-${idx}`}>{row.email}</TableCell>
              <TableCell id={`contact-phone-${idx}`}>{row.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
