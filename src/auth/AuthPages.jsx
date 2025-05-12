// AuthPage.js – Combined login and register page
import React, { useState, useEffect } from 'react';
import UserController from '../services/UserController';
import './styles/AuthPages.css';
import { useNavigate } from 'react-router-dom';
import { formatAndValidateCellNumber } from '../utils/utils';

const AuthPage = ({ onUserLoggedIn, dontNavigate=false}) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [step, setStep] = useState('input');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const existingUser = sessionStorage.getItem('bitepilot_user');
    if (existingUser) {
      onUserLoggedIn(JSON.parse(existingUser));
    }
  }, [onUserLoggedIn]);

  const sendOTP = async (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);

    try {
      const validator = formatAndValidateCellNumber(phone);
      if (!validator.valid){
        setStatus(`❌ ${validator.error}`);
        return
      }
      await UserController.sendOTP(validator.phone);
      setStep('verify');
      setStatus('📩 OTP sent to ' + validator.phone);
    } catch (err) {
      setStatus('❌ ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);

    try {
      const validator = formatAndValidateCellNumber(phone);
      if (!validator.valid){
        setStatus(`❌ ${validator.error}`);
        setLoading(false);
        return
      }
      console.log(validator);
      
      const userData = await UserController.getUser(validator.phone);
      if (userData){
        setStatus('Taking you to the next page...');
        sessionStorage.setItem('bitepilot_user', JSON.stringify(userData));
        onUserLoggedIn(userData)
        if(!dontNavigate) navigate("/");
      }
      else{
        setStatus('❌ Could not verify number');
      }
      
    } catch (err) {
      setStatus('❌ ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);

    try {
      const validator = formatAndValidateCellNumber(phone);
      if (!validator.valid){
        setStatus(`❌ ${validator.error}`);
        setLoading(false);
        return
      }

      const userId = await UserController.confirmOTP(validator.phone, code);

      let userData = await UserController.getUser(userId);
      if (!userData && isRegistering) {
        userData = {
          uid: userId,
          name,
          phone: validator.phone,
          createdAt: new Date().toISOString(),
        };
        await UserController.registerUser(userId, userData);
      }

      if (!userData) throw new Error('User not registered. Please register first.');

      sessionStorage.setItem('bitepilot_user', JSON.stringify(userData));
      onUserLoggedIn(userData);
      navigate("/");
    } catch (err) {
      setStatus('❌ ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      
      <div className="auth-box slide-up">
      <h3 className="auth-title">
        {step === 'input' ? (isRegistering ? 'Register' : 'Login') : 'Verify OTP'}
      </h3>
        {step === 'input' ? (
          <form onSubmit={isRegistering? sendOTP: loginUser} className="auth-form">
            {isRegistering && (
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="auth-input"
              />
            )}
            <input
              type="tel"
              placeholder="Phone Number (e.g. 733552288)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="auth-input"
            />
            {isRegistering? <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button> : <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Sending...' : 'Log in'}
            </button> }
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
              {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
              <span
                onClick={() => setIsRegistering(!isRegistering)}
                style={{ color: '#29bd00', cursor: 'pointer' }}
              >
                {isRegistering ? 'Login' : 'Register'}
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={verifyOTP} className="auth-form">
            <input
              type="text"
              placeholder="Enter OTP"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="auth-input"
            />
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>
          </form>
        )}
        {status && <p className="auth-status fade-in-delay">{status}</p>}
      </div>
    </div>
  );
};

export default AuthPage;