import { useState } from "react";
import "./LoginStyles.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useHitAction } from "../../hooks";
import { actions as loginAction } from "../../store/actions/auth/watch-login";
import { validateEmail } from "../../utils";

export default function Login() {
  const hitAction = useHitAction();

  // States
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Validation
    const isEmailValidate = validateEmail(data.get("email"));
    if (!isEmailValidate) {
      setErrorEmail(true);
      return;
    }
    if (!data.get("password")) {
      setErrorPassword(true);
      return;
    }
    // Action
    hitAction(
      loginAction.fetch({
        email: data.get("email"),
        password: data.get("password"),
      })
    );
  };

  return (
    <div className="login-page d-flex p-0">
      <div className="bg-login col-md-7"></div>
      <div className="form-login col-md-5 p-5 d-flex flex-column flex-center font-openSans">
        <div className="login-icon">
          <LockOutlinedIcon />
        </div>
        <span>Sign in</span>
        {/* Form */}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
          className="form-login"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={() => setErrorEmail(false)}
            error={errorEmail}
            helperText={errorEmail ? "Incorrect Email Address Format" : ""}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={() => setErrorPassword(false)}
            error={errorPassword}
            helperText={errorPassword ? "Password Is Required" : ""}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {/* Sign Up */}
          <Link href="/signUp" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
          {/* Copy Right */}
          <p className="copyRight-login text-center mt-5">
            {"Copyright © "}
            <span>Test Website</span> {new Date().getFullYear()}
            {"."}
          </p>
        </Box>
      </div>
    </div>
  );
}
