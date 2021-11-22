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
import "./ProfileDetailsStyles.scss";
import { useHitAction } from "../../hooks";
import { actions as updateUserAction } from "../../store/actions/user/watch-updateUser";

export const AccountProfileDetails = ({ user }) => {
  const hitAction = useHitAction();
  // States
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
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
    if (data.get("password") !== data.get("Confirm-Password")) {
      setErrorPassword(true);
      return;
    }
    // Action
    hitAction(
      updateUserAction.fetch({
        id: user?.id,
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        password: data.get("password") ? data.get("password") : null,
      })
    );
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
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <div className="d-flex flex-wrap justify-content-between">
            <div className="col-12 my-3 col-sm-6-custom mr-2">
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={() => setErrorFirstName(false)}
                error={errorFirstName}
                helperText={errorFirstName ? "Required" : ""}
                defaultValue={user?.firstName}
              />
            </div>
            <div className="col-12 my-3 col-sm-6-custom mr-2">
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
                defaultValue={user?.lastName}
              />
            </div>
          </div>

          <div className="col-12 my-3">
            <TextField
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              disabled
              value={user?.email || ""}
            />
          </div>
          <div className="col-12 my-3">
            <TextField
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={() => setErrorPassword(false)}
              error={errorPassword}
              helperText={errorPassword ? "Password Do Not Match" : ""}
            />
          </div>
          <div className="col-12 my-3">
            <TextField
              required
              fullWidth
              name="Confirm-Password"
              label="Confirm-New Password"
              type="password"
              id="Confirm-Password"
              autoComplete="new-password"
              onChange={() => setErrorPassword(false)}
              error={errorPassword}
              helperText={errorPassword ? "Password Do Not Match" : ""}
            />
          </div>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" type="submit">
            Save details
          </Button>
        </Box>
      </Card>
    </Box>
  );
};
