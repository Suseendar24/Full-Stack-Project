import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import welcomeImg from "../images/welcome.png";
import newsLogo from "../logo/news.png";
import liveLogo from "../logo/live.jpg";
import gamePurchaseLogo from "../logo/game purchase.jpg";
import onlineGameLogo from "../logo/online game.png";

import { User } from "lucide-react";

function Welcome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const features = [
    { icon: <img src={newsLogo} alt="News" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} />, title: "News" },
    { icon: <img src={liveLogo} alt="Live" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} />, title: "Live" },
    { icon: <img src={gamePurchaseLogo} alt="Gamers Store" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} />, title: "Gamers Store" },
    { icon: <img src={onlineGameLogo} alt="Online Games" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} />, title: "Online Games" }
  ];

  return (
    <div className="welcome-container" style={{ backgroundImage: `url(${welcomeImg})`, backgroundSize: "cover", backgroundPosition: "center", position: 'relative' }}>
      {/* Account Button */}
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 255, 136, 0.2)' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/account')}
        style={{
          position: 'absolute', top: '30px', right: '30px', background: 'rgba(255,255,255,0.1)',
          border: '1px solid #00ff88', borderRadius: '50%', width: '50px', height: '50px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          zIndex: 100, color: '#00ff88', backdropFilter: 'blur(5px)'
        }}
      >
        <User size={24} />
      </motion.button>
      {/* Background overlay for better text visibility */}
      <div className="auth-overlay"></div>
      {/* Background glowing orbs */}
      <motion.div
        className="glow-orb orb-1"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="glow-orb orb-2"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div
        className="welcome-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="welcome-title">Welcome to the<br />Gamers World</h1>
        <p className="welcome-subtitle">Your ultimate gaming journey begins here.</p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (feature.title === "News") navigate("/news");
                if (feature.title === "Live") navigate("/live");
                if (feature.title === "Gamers Store") navigate("/store");
                if (feature.title === "Online Games") navigate("/online-games");
              }}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>
              <span className="feature-title">{feature.title}</span>
            </motion.div>
          ))}
        </div>

        <button className="btn-secondary" onClick={handleLogout}>
          Disconnect / Logout
        </button>
      </motion.div>
    </div>
  );
}

export default Welcome;
