// views/VoiceOrderCommand.jsx
import React, { useState } from 'react';
import { listenForSpeechCommand } from '../utils/utils';
import { speakText } from '../utils/utils';

const statuses = ['Pending', 'Preparing', 'Ready', 'Completed'];

const VoiceOrderCommand = () => {
  const [listening, setListening] = useState(false);
  const [recognized, setRecognized] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);

  const parseCommand = (text) => {
    const lower = text.toLowerCase();

    for (let status of statuses) {
      const keyword = status.toLowerCase();
      const match = lower.match(new RegExp(`${keyword}.*order\\s(\\d+)`));
      if (match) {
        return { status, orderId: match[1] };
      }
    }

    if (lower.includes('payment') && lower.includes('order')) {
      const match = lower.match(/order\s(\d+)/);
      if (match) return { status: 'Paid', orderId: match[1] };
    }

    return null;
  };

  const handleStartListening = () => {
    setListening(true);
    listenForSpeechCommand({
      onResult: (text) => {
        const command = parseCommand(text);
        setListening(false);

        if (command) {
          setPendingAction(command);
          speakText(`Did you say ${command.status} order ${command.orderId}?`);
        } else {
          speakText('Sorry, I did not understand. Try again.');
        }

        setRecognized(text);
      },
      onError: (err) => {
        setListening(false);
        console.error(err);
        speakText('Error occurred during speech recognition.');
      }
    });
  };

  const confirmAction = () => {
    if (!pendingAction) return;
    console.log('👉 Performing action:', pendingAction);

    // TODO: Implement your status update logic here
    speakText(`Okay. Updating order ${pendingAction.orderId} to ${pendingAction.status}`);
    setPendingAction(null);
  };

  return (
    <div style={{ padding: '1.5rem', border: '2px dashed #ccc', borderRadius: '1rem' }}>
      <h2>🎙 Voice Command</h2>
      <button onClick={handleStartListening} disabled={listening}>
        {listening ? 'Listening...' : 'Start Voice Command'}
      </button>

      {recognized && <p><strong>Heard:</strong> "{recognized}"</p>}

      {pendingAction && (
        <div style={{ marginTop: '1rem' }}>
          <p>✔ Confirm: {pendingAction.status} Order #{pendingAction.orderId}?</p>
          <button onClick={confirmAction}>Yes</button>
        </div>
      )}
    </div>
  );
};

export default VoiceOrderCommand;
