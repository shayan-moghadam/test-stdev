import "./CommentsStyle.scss";
import WriteComment from "./WriteComment";
import { sortAscFunction } from "../../utils";

export default function Comments({ commentsDate, CommentHandler, postId }) {
  let commentsNewData = [];
  if (commentsDate?.length) {
    commentsNewData = commentsDate.filter(
      (data) => data.postId === postId || data.postId === 0
    );
  }

  return (
    <div className="comments-wrapper col-8 border-top p-4">
      <span className="font-openSans-bold">
        {commentsNewData?.length ?? ""} Comments
      </span>
      {/* Comment Box */}
      {commentsNewData?.length ? (
        commentsNewData
          .sort(sortAscFunction)
          .map(({ id, body, author, date, image }) => (
            <div
              className="comment-box d-flex align-items-center my-4"
              key={id}
            >
              <div className="commnet-avatar me-4">
                <img src={image || ""} className="comment-icon" alt={author} />
              </div>
              <div className="comment-details d-flex flex-column flex-wrap mt-3">
                <span>
                  <span className="font-openSans-bold">{author}</span> - {date}
                </span>
                <p>{body}</p>
              </div>
            </div>
          ))
      ) : (
        <></>
      )}
      <WriteComment CommentHandler={CommentHandler} />
    </div>
  );
}
