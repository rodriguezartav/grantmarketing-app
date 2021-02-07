import * as React from "react";
import { createElement } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@material-ui/core";
import { DashboardMenuItem, MenuItemLink, getResources } from "react-admin";
import DefaultIcon from "@material-ui/icons/ViewList";
import LabelIcon from "@material-ui/icons/ViewList";

const Menu = ({ onMenuClick, logout }) => {
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const open = useSelector((state) => state.admin.ui.sidebarOpen);
  const resources = useSelector(getResources);
  return (
    <div style={{ marginTop: 20 }}>
      {resources.map((resource) => (
        <MenuItemLink
          key={resource.name}
          to={`/${resource.name}`}
          leftIcon={<DefaultIcon />}
          primaryText={
            <div style={{ textTransform: "capitalize" }}>
              {(resource.options && resource.options.label) ||
                resource.name.replace("_", " ")}
            </div>
          }
          onClick={onMenuClick}
          sidebarIsOpen={open}
        />
      ))}

      <div style={{ padding: 5, paddingTop: 80 }}>
        <img src="./logo.png" style={{ display: "block", height: 90 }} />
      </div>

      {isXSmall && logout}
    </div>
  );
};

export default Menu;
