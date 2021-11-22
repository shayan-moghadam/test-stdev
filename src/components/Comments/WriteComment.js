import { useState } from "react";
import "./CommentsStyle.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function WriteComment({ CommentHandler }) {
  // User Info
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("Auth"))?.user
  );
  // States
  // States
  const [errorName, setErrorName] = useState(false);
  const [errorComment, setErrorComment] = useState(false);

  const CommentFunc = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Validation
    if (!data.get("name")) {
      setErrorName(true);
      return;
    }
    if (!data.get("comment")) {
      setErrorComment(true);
      return;
    }
    // Action
    CommentHandler(data);
    event?.currentTarget?.reset();
  };

  return (
    <div>
      <h3>Write a Comment</h3>
      <span>Your email address will not be published.</span>
      <Box
        component="form"
        noValidate
        onSubmit={CommentFunc}
        sx={{ mt: 3 }}
        className="form-signUp d-flex flex-column"
      >
        <div className="d-flex flex-wrap justify-content-between">
          <div className="col-12 my-2 col-sm-6-custom mr-2">
            <TextField
              autoComplete="given-name"
              name="name"
              required
              fullWidth
              id="name"
              label="Name"
              autoFocus
              onChange={() => setErrorName(false)}
              error={errorName}
              helperText={errorName ? "Required" : ""}
            />
          </div>
          <div className="col-12 my-4">
            <TextField
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              disabled
              value={user?.email || ""}
            />
          </div>
          <div className="col-12 mr-2">
            <TextField
              required
              fullWidth
              id="comment"
              label="Comment"
              name="comment"
              multiline
              rows={4}
              onChange={() => setErrorComment(false)}
              error={errorComment}
              helperText={errorComment ? "Required" : ""}
            />
          </div>
        </div>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Post Comment
        </Button>
      </Box>
    </div>
  );
}
