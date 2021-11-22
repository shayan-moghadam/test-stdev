import "./RecentPostsStyles.scss";
import { Link } from "react-router-dom";

export default function RecentPosts({ recentData }) {
  const { id = 0, title = "", date = "", image = "", name = "" } = recentData;

  return (
    <div className="col-12 py-3 px-3 mt-3 d-flex">
      <article className="recent-posts-box position-relative font-openSans d-flex">
        {/* Image Section */}
        <div className="recent-post-image position-relative">
          <Link className="text-dark" to={`post/${id}`}>
            <img src={image} className="img-fluid rounded" alt="img" />
          </Link>
        </div>
        {/* Title And Desc Section */}
        <div className="recent-post-text d-flex flex-column flex-wrap ms-3">
          <Link className="text-dark" to={`post/${id}`}>
            <span className="recent-post-title two-line-text">{title}</span>
          </Link>
          <p className="recent-post-details d-inline-flex align-items-center">
            <span>{date}</span>
          </p>
        </div>
      </article>
    </div>
  );
}
