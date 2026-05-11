import { useEffect, useState } from "react";
import { useAuth } from "../services/AuthContext";
import { securityTools } from "../constants/tools";
import * as Icons from "lucide-react";
import { Shield } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/regular-page.css";
import "../styles/security-tools.css";

export default function SecurityTools()
{
    const [categoryOpen, setCategoryOpen] = useState({
        "Network & Web": true,
        "Cryptography": true,
        "Identity & Access": true
    });

    const toggleCategory = (categoryName) => {
        setCategoryOpen(prev => ({
            ...prev,
            [categoryName]: !prev[categoryName]
        }));
    };

    useEffect(() => {
      document.title = "VaultSec | Security Tools";
    }, []);

    return (
        <div className="regular-page-layout">
            <Header />
            <div className="regular-page">
                <div className="title-section">
                    <div className="page-title-container">
                        <Shield size={32} color="var(--white)" />
                        <h2 className="page-title">VaultSec Security Tools</h2>
                    </div>
                    <h3 className="page-subheading">Built for hands-on security work</h3>
                </div>

                {securityTools.map((category) => (
                    <div key={category.category}>
                        <h3 className="category-heading" onClick={() => toggleCategory(category.category)}>
                            {category.category} <ChevronDown className={`chevron-icon ${categoryOpen[category.category] ? 'open' : ''}`}
                                                             size={20}/>
                        </h3>
                        <div className={`tools-grid ${categoryOpen[category.category] ? '' : 'closed'}`}>
                            {category.tools.map((tool) => {
                                
                                const Icon = Icons[tool.icon];
                                const statusClass = tool.status.toLowerCase().replace(/\s+/g, "-");
                                
                                return (
                                    <Link to={tool.path} className="tool-card" key={tool.name}>
                                        <div className="tool-card-title-container">
                                            <div className="tool-card-icon-container">
                                                <Icon className="tool-card-icon" size={40}/>
                                            </div>
                                            <h3 className="tool-card-title">{tool.name}</h3>

                                            <span className={`badge badge-${statusClass}`}>{tool.status}</span>
                                        
                                        </div>
                                        <p className="tool-description">{tool.description}</p>                                   
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}