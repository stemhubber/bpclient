
export const getUserCoordinates = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported by your browser.');
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject('Failed to get location: ' + error.message);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  };

  export const formatAndValidateCellNumber = (input)=> {
    if (!input || typeof input !== 'string') return { valid: false, error: 'Input must be a string' };
  
    // Remove non-digit characters (e.g., spaces, dashes, parentheses)
    let cleaned = input.replace(/[^\d]/g, '');
  
    // Fix prefix
    if (cleaned.startsWith('0')) {
      cleaned = '+27' + cleaned.slice(1);
    } else if (cleaned.startsWith('27')) {
      cleaned = '+27' + cleaned.slice(2);
    } else if (cleaned.startsWith('+27')) {
      // already valid start
    } else {
      return { valid: false, error: 'Invalid prefix: number must start with 0, 27 or +27' };
    }
  
    // Ensure it's +27 followed by 9 digits
    const isValid = /^\+27\d{9}$/.test(cleaned);
    if (!isValid) {
      return { valid: false, error: 'Number must be 9 digits after +27' };
    }
  
    return { valid: true, phone: cleaned };
  }
  
export const convertIDToTime = (id, descriptive=true)=> {
    try {
      const time = parseInt(id?.split('-')[0]);
      
      return formatTimestamp(time, descriptive);
    } catch (error) {
      console.error(error)
      return 'invalid date';
    }
    
}

export const formatTimestamp = (timestamp, descriptive = false)=> {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const monthIndex = date.getMonth(); // 0-based
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = String(monthIndex + 1).padStart(2, '0');
  const monthWord = monthNames[monthIndex];

  if (descriptive) {
    return `${day} ${monthWord} ${hours}:${minutes}:${seconds}`;
  } else {
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}

export const sortFormattedDates = (dates, newestFirst = true)=> {
  return dates.sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return newestFirst ? dateB - dateA : dateA - dateB;
  });
}

export const playOrderSound = (action) => {
  
    const fileName = action;
    if (!fileName) return;

    const audio = new Audio(`/sounds/${fileName}`);
    
    audio.volume = 0.6; // optional: set volume
    audio.play().catch((err) => {
      console.warn('Sound playback failed:', err);
    });
  };

  // utils/textToSpeech.js

export const speakText = (text, options = {}) => {
  if (!window.speechSynthesis) {
    console.warn('SpeechSynthesis not supported in this browser.');
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);

  // Optional settings
  utterance.lang = options.lang || 'en-US';
  utterance.pitch = options.pitch ?? 1;
  utterance.rate = options.rate ?? 1;
  utterance.volume = options.volume ?? 1;
  utterance.voice = options.voice || null; // you can set a voice object if needed

  window.speechSynthesis.cancel(); // cancel ongoing speech
  window.speechSynthesis.speak(utterance);
};


export const listenForSpeechCommand = ({ onResult, onError, lang = 'en-US' }) => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      onError?.('Speech recognition not supported in this browser.');
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult?.(transcript);
    };

    recognition.onerror = (event) => {
      onError?.(event.error);
    };

    recognition.start();
  };

  export const generateWhatsAppLink = (phone, message) => {
  if (!phone || !message) return null;

  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${phone}?text=${encodedMessage}`;
};

