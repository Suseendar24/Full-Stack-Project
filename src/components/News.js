import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, RefreshCw, X } from 'lucide-react';
import newsLogo from '../logo/news.png';
import newsBg from '../images/newsbackground.jpg';

function News() {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Parse HTML content to extract image and clean text if needed
  const extractImage = (content) => {
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : newsLogo; // Fallback to our custom news image
  };

  const extractDescription = (content) => {
    // Strip HTML tags and get first 150 chars
    const tmp = document.createElement("DIV");
    tmp.innerHTML = content;
    const text = tmp.textContent || tmp.innerText || "";
    return text.substring(0, 150) + (text.length > 150 ? "..." : "");
  };

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      // Using rss2json service with IGN's games RSS feed
      const rssUrl = "https://feeds.ign.com/ign/games-all";
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&api_key=`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch news feed');
      }

      const data = await response.json();
      if (data.status === 'ok') {
        setNews(data.items);
      } else {
        throw new Error('Failed to parse news feed');
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      // Let's use some dummy data to ensure page displays even if API fails/rate limits
      setError('Could not load live news. Showing cached articles instead.');
      setNews([
        {
          title: "GTA 6 Trailer Breaks Internet Records Within 24 Hours",
          pubDate: new Date().toISOString(),
          link: "https://www.ign.com",
          thumbnail: newsLogo,
          content: "<p>The highly anticipated trailer for the next Grand Theft Auto has set unprecedented viewership records across all platforms. Rockstar Games announced that the initial teaser surpassed 150 million views on YouTube within the first 24 hours, completely smashing previous records held by other major entertainment releases.</p><p>Fans are already dissecting every frame of the trailer looking for clues about the sprawling Vice City map, the dual protagonists, and the dynamic new systems hinted at in the footage.</p>",
          author: "IGN Staff"
        },
        {
          title: "Next-Gen Console Restocks: Where and When to Buy",
          pubDate: new Date(Date.now() - 86400000).toISOString(),
          link: "https://www.ign.com",
          thumbnail: newsLogo,
          content: "<p>Still struggling to secure the latest hardware? Here is our comprehensive guide on major retailer restock schedules.</p><p>We have compiled a list of the most reliable sources and tracker accounts to help you beat the scalpers and finally get your hands on the elusive next-generation consoles.</p>",
          author: "Deals Team"
        },
        {
          title: "The Best Open-World Games to Play Right Now",
          pubDate: new Date(Date.now() - 172800000).toISOString(),
          link: "https://www.ign.com",
          thumbnail: newsLogo,
          content: "<p>From sprawling fantasy worlds to dense urban environments, here are the absolute best open-world experiences available today.</p><p>Whether you want to ride a horse across realistic frontier landscapes, fly through neon-lit streets of the future, or explore desolate post-apocalyptic ruins, these games offer hundreds of hours of immersive exploration and emergent gameplay.</p>",
          author: "Features Editor"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedArticle]);

  return (
    <div className="news-page" style={{ position: 'relative', minHeight: '100vh', color: 'white', overflowX: 'hidden' }}>

      {/* Animated Background Image */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 0,
          backgroundImage: `url(${newsBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          animation: 'bg-pan-slow 30s linear infinite alternate'
        }}
      />
      {/* Dynamic Overlay to ensure text remains readable */}
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 12, 41, 0.85)', backdropFilter: 'blur(4px)', zIndex: 0 }} />

      {/* Background glowing orb */}
      <div className="glow-orb orb-1" style={{ position: 'fixed', top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'rgba(255, 153, 51, 0.15)', filter: 'blur(100px)', zIndex: 0 }}></div>

      <div className="news-container" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>

        <header className="news-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <motion.button
              className="back-button"
              onClick={() => navigate('/welcome')}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.9 }}
              style={{ background: 'transparent', border: '1px solid var(--surface-border)', color: 'white', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <ArrowLeft size={24} />
            </motion.button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img src={newsLogo} alt="News Logo" style={{ width: '50px', height: '50px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #ff9933' }} />
              <div>
                <h1 style={{ margin: 0, fontSize: '36px', fontWeight: 800, background: 'linear-gradient(to right, #ff3366, #ff9933)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  GAMING NEWS
                </h1>
                <span style={{ color: 'var(--text-muted)', fontSize: '14px', background: 'rgba(0,0,0,0.5)', padding: '2px 8px', borderRadius: '4px' }}>Latest updates from IGN</span>
              </div>
            </div>

          </div>

          <motion.button
            onClick={fetchNews}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)',
              color: 'var(--secondary)', padding: '10px 20px', borderRadius: '8px',
              display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600,
              opacity: loading ? 0.5 : 1, cursor: loading ? 'not-allowed' : 'pointer',
              backdropFilter: 'blur(10px)'
            }}
          >
            <RefreshCw size={18} className={loading ? "spin-animation" : ""} />
            {loading ? 'Fetching Daily News...' : 'Refresh'}
          </motion.button>
        </header>

        {error && (
          <div style={{ background: 'rgba(255, 51, 102, 0.1)', borderLeft: '4px solid var(--error)', padding: '16px', borderRadius: '8px', marginBottom: '30px', color: '#ffb3c6', backdropFilter: 'blur(5px)' }}>
            {error}
          </div>
        )}

        {loading ? (
          <div className="news-skeleton-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', height: '400px', padding: '20px', border: '1px solid var(--surface-border)', animation: 'pulse 1.5s infinite ease-in-out', backdropFilter: 'blur(10px)' }}>
                <div style={{ height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '20px' }}></div>
                <div style={{ height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '10px', width: '90%' }}></div>
                <div style={{ height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '20px', width: '60%' }}></div>
                <div style={{ height: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="news-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
            {news.map((item, index) => (
              <motion.div
                key={index}
                onClick={() => setSelectedArticle(item)}
                className="news-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)',
                  border: '1px solid var(--surface-border)',
                  borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease',
                  position: 'relative', cursor: 'pointer'
                }}
              >
                <div className="news-image-container" style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={item.thumbnail || extractImage(item.content)}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onError={(e) => { e.target.onerror = null; e.target.src = newsLogo; }} // Fallback if image fails
                  />
                  <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', padding: '6px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                    View Summary
                  </div>
                </div>

                <div className="news-content" style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '13px', color: 'var(--secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <span>{item.author || "IGN News"}</span>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{formatDate(item.pubDate)}</span>
                  </div>

                  <h3 style={{ margin: '0 0 16px', fontSize: '20px', lineHeight: '1.4', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    {item.title}
                  </h3>

                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', flexGrow: 1 }}>
                    {extractDescription(item.content)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Article Summary & Redirection Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
            }}
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              style={{
                background: 'rgba(21, 18, 49, 0.95)', border: '1px solid var(--secondary)',
                borderRadius: '24px', maxWidth: '600px', width: '100%',
                display: 'flex', flexDirection: 'column', overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0, 229, 255, 0.2)', backdropFilter: 'blur(20px)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Cover Image */}
              <div style={{ position: 'relative', height: '240px' }}>
                <img
                  src={selectedArticle.thumbnail || extractImage(selectedArticle.content)}
                  alt={selectedArticle.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.onerror = null; e.target.src = newsLogo; }}
                />
                <button
                  onClick={() => setSelectedArticle(null)}
                  style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,51,102,0.9)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <X size={20} />
                </button>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to top, rgba(21, 18, 49, 1), transparent)' }}></div>
              </div>

              {/* Modal Content */}
              <div style={{ padding: '0 30px 30px', position: 'relative', zIndex: 1, marginTop: '-20px' }}>
                <div style={{ display: 'flex', gap: '16px', color: 'var(--secondary)', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                  <span>{selectedArticle.author || "IGN News"}</span>
                  <span>|</span>
                  <span>{formatDate(selectedArticle.pubDate)}</span>
                </div>

                <h2 style={{ margin: '0 0 16px', fontSize: '28px', lineHeight: '1.3', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  {selectedArticle.title}
                </h2>

                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6', marginBottom: '30px' }}>
                  {extractDescription(selectedArticle.content)}
                </p>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <a
                    href={selectedArticle.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="read-full-btn"
                    style={{
                      background: 'linear-gradient(45deg, var(--secondary), #00b4d8)',
                      color: '#000', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px',
                      padding: '16px 32px', borderRadius: '30px', display: 'inline-flex', alignItems: 'center', gap: '10px',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                  >
                    Read Full Article on IGN <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes bg-pan-slow {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        .news-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          border-color: var(--secondary) !important;
          background: rgba(255,255,255,0.06) !important;
        }
        .news-card:hover .news-image-container img {
          transform: scale(1.05);
        }
        .read-full-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 229, 255, 0.4);
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }
      `}} />
    </div>
  );
}

export default News;
