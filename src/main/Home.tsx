import { SideNav, TopNav } from "./side-nav/SideNav.tsx";
import "./Home.scss";
import { useState } from "react";
import Transactions from "./transactions/Transactions.tsx";

function Home() {
    const [section, setSection] = useState<'transactions' | 'employees'>('transactions');

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
                        { section === 'transactions' ? 'Sales' : 'Employees' }
                    </h1>
                </header>
                {
                    section === 'transactions' ?
                    <Transactions />
                    :
                    <></>
                }
            </div>
        </div>
    )
}

export default Home;