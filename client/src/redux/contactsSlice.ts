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
    getContacts: (state) => state,
    contactsSuccess: (state, action: PayloadAction<Contact[]>) => {
      state.value = action.payload;
    },
  },
});

export const { addContact, getContacts, contactsSuccess } = contactsSlice.actions;

export default contactsSlice.reducer;
