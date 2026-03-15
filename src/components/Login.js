import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import loginImg from "../images/login.png";

function Login() {
  const [view, setView] = useState("signin"); // "signin" | "signup" | "verify"
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  // Form states (mock)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        navigate("/welcome");
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.warn('Backend connection failed, entering Guest Mode.');
      const guestUser = { username: 'Guest Gamer', email: 'guest@gamersworld.com', isGuest: true };
      localStorage.setItem('currentUser', JSON.stringify(guestUser));
      
      const proceed = window.confirm('Could not connect to the server. Would you like to enter in Guest Mode (Offline)? Some features may be limited.');
      if (proceed) {
        navigate("/welcome");
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        setView("verify");
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.warn('Backend connection failed, entering Guest Mode.');
      const guestUser = { username: 'Guest Gamer', email: 'guest@gamersworld.com', isGuest: true };
      localStorage.setItem('currentUser', JSON.stringify(guestUser));
      
      const proceed = window.confirm('Could not connect to the server. Would you like to enter in Guest Mode (Offline) to explore the world?');
      if (proceed) {
        navigate("/welcome");
      }
    }
  };

  const handleVerify = () => {
    if (isVerified) {
      navigate("/welcome");
    }
  };

  const toggleVerification = () => {
    setIsVerified(true);
    // Auto proceed after brief delay for better UX
    setTimeout(() => {
      navigate("/welcome");
    }, 1000);
  };

  const variants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${loginImg})` }}>
      <div className="auth-overlay"></div>

      <div className="auth-card">
        <AnimatePresence mode="wait">
          {view === "signin" && (
            <motion.div
              key="signin"
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
            >
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-subtitle">Login to enter the gamers world</p>

              <form onSubmit={handleSignIn}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    placeholder="player@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">Sign In</button>
              </form>

              <div className="auth-switch">
                New player?
                <span className="auth-switch-link" onClick={() => setView("signup")}>
                  Create Account
                </span>
              </div>
            </motion.div>
          )}

          {view === "signup" && (
            <motion.div
              key="signup"
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
            >
              <h1 className="auth-title">Create Account</h1>
              <p className="auth-subtitle">Join the gamers world today</p>

              <form onSubmit={handleSignUp}>
                <div className="form-group">
                  <label className="form-label">Player Name</label>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    placeholder="player@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">Join Now</button>
              </form>

              <div className="auth-switch">
                Already have an account?
                <span className="auth-switch-link" onClick={() => setView("signin")}>
                  Sign In
                </span>
              </div>
            </motion.div>
          )}

          {view === "verify" && (
            <motion.div
              key="verify"
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
            >
              <h1 className="auth-title">Security Check</h1>
              <p className="auth-subtitle">Verify you are a real player</p>

              <div className={`verify-box ${isVerified ? 'verified' : ''}`} onClick={toggleVerification}>
                <div className="verify-checkbox">
                  <span className="success-icon">✓</span>
                </div>
                <span style={{ fontWeight: 500 }}>I am human</span>
              </div>

              <button
                className="btn-primary"
                onClick={handleVerify}
                disabled={!isVerified}
                style={{ opacity: isVerified ? 1 : 0.5, cursor: isVerified ? 'pointer' : 'not-allowed' }}
              >
                Continue to World
              </button>

              <div className="auth-switch">
                <span className="auth-switch-link" onClick={() => setView("signup")}>
                  Back to Registration
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Login;