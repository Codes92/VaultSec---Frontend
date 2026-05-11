import { useEffect } from "react";
import { FileSearch } from "lucide-react";

import NewsFeed from "../components/NewsFeed";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/regular-page.css";
import "../styles/intelligence.css";

export default function NewsPage()
{
    useEffect(() => {
      document.title = "VaultSec | News";
    }, []);

    return (
        <div className="regular-page-layout">

            <Header />

            <div className="regular-page">
                <div className="title-section">
                    <div className="page-title-container">
                        <FileSearch size={32} color="var(--white)" />
                        <h2 className="page-title">VaultSec News</h2>
                    </div>
                    <h3 className="page-subheading">Track the latest security threats</h3>
                </div>
                <NewsFeed />
                <div className="logo-disclaimer">
                    News content is sourced from CISA, Krebs on Security, and Bleeping Computer. VaultSec is not affiliated with these organizations. VaultSec does not use news links for commercial gain.  
                </div>
            </div>

            <Footer />

        </div>
    );
}