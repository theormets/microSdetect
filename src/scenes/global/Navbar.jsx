import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/mettle-2025-logo.png";
import { FlexBox } from "../../components/FlexBox";
import { shades } from "../../theme";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { green } from "@mui/material/colors";
import { logOut } from "../../state/userSlice";
import { Badge, Chip, CircularProgress } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { resolvePath, STATUS } from "../../utils";
import { backdropContext } from "../../context/BackdropContext";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const UserAvatar = ({ user, setEmailVerificationAlert }) => {
  return (
    <>
      {user?.verified ? (
        <Avatar src={resolvePath(user?.avatar?.url)} />
      ) : (
        <Chip
          sx={{ cursor: "pointer" }}
          avatar={<Avatar src={resolvePath(user?.avatar?.url)} />}
          label={
            <Badge
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setEmailVerificationAlert(true);
              }}
              badgeContent="Verify"
              sx={{
                "& .MuiBadge-badge": {
                  color: "#ef7b1b",
                  fontSize: "11px",
                },
                mt: "-1px",
                ml: "16px",
                mr: "10px",
              }}
            />
          }
          variant="outlined"
        />
      )}
    </>
  );
};

const UserAlphaticAvatar = ({ user, setEmailVerificationAlert }) => {
  return (
    <>
      {user?.verified ? (
        <Avatar
          sx={{
            bgcolor: green[500],
            color: "#fff !important",
          }}
        >
          {user.firstName[0].toUpperCase()}
        </Avatar>
      ) : (
        <Chip
          sx={{ cursor: "pointer" }}
          avatar={
            <Avatar
              sx={{
                bgcolor: green[500],
                color: "#fff !important",
              }}
            >
              {user.firstName[0].toUpperCase()}
            </Avatar>
          }
          label={
            <Badge
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setEmailVerificationAlert(true);
              }}
              badgeContent="Verify"
              sx={{
                "& .MuiBadge-badge": {
                  color: "#ef7b1b",
                  fontSize: "11px",
                },
                mt: "-1px",
                ml: "16px",
                mr: "10px",
              }}
            />
          }
          variant="outlined"
        />
      )}
    </>
  );
};

function Navbar({ setEmailVerificationAlert }) {
  const { user, status } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );

  const { toggleBackdrop } = useContext(backdropContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  let [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check admin status from localStorage
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);
  if(user && user.isAdmin) {
    isAdmin = true
  }
  // Regular pages
  const regularPages = [
    // { title: "Your posts", url: "/userposts" },
    { title: "Collections", url: "/collections" },
    // { title: "ML Models", url: "/mlmodels" },
  ];

  // Admin-only pages
  // TODO(Amit) : Name it properly
  const adminPages = [
    { title: "Admin Profile", url: "/admin/profile" },
    { title: "Student Management", url: "/admin/students" }
  ];

  // Combine pages based on admin status
  const allPages = isAdmin ? [...regularPages, ...adminPages] : regularPages;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { pathname } = useLocation();
  if (
    [
      "/signin",
      "/signup",
      "/new-password",
      "/reset-password/instructions",
      "/reset-password",
      "/expired",
    ].includes(pathname)
  )
    return null;

  const handleLogout = () => {
    dispatch(logOut({
      toggleBackdrop,
      navigate,
      handleCloseUserMenu
    }));
  };

  const handleAdminLogout = () => {
    dispatch(logOut({
      navigate,
      callback: () => {
        navigate('/signin');
      }
    }));
  };

  return (
    <FlexBox
      sx={{ borderBottom: `1px solid ${shades.primary[100]}` }}
      p={{ xs: "10px 10px 10px 0", md: "10px 15px" }}
      position="sticky"
      top={0}
      zIndex={200}
      backgroundColor="#fafafc"
    >
      {/* desktop logo */}
      <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
        <Link to="/">
          <img src={logo} alt="" style={{ width: "60px", height: "50px" }} />
        </Link>
      </Box>
      {/*<Box sx={{ display: { xs: "flex", md: "none" }, mr: 1, flexGrow: 1 }}>*/}
      {/*  <Link to="/">*/}
      {/*    <img src={logo} alt="" style={{ width: "50px", height: "50px" }} />*/}
      {/*  </Link>*/}
      {/*</Box>*/}
      {/* pages desktop view */}
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {allPages.map((page, idx) => (
          <Button
            key={idx}
            onClick={() => {
              navigate(page.url);
              handleCloseNavMenu();
            }}
            sx={{ display: "block" }}
          >
            <Typography
              fontWeight="bold"
              fontSize="15px"
              color={shades.primary[300]}
              textTransform="none"
            >
              {page.title}
            </Typography>
          </Button>
        ))}
      </Box>

      {/* Menu icon for mobile */}
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
            "& ul": { padding: 0 },
          }}
        >
          {allPages.map((page, idx) => (
            <MenuItem
              sx={{
                p: "12px 24px",
                borderBottom: `1px solid ${shades.secondary[300]}`,
              }}
              key={idx}
              onClick={() => {
                handleCloseNavMenu();
                navigate(page.url);
              }}
            >
              <Typography fontSize="16px" fontWeight="bold" textAlign="center">
                {page.title}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Mobile logo */}
      <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1, flexGrow: 1 }}>
        <Link to="/">
          <img width="100px" src={logo} alt="" />
        </Link>
      </Box>

      {/* user settings */}
      <Box sx={{ flexGrow: 0 }}>
        {user ? (
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {isAdmin ? (
                <Avatar
                  sx={{
                    bgcolor: '#1976d2',
                    color: "#fff !important",
                  }}
                >
                  A
                </Avatar>
              ) : user?.avatar ? (
                <UserAvatar {...{ user, setEmailVerificationAlert }} />
              ) : (
                <UserAlphaticAvatar {...{ user, setEmailVerificationAlert }} />
              )}
            </IconButton>
          </Tooltip>
        ) : (
          !isAdmin && (
            <FlexBox
              sx={{
                columnGap: "10px",
                fontWeight: "bold",
              }}
            >
              <Link to="/signin">
                <Box cursor="pointer" fontSize="12px" padding="5px 10px">
                  SIGN IN
                </Box>
              </Link>
              <Link to="/signup">
                <Box
                  fontSize="12px"
                  padding="5px 10px"
                  borderRadius="25px"
                  color="#fff"
                  backgroundColor={shades.secondary[900]}
                >
                  SIGN UP
                </Box>
              </Link>
            </FlexBox>
          )
        )}
        <Menu
          sx={{
            "& ul": {
              padding: 0,
            },
            "> div": {
              borderRadius: "10px",
            },
          }}
          disableScrollLock={true}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {/* Email menu item */}
          <MenuItem
            sx={{
              borderBottom: `1px solid ${shades.secondary[300]}`,
              minWidth: "210px",
              padding: "8px 10px",
            }}
            onClick={handleCloseUserMenu}
          >
            <Link to="/account">
              <FlexBox justifyContent="space-between" gap="35px">
                <Box>
                    <>
                      <Typography fontWeight="bold" fontSize="13px">
                        {user?.firstName} {user?.lastName}
                      </Typography>
                      <Typography color={shades.primary[300]} variant="small">
                        {user?.email}
                      </Typography>
                    </>
                </Box>
                {!isAdmin && (
                  <Box>
                    <Button
                      sx={{
                        fontSize: "10px",
                        padding: 0,
                        color: "#fff",
                        borderRadius: "50px",
                        pt: "1px",
                        bgcolor: user?.verified ? "#40a0ed" : "#ff7300",
                        ":hover": {
                          bgcolor: user?.verified ? "#008cff" : "#ff5e00",
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (!user?.verified) setEmailVerificationAlert(true);
                      }}
                    >
                      {user?.verified ? "Verified" : "Verify"}
                    </Button>
                  </Box>
                )}
              </FlexBox>
            </Link>
          </MenuItem>

          {/* links */}
          <Box sx={{ borderBottom: `1px solid ${shades.secondary[300]}` }}>
            {[
              {
                label: "Read the announcement",
                url: "https://openai.com/dall-e-2/",
              },
              // {
              //   label: "Join the DALL.E Discord",
              //   url: "https://discord.com/invite/openai",
              // },
              // { label: "Visit the OpenAI API", url: "https://openai.com/api/" },
            ].map((node, idx) => (
              <MenuItem
                onClick={handleCloseUserMenu}
                key={idx}
                sx={{ p: "8px 10px" }}
              >
                <a
                  style={{ fontSize: "13px" }}
                  href={node.url}
                  target="__blank"
                >
                  {node.label}
                </a>
              </MenuItem>
            ))}
            {status === STATUS.LOADING ? (
              <MenuItem
                sx={{
                  p: "8px 10px",
                }}
              >
                <CircularProgress size="15px" />
              </MenuItem>
            ) : (
              <MenuItem
                onClick={handleLogout}
                sx={{
                  p: "8px 10px",
                  fontSize: "13px",
                }}
              >
                Sign out
              </MenuItem>
            )}
          </Box>

          {/* footer menu items */}
          <FlexBox justifyContent="start" columnGap="10px" p="10px">
            {[
              { label: "Content policy", url: "policies/content-policy" },
              { label: "Terms", url: "/terms" },
              { label: "About", url: "/about" },
            ].map((node, idx) => (
              <Link key={idx} to={node.url} target="__blank">
                <Typography
                  sx={{
                    cursor: "pointer",
                    fontSize: "12px",
                    color: shades.primary[300],
                  }}
                >
                  {node.label}
                </Typography>
              </Link>
            ))}
          </FlexBox>
        </Menu>
      </Box>
    </FlexBox>
  );
}
export default Navbar;
