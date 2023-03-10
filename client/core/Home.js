import React, { useState, useEffect } from "react";
import auth from "./../auth/auth-helper";
import OrganizationView from "../homeviews/OrganizationView";
import StudentView from "../homeviews/StudentView";
import HomeView from "./../homeviews/HomeView";
import CssBaseline from "@material-ui/core/CssBaseline";

/**
 * Homepage
 */
export default function Home({ history }) {
  const [defaultPage, setDefaultPage] = useState(null);
  const [loaded, setLoaded] = useState(false);

  //Check if user is authenticated
  useEffect(() => {
    setDefaultPage(auth.isAuthenticated());
    const unlisten = history.listen(() => {
      setDefaultPage(auth.isAuthenticated());
    });
    setLoaded(true);

    return () => {
      unlisten();
    };
  }, []);
  return (
    <div>
      <CssBaseline />
      <HomeView />
    </div>
  );
}
