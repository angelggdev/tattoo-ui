import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { TableChart, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./SideNav.scss";
import { useState } from "react";

export function SideNav() {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const navigate = useNavigate();
    const menu = [
        {
            title: 'Sales',
            url: '/home/transactions',
            icon: TableChart,
        },
        {
            title: 'Employees',
            url: '/home/employees',
            icon: Person,
        },
    ];

    const onMouseEnter = () => {
        setOpen(true);
    }

    const onMouseLeave = () => {
        setOpen(false);
    }

    return (
        <div
            className="sidenav" 
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
                        >
                            <ListItemButton onClick={() => navigate(item.url)}>
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