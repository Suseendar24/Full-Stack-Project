import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Monitor, Disc, Gamepad2, ShoppingCart, Library, CheckCircle2, Scale, MapPin, Crosshair, X, Trash2 } from 'lucide-react';
import { hardwareProducts, cdGames, digitalGames } from './storeData';
import gamingProductsBg from '../images/gaming products background.avif';

function Store() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hardware');
  
  // Filters
  const [hwPage, setHwPage] = useState(1);
  const itemsPerPage = 20;
  const [cdPage, setCdPage] = useState(1);
  const [digitalPage, setDigitalPage] = useState(1);

  const [compareItems, setCompareItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState(0); 
  // 0: none, 1: qr code, 2: address form, 3: gps tracker, 4: success/bill
  
  // Address form state
  const [addressData, setAddressData] = useState({ name: '', phone: '', address: '', country: 'India' });
  const [trackingProgress, setTrackingProgress] = useState(0);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  const totalCartPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const paginatedHardware = hardwareProducts.slice((hwPage - 1) * itemsPerPage, hardwareProducts.length); // Use all hardware since price and folder removal was done earlier
  const totalHwPages = Math.ceil(hardwareProducts.length / itemsPerPage);

  const paginatedCds = cdGames.slice((cdPage - 1) * itemsPerPage, cdGames.length);
  const totalCdPages = Math.ceil(cdGames.length / itemsPerPage);

  const paginatedDigital = digitalGames.slice((digitalPage - 1) * itemsPerPage, digitalGames.length);
  const totalDigitalPages = Math.ceil(digitalGames.length / itemsPerPage);

  const addToCart = (item) => {
    setCart(prev => [...prev, item]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setPaymentStep(1);
  };

  const handleQrSuccess = () => {
    setPaymentStep(2); // Ask for address for all items in cart (treating all as physical for this flow)
  };

  const submitAddress = (e) => {
    e.preventDefault();
    setPaymentStep(3); // Go to GPS tracker
  };

  // Simulate GPS progress
  useEffect(() => {
    let interval;
    if (paymentStep === 3) {
      setTrackingProgress(0);
      interval = setInterval(() => {
        setTrackingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setShowVerification(true), 1000);
            return 100;
          }
          return prev + 10;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [paymentStep]);

  const handleVerification = (e) => {
    e.preventDefault();
    if (verificationCode === '1234') {
      finalizeOrder();
    } else {
      alert('Wrong verification code! Product will be returned.');
      resetStore();
    }
  };

  const finalizeOrder = () => {
    const orderBill = {
      id: `ORDER_${Date.now()}`,
      date: new Date().toLocaleString(),
      items: [...cart],
      total: totalCartPrice,
      customer: addressData
    };
    
    // Save to Account/History
    const existingHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    localStorage.setItem('orderHistory', JSON.stringify([orderBill, ...existingHistory]));

    setPaymentStep(4);
    // Keep step 4 visible to show the bill
  };

  const resetStore = () => {
    setCart([]);
    setCompareItems([]);
    setPaymentStep(0);
    setTrackingProgress(0);
    setVerificationCode('');
    setShowVerification(false);
    navigate('/account');
  };

  const toggleCompare = (item) => {
    if (compareItems.find((i) => i.id === item.id)) {
      setCompareItems(compareItems.filter((i) => i.id !== item.id));
    } else if (compareItems.length < 2) {
      setCompareItems([...compareItems, item]);
    } else {
      setCompareItems([compareItems[1], item]);
    }
  };

  const tabs = [
    { id: 'hardware', label: 'Hardware', icon: <Monitor size={20} /> },
    { id: 'cds', label: 'Gaming CDs', icon: <Disc size={20} /> },
    { id: 'digital', label: 'Digital Games', icon: <Gamepad2 size={20} /> },
  ];

  const backgrounds = {
    hardware: gamingProductsBg, // Using the local background requested
    cds: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&q=80&w=2000',
    digital: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2000',
  };

  return (
    <div className="store-page" style={{ 
      background: '#0f0c29', minHeight: '100vh', color: 'white', overflowX: 'hidden', position: 'relative'
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }} // Increased opacity
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundImage: `url("${backgrounds[activeTab]}")`,
            backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0,
            animation: 'slowPan 30s infinite alternate ease-in-out'
          }}
        />
      </AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(to bottom, rgba(15,12,41,0.4), #0f0c29)', zIndex: 0 }}></div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slowPan {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.1) translate(-2%, -2%); }
        }
      `}} />

      <div className="store-container" style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <motion.button 
              onClick={() => navigate('/welcome')}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}
            >
              <ArrowLeft size={24} />
            </motion.button>
            <div>
              <h1 style={{ margin: 0, fontSize: '36px', fontWeight: 800, color: '#00ff88' }}>GAMERS STORE</h1>
              <span style={{ color: '#888' }}>Premium Hardware & Games</span>
            </div>
          </div>
          <motion.button 
            onClick={() => setIsCartOpen(true)}
            whileHover={{ scale: 1.05 }}
            style={{ 
              position: 'relative', background: '#00ff88', color: 'black', border: 'none', padding: '12px 24px', 
              borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' 
            }}
          >
            <ShoppingCart size={20} />
            Cart ({cart.length})
            {cart.length > 0 && (
              <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', fontSize: '12px', padding: '2px 6px', borderRadius: '50%' }}>
                {cart.length}
              </span>
            )}
          </motion.button>
        </header>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'rgba(0, 255, 128, 0.2)' : 'rgba(255,255,255,0.05)',
                color: activeTab === tab.id ? '#00ff88' : 'white',
                border: `1px solid ${activeTab === tab.id ? '#00ff88' : 'rgba(255,255,255,0.1)'}`,
                padding: '12px 24px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Cart Sidebar/Modal */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              style={{ 
                position: 'fixed', top: 0, right: 0, width: '400px', height: '100vh', background: '#1a1a2e', 
                zIndex: 200, padding: '30px', boxShadow: '-10px 0 30px rgba(0,0,0,0.5)', borderLeft: '1px solid #00ff88' 
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ margin: 0, color: '#00ff88' }}>Your Cart</h2>
                <X onClick={() => setIsCartOpen(false)} style={{ cursor: 'pointer' }} />
              </div>
              
              <div style={{ height: 'calc(100vh - 250px)', overflowY: 'auto', marginBottom: '20px' }}>
                {cart.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#666', marginTop: '50px' }}>Cart is empty</p>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '15px', marginBottom: '15px', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                      <img src={item.image} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                        <div style={{ color: '#00ff88' }}>${item.price}</div>
                      </div>
                      <Trash2 size={18} color="#ff4444" style={{ cursor: 'pointer' }} onClick={() => removeFromCart(idx)} />
                    </div>
                  ))
                )}
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
                  <span>Total:</span>
                  <span style={{ color: '#00ff88' }}>${totalCartPrice}</span>
                </div>
                <button 
                  disabled={cart.length === 0}
                  onClick={handleCheckout}
                  style={{ 
                    width: '100%', background: '#00ff88', color: 'black', border: 'none', padding: '15px', 
                    borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', opacity: cart.length === 0 ? 0.5 : 1 
                  }}
                >
                  Checkout Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payment Flow Modal */}
        <AnimatePresence>
          {paymentStep > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
              <div style={{ background: '#1a1a2e', padding: '40px', borderRadius: '24px', maxWidth: '600px', width: '90%', border: '1px solid #00ff88', maxHeight: '90vh', overflowY: 'auto' }}>
                
                {paymentStep === 1 && (
                  <div style={{ textAlign: 'center' }}>
                    <h2 style={{ color: '#00ff88' }}>Secure Payment</h2>
                    <p style={{ color: '#aaa' }}>Scan QR to pay ${totalCartPrice}</p>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '16px', display: 'inline-block', margin: '20px 0' }}>
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PayCart${Date.now()}`} alt="QR" />
                    </div>
                    <div>
                      <button onClick={handleQrSuccess} style={{ background: '#00ff88', color: 'black', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginRight: '10px' }}>I have paid</button>
                      <button onClick={() => setPaymentStep(0)} style={{ background: 'transparent', color: 'white', padding: '12px 24px', borderRadius: '8px', border: '1px solid #555', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </div>
                )}

                {paymentStep === 2 && (
                  <div>
                    <h2 style={{ color: '#00bfff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><MapPin /> Delivery Details</h2>
                    <form onSubmit={submitAddress} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <input required placeholder="Username" value={addressData.name} onChange={e => setAddressData({...addressData, name: e.target.value})} style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid #444', color: 'white' }} />
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <select 
                          value={addressData.country} 
                          onChange={e => setAddressData({...addressData, country: e.target.value})}
                          style={{ padding: '12px', borderRadius: '8px', background: '#1a1a2e', border: '1px solid #444', color: 'white', cursor: 'pointer' }}
                        >
                          <option value="India">🇮🇳 India</option>
                          <option value="USA">🇺🇸 USA</option>
                          <option value="UK">🇬🇧 UK</option>
                          <option value="Canada">🇨🇦 Canada</option>
                          <option value="Australia">🇦🇺 Australia</option>
                        </select>
                        <input 
                          required 
                          type="tel" 
                          pattern="[0-9]{10}"
                          title="Please enter 10 digit mobile number"
                          placeholder="Mobile Number (10 digits)" 
                          value={addressData.phone} 
                          onChange={e => setAddressData({...addressData, phone: e.target.value})} 
                          style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid #444', color: 'white' }} 
                        />
                      </div>
                      <textarea required rows={4} placeholder="Full Shipping Address" value={addressData.address} onChange={e => setAddressData({...addressData, address: e.target.value})} style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid #444', color: 'white', resize: 'none' }} />
                      <button type="submit" style={{ background: '#00bfff', color: 'black', padding: '14px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>Confirm & Track</button>
                    </form>
                  </div>
                )}

                {paymentStep === 3 && (
                  <div style={{ textAlign: 'center' }}>
                    {!showVerification ? (
                      <>
                        <h2 style={{ color: '#ffb300', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}><Crosshair /> Live GPS Tracking</h2>
                        <div style={{ position: 'relative', width: '100%', height: '200px', background: '#222', borderRadius: '16px', overflow: 'hidden', margin: '20px 0', border: '1px solid #444' }}>
                          <div style={{ width: '100%', height: '100%', opacity: 0.3, backgroundImage: 'radial-gradient(#444 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
                          <motion.div animate={{ left: `${Math.min(trackingProgress, 90)}%` }} style={{ position: 'absolute', top: '40%', fontSize: '30px' }}>🚚</motion.div>
                          <div style={{ position: 'absolute', top: '43%', right: '5%', color: '#00ff88' }}><MapPin size={24} /></div>
                        </div>
                        <div style={{ width: '100%', background: '#333', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${trackingProgress}%`, height: '100%', background: '#ffb300', transition: 'width 0.5s' }}></div>
                        </div>
                        <p style={{ marginTop: '15px', color: '#ffb300', fontWeight: 'bold' }}>{trackingProgress < 100 ? 'Courier is in transit...' : 'Package Arrived!'}</p>
                      </>
                    ) : (
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        <h2 style={{ color: '#00ff88' }}>Deliver Verification</h2>
                        <p style={{ color: '#aaa', marginBottom: '20px' }}>Enter the 4-digit code sent to {addressData.phone}</p>
                        <form onSubmit={handleVerification}>
                          <input 
                            required 
                            type="text" 
                            maxLength="4" 
                            placeholder="X X X X" 
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            style={{ 
                              width: '150px', letterSpacing: '10px', textAlign: 'center', fontSize: '24px', 
                              padding: '15px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', 
                              border: '2px solid #00ff88', color: 'white', marginBottom: '20px' 
                            }} 
                          />
                          <br />
                          <button type="submit" style={{ background: '#00ff88', color: 'black', padding: '12px 40px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Verify & Receive</button>
                        </form>
                        <p style={{ fontSize: '12px', color: '#555', marginTop: '10px' }}>Hint: 1234</p>
                      </motion.div>
                    )}
                  </div>
                )}

                {paymentStep === 4 && (
                  <div style={{ textAlign: 'center' }}>
                    <CheckCircle2 size={80} color="#00ff88" style={{ margin: '0 auto 20px' }} />
                    <h2 style={{ color: 'white' }}>Order Placed!</h2>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', textAlign: 'left', margin: '20px 0' }}>
                      <h4 style={{ borderBottom: '1px solid #333', paddingBottom: '10px', margin: '0 0 10px' }}>Purchase Bill</h4>
                      {cart.map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '5px' }}>
                          <span>{item.name}</span>
                          <span>${item.price}</span>
                        </div>
                      ))}
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #333', paddingTop: '10px', marginTop: '10px', fontWeight: 'bold', color: '#00ff88' }}>
                        <span>Total Paid</span>
                        <span>${totalCartPrice}</span>
                      </div>
                    </div>
                    <button onClick={resetStore} style={{ background: '#00ff88', color: 'black', border: 'none', padding: '12px 30px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Go to My Account</button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {activeTab === 'hardware' && (
          <>
            {compareItems.length > 0 && (
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.2)', borderRadius: '24px', padding: '30px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ margin: 0, color: '#00ff88', display: 'flex', alignItems: 'center', gap: '10px' }}><Scale /> Product Comparison</h2>
                  <button onClick={() => setCompareItems([])} style={{ background: 'transparent', border: '1px solid #444', color: '#888', padding: '5px 15px', borderRadius: '8px', cursor: 'pointer' }}>Clear All</button>
                </div>
                
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr>
                        <th style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Specification</th>
                        {compareItems.map(item => (
                          <th key={item.id} style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#00ff88' }}>{item.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Dynamically extract all unique spec keys */}
                      {Array.from(new Set(compareItems.flatMap(i => Object.keys(i.specs)))).map(specKey => (
                        <tr key={specKey}>
                          <td style={{ padding: '12px', color: '#888', borderBottom: '1px solid rgba(255,255,255,0.05)', textTransform: 'capitalize' }}>{specKey}</td>
                          {compareItems.map(item => (
                            <td key={item.id} style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{item.specs[specKey] || '-'}</td>
                          ))}
                        </tr>
                      ))}
                      <tr>
                        <td style={{ padding: '12px', color: '#888', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Price</td>
                        {compareItems.map(item => (
                          <td key={item.id} style={{ padding: '12px', color: '#00ff88', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>${item.price}</td>
                        ))}
                      </tr>
                      <tr>
                        <td></td>
                        {compareItems.map(item => (
                          <td key={item.id} style={{ padding: '15px' }}>
                            <button onClick={() => addToCart(item)} style={{ background: '#00ff88', color: 'black', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>Add to Cart</button>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {paginatedHardware.map(p => (
                <div key={p.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', overflow: 'hidden' }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ margin: '0 0 10px' }}>{p.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>{p.category}</span>
                      <span style={{ color: '#00ff88', fontWeight: 'bold', fontSize: '20px' }}>${p.price}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => addToCart(p)} style={{ flex: 1, background: '#00ff88', color: 'black', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Add to Cart</button>
                      <button onClick={() => toggleCompare(p)} title="Compare Specifications" style={{ background: compareItems.find(i => i.id === p.id) ? 'rgba(0, 255, 128, 0.2)' : 'rgba(255,255,255,0.1)', border: `1px solid ${compareItems.find(i => i.id === p.id) ? '#00ff88' : 'transparent'}`, color: 'white', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}><Scale size={18} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'cds' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {paginatedCds.map(cd => (
              <div key={cd.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', overflow: 'hidden' }}>
                <img src={cd.image} alt={cd.name} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <h3 style={{ margin: '0 0 10px' }}>{cd.name}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    <span style={{ color: '#00bfff', fontWeight: 'bold', fontSize: '24px' }}>${cd.price}</span>
                    <button onClick={() => addToCart(cd)} style={{ background: '#00bfff', color: 'black', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'digital' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {paginatedDigital.map(game => (
              <div key={game.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px', overflow: 'hidden' }}>
                <img src={game.image} alt={game.name} style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '12px', marginBottom: '15px' }} />
                <h3 style={{ margin: '0 0 15px' }}>{game.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#ffb300', fontWeight: 'bold', fontSize: '24px' }}>${game.price}</span>
                  <button onClick={() => addToCart(game)} style={{ background: '#ffb300', color: 'black', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Store;
