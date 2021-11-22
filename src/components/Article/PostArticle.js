import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import "./PostArticleStyles.scss";
import MenuItem from "@mui/material/MenuItem";

export const PostArticle = ({ catagoriesData, ArticleHandler }) => {
  // States
  const [errorName, setErrorName] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [errorCatagory, setErrorCatagory] = useState(false);

  // Select Catagories
  const [catagoryValue, setCatagoryValue] = useState("");

  const handleChangeCatagory = (event) => {
    setErrorCatagory(false);
    setCatagoryValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Validation
    if (!data.get("name")) {
      setErrorName(true);
      return;
    }
    if (!data.get("title")) {
      setErrorTitle(true);
      return;
    }
    if (!data.get("text")) {
      setErrorText(true);
      return;
    }
    if (!catagoryValue) {
      setErrorCatagory(true);
      return;
    }
    // Action
    ArticleHandler({
      name: data.get("name"),
      title: data.get("title"),
      text: data.get("text"),
      catagory: catagoryValue,
    });
    // Clear
    event?.currentTarget?.reset();
    setCatagoryValue("");
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ mt: 3 }}
      className="d-flex flex-column mt-0"
    >
      <Card>
        <CardHeader subheader="Write A New Article" title="Article" />
        <Divider />
        <CardContent>
          <div className="d-flex flex-wrap justify-content-between">
            <div className="col-12 my-3 col-sm-6-custom mr-2">
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                onChange={() => setErrorName(false)}
                error={errorName}
                helperText={errorName ? "Required" : ""}
              />
            </div>
            <div className="col-12 my-3 col-sm-6-custom mr-2">
              <TextField
                required
                fullWidth
                id="title"
                label="title"
                name="title"
                onChange={() => setErrorTitle(false)}
                error={errorTitle}
                helperText={errorTitle ? "Required" : ""}
              />
            </div>
          </div>
          <div className="col-12 my-3">
            <TextField
              required
              fullWidth
              id="text"
              label="Text"
              name="text"
              onChange={() => setErrorText(false)}
              error={errorText}
              helperText={errorText ? "Required" : ""}
              multiline
              minRows={4}
            />
          </div>
          <div className="col-12 my-3">
            <TextField
              id="catagory"
              select
              label="Catagory"
              value={catagoryValue}
              onChange={handleChangeCatagory}
              error={errorCatagory}
              helperText={errorCatagory ? "Required" : ""}
              className="w-25"
            >
              {catagoriesData?.length ? (
                catagoriesData.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem></MenuItem>
              )}
            </TextField>
          </div>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            p: 3,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
            className="px-4"
          >
            Post
          </Button>
        </Box>
      </Card>
    </Box>
  );
};
