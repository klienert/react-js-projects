import React from "react";
import logo from './react-logo.png';
import './static.css';

const StaticPage = () => {

    const Header = () => {
        return (
            <header>
                <img src={logo} width="80px" alt="React logo" />
            </header>
        )
    }

    const MainContent = () => {
        return (
            <main>
                <h2>Reason I am excited to learn React</h2>
                <ol>
                    <li>This shit is cool</li>
                    <li>Job opportunities</li>
                </ol>
            </main>
        )
    }

    const Footer = () => {
        return (
            <footer>
                <small>@ 2025 Lienert. All rights reserved.</small>
            </footer>
        )
    }

    const Page = () => {
        return (
            <div className="static-example">
                <Header />
                <MainContent />
                <Footer />
            </div>
        )

    }


    return (
        <>
            <Page />
        </>
    )
}

export default StaticPage;