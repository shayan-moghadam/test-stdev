import { put } from "redux-saga/effects";
import SharedReducer from "../../reducers/SharedReducer";
import axios from "axios";
import { baseUrl } from "../../../constans";
import { alertSuccess } from "../../../utils";

export const { sagaFetchActions, actions, reducer } = new SharedReducer(
  "post-article"
);

export function* watchPostArticle({ payload }) {
  const { id, name, title, text, catagoryId, date, author, image } = payload;
  console.log(payload);
  try {
    const { data, status } = yield axios.post(`${baseUrl}/posts`, {
      id,
      name,
      title,
      text,
      catagoryId,
      date,
      author,
      image,
    });
    if (status === 201) {
      alertSuccess("Article Successfully Posted");
      yield put(actions.fetchSuccess(data));
    }
  } catch (e) {
    console.log(e);
    yield put(actions.fetchFailure(e));
  }
}
