import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, X, Maximize2 } from 'lucide-react';
import onlineBg from '../images/online games background.avif';

// Import local game images
import subwayImg from '../online games/surfway surfs.png';
import levelDevilImg from '../online games/level devil.png';
import stickmanImg from '../online games/stick man hook.png';
import cricketImg from '../online games/cricket world cup.png';
import penaltyImg from '../online games/penalty shooter.png';
import motoImg from '../online games/moto x3m.png';
import madalinImg from '../online games/madalin stunt cars 2.png';
import combatImg from '../online games/combat online.png';
import tomImg from '../online games/talking tom.png';
import funkinImg from '../online games/friday night funkin.png';

function OnlineGames() {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    { id: 1, title: "Subway Surfers", url: "https://poki.com/en/g/subway-surfers", image: subwayImg, category: "Action" },
    { id: 2, title: "Level Devil", url: "https://poki.com/en/g/level-devil", image: levelDevilImg, category: "Platformer" },
    { id: 3, title: "Stickman Hook", url: "https://poki.com/en/g/stickman-hook", image: stickmanImg, category: "Physics" },
    { id: 4, title: "Cricket World Cup", url: "https://poki.com/en/g/cricket-world-cup", image: cricketImg, category: "Sports" },
    { id: 5, title: "Penalty Shooters 2", url: "https://poki.com/en/g/penalty-shooters-2", image: penaltyImg, category: "Football" },
    { id: 6, title: "Moto X3M Pool Party", url: "https://poki.com/en/g/moto-x3m-5-pool-party", image: motoImg, category: "Bike Stunt" },
    { id: 7, title: "Madalin Stunt Cars 2", url: "https://poki.com/en/g/madalin-stunt-cars-2", image: madalinImg, category: "Racing" },
    { id: 8, title: "Combat Online", url: "https://poki.com/en/g/combat-online", image: combatImg, category: "Fighting" },
    { id: 9, title: "Talking Tom", url: "https://poki.com/en/g/talking-tom-funny-time", image: tomImg, category: "Casual" },
    { id: 10, title: "Friday Night Funkin'", url: "https://poki.com/en/g/friday-night-funkin", image: funkinImg, category: "Music" }
  ];

  return (
    <div className="online-games-page" style={{ 
      background: '#0a0a0a', minHeight: '100vh', color: 'white', overflowX: 'hidden', position: 'relative'
    }}>
      {/* Vibrant Animated Custom Background (Playful) */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ 
          scale: [1.1, 1.05, 1.1],
          x: [-10, 10, -10],
          opacity: 0.7
        }}
        transition={{ 
          scale: { duration: 20, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 25, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 1.5 }
        }}
        style={{
          position: 'fixed',
          top: -30, left: -30, bottom: -30, right: -30,
          backgroundImage: `url("https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2048")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(1) contrast(1.1) saturate(1.2)',
          zIndex: 0,
        }} 
      />
      <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(rgba(10,10,10,0.1) 0%, #0a0a0a 100%)', zIndex: 0 }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <motion.button 
            onClick={() => navigate('/welcome')}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}
          >
            <ArrowLeft size={24} />
          </motion.button>
          <h1 style={{ margin: 0, fontSize: '36px', fontWeight: 800, background: 'linear-gradient(45deg, #00ff88, #00bfff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ONLINE GAMES
          </h1>
        </header>

        <div className="games-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0,255,136,0.3)' }}
              onClick={() => setSelectedGame(game)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '20px',
                padding: '15px',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                textAlign: 'center'
              }}
            >
              <div style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', marginBottom: '15px', aspectRatio: '1/1' }}>
                <img src={game.image} alt={game.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s' }} className="play-overlay">
                  <Play size={40} fill="white" />
                </div>
              </div>
              <h3 style={{ margin: '0 0 5px', fontSize: '18px' }}>{game.title}</h3>
              <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>{game.category}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Game Modal (Iframe) */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: '#111' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={selectedGame.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
                <h2 style={{ margin: 0, fontSize: '20px' }}>{selectedGame.title}</h2>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button 
                  onClick={() => setSelectedGame(null)}
                  style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer' }}
                >
                  <X size={32} />
                </button>
              </div>
            </div>
            
            <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%' }}>
              <iframe 
                src={selectedGame.url} 
                title={selectedGame.title}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slowPan {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.1) translate(-2%, -2%); }
        }
        .play-overlay:hover {
          opacity: 1 !important;
        }
      `}} />
    </div>
  );
}

export default OnlineGames;
