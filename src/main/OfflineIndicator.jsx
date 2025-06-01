import React from 'react';
import { useOfflineStatus } from '../hooks/useOfflineStatus';
import './styles/OfflineIndicator.css';

const OfflineIndicator = () => {
  const isOffline = useOfflineStatus();

  if (!isOffline) return null;

  return (
    <div className="offline-indicator">
      <i className="fa fa-wifi"></i> You are offline
    </div>
  );
};

export default OfflineIndicator;
