import { SideNav, TopNav } from "./side-nav/SideNav.tsx";
import "./Home.scss";
import { useEffect, useState } from "react";
import Transactions from "./transactions/Transactions.tsx";
import Employees from "./employees/Employees.tsx";
import { useParams } from "react-router-dom";

function Home() {
    const [section, setSection] = useState<string>('transactions');
    const { '*': params } = useParams();

    useEffect(() => {
        const section = params?.split('home/')[1];
        if (section) setSection(section);
    }, [params])

    return (
        <div className="home">
            {
                window.innerWidth > 650 &&
                <div className="home__sidenav">
                    <SideNav />
                </div>
            }
            <div className="home__table">
                <header className="home__table__header">
                    {
                        window.innerWidth < 650 && 
                        <TopNav />
                    }
                    <h1 className="home__table__header__text">
                        { section === 'transactions' ? 'Ventas' : 'Empleados' }
                    </h1>
                </header>
                {
                    section === 'transactions' ?
                    <Transactions />
                    :
                    <Employees />
                }
            </div>
        </div>
    )
}

export default Home;