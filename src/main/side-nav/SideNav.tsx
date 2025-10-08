import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Menu } from "@mui/icons-material";
import "./SideNav.scss";
import { useState } from "react";
import { useMenu } from "../../hooks/useMenu.ts";

export function SideNav() {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const menu = useMenu();

    const onMouseEnter = () => {
        setOpen(true);
    }

    const onMouseLeave = () => {
        setOpen(false);
    }

    return (
        <div
            className="sidenav" 
            data-testid="sidenav"
            style={{ width: open ? '250px' : '70px' }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <List>
                {
                    menu.map((item) => (
                        <ListItem
                            onMouseEnter={() => setSelectedOption(item.title)}
                            onMouseLeave={() => setSelectedOption('')}
                            style={{
                                backgroundColor: selectedOption === item.title ? '#1976d2' : 'white',
                                color: selectedOption === item.title ? 'white' : 'black',
                            }}
                            className="sidenav__button"
                            key={item.title}
                            disablePadding
                            data-testid={item.testId}
                        >
                            <ListItemButton disableRipple onClick={item.action}>
                                <ListItemIcon style={{
                                    color: selectedOption === item.title ? 'white' : 'black',
                                }}>
                                    <item.icon/>
                                </ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </div>
    )
}

export function TopNav() {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const menu = useMenu();

    return (
        <>
            <Button className="topnav__menuButton" onClick={() => setShowMenu(!showMenu)} data-testid="topnav-button">
                <Menu />
            </Button>
            <div className="topnav" style={{
                display: showMenu ? 'flex' : 'none',
            }}>
                {
                    menu.map((item) => {
                        return <Button key={item.title} onClick={item.action} variant="text">{item.title}</Button>
                    })
                }
            </div>
        </>
    )
}