import { put } from "redux-saga/effects";
import SharedReducer from "../../reducers/SharedReducer";
import axios from "axios";
import { baseUrl } from "../../../constans";

export const { sagaFetchActions, actions, reducer } = new SharedReducer(
  "comments"
);

export function* watchGetComments() {
  try {
    const { data, status } = yield axios.get(`${baseUrl}/comments`);
    if (status === 200) {
      yield put(actions.fetchSuccess(data));
    }
  } catch (e) {
    console.log(e);
    yield put(actions.fetchFailure(e));
  }
}
