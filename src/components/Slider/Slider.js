import Slider from "react-animated-slider";
import customCss from "./customSlider.scss";
import "./SliderStyles.scss";
import { Link } from "react-router-dom";

const content = [
  {
    image: "https://i.imgur.com/ZXBtVw7.jpg",
    userProfile: "https://s7.postimg.cc/abavelo3v/1_3x.png",
  },
  {
    image: "https://i.imgur.com/DCdBXcq.jpg",
    userProfile: "https://s7.postimg.cc/6exjimijv/3_3x.png",
  },
  {
    image: "https://i.imgur.com/DvmN8Hx.jpg",
    userProfile: "https://s7.postimg.cc/hsk2th5tn/6_3x.png",
  },
];

export default function SliderCustom({ sliderData }) {
  return (
    <div className="page">
      <Slider classNames={customCss} autoplay={150000} infinite>
        {sliderData?.length ? (
          sliderData.map((item, index) => (
            <div
              key={index}
              className="sliderContent"
              style={{
                background: `url('${content[index]?.image}') no-repeat center center`,
              }}
            >
              <div className="inner">
                <h1 style={{ fontSize: "2.5em", lineHeight: "1.5em" }}>
                  {item.title}
                </h1>
                <p>{item?.text?.slice(0, 150)}</p>
                <Link
                  className="nav-item nav-link d-inline-flex"
                  to={`post/${item?.id}`}
                >
                  <button>Read More</button>
                </Link>
              </div>
              <section>
                <img
                  src={content[index]?.userProfile}
                  alt={content[index]?.user}
                />
                <span>
                  Posted by <strong>{item?.author}</strong>
                </span>
              </section>
            </div>
          ))
        ) : (
          <></>
        )}
      </Slider>
    </div>
  );
}
