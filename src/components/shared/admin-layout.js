import React from "react";

import { Layout, Breadcrumb, Row } from "antd";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Box from "@material-ui/core/Box";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import "./style.css";

const { Header, Sider, Content, Footer } = Layout;

const containerStyle = {
  maxWidth: "100%",
  padding: 0,
};

const useStyles = makeStyles({
  withBar: {
    ...containerStyle,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    height: 50,
    width: 50,
  },
  bar: {
    ...containerStyle,
    backgroundColor: "#d7d7d7",
    display: "inline-flex",
    lineHeight: 20,
    alignItems: "center",
    padding: 5,
  },
  app: {
    ...containerStyle,
    flexGrow: 1,
    width: "100%",
    display: "flex",
    // flexDirection: "column",
  },
  patient: {
    ...containerStyle,
    width: "450px",
    flexGrow: 0,
    backgroundColor: "#f2f2f2",
  },
  main: {
    ...containerStyle,
    flexGrow: 1,
    display: "flex",

    flexDirection: "column",
  },
  dashboard: {
    ...containerStyle,
  },
  mapContainer: {
    ...containerStyle,
    flexGrow: 6,
  },
});

const AdminLayoutComponent = (props, e) => {
  const classes = useStyles();
  const anchorRef = React.useRef(null);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    props.props.history.push("/");
  };
  return (
    <Layout>
      <Header className="custom-layout-header">
        <img
          className={classes.logo}
          src="https://demo-dashboard.data4life.se/mainlogo.png"
          alt=""
        />
        <Typography
          style={{
            color: "#fff",
            fontWeight: "bold",
            textTransform: "uppercase",
            padding: "5px",
            fontSize: "1.2rem",
            display: "inline-flex",
            width: "30%",
          }}
        >
          Data4Life
        </Typography>
        <Typography
          style={{
            color: "#fff",
            fontWeight: "bold",
            textTransform: "uppercase",
            padding: "5px",
            fontSize: "1.1rem",
            display: "inline-flex",
            width: "33%",
          }}
        >
          Stockholm Region
        </Typography>

        <Box
          style={{
            padding: "5px",
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            display: "inline-flex",
            color: "#fff",
            width: "33%",
          }}
        >
          <Typography
            style={{
              padding: "5px",
              fontStyle: "italic",
              marginLeft: "auto",
            }}
          >
            Logged in as Lotta Lundin
          </Typography>
          <AccountCircleIcon
            style={{ fontSize: 40 }}
            onClick={handleClick}
            ref={anchorRef}
          />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 0 }}
      >
        <div className="padding-top15">
          <Row>{props.children}</Row>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2020 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default AdminLayoutComponent;
