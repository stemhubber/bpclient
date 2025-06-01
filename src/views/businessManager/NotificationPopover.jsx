// NotificationPopover.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AlertController from '../../services/AlertController';
import { ReplyForm } from './AlertSender';
import "./styles/NotificationPopover.css";
import UserController from '../../services/UserController';
import RepliesWithUsernames from './RepliesWithUserNames';

const NotificationPopover = ({ storeId, store }) => {
  const [alerts, setAlerts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const userId = sessionStorage.getItem('bitepilot_user');

  useEffect(() => {
    const unsubscribe = AlertController.listenToStoreAlerts(storeId, setAlerts);
    return () => unsubscribe();
  }, [storeId]);

  useEffect(() => {
    if (isOpen) {
      AlertController.markAlertsAsRead(storeId, userId);
    }
  }, [isOpen, storeId, userId]);

  const unreadCount = alerts.filter(a => a.timestamp > AlertController.getLastReadTimestamp(storeId)).length;

  const handleToggle = () => setIsOpen(prev => !prev);
  const handleClose = () => setIsOpen(false);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'info': return <i className="fa fa-info-circle text-info"></i>;
      case 'warning': return <i className="fa fa-exclamation-triangle text-warning"></i>;
      case 'success': return <i className="fa fa-check-circle text-success"></i>;
      default: return <i className="fa fa-bell"></i>;
    }
  };

  return (
    <div className="notification-wrapper">
      <motion.div
        className="notification-bell-container"
        whileHover={{ scale: 1.1 }}
        onClick={handleToggle}
      >
        <i className="fa fa-bell notification-bell" />
        {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="popover-backdrop"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="popover-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="popover-header">
                <h2>{`${store?.name || 'Store'}`} alerts</h2>
                <button className="popover-close" onClick={handleClose}>×</button>
              </div>


              {!store?.isOpen && <div className="store-closed-message">
                <h2>This store is currently closed 💔</h2>
                <p>They’re taking a little break. But don’t worry, your next bite of joy is on its way. Come back soon! 🍽️</p>
                <p>{store?.openingTimes}</p>
              </div>}
              {store?.isOpen && <div className="store-status-message">
                <h2>Store open ❤️</h2>
                <p>Grab a bite! 🍽️</p>
                <p>{store?.openingTimes}</p>
              </div>}

                <h2>{`${store?.name || 'Store'}`} <button className="popover-close" onClick={handleClose}>×</button></h2>
                
              <div className="popover-content">
                {alerts.length === 0 ? (
                  <p>No alerts from this store.</p>
                ) : (
                  alerts.map(alert => (
                    <div key={alert.alertId} className="notification-alert">
                      <div className="alert-meta">
                        {getAlertIcon(alert.alertType)}
                        <span className="alert-message"> {"  "}{alert.message}</span>
                      </div>
                      <small className="alert-timestamp">{new Date(alert.timestamp).toLocaleString()}</small>
                      {alert.replies?.length > 0 && (
                        <div className="alert-replies">
                          
                          <details className="alert-replies">
                            <summary>Replies ({alert?.replies?.length})</summary>
                            <article className="reply-list">
                              <RepliesWithUsernames replies={alert.replies}/>
                            </article>
                          </details>

                        </div>
                      )}
                      <ReplyForm alertId={alert.alertId} />
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationPopover;
