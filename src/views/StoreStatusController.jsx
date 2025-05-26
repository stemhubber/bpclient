import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/StoreStatusController.css';
import { playOrderSound, speakText } from '../utils/utils';
import { soundMap } from '../utils/Constants';

const StoreStatusController = ({ store, isAdmin, isCustomerSide, showMessage, setStoreDetails, orders }) => {
  const [showModal, setShowModal] = useState(false);
  const [storeOpen, setStoreOpen] = useState(store?.isOpen);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const totalOrdersCompleted = orders?.length || 0;

  const generateConfirmationMessage = (isOpeningMessage = true) => {
    const openingMessages = [
      "Your store is now open 🚀 — let the joy begin! Someone out there is hungry for exactly what you offer. 🍽️",
      "🌞 A fresh start! Your store is now live and ready to create smiles. Let’s serve happiness, one order at a time.",
      "✨ Welcome back! You’ve reopened the doors to more moments, more memories, more bites of bliss.",
      "🔥 You’re live! The kitchen is open, the vibe is right, and your community is ready.",
      "🌟 You're open and ready — another day to turn orders into moments and meals into memories.",
      "🍴 Back in action! Your kitchen is open, your heart is in it, and your customers are ready.",
      "📣 The word is out — you're open and the good stuff is back on the menu!",
      "🥗 Fresh vibes, full plates. You're open and bringing flavor back to the community.",
      "🎉 Your store just opened! Someone's day is about to be made a little better, thanks to you.",
      "💚 Open signs up, energy's high. Let’s turn another ordinary day into something worth tasting.",
      "🚪 Doors open. Ideas sizzling. It’s your time to cook up magic again.",
      "🛎️ You’re open — and someone just smiled knowing their favourite meal is one click away."
    ];

    const closingMessages = [
      "💤 Store closed. Rest isn't a break from greatness, it's part of it. You've earned this pause.",
      "🧘 Store is offline for now. Every good recipe needs time — come back refreshed, recharged, and radiant.",
      "🌙 Closed. BitePilot is holding down the fort until you're back to serve the love.",
      "❤️ You've made people smile today. It’s okay to take a moment — we’ll be here when you’re ready.",
      "✨ Store is resting. Just like food, you too deserve time to simmer, slow down, and reset.",
      "🌧️ Closed for now — not every day is about doing more. Today, it's okay to simply be.",
      "💫 Store offline. Recharge, reflect, and return stronger. You've done something meaningful today.",
      "🕊️ You’ve earned this stillness. Let your store rest. Tomorrow brings another chance to shine.",
      "📦 Store closed, but the memories made today are still warm. Thank you for showing up.",
      "🧡 Pause. Reset. You’ve built something people care about — that’s enough for today.",
      "⏸️ Closed for now. Your customers understand. Great service always begins with great care — including self-care.",
      "🎗️ You're not offline. You're just taking care of the engine behind the flavor — you.",
      "🔒 Closed with purpose. Rest like you mean it — your return will be a gift to many."
    ];

    const messages = isOpeningMessage ? openingMessages : closingMessages;
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };


  const handleCloseStore = async () => {
    try {
      setStoreDetails({ ...store, isOpen: false });
      setStoreOpen(false);
      setShowModal(false);

      setConfirmationMessage(
        (`${generateConfirmationMessage(false)} \n\n You've already made ${totalOrdersCompleted} people full.`)
      );
      playOrderSound(soundMap.created)
    } catch (err) {
      console.error('Error closing store:', err);
    }
  };

  const handleReopenStore = async () => {
    try {
      setStoreDetails({ ...store, isOpen: true });
      setStoreOpen(true);

      setConfirmationMessage(
        generateConfirmationMessage(true)
      );
      setTimeout(() => setConfirmationMessage(''), 180000);
    } catch (err) {
      console.error('Error reopening store:', err);
    }
  };

  // 1. ADMIN SIDE
  if (isAdmin) {
    return (
      <div className="store-admin-controls">
        {confirmationMessage && (
          <div className="store-status-message">
            <p>{confirmationMessage}</p>
          </div>
        )}

        {storeOpen ? (
          <button className="close-store-button" onClick={() => setShowModal(true)}>
            🚪 Close Store
          </button>
        ) : (
          <button className="reopen-store-button" onClick={handleReopenStore}>
            🔓 Reopen Store
          </button>
        )}

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>Close {store?.name || 'your store'}?</h3>
              <p>
                This will temporarily pause orders. Your customers will see a message letting them know you're taking a well-deserved break ❤️
              </p>
              <div className="modal-actions">
                <button onClick={handleCloseStore}>✅ Yes, Close It</button>
                <button onClick={() => setShowModal(false)}>❌ Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. CUSTOMER SIDE
  if (isCustomerSide && !storeOpen && showMessage) {
    return (
      <div className="store-closed-message">
        <h2>This store is currently closed 💔</h2>
        <p>They’re taking a little break. But don’t worry, your next bite of joy is on its way. Come back soon! 🍽️</p>
      </div>
    );
  }

  return null;
};

export default StoreStatusController;
