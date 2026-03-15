import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Users, MoreVertical } from 'lucide-react';
import liveLogo from '../logo/live.jpg';
import liveBg from '../images/live background.webp';

// Import local thumbnails from src/live
import tamilThumb from '../live/tamil gaming.png';
import thanjaiThumb from '../live/thanjai gaming.png';
import mrIgThumb from '../live/mr.ig.png';
import reaperThumb from '../live/reaper gaming.png';
import kickThumb from '../live/kick the bucket.png';
import highlightsThumb from '../live/tamil gaming highlights.png';
import bumbleThumb from '../live/bumble babu.png';
import yvThumb from '../live/yv gaming.png';

// Import logos if still relevant or use dicebear for new ones
import tamilLogo from '../images/live/tamil_logo.png';
import thanjaiLogo from '../images/live/thanjai_logo.png';
import reaperLogo from '../images/live/reaper_logo.png';

function Live() {
  const navigate = useNavigate();

  const streamers = [
    {
      id: 1,
      name: "Tamil Gaming",
      channelUrl: "https://www.youtube.com/@TamilGaming/live",
      thumbnail: tamilThumb, 
      avatar: tamilLogo,
      title: "GTA V Roleplay - Ultimate Story Mode 🔴",
      game: "GTA V",
      viewers: "18.5K",
      time: "2 hours ago"
    },
    {
      id: 2,
      name: "Thanjai Gaming",
      channelUrl: "https://www.youtube.com/@ThanjaiGaming/live",
      thumbnail: thanjaiThumb, 
      avatar: thanjaiLogo,
      title: "Outlast Horror: Night Shift Survival! 😱",
      game: "Outlast",
      viewers: "9.2K",
      time: "1 hour ago"
    },
    {
      id: 3,
      name: "Mr.IG",
      channelUrl: "https://www.youtube.com/@MrIGGaming/live",
      thumbnail: mrIgThumb, 
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=MrIG&backgroundColor=1e88e5,1e1e1e",
      title: "Minecraft Hardcore: Day 200 - Epic Castle Build! 🔥",
      game: "Minecraft",
      viewers: "14.1K",
      time: "3 hours ago"
    },
    {
      id: 4,
      name: "Reaper Gaming",
      channelUrl: "https://www.youtube.com/@reapergamingtamil/live",
      thumbnail: reaperThumb, 
      avatar: reaperLogo,
      title: "Cyberpunk 2077: Phantom Liberty Live",
      game: "Cyberpunk 2077",
      viewers: "7.8K",
      time: "30 mins ago"
    },
    {
      id: 5,
      name: "Kick The Bucket",
      channelUrl: "https://www.youtube.com/@kickthebuckettamil/live",
      thumbnail: kickThumb, 
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=KickTheBucket&backgroundColor=3949ab,1e1e1e",
      title: "Resident Evil Village: Shadow of Rose [LIVE]",
      game: "Resident Evil 8",
      viewers: "11.3K",
      time: "4 hours ago"
    },
    {
      id: 6,
      name: "Tamil Gaming Highlights",
      channelUrl: "https://www.youtube.com/@tamilgaminghighlights/live",
      thumbnail: highlightsThumb, 
      avatar: tamilLogo, // Reusing tamil logo as they are likely related
      title: "Best of Tamil Gaming - Best Moments This Week",
      game: "Highlights",
      viewers: "4.5K",
      time: "5 hours ago"
    },
    {
      id: 7,
      name: "Bumble Babu",
      channelUrl: "https://www.youtube.com/@BumbleBabu/live",
      thumbnail: bumbleThumb, 
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=BumbleBabu&backgroundColor=fbc02d,1e1e1e",
      title: "Funny Moments & Epic Fails Compilation! 😂",
      game: "Gaming",
      viewers: "6.7K",
      time: "1 hour ago"
    },
    {
      id: 8,
      name: "YV Gaming",
      channelUrl: "https://www.youtube.com/@YVGaming/live",
      thumbnail: yvThumb, 
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=YVGaming&backgroundColor=43a047,1e1e1e",
      title: "Battlefield V: Epic Conquest Mode - No HUD",
      game: "Battlefield V",
      viewers: "5.2K",
      time: "2 hours ago"
    }
  ];

  return (
    <div className="live-page" style={{ 
      background: '#0f0f0f', 
      minHeight: '100vh', 
      color: 'white', 
      overflowX: 'hidden',
      position: 'relative',
      fontFamily: '"Roboto", Arial, sans-serif'
    }}>
      {/* Vibrant Animated Custom Background */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ 
          scale: [1, 1.15, 1],
          rotate: [0, 1, 0, -1, 0],
          opacity: 0.7
        }}
        transition={{ 
          scale: { duration: 25, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 30, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 1.5 }
        }}
        style={{
          position: 'fixed',
          top: -20, left: -20, bottom: -20, right: -20,
          backgroundImage: `url("https://images.unsplash.com/photo-1614027164847-1b28096a6f4a?auto=format&fit=crop&q=80&w=2048")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.9) contrast(1.1)',
          zIndex: 0,
        }} 
      />
      <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(135deg, rgba(15,15,15,0.2) 0%, rgba(15,15,15,0.8) 100%)', zIndex: 0 }}></div>
      
      <div className="live-container" style={{ position: 'relative', zIndex: 1, maxWidth: '1600px', margin: '0 auto', padding: '24px' }}>
        <header className="live-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <motion.button 
              className="back-button"
              onClick={() => navigate('/welcome')}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.9 }}
              style={{ background: 'transparent', border: 'none', color: 'white', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <ArrowLeft size={24} />
            </motion.button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src={liveLogo} alt="Live Logo" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, letterSpacing: '-0.5px' }}>
                YOUTUBE LIVE
              </h1>
            </div>
          </div>
        </header>

        <div className="streams-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {streamers.map((stream, index) => (
            <motion.a 
              href={stream.channelUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              key={stream.id}
              className="stream-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              style={{ 
                textDecoration: 'none', color: 'inherit',
                display: 'flex', flexDirection: 'column',
                cursor: 'pointer', borderRadius: '12px',
                transition: 'background 0.2s ease',
                padding: '4px'
              }}
            >
              {/* Thumbnail Container */}
              <div className="stream-thumbnail-container" style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '12px', background: '#202020', marginBottom: '12px' }}>
                <img 
                  src={stream.thumbnail} 
                  alt={stream.title} 
                  className="stream-thumbnail"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = `https://picsum.photos/seed/${stream.id}/800/450`; 
                  }} 
                />
                
                {/* Live Badge */}
                <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(204, 0, 0, 0.9)', color: 'white', padding: '2px 4px', borderRadius: '2px', fontSize: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Play size={10} fill="white" /> LIVE
                </div>
                
                {/* Viewer Count Badge */}
                <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.8)', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 500 }}>
                  <Users size={12} color="#fff" /> {stream.viewers}
                </div>
              </div>
              
              {/* Stream Info Container (YouTube Style) */}
              <div className="stream-info" style={{ display: 'flex', gap: '12px' }}>
                <div className="channel-avatar" style={{ flexShrink: 0 }}>
                  <img 
                    src={stream.avatar} 
                    alt={stream.name} 
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${stream.name}&backgroundColor=d32f2f,1e1e1e`; 
                    }} 
                  />
                </div>
                <div style={{ flex: 1, pr: '12px' }}>
                  <h3 style={{ margin: '0 0 4px', fontSize: '16px', lineHeight: '1.4', fontWeight: 600, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', color: '#f1f1f1' }}>
                    {stream.title}
                  </h3>
                  <div style={{ color: '#aaa', fontSize: '14px', marginBottom: '2px' }}>
                    {stream.name}
                  </div>
                  <div style={{ color: '#aaa', fontSize: '14px' }}>
                    {stream.viewers} watching • {stream.time}
                  </div>
                  <div style={{ marginTop: '4px' }}>
                    <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '2px', fontSize: '12px', color: '#ccc', fontWeight: 500 }}>
                      New
                    </span>
                  </div>
                </div>
                <div style={{ color: '#aaa' }}>
                  <MoreVertical size={20} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .stream-card:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        @keyframes pulse-dot {
          0% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(255, 0, 0, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); }
        }
        @keyframes slowPan {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.1) translate(-2%, -2%); }
        }
        .pulse-dot {
          animation: pulse-dot 2s infinite;
        }
      `}} />
    </div>
  );
}

export default Live;
