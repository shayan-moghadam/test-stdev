import { useState, useEffect } from "react";
import "./HomeStyles.scss";
import Slider from "../../components/Slider/Slider";
import PopularPosts from "../../components/Posts/PopularPosts/PopularPosts";
import RecentPosts from "../../components/Posts/RecentPosts/RecentPosts";
import FilterPosts from "../../components/Posts/FilterPosts/FilterPosts";
import { actions as getPosts } from "../../store/actions/posts/watch-get-posts";
import { actions as getCatagories } from "../../store/actions/posts/watch-get-catagories";
import { useSelector } from "react-redux";
import { useHitAction } from "../../../src/hooks";
import { sortAscFunction, sortDescFunction } from "../../utils";
import Skeleton from "@mui/material/Skeleton";

export default function Home() {
  const hitAction = useHitAction();

  // Posts Data
  const postsData = useSelector((state) => state?.posts?.data);
  const catagoriesData = useSelector((state) => state?.catagories?.data);

  // States Datas
  const [popularData, setpopularData] = useState([]);
  const [recentData, setRecentData] = useState([]);
  const [sliderData, setSliderData] = useState([]);

  // Get Datas
  useEffect(() => {
    hitAction(getPosts.fetch());
    hitAction(getCatagories.fetch());
  }, []);

  useEffect(() => {
    if (postsData?.length) {
      // Popular
      setpopularData(postsData);
      // Recent
      const newData = [...postsData];
      newData.sort(sortAscFunction);
      setRecentData(newData);
      // Slider
      const newDataSlider = [...newData].reverse();
      setSliderData([newDataSlider[0], newDataSlider[1], newDataSlider[3]]);
    }
  }, [postsData]);

  // Search Filter
  const searchHandler = (value) => {
    setpopularData(null);
    const newData = [...postsData];
    const filterData = newData.filter((item) =>
      item?.title?.toLowerCase().includes(value?.toLowerCase())
    );
    setTimeout(() => {
      setpopularData(filterData);
    }, 5000);
  };
  // Sort Filter
  const sortHandler = (value) => {
    setpopularData(null);
    if (value === "asc") {
      const newData = [...postsData];
      newData.sort(sortAscFunction);
      setTimeout(() => {
        setpopularData(newData);
      }, 5000);
    } else if (value === "desc") {
      const newData = [...postsData];
      newData.sort(sortDescFunction);
      setTimeout(() => {
        setpopularData(newData);
      }, 5000);
    } else {
      setpopularData(postsData);
    }
  };

  return (
    <main className="main d-flex flex-column pb-4">
      {/* Hero Slider */}
      <Slider sliderData={sliderData} />
      {/* Posts Section */}
      <div className="container d-flex flex-wrap">
        {/* Filter */}
        <FilterPosts searchHandler={searchHandler} sortHandler={sortHandler} />
        {/* Popular Posts Section */}
        <div className="popular-posts-wrapper col-12 col-sm-12 col-md-12 col-lg-7">
          <span className="main-title col-12 mb-3 mx-3">Popular Posts</span>
          <div className=" d-flex justify-content-between flex-wrap mt-3">
            <div className="row w-100 mx-0">
              {popularData?.length ? (
                popularData.map((data) => (
                  <PopularPosts
                    key={data?.id}
                    popularData={data}
                    catagoriesData={catagoriesData}
                  />
                ))
              ) : popularData?.length === 0 ? (
                <span>Post Not Found</span>
              ) : (
                <Skeleton animation="wave" width="50%" height={400} />
              )}
              {/* Load More Btn */}
              {/* <div className="load-more pt-4 pb-5 flex-center align-self-center ">
                <button className="position-relative">Load More</button>
              </div> */}
            </div>
          </div>
        </div>
        {/* Recent Posts */}
        <div className="recent-posts-wrapper col-12 col-sm-12 col-md-12 col-lg-5">
          <span className="main-title col-12 mb-3 mx-3">Recent Posts</span>
          <div className=" d-flex justify-content-between flex-wrap mt-3">
            <div className="row w-100 mx-0">
              {recentData?.length ? (
                recentData.map((data) => (
                  <RecentPosts key={data?.id} recentData={data} />
                ))
              ) : recentData?.length === 0 ? (
                <span>Post Not Found</span>
              ) : (
                <Skeleton animation="wave" width="50%" height={400} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
