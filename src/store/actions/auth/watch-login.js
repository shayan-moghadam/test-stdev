import { put } from "redux-saga/effects";
import SharedReducer from "../../reducers/SharedReducer";
import axios from "axios";
import { alertError, alertSuccess, history } from "../../../utils";
import { baseUrl } from "../../../constans";
export const { sagaFetchActions, actions, reducer } = new SharedReducer(
  "login"
);

export function* watchLogin({ payload }) {
  try {
    const { email, password } = payload;
    const { data, status } = yield axios.post(`${baseUrl}/login`, {
      email,
      password,
    });
    if (status === 200) {
      alertSuccess("Successfull");
      localStorage.setItem("Auth", JSON.stringify(data));
      history.replace("/");
      // Added Cause Sometimes Page Won't Reload
      window.location.reload();
    }
  } catch (e) {
    console.log(e.message);
    alertError("Email Or Password Is Incorrect");
    yield put(actions.fetchFailure(e));
  }
}
