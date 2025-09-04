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