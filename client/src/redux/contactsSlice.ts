import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../core/interfaces';

export interface ContactsState {
  value: Contact[];
}

const initialState: ContactsState = {
  value: [],
};

export const contactsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.value.push(action.payload);
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((contact) => contact.id !== action.payload);
    },
    getContacts: (state) => state,
    contactsSuccess: (state, action: PayloadAction<Contact[]>) => {
      state.value = action.payload;
    },
  },
});

export const { addContact, deleteContact, getContacts, contactsSuccess } = contactsSlice.actions;

export default contactsSlice.reducer;
