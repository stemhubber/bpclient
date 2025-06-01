// AlertController.js
import { addDoc, updateDoc, deleteDoc, doc, collection, query, orderBy, onSnapshot, arrayUnion } from 'firebase/firestore';
import { db } from './firebase';

const alertsCollection = collection(db, 'alerts');

function getCurrentUserId() {
  const user = JSON.parse(localStorage.getItem('bitepilot_user'));
  return user?.uid;
}

class AlertController {
  static async sendAlert(storeId, message, alertType = 'info') {
    
    
    const alert = {
      storeId,
      message,
      alertType,
      timestamp: Date.now(),
      createdBy: getCurrentUserId(),
      replies: []
    };
    console.log('Trying to send', alert);
    return await addDoc(alertsCollection, alert);
  }

  static listenToStoreAlerts(storeId, callback) {
    const q = query(alertsCollection, orderBy("timestamp", "desc"));
    return onSnapshot(q, (snapshot) => {
      const alerts = snapshot.docs.map(doc => ({
        ...doc.data(),
        alertId: doc.id
      }));
      const alertsForStore = alerts?.filter((analert)=> analert.storeId === storeId)
      callback(alertsForStore);
      
    });
  }

  static async replyToAlert(alertId, message) {
    const alertRef = doc(alertsCollection, alertId);
    const reply = {
      createdBy: getCurrentUserId(),
      message,
      timestamp: Date.now()
    };
    await updateDoc(alertRef, {
      replies: arrayUnion(reply)
    });
  }

  static markAlertsAsRead(storeId, userId) {
    const key = `read_alerts_${storeId}`;
    localStorage.setItem(key, Date.now().toString());
  }

  static getLastReadTimestamp(storeId) {
    const key = `read_alerts_${storeId}`;
    return parseInt(localStorage.getItem(key)) || 0;
  }

  static async deleteAlert(alertId) {
    const alertRef = doc(alertsCollection, alertId);
    await deleteDoc(alertRef);
  }
}

export default AlertController;
