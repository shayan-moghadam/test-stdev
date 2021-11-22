import { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { PostArticle } from "../../components/Article/PostArticle";
import { actions as getCatagories } from "../../store/actions/posts/watch-get-catagories";
import { useSelector } from "react-redux";
import { useHitAction } from "../../../src/hooks";
import { actions as postArticle } from "../../store/actions/article/watch-post-article";

export default function WriteArticle() {
  const hitAction = useHitAction();

  // Data
  const catagoriesData = useSelector((state) => state?.catagories?.data);

  // Get Datas
  useEffect(() => {
    window.scrollTo(0, 0);
    hitAction(getCatagories.fetch());
  }, []);

  // Post Article
  const ArticleHandler = (data) => {
    // Action
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date();
    const id = Math.random();
    const user = JSON.parse(localStorage.getItem("Auth"))?.user;
    const name = user?.firstName + " " + user?.lastName || "";

    hitAction(
      postArticle.fetch({
        id: id,
        name: data?.name,
        title: data?.title,
        text: data?.text,
        catagoryId: data?.catagory,
        date: date.toLocaleDateString("en-US", options),
        author: name,
        image: "https://api.noudeveloper.com/uploads/thumb_14_1952b28b36.jpg",
      })
    );
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
      className="profile-page"
    >
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12}>
            <PostArticle
              catagoriesData={catagoriesData}
              ArticleHandler={ArticleHandler}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
