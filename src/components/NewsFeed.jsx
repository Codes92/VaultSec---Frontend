import { useEffect, useState } from "react";
import { securityFeed } from "../services/api";
import { newsSources } from "../constants/newsCards";

import "../styles/newsFeed.css";

export default function NewsFeed()
{
    const [news, setNews] = useState([]);

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getSecurityNews = async () => {
            setLoading(true);
            try
            {
                const response = await securityFeed();
                setNews(response.feed);
            }
            catch (error)
            {
                setError(error.message);
            }
            finally
            {
                setLoading(false);
            }
        }
        getSecurityNews();
    }, []);

    return (
        <div className="news-card-listing">
            {error && <p>{error}</p>}
            {loading && <p className="loading-message">Loading...</p>}
            {!loading && news.length === 0 && <p className="no-article-message">No news articles available right now. Check back later.</p>}
            {news.map((item) => {

                const sourceInfo = newsSources.find(
                    source => source.source === item.source
                );

                return (
                    <div className="news-card" key={item.link} style={{borderLeft: `3px solid ${sourceInfo?.colour}`}}>
                        <h3 className="news-link-title">{item.title}</h3>
                        <div className="publisher-info-container">
                            
                            {sourceInfo?.image && (
                                <img src={sourceInfo.image} alt={item.source}
                                    className={`publisher-logo ${item.source === "BleepingComputer" ? 'bleeping-comp' : ''}`} />
                            )}

                            <p className="news-content-source">{item.source}</p>
                            <p className="news-link-date">
                            {new Date(item.pubDate).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                            </p>
                        </div>
                        <p className="news-content-snippet">{item.contentSnippet}</p>
                        <a className="article-link" href={item.link} target="_blank" rel="noreferrer">Go to Article</a>
                    </div>
                );
            })}
        </div>
    );
}