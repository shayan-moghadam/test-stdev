import { put } from "redux-saga/effects";
import SharedReducer from "../../reducers/SharedReducer";
import axios from "axios";
import { alertError, alertSuccess } from "../../../utils";
import { baseUrl } from "../../../constans";

export const { sagaFetchActions, actions, reducer } = new SharedReducer(
  "profile"
);

export function* watchUpdateUser({ payload }) {
  try {
    const { id, firstName, lastName, password } = payload;
    let newData;
    if (password) {
      newData = { firstName, lastName, password };
    } else {
      newData = { firstName, lastName };
    }
    const { data, status } = yield axios.patch(`${baseUrl}/users/${id}`, {
      ...newData,
    });
    if (status === 200) {
      alertSuccess("User Successfully Updated");
      const accessToken = JSON.parse(localStorage.getItem("Auth"))?.accessToken;
      const newStorage = { accessToken: accessToken, user: data };
      localStorage.setItem("Auth", JSON.stringify(newStorage));
    }
  } catch (e) {
    console.log(e);
    alertError("Error");
    yield put(actions.fetchFailure(e));
  }
}
