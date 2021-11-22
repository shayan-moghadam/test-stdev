import { all, takeEvery } from "redux-saga/effects";
import {
  sagaFetchActions as login,
  watchLogin,
} from "./actions/auth/watch-login";
import {
  sagaFetchActions as signUp,
  watchSignUp,
} from "./actions/auth/watch-signUp";
import {
  sagaFetchActions as updateUser,
  watchUpdateUser,
} from "./actions/user/watch-updateUser";
import {
  sagaFetchActions as getPosts,
  watchGetPosts,
} from "./actions/posts/watch-get-posts";
import {
  sagaFetchActions as getCatagories,
  watchGetCatagoreis,
} from "./actions/posts/watch-get-catagories";
import {
  sagaFetchActions as getComments,
  watchGetComments,
} from "./actions/comments/watch-get-comments";
import {
  sagaFetchActions as writeComment,
  watchWriteComment,
} from "./actions/comments/watch-write-comment";
import {
  sagaFetchActions as postArticle,
  watchPostArticle,
} from "./actions/article/watch-post-article";

export function* handleSaga() {
  yield all([takeEvery(login.fetch, watchLogin)]);
  yield all([takeEvery(signUp.fetch, watchSignUp)]);
  yield all([takeEvery(updateUser.fetch, watchUpdateUser)]);
  yield all([takeEvery(getPosts.fetch, watchGetPosts)]);
  yield all([takeEvery(getCatagories.fetch, watchGetCatagoreis)]);
  yield all([takeEvery(getComments.fetch, watchGetComments)]);
  yield all([takeEvery(writeComment.fetch, watchWriteComment)]);
  yield all([takeEvery(postArticle.fetch, watchPostArticle)]);
}
