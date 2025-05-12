// src/services/MessageController.js

export default class MessageController {
    constructor(apiBaseUrl = 'http://localhost:5000') {
      this.apiBaseUrl = apiBaseUrl;
    }
  
    /**
     * Send an SMS via backend server
     * @param {string} to - Phone number in international format (+27...)
     * @param {string} body - Message body
     * @returns {Promise<{ success: boolean, sid?: string, error?: string }>}
     */
    async sendSms(to, body) {
      try {
        const res = await fetch(`${this.apiBaseUrl}/send-message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ to, body }),
        });
  
        const data = await res.json();
  
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to send message');
        }
  
        return { success: true, sid: data.sid };
      } catch (err) {
        console.error('MessageController Error:', err.message);
        return { success: false, error: err.message };
      }
    }
  }
  
//   const messagec = new MessageController();
//   const result = await messagec.sendSms(
//     '+27735534588',
//     'Your BitePilot order is ready!'
//   );

//   console.log(result);
  
 
  