import { React, useState, useContext, useEffect } from "react";
import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SideNav from "./Sidenav.js";
import { UserContext } from "../../Context/userContext";
import { AddFormContext } from "../../Context/formContext";
import axios from "../../axios.js";

const openNav = (e) => {
  document.getElementById("mySidenav").style.width = "300px";
};

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    fontFamily: "PT sans",
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const [addForm, setAddForm] = useContext(AddFormContext);
  const [Search, setSearch] = useState("");
  const [Logged, setLogged] = useState(user ? true : false);
  const [alert, setalert] = useState({
    show: false,
    msg: "Unsubscribe",
    color: "black",
  });

  useEffect(() => {
    // console.log(user);
    if (user) {
      axios
        .get("/countWishlistItems")
        .then((response) => {
          // console.log(response);
          localStorage.setItem(
            "bookshlf_user",
            JSON.stringify({
              authHeader: user.authHeader,
              roles: user.roles,
              email: user.email,
              cartitems: user.cartitems,
              wishlist: response.data.count,
            })
          );
          setUser({
            authHeader: user.authHeader,
            roles: user.roles,
            email: user.email,
            cartitems: user.cartitems,
            wishlist: response.data.count,
          });
        })
        .catch((error) => {});
      axios
        .get("/countCartItems")
        .then((response) => {
          // console.log(response.data);
          localStorage.setItem(
            "bookshlf_user",
            JSON.stringify({
              authHeader: user.authHeader,
              roles: user.roles,
              email: user.email,
              cartitems: response.data.count,
              wishlist: user.wishlist,
            })
          );
          setUser({
            authHeader: user.authHeader,
            roles: user.roles,
            email: user.email,
            cartitems: response.data.count,
            wishlist: user.wishlist,
          });
        })
        .catch((error) => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    if (e === "0") {
      setAnchorEl(null);
    }
    if (e === "5") {
      setalert({
        show: true,
        msg: "Unsubscribing...",
        color: "blue",
      });
      axios
        .post("/newsletterUnsubscribe", {
          email: user.email,
        })
        .then(() => {
          setalert({
            show: false,
            msg: "Unsubscribed!",
            color: "green",
          });
          setTimeout(() => {
            setalert({
              show: false,
              msg: "Unsubscribe",
              color: "black",
            });
            setAnchorEl(null);
          }, 5000);
        })
        .catch(() => {
          setalert({
            show: false,
            msg: "Error Not Subscribed!",
            color: "red",
          });
          setTimeout(() => {
            setalert({
              show: false,
              msg: "Unsubscribe",
              color: "black",
            });
            setAnchorEl(null);
          }, 5000);
        });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      history.push(`/SearchResult/${Search === "" ? "tag:ALL" : Search}`);
    }
  };

  const logout = () => {
    setLogged(false);
    axios
      .get("/signOut")
      .then((response) => {
        localStorage.removeItem("bookshlf_user");
        localStorage.removeItem("bookshlf_user_AddBook");
        delete axios.defaults.headers.common["Authorization"];
        // console.log("Signed Out");
        setUser(null);
        setAddForm(null);
        setAnchorEl(null);
        history.push("/");
      })
      .catch((error) => {
        console.log("Logout error", error);
      });
  };

  return (
    <div className="main-navbar" id="main-navbar">
      {/* navbar container starts */}
      <div className="navbar-container">
        <span onClick={(e) => openNav(e)} className="Sidenav-open">
          <i className="fas fa-bars"></i>
        </span>
        <SideNav />
        <div className="navbar-logo">
          <img
            src="/images/logo.png"
            alt="Bookshlf"
            height="25px"
            onClick={() => {
              history.push("/");
            }}
          />
        </div>
        <div className="navbar-items">
          <ul>
            <Link to="/">
              <li>
                <div className="navbar-items-chip">
                  <p>
                    <i className="fas fa-home" />
                    &nbsp;Home
                  </p>
                </div>
              </li>
            </Link>
            <Link to="/SearchResult/tag:ALL">
              <li>
                <div className="navbar-items-chip">
                  <div className="dropdown">
                    <button className="dropbtn">All Categories</button>
                  </div>
                </div>
              </li>
            </Link>
            <li>
              <div className="navbar-items-chip">
                <div className="dropdown">
                  <button className="dropbtn">
                    Other&nbsp;
                    <i className="fas fa-caret-down" />
                  </button>
                  <div className="dropdown-content">
                    <Link to="/Contact">Contact Us</Link>
                    <Link to="/SellerPanel">Sell Old Books</Link>
                    <Link to="/Blog">Blog (Coming Soon)</Link>
                  </div>
                </div>
              </div>
            </li>
            <Link to="/SellerPanel/5">
              <li>
                <div className="navbar-items-chip">
                  <p>
                    <i className="fas fa-book" />
                    &nbsp;Sell Your Books
                  </p>
                </div>
              </li>
            </Link>
            <Link to="/About">
              <li>
                <div className="navbar-items-chip">
                  <p>
                    <i className="fas fa-info-circle" />
                    &nbsp;AboutUs
                  </p>
                </div>
              </li>
            </Link>
          </ul>
        </div>
        <div className="navbar-right">
          <ul>
            <li>
              <div className="navbar-items-chip">
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="navbar-items-chip">
                <Link to="/Cart" className="cart-icon">
                  <IconButton aria-label="cart">
                    <StyledBadge
                      badgeContent={user.cartitems}
                      color="secondary"
                    >
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </IconButton>
                </Link>
              </div>
            </li>
            <li>
              <div className="navbar-items-chip">
                <Link to="/Wishlist" className="cart-icon">
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={user.wishlist} color="secondary">
                      <FavoriteIcon color="error" />
                    </StyledBadge>
                  </IconButton>
                </Link>
              </div>
            </li>
            <li>
              <div className="navbar-items-chip">
                {user === null ? (
                  <div>
                    <Button
                      variant="contained"
                      style={{
                        fontFamily: "PT Sans",
                        fontWeight: "bold",
                      }}
                      onClick={() => {
                        history.push("/Login");
                      }}
                    >
                      Login
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <img
                        src="/images/user.png"
                        alt="My Account"
                        height="25px"
                        width="25px"
                      />
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClick={() => {
                        handleClose("0");
                      }}
                    >
                      <MenuItem
                        style={{
                          fontFamily: "PT Sans",
                          fontWeight: "bold",
                        }}
                      >
                        <i className="fas fa-times-circle" />
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontFamily: "PT Sans",
                          fontWeight: "bold",
                        }}
                        onClick={() => {
                          history.push("/UserProfile/1");
                        }}
                      >
                        <i className="fas fa-user-alt" />
                        &nbsp;Profile Panel
                      </MenuItem>
                      {user ? (
                        user.roles.includes("admin") ? (
                          <MenuItem
                            style={{
                              fontFamily: "PT Sans",
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              setAnchorEl(null);
                              history.push("/Admin/1");
                            }}
                          >
                            <i className="fas fa-user-cog" />
                            &nbsp;Admin Panel
                          </MenuItem>
                        ) : (
                          <div></div>
                        )
                      ) : (
                        <div></div>
                      )}
                      <MenuItem
                        style={{
                          fontFamily: "PT Sans",
                          fontWeight: "bold",
                        }}
                        onClick={() => {
                          history.push("/Cart");
                        }}
                      >
                        <i className="fas fa-cart-arrow-down" />
                        &nbsp;Cart
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontFamily: "PT Sans",
                          fontWeight: "bold",
                        }}
                        onClick={() => {
                          history.push("/Wishlist");
                        }}
                      >
                        <i className="fas fa-heart" />
                        &nbsp;Wishlist
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontFamily: "PT Sans",
                          fontWeight: "bold",
                        }}
                        onClick={() => {
                          history.push("/SellerPanel/4");
                        }}
                      >
                        <i className="fas fa-book" />
                        &nbsp;Sell Books
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontFamily: "PT Sans",
                          fontWeight: "bold",
                          color: alert.color,
                        }}
                        onClick={() => {
                          handleClose("5");
                        }}
                      >
                        <i className="fas fa-minus-circle" />
                        &nbsp;
                        {alert.msg}&nbsp;
                        <i
                          className="fas fa-circle-notch"
                          style={{
                            display: alert.show ? "inline-block" : "none",
                            animation: "spin 2s linear infinite",
                          }}
                        />
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontFamily: "PT Sans",
                          fontWeight: "bold",
                        }}
                        onClick={logout}
                      >
                        Logout&nbsp;
                        <i className="fas fa-sign-out-alt" />
                        <i
                          className="fas fa-circle-notch"
                          style={{
                            display: Logged ? "none" : "inline-block",
                            animation: "spin 2s linear infinite",
                          }}
                        />
                      </MenuItem>
                    </Menu>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
        <div className="mobile-cart">
          <div className="navbar-items-chip">
            <Link to="/Cart" className="cart-icon">
              <i className="fas fa-shopping-cart" />
            </Link>
            <p className="Cart-items-notify-bubble">
              {user ? user.cartitems : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
