import "./ProfileStyles.scss";
import { Box, Container, Grid } from "@mui/material";
import { AccountProfile } from "../../components/Profile/AccountProfile";
import { AccountProfileDetails } from "../../components/Profile/AccountProfileDetails";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { profile } = useSelector((state) => state);
  // User Info
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("Auth"))?.user
  );
  const name = user?.firstName + " " + user?.lastName;

  // Get Changes When User Update Profile
  useEffect(() => {
    if (Object.entries(profile?.form).length !== 0) setUser(profile?.form);
  }, [profile]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <AccountProfile name={name} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AccountProfileDetails user={user} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
