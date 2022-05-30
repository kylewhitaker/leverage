import { all, call, put, takeEvery } from 'redux-saga/effects';
import { ApiService } from '../core/api.service';
import { Contact } from '../core/interfaces';
import { contactsSuccess, getContacts } from './contactsSlice';

function* watchGetContacts() {
  yield takeEvery(getContacts().type, function* () {
    const contacts: Contact[] = yield call(ApiService.getContacts);
    console.log(contacts);
    yield put({ type: contactsSuccess(contacts).type, payload: contacts });
  });
}

export default function* rootSaga() {
  yield all([watchGetContacts()]);
}
