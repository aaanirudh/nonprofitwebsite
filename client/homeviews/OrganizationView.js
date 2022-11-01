import React from "react";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
/**
 * View if user is a Organization
 */
export default function OrganizationView() {
  return (
    <>
      <Button variant="contained">
        <Link style={{ textDecoration: "none" }} to="/createblog">
          Create Blog Post
        </Link>
      </Button>
      <Typography variant="h3">This is org page</Typography>
    </>
  );
}
