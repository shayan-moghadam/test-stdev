import { combineReducers } from "redux";
import { reducer as loginReducer } from "../actions/auth/watch-login";
import { reducer as signUpReducer } from "../actions/auth/watch-signUp";
import { reducer as profileReducer } from "../actions/user/watch-updateUser";
import { reducer as postsReducer } from "../actions/posts/watch-get-posts";
import { reducer as catagoriesReducer } from "../actions/posts/watch-get-catagories";
import { reducer as commentsReducer } from "../actions/comments/watch-get-comments";
import { reducer as writeCommentReducer } from "../actions/comments/watch-write-comment";
import { reducer as postArticleReducer } from "../actions/article/watch-post-article";

export const rootReducer = combineReducers({
  login: loginReducer,
  signUp: signUpReducer,
  profile: profileReducer,
  posts: postsReducer,
  catagories: catagoriesReducer,
  comments: commentsReducer,
  writeComment: writeCommentReducer,
  postArticle: postArticleReducer,
});
