import { put } from "redux-saga/effects";
import SharedReducer from "../../reducers/SharedReducer";
import axios from "axios";
import { alertError, alertSuccess, history } from "../../../utils";
import { baseUrl } from "../../../constans";

export const { sagaFetchActions, actions, reducer } = new SharedReducer(
  "signUp"
);

export function* watchSignUp({ payload }) {
  try {
    const { id, firstName, lastName, email, password } = payload;
    const { data, status } = yield axios.post(`${baseUrl}/signup`, {
      id,
      firstName,
      lastName,
      email,
      password,
    });
    if (status === 201) {
      alertSuccess("User Successfully Created");
      localStorage.setItem("Auth", JSON.stringify(data));
      history.replace("/");
      // Added Cause Sometimes Page Won't Reload
      window.location.reload();
    }
  } catch (e) {
    console.log(e);
    alertError("Error");
    yield put(actions.fetchFailure(e));
  }
}
