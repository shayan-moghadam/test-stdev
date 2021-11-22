import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHitAction } from "../../../src/hooks";
import Commnets from "../../components/Comments/Comments";
import "./ViewPostStyles.scss";
import { actions as getComments } from "../../store/actions/comments/watch-get-comments";
import { actions as writeComment } from "../../store/actions/comments/watch-write-comment";

export default function ViewPost() {
  const hitAction = useHitAction();
  const location = useLocation();

  // Get Selected Post
  let name = location?.pathname?.split("/")[2];

  const postsData = useSelector((state) => state?.posts?.data);

  // Post Date
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    if (postsData?.length) {
      const data = postsData.find((item) => item?.id === Number(name));
      setPostData(data);
    }
  }, [name, postsData]);

  //  Get Comments
  const commentsDate = useSelector((state) => state?.comments?.data);

  // Post Comment
  const CommentHandler = (data) => {
    // Action
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date();
    const id = Math.random();

    hitAction(
      writeComment.fetch({
        id: id,
        postId: postData?.id,
        author: data.get("name"),
        body: data.get("comment"),
        date: date.toLocaleDateString("en-US", options),
        image: "http://pantera-react.diaryforlife.info/static/img/user/3.jpeg",
      })
    );
  };

  // Write Comment
  const writeCommentData = useSelector((state) => state?.writeComment);

  useEffect(() => {
    if (writeCommentData?.fetching === false) {
      hitAction(getComments.fetch());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [writeCommentData]);

  useEffect(() => {
    window.scrollTo(0, 0);
    hitAction(getComments.fetch());
  }, []);

  return (
    <div className="post-page flex-center flex-column flex-wrap">
      <div
        className="post-page-image"
        style={{ backgroundImage: `url(${postData?.image})` }}
      ></div>
      <div className="post-page-details-wrapper col-8">
        <span className="post-date font-openSans-light">
          {postData?.date || ""}
        </span>
        <h1 className="post-title font-openSans-bold mt-2">
          {postData?.title || ""}
        </h1>
        <p className="post-desc">
          {postData?.text || ""}
          <span className="font-openSans-bold d-flex my-3">
            1. Nemo enim ipsam voluptatem quia
          </span>
          Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
          dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
          tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
          enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
          <img
            src="http://pantera-react.diaryforlife.info/static/img/posts/3.jpg"
            alt="img"
          />
          <span className="font-openSans-bold d-flex my-3">
            1.1 vero eos et accusamus et iusto
          </span>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
          delectus enim esse, nulla quam quos. Cumque dignissimos dolore dolorem
          dolores explicabo maxime natus nihil nisi perferendis, placeat quae
          qui vel? Neque porro quisquam est, qui dolorem ipsum quia dolor sit
          amet, consectetur, adipisci velit, sed quia non numquam eius modi
          tempora incidunt ut labore et dolore magnam aliquam quaerat
          voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
          ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
          consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate
          velit
        </p>
      </div>
      {/* Comments */}
      <Commnets
        commentsDate={commentsDate}
        CommentHandler={CommentHandler}
        postId={postData?.id}
      />
    </div>
  );
}
