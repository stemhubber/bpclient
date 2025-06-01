// AlertSender.js (Admin Component)
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AlertController from '../../services/AlertController';
import "./styles/alertStyles.css"

export const AlertSender = ({ storeId }) => {
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('info');

  const handleSend = async () => {
    if (!message.trim()) return;
    await AlertController.sendAlert(storeId, message, alertType);
    setMessage('');
  };

  return (
    <div className="alert-sender">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your alert message..."
        className="alert-textarea"
      />
      <select value={alertType} onChange={(e) => setAlertType(e.target.value)} className="alert-select">
        <option value="info">Info</option>
        <option value="warning">Warning</option>
        <option value="success">Success</option>
      </select>
      <button onClick={handleSend} className="alert-send-button">Send Alert</button>
    </div>
  );
};


// NotificationBell.js (Customer View Icon)
export const NotificationBell = ({ storeId }) => {
  const [alerts, setAlerts] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = AlertController.listenToStoreAlerts(storeId, setAlerts);
    return () => unsubscribe();
  }, [storeId]);

  const unreadCount = alerts.filter(a => a.timestamp > AlertController.getLastReadTimestamp(storeId)).length;

  const handleBellClick = () => {
    setPopoverOpen(!popoverOpen);
    AlertController.markAlertsAsRead(storeId);
  };

  return (
    <div className="notification-wrapper">
      <motion.i
        className="notification-bell"
        whileHover={{ scale: 1.1 }}
        onClick={handleBellClick}
      />
      {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
      {popoverOpen && (
        <div className="notification-popover">
          {alerts.map(alert => (
            <div key={alert.alertId} className="notification-alert">
              <strong className="alert-type">{alert.alertType}</strong>: {alert.message}<br />
              <small className="alert-timestamp">{new Date(alert.timestamp).toLocaleString()}</small>
              <ReplyForm alertId={alert.alertId} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


// ReplyForm.js
export const ReplyForm = ({ alertId }) => {
  const [reply, setReply] = useState('');

  const handleReply = async () => {
    if (!reply.trim()) return;
    await AlertController.replyToAlert(alertId, reply);
    setReply('');
  };

  return (
    <div className="reply-form">
      <input
        type="text"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Reply..."
        className="reply-input"
      />
      <button
        onClick={handleReply}
        className="reply-button"
      >Send</button>
    </div>
  );
};
