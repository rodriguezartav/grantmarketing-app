import * as React from "react";
import { createElement } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@material-ui/core";
import { DashboardMenuItem, MenuItemLink, getResources } from "react-admin";
import DefaultIcon from "@material-ui/icons/ViewList";
import LabelIcon from "@material-ui/icons/Label";

const Menu = ({ onMenuClick, logout }) => {
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const open = useSelector((state) => state.admin.ui.sidebarOpen);
  const resources = useSelector(getResources);
  return (
    <div>
      {resources.map((resource) => (
        <MenuItemLink
          key={resource.name}
          to={`/${resource.name}`}
          leftIcon={<LabelIcon />}
          primaryText={
            (resource.options && resource.options.label) || resource.name
          }
          onClick={onMenuClick}
          sidebarIsOpen={open}
        />
      ))}

      {isXSmall && logout}
    </div>
  );
};

export default Menu;
