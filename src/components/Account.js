import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Package, Calendar, Search, UserPlus, MessageCircle, Send, X, ShieldCheck, FileText, Smile, Image as ImageIcon } from 'lucide-react';

function Account() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ username: 'Pro Gamer', email: 'gamer@world.com' });
  const [orders, setOrders] = useState([]);
  
  // Social state
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState([
    { username: 'aathavan', status: 'Online', currentActivity: 'Playing Subway Surfers' },
    { username: 'naveen', status: 'Online', currentActivity: 'Playing Level Devil' },
    { username: 'madhan', status: 'Offline', currentActivity: 'Idle' }
  ]);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showStickers, setShowStickers] = useState(false);

  const stickers = ['🔥', '🎮', '🏆', '💯', '🚀', '⭐', '😎', '👑', '🕹️', '⚡'];
  const gifs = [
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHIzemJ4eHR4eHR4eHR4eHR4eHR4eHR4eHR4eHR4eHR4eHR4eHR4ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L39gpxC3tS8N9cE6lS/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHIzemJ4eHR4eHR4eHR4eHR4eHR4eHR4eHR4eHR4eHR4eHR4eHR4ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKVUn7iM8FMEU24/giphy.gif'
  ];

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (savedUser) setCurrentUser(savedUser);

    const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    setOrders(history);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!searchQuery.trim()) return;
      try {
        const response = await fetch(`/api/users/search?query=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    const timer = setTimeout(fetchUsers, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const [searchResults, setSearchResults] = useState([]);

  const addFriend = (user) => {
    if (!friends.find(f => f.username === user.username)) {
      setFriends([...friends, { ...user, status: 'Online' }]);
      setSearchQuery('');
    }
  };

  const sendMessage = (e, customMsg = null) => {
    if (e) e.preventDefault();
    const content = customMsg || message;
    if (!content.trim()) return;

    const newMsg = { 
      text: content, 
      sender: 'me', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: content.startsWith('http') ? 'gif' : 'text'
    };
    setChatHistory([...chatHistory, newMsg]);
    setMessage('');
    setShowStickers(false);

    // Humanized Tanglish auto-reply logic
    setTimeout(() => {
      const replies = [
        "Semma bro! Ready for next round? 🔥",
        "Wait pannu, I am almost there! 🚀",
        "Vera level gameplay bro! 💯",
        "I'm currently playing, lets connect later. 🎮",
        "Super ah iruku! 🕹️",
        "Kandippa, next week match pakalam. ⭐",
        "Nalla play panra bro, keep it up! 😎",
        "Enna bro, server busy ah iruka? ⚡"
      ];
      const reply = { 
        text: replies[Math.floor(Math.random() * replies.length)], 
        sender: 'friend', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      setChatHistory(prev => [...prev, reply]);
    }, 1500);
  };

  const filteredUsers = searchResults.filter(u => !friends.find(f => f.username === u.username));

  return (
    <div className="account-page" style={{ 
      background: '#050510', minHeight: '100vh', color: 'white', overflowX: 'hidden', position: 'relative'
    }}>
      {/* Vibrant Animated Background */}
      <motion.div 
        animate={{ 
          background: [
            'radial-gradient(circle at 20% 20%, #1a1a3a 0%, #050510 100%)',
            'radial-gradient(circle at 80% 80%, #251a3a 0%, #050510 100%)',
            'radial-gradient(circle at 50% 50%, #1a2a3a 0%, #050510 100%)',
            'radial-gradient(circle at 20% 20%, #1a1a3a 0%, #050510 100%)'
          ]
        }}
        transition={{ duration: 15, repeat: Infinity }}
        style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      />
      
      {/* Background Glows */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ position: 'fixed', top: '-10%', left: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(0,255,136,0.15) 0%, transparent 70%)', zIndex: 0 }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <motion.button 
            onClick={() => navigate('/welcome')}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}
          >
            <ArrowLeft size={24} />
          </motion.button>
          <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 800, background: 'linear-gradient(45deg, #00ff88, #00bfff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            GAMER PROFILE
          </h1>
          <div style={{ background: 'rgba(0,255,136,0.1)', color: '#00ff88', border: '1px solid #00ff8844', padding: '5px 15px', borderRadius: '30px', fontSize: '10px', fontWeight: 600, letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: '8px', height: '8px', background: '#00ff88', borderRadius: '50%' }} />
            SERVER CONNECTED
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '30px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '30px', textAlign: 'center' }}
            >
              <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 20px' }}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #00ff88, #00bfff)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={50} color="black" />
                </div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, background: '#00ff88', width: '25px', height: '25px', borderRadius: '50%', border: '4px solid #050510', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={12} color="black" />
                </div>
              </div>
              <h2 style={{ margin: '0 0 5px', fontSize: '24px' }}>{currentUser.username}</h2>
              <p style={{ color: '#00ff88', fontSize: '14px', margin: '0 0 5px' }}>Veteran Gamer</p>
              <p style={{ color: '#888', fontSize: '12px', margin: '0' }}>{currentUser.email}</p>
            </motion.div>

            <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '25px' }}>
              <div style={{ position: 'relative', marginBottom: '20px' }}>
                <Search style={{ position: 'absolute', left: '12px', top: '12px', color: '#666' }} size={18} />
                <input 
                  type="text" 
                  placeholder="Find players..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 12px 12px 40px', borderRadius: '12px', color: 'white' }}
                />
                
                <AnimatePresence>
                  {searchQuery && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ position: 'absolute', top: '110%', left: 0, width: '100%', background: '#111', border: '1px solid #333', borderRadius: '12px', zIndex: 10, padding: '10px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                    >
                      {filteredUsers.length > 0 ? filteredUsers.map(user => (
                        <div key={user.username} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderRadius: '8px', cursor: 'pointer' }} onClick={() => addFriend(user)}>
                          <div>
                            <span style={{ fontSize: '14px', display: 'block' }}>{user.username}</span>
                            <span style={{ fontSize: '10px', color: '#00ff88' }}>{user.currentActivity}</span>
                          </div>
                          <UserPlus size={16} color="#00ff88" />
                        </div>
                      )) : <div style={{ padding: '10px', color: '#666', fontSize: '14px' }}>No players found</div>}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <h4 style={{ margin: '0 0 15px', color: '#888', display: 'flex', justifyContent: 'space-between' }}>
                FRIENDS <span>{friends.length}</span>
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {friends.map(friend => (
                  <motion.div 
                    key={friend.username} 
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }} 
                    onClick={() => setActiveChat(friend)}
                  >
                    <div style={{ position: 'relative' }}>
                      <div style={{ width: '38px', height: '38px', background: '#333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={20} color="#888" />
                      </div>
                      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderRadius: '50%', background: friend.status === 'Online' ? '#00ff88' : '#666', border: '2px solid #050510' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600 }}>{friend.username}</div>
                      <div style={{ fontSize: '10px', color: friend.currentActivity?.startsWith('Playing') ? '#00ff88' : '#888' }}>
                        {friend.currentActivity || 'Online'}
                      </div>
                    </div>
                    <MessageCircle size={16} color="#00ff88" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <AnimatePresence mode="wait">
              {activeChat ? (
                <motion.div 
                  key="chat"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', display: 'flex', flexDirection: 'column', height: '650px' }}
                >
                  <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ width: '40px', height: '40px', background: '#00ff88', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={22} color="black" />
                      </div>
                      <div>
                        <h4 style={{ margin: 0 }}>{activeChat.username}</h4>
                        <span style={{ fontSize: '11px', color: '#00ff88' }}>{activeChat.currentActivity}</span>
                      </div>
                    </div>
                    <button onClick={() => setActiveChat(null)} style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer' }}><X size={24} /></button>
                  </div>

                  <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {chatHistory.map((msg, i) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={i} 
                        style={{ alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start', maxWidth: '75%' }}
                      >
                        <div style={{ 
                          background: msg.sender === 'me' ? 'rgba(0,255,136,0.1)' : 'rgba(255,255,255,0.05)', 
                          padding: '12px 16px', 
                          borderRadius: '16px', 
                          border: `1px solid ${msg.sender === 'me' ? '#00ff8833' : 'rgba(255,255,255,0.1)'}` 
                        }}>
                          {msg.type === 'gif' ? (
                            <img src={msg.text} alt="gif" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                          ) : (
                            <div style={{ fontSize: '14px' }}>{msg.text}</div>
                          )}
                        </div>
                        <div style={{ fontSize: '10px', color: '#555', marginTop: '5px', textAlign: msg.sender === 'me' ? 'right' : 'left' }}>{msg.time}</div>
                      </motion.div>
                    ))}
                  </div>

                  <form onSubmit={sendMessage} style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '10px', position: 'relative' }}>
                    <button type="button" onClick={() => setShowStickers(!showStickers)} style={{ background: 'transparent', border: 'none', color: '#00ff88', cursor: 'pointer' }}><Smile size={24} /></button>
                    
                    <AnimatePresence>
                      {showStickers && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          style={{ position: 'absolute', bottom: '80px', left: '20px', background: '#111', border: '1px solid #333', borderRadius: '16px', padding: '15px', zIndex: 10, width: '280px' }}
                        >
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '15px' }}>
                            {stickers.map(s => <button key={s} onClick={() => sendMessage(null, s)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', padding: '8px', fontSize: '20px', borderRadius: '8px', cursor: 'pointer' }}>{s}</button>)}
                          </div>
                          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                            {gifs.map((g, i) => <img key={i} src={g} onClick={() => sendMessage(null, g)} alt="gif" style={{ width: '80px', height: '60px', borderRadius: '8px', cursor: 'pointer', objectFit: 'cover' }} />)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <input 
                      type="text" 
                      placeholder="Type a message..." 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 20px', borderRadius: '16px', color: 'white' }}
                    />
                    <button type="submit" style={{ background: '#00ff88', border: 'none', padding: '12px', borderRadius: '16px', cursor: 'pointer' }}><Send size={20} color="black" /></button>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Package size={20} color="#00ff88" /> Order History ({orders.length})
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {orders.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '60px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px dashed #333' }}>
                        <FileText size={40} color="#333" style={{ marginBottom: '15px' }} />
                        <p style={{ color: '#555' }}>No activity found yet.</p>
                      </div>
                    ) : orders.map((order) => (
                      <div key={order.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <div style={{ background: 'rgba(0,255,136,0.1)', width: '45px', height: '45px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Calendar size={20} color="#00ff88" /></div>
                            <div>
                              <div style={{ fontWeight: 'bold' }}>Order #{order.id.slice(-6).toUpperCase()}</div>
                              <div style={{ fontSize: '12px', color: '#666' }}>{order.date}</div>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ color: '#00ff88', fontWeight: 'bold', fontSize: '18px' }}>${order.total}</div>
                            <div style={{ fontSize: '11px', color: '#888' }}>{order.items.length} ITEMS</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
