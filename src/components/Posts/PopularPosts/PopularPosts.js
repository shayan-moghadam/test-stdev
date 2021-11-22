import "./PopularPostsStyles.scss";
import { Link } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function PopularPosts({ popularData, catagoriesData }) {
  const {
    id = 0,
    title = "",
    date = "",
    author = "",
    text,
    image = "",
    catagoryId = 0,
    name = "",
  } = popularData;

  return (
    <div className="col-12 col-sm-12 col-md-6 py-3 px-3 my-3 d-flex align-items-stretch">
      <article className="popular-posts-box position-relative font-openSans d-flex flex-column flex-wrap justify-content-between">
        {/* Image Section */}
        <div className="popular-post-image position-relative">
          <Link className="text-dark" to={`post/${id}`}>
            <img src={image} className="img-fluid rounded" alt="img" />
            <span className="catagory-image">
              {catagoriesData?.length
                ? catagoriesData.find((data) => data?.id === catagoryId)?.name
                : ""}
            </span>
          </Link>
        </div>
        {/* Title And Desc Section */}
        <div className="popular-post-text">
          <Link className="text-dark my-3 w-100" to={`post/${id}`}>
            <span className="popular-post-title font-openSans-bold two-line-text">
              {title}
            </span>
          </Link>
          <p className="popular-post-details d-inline-flex align-items-center">
            <span>By: {author}</span>
            <span>-</span>
            <CalendarTodayIcon className="calender-icon" />
            <span>{date}</span>
          </p>
          <p className="popular-post-desc two-line-text font-openSans-light">
            {text}
          </p>
        </div>
        {/* Button */}
        <Link
          className="text-dark popular-posts-button position-relative py-2"
          to={`post/${id}`}
        >
          <button className="font-openSans-bold">READ MORE</button>
        </Link>
      </article>
    </div>
  );
}
