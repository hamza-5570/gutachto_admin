import { useEffect, useState } from "react";
import React from "react";
import { useLocation } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
export default function ProgressBar({ children }) {
  const [progressbar, setProgressbar] = useState(false);
  const [prevLoc, setPrevLoc] = useState(' ');
  const location = useLocation();

  useEffect(() => {
    setPrevLoc(location.pathname);
    setProgressbar(true);
    if (location.pathname === prevLoc) {
      setPrevLoc('');
    }
  }, [location]);

  useEffect(() => {
    setProgressbar(false);
  }, [prevLoc]);

  return (<React.Fragment>
    {progressbar && <TopBarProgress />}
    {children}
    </React.Fragment>)
}
