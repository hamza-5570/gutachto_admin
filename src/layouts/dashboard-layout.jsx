import { useEffect, useState } from "react";
import SideBar from "../common/side-bar";
import Navbar from "../common/nav-bar";
import { Outlet } from "react-router-dom";


function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const handleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setOpen(false);
      }
    };

    if (window.innerWidth >= 1024) {
      setOpen(true);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const user=localStorage.getItem('user')


  return (
    <div className="flex">
      <SideBar open={open} handleDrawer={handleDrawer} setOpen={setOpen} />
      <div className="flex-1">
        <Navbar data={user} handleDrawer={handleDrawer} open={open} />

        <div className="xl:h-[calc(100vh-82px)] overflow-y-auto pr-5 pl-5 py-5 lg:pr-10 lg:py-8 lg:pl-[100px] xl:pl-10">
          {<Outlet/>}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
