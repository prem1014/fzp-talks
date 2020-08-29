import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer(props: any) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean, onMenuClose: any) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    debugger;
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    onMenuClose && onMenuClose();
  };

  const list = (anchor: Anchor, onMenuClose: any) => {
    const linkList = [
      {name: 'Home', path: '/home'},
      {name: 'Feedback', path: '/feedback'},
      {name: 'Join Us', path: '/reg'}
    ]
    return <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false, onMenuClose)}
      onKeyDown={toggleDrawer(anchor, false, onMenuClose)}
    >
      <List>
        {linkList.map((linDetail: any, index) => (
          <ListItem button key={linDetail.name}>
            <Link to={linDetail.path}>
              <ListItemText primary={linDetail.name} />
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  }

  return (
    <div>
      <React.Fragment>
        <Drawer anchor={props.position} open={props.open} onClose={toggleDrawer(props.position, false, props.onMenuClose)}>
          {list(props.position, props.onMenuClose)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
