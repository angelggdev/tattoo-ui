import { SideNav } from "./side-nav/SideNav.tsx";
import "./Home.scss";
import { useState } from "react";
import Transactions from "./transactions/Transactions.tsx";

function Home() {
    const [section, setSection] = useState<'transactions' | 'employees'>('transactions');

    return (
        <div className="home">
            <div className="home__sidenav">
                <SideNav />
            </div>
            <div className="home__table">
                <header className="home__table__header">
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