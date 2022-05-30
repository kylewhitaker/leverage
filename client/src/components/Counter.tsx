import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { increment, decrement } from '../redux/counterSlice';
import { getContacts } from '../redux/contactsSlice';

interface Props {}

export const Counter: React.FC<Props> = (props) => {
  const count = useSelector((state: RootState) => state.counter.value);
  const contacts = useSelector((state: RootState) => state.contacts.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
      <div>
        <button aria-label="get contacts" onClick={() => dispatch(getContacts())}>
          GetContacts
        </button>
        {contacts.map((contact) => (
          <div key={contact.id}>
            <div>{contact.name}</div>
            <div>{contact.email}</div>
            <div>{contact.phone}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
