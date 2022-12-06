import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
/**
 * View if user is a Student
 */
export default function OrganizationView() {
  return (
    <>
      <Typography variant="h3">This is student page</Typography>
      <Button variant="contained">
        <Link style={{ textDecoration: "none" }} to="/blogs">
          View Blog Posts
        </Link>
      </Button>
    </>
  );
}
