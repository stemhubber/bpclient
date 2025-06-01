// AdminAlertManager.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AlertController from '../../services/AlertController';
import "./styles/AdminAlertManager.css";
import NotificationPopover from './NotificationPopover';
import UserNameAsync from '../../main/UserNameAsync';

const AdminAlertManager = ({ storeId }) => {
  const [alerts, setAlerts] = useState([]);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('info');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = AlertController.listenToStoreAlerts(storeId.id, setAlerts);
    return () => unsubscribe();
  }, [storeId]);

  const handleSend = async () => {
    if (!message.trim()) return;
    try {
      setLoading(true);
      await AlertController.sendAlert(storeId.id, message, alertType);
      setMessage('');
    } catch (err) {
      setError("Failed to send alert. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (alertId) => {
    if (!window.confirm("Are you sure you want to delete this alert?")) return;
    try {
      await AlertController.deleteAlert(alertId);
    } catch (err) {
      setError("Failed to delete alert.");
    }
  };

  const handleReplyToReply = async (alertId, replyMessage) => {
    if (!replyMessage.trim()) return;
    try {
      await AlertController.replyToAlert(alertId, replyMessage);
    } catch (err) {
      setError("Reply failed. Please try again.");
    }
  };

  return (
    <div className="bp-admin-alert-manager">
      <motion.h2 className="bp-admin-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        Alerts
      </motion.h2>

      {error && <p className="bp-error-msg">{error}</p>}
      <NotificationPopover storeId={storeId?.id} store={storeId}/>
      <div className="bp-alert-form">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message for your customers..."
          className="bp-alert-textarea"
        />
        <select value={alertType} onChange={(e) => setAlertType(e.target.value)} className="bp-alert-select">
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="success">Success</option>
        </select>
        <button onClick={handleSend} className="bp-alert-send-btn" disabled={loading}>
          {loading ? 'Sending...' : 'Send Alert'}
        </button>
      </div>

      <div className="bp-alert-list">
        {alerts.length === 0 ? (
          <p className="bp-no-alert">No alerts created yet.</p>
        ) : (
          alerts.map(alert => (
            <motion.div
              key={alert.alertId}
              className="bp-alert-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bp-alert-header">
                <h3 className="bp-alert-user"><i className='fa fa-user-secret'></i> <UserNameAsync userId={alert.createdBy}/></h3>
                <div className="bp-alert-meta">
                  <i className={`fa fa-${alert.alertType === 'info' ? 'info' : alert.alertType === 'warning' ? 'exclamation' : 'comment'}`}></i>
                  <span className="bp-alert-msg">{alert.message}</span>
                  <button className="bp-alert-delete" onClick={() => handleDelete(alert.alertId)} disabled={loading}>
                    <i className={`fa fa-${loading ? 'spinner' : 'trash'}`}></i>
                  </button>
                </div>
              </div>
              <small className="bp-alert-timestamp">{new Date(alert.timestamp).toLocaleString()}</small>
              <div className="bp-alert-replies">
                {alert.replies?.length > 0 && <h4 className="bp-reply-title">Replies</h4>}
                {alert.replies?.map((r, index) => (
                  <div key={index} className="bp-reply-item">
                    <div className="bp-reply-user"><strong><i className='fa fa-user-circle'></i> <UserNameAsync userId={r.createdBy}/></strong></div>
                    <div className="bp-reply-msg">{r.message}</div>
                    <small className="bp-reply-time">{new Date(r.timestamp).toLocaleString()}</small>
                    <AdminReplyInput alertId={alert.alertId} onReply={handleReplyToReply} />
                  </div>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

const AdminReplyInput = ({ alertId, onReply }) => {
  const [adminReply, setAdminReply] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const handleAdminReply = async () => {
    if (!adminReply.trim()) return;
    try {
      setSending(true);
      await onReply(alertId, adminReply);
      setAdminReply('');
    } catch (err) {
      setError("Failed to send reply.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bp-admin-reply-form">
      <input
        type="text"
        value={adminReply}
        onChange={(e) => setAdminReply(e.target.value)}
        placeholder="Reply to user..."
        className="bp-reply-input"
      />
      <button onClick={handleAdminReply} className="bp-reply-button" disabled={sending}>
        {sending ? 'Sending...' : 'Send'}
      </button>
      {error && <p className="bp-error-msg">{error}</p>}
    </div>
  );
};

export default AdminAlertManager;
