import { useState } from "react";
import "./SignUpStyles.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useHitAction } from "../../hooks";
import { actions as signUpAction } from "../../store/actions/auth/watch-signUp";
import { validateEmail } from "../../utils";

export default function SignUp() {
  const hitAction = useHitAction();

  // States
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Validation
    if (!data.get("firstName")) {
      setErrorFirstName(true);
      return;
    }
    if (!data.get("lastName")) {
      setErrorLastName(true);
      return;
    }
    const isEmailValidate = validateEmail(data.get("email"));
    if (!isEmailValidate) {
      setErrorEmail(true);
      return;
    }
    if (
      !data.get("password") ||
      !data.get("Confirm-Password") ||
      data.get("password") !== data.get("Confirm-Password")
    ) {
      setErrorPassword(true);
      return;
    }
    // Action
    hitAction(
      signUpAction.fetch({
        id: Math.random(),
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
      })
    );
  };

  return (
    <div className="signUp-page d-flex flex-center flex-column p-0 font-openSans">
      <div className="form-login col-md-6 col-lg-5 p-5 d-flex flex-column flex-center ">
        <LockOutlinedIcon />
        <span>Sign up</span>
        {/* Form */}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
          className="form-signUp d-flex flex-column"
        >
          <div className="d-flex flex-wrap justify-content-between">
            <div className="col-12 my-2 col-sm-6-custom mr-2">
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={() => setErrorFirstName(false)}
                error={errorFirstName}
                helperText={errorFirstName ? "Required" : ""}
              />
            </div>
            <div className="col-12 my-2 col-sm-6-custom mr-2">
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={() => setErrorLastName(false)}
                error={errorLastName}
                helperText={errorLastName ? "Required" : ""}
              />
            </div>
          </div>
          <div className="col-12 my-2">
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={() => setErrorEmail(false)}
              error={errorEmail}
              helperText={errorEmail ? "Incorrect Email Address Format" : ""}
            />
          </div>
          <div className="col-12 my-2">
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={() => setErrorPassword(false)}
              error={errorPassword}
              helperText={errorPassword ? "Password Do Not Match" : ""}
            />
          </div>
          <div className="col-12 my-2">
            <TextField
              required
              fullWidth
              name="Confirm-Password"
              label="Confirm-Password"
              type="password"
              id="Confirm-Password"
              autoComplete="new-password"
              onChange={() => setErrorPassword(false)}
              error={errorPassword}
              helperText={errorPassword ? "Password Do Not Match" : ""}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {/* Login Link */}
          <div>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </div>
        </Box>
      </div>
      {/* Copy Right */}
      <p className="copyRight-login text-center mt-5">
        {"Copyright © "}
        <span>Test Website</span> {new Date().getFullYear()}
        {"."}
      </p>
    </div>
  );
}
