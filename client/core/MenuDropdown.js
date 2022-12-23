import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menubutton: {
    "&:hover": {
      background: "#f5f5f5",
      color: "#16306D",
    },
  },
  menuitem: {
    fontSize: "16px",
    background: "none",
    "&:hover": {
      background: "#f5f5f5",
      color: "#16306D",
    },
  },
}));
export default function MenuDropdown({ title, options }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const handleClick = (event) => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  return options ? (
    <>
      <Button
        style={{
          float: "left",
          flexGrow: "1",
          textTransform: "none",
          minWidth: "10vw",
          fontSize: "20px",
        }}
        className={classes.menubutton}
        ref={anchorRef}
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {title}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper style={{ width: "250px" }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  style={{ fontSize: "20px" }}
                  aria-labelledby="composition-button"
                >
                  {options?.map((val) => (
                    <MenuItem
                      className={classes.menuitem}
                      onClick={handleClose}
                    >
                      <Link
                        to={"/" + val.link}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {val.name}
                      </Link>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  ) : (
    <Button style={{ flexGrow: 0.5, textTransform: "none" }}>{title}</Button>
  );
}
