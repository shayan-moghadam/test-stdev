import { put } from "redux-saga/effects";
import SharedReducer from "../../reducers/SharedReducer";
import axios from "axios";
import { baseUrl } from "../../../constans";
import { alertSuccess } from "../../../utils";

export const { sagaFetchActions, actions, reducer } = new SharedReducer(
  "write-comment"
);

export function* watchWriteComment({ payload }) {
  const { id, body, author, date, image, postId } = payload;
  try {
    const { data, status } = yield axios.post(`${baseUrl}/comments`, {
      id,
      body,
      postId,
      author,
      date,
      image,
    });
    if (status === 201) {
      alertSuccess("Comment Successfully Posted");
      yield put(actions.fetchSuccess(data));
    }
  } catch (e) {
    console.log(e);
    yield put(actions.fetchFailure(e));
  }
}
