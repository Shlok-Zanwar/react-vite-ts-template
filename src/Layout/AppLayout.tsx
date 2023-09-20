import React from "react";
import { Outlet } from "react-router-dom";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { IconType } from "react-icons";
import { Menu } from "antd";
// import GlobalSearch from "../Components/GlobalSearch"
// import this jsx file from the components folder as typescript
import GlobalSearch from "../Components/GlobalSearch";
import { useAppSelector } from "../Reducers/store";
import usePageTitle from "../Components/usePageTitle";
interface Props {
  menuItems: any;
  searchItems: any;
}

export const AppLayout: React.FC<Props> = ({ menuItems, searchItems }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  console.log(menuItems);
  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} searchItems={searchItems} />

      <div className="content">
        <aside className="sidebar" style={{ width: sidebarOpen ? "var(--sidebar-open-width)" : "var(--sidebar-closed-width)" }}>
          <Menu
            style={{
              background: "var(--sidebar-background)",
              color: "var(--sidebar-text-color)",
              border: "none",
              padding: "0px",
              width: "100%",
              fontSize: "16px",
              fontWeight: "500",
            }}
            items={menuItems}
            inlineIndent={12}
            mode={"inline"}
            inlineCollapsed={!sidebarOpen}
          />
        </aside>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AppLayout;

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchItems: any;
}

const SidebarOpenIcon = AiOutlineMenuFold;
const SidebarClosedIcon = AiOutlineMenuUnfold;

const Navbar: React.FC<NavbarProps> = ({ sidebarOpen, setSidebarOpen, searchItems }) => {
  const SidebarIcon: IconType = sidebarOpen ? SidebarOpenIcon : SidebarClosedIcon;
  const navbarTitle = useAppSelector((state) => state.globalReducer.navbarTitle);
  usePageTitle("Shlok", ["Shlok"]);
  return (
    <nav className="navbar">
      <div className="navbar-menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <SidebarIcon />
      </div>
      <img
        src={"/logo.png"}
        alt="React Logo"
        className="navbar-logo"
      />
      <GlobalSearch items={searchItems} />
      <div className="navbar-content">
        <div className="navbar-title">{navbarTitle?.join(" | ")}</div>
        <div id="navbar-portal">{/* Anything in <Myportal id="navbar-portal">.....</MyPortal> will come here */}</div>
      </div>
    </nav>
  );
};
