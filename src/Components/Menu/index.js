import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom";

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button variant="popover" aria-controls="menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/login"><MenuItem onClick={handleClose}>Login</MenuItem></Link>
        <Link to="/report"><MenuItem onClick={handleClose}>Report</MenuItem></Link>
        <Link to="/list-pasien"><MenuItem onClick={handleClose}>List Pasien</MenuItem></Link>
        <Link to="/input-pasien"><MenuItem onClick={handleClose}>Input Pasien</MenuItem></Link>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
