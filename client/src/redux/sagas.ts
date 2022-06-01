import { AnyAction } from 'redux';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { ApiService } from '../core/api.service';
import { Contact } from '../core/interfaces';
import { addContact, contactsSuccess, deleteContact, getContacts } from './contactsSlice';

function* watchAddContact() {
  yield takeEvery(addContact.type, function* (action: AnyAction) {
    yield call(ApiService.addContact, action.payload);
    yield put({ type: getContacts.type });
  });
}

function* watchGetContacts() {
  yield takeEvery(getContacts.type, function* (action) {
    const contacts: Contact[] = yield call(ApiService.getContacts);
    yield put({ type: contactsSuccess.type, payload: contacts });
  });
}

function* watchDeleteContact() {
  yield takeEvery(deleteContact.type, function* (action: AnyAction) {
    yield call(ApiService.deleteContact, action.payload);
    yield put({ type: getContacts.type });
  });
}

export default function* rootSaga() {
  yield all([watchAddContact(), watchGetContacts(), watchDeleteContact()]);
}
