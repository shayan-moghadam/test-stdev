import { put } from "redux-saga/effects";
import SharedReducer from "../../reducers/SharedReducer";
import axios from "axios";
import { baseUrl } from "../../../constans";

export const { sagaFetchActions, actions, reducer } = new SharedReducer(
  "posts"
);

export function* watchGetPosts() {
  try {
    const { data, status } = yield axios.get(`${baseUrl}/posts`);
    if (status === 200) {
      yield put(actions.fetchSuccess(data));
    }
  } catch (e) {
    console.log(e);
    yield put(actions.fetchFailure(e));
  }
}
