import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";

export default function MenuDropdown({ title, options }) {
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
        }}
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
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  // onKeyDown={handleListKeyDown}
                >
                  {options?.map((val) => (
                    <MenuItem onClick={handleClose}>
                      <Link
                        to={"/" + val.link}
                        style={{ textDecoration: "none" }}
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
