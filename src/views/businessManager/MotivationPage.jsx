import React, { useEffect, useState } from 'react';
import './styles/MotivationPage.css';

const quotes = [
  {
    quote: "Being your own boss means your success is your responsibility. Your business. Your hustle. Your time. Your growth.",
    author: "BitePilot Message"
  },
  {
    quote: "Every great business is built on friendship, trust and persistence. Keep showing up. Keep improving.",
    author: "BitePilot Message"
  },
  {
    quote: "It doesn’t have to be perfect. Just keep delivering. One sale, one customer, one day at a time.",
    author: "BitePilot Message"
  },
  {
    quote: "When the orders slow down, don’t panic — improve. The quiet times are where smart growth begins.",
    author: "BitePilot Message"
  },
  {
    quote: "You are the system behind the success. Rest when needed, but never stop believing.",
    author: "BitePilot Message"
  },
  {
    quote: "Running a business isn’t always pretty, but consistency builds what talent alone can’t.",
    author: "BitePilot Message"
  },
  {
    quote: "Customers come and go. But your effort, your name, your brand — that’s legacy.",
    author: "BitePilot Message"
  },
  {
    quote: "Some days you win, some days you learn. That’s how real businesses are built.",
    author: "BitePilot Message"
  },
  {
    quote: "There’s no magic in business — just focus, follow-up, and finishing what you started.",
    author: "BitePilot Message"
    },
    {
    quote: "When it’s quiet, that’s your time to upgrade — your menu, your mindset, your systems.",
    author: "BitePilot Message"
    },
    {
    quote: "You’re not just running a business — you’re building a future that didn’t exist before you.",
    author: "BitePilot Message"
    },
    {
    quote: "You may feel small, but you’re doing what many only talk about. That’s power.",
    author: "BitePilot Message"
    },
    {
    quote: "Don't compete on price. Compete on consistency, care, and customer experience.",
    author: "BitePilot Message"
    },
    {
    quote: "A slow week doesn’t mean failure. It means you’ve got room to improve and prepare.",
    author: "BitePilot Message"
    },
    {
    quote: "Keep the promise even when no one is watching. That’s how real businesses grow.",
    author: "BitePilot Message"
    },
    {
    quote: "Some will doubt your hustle — until they see the results. Let your work answer back.",
    author: "BitePilot Message"
    },
    {
    quote: "Business isn’t built in a day — it’s built daily.",
    author: "BitePilot Message"
    },
    {
    quote: "You’re not late. You’re learning. You’re leveling up.",
    author: "BitePilot Message"
    }

];


const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

const MotivationPage = ({ user, store }) => {
  const [quote, setQuote] = useState(getRandomQuote());
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setQuote(getRandomQuote());
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const handleClose = () => setIsVisible(false);

  const intros = [
    `Welcome back, {name} `,
    `Good to see you again, {name}!`,
    `Back in action, {name}?`,
    ];

  const subs = [
    `Time to move {store} forward — step by step.`,
    `Let’s keep growing {store} with purpose.`,
    `Your consistency is building something powerful at {store}.`,
    `{store} is in good hands. Let’s make today count.`,
    ];

    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];


  if (!isVisible) return null;

  return (
    <div className="motivation-modal-backdrop">
      <div className="motivation-modal">
        <button className="motivation-close" onClick={handleClose}>
          <i className="fa fa-times" />
        </button>
        <h1 className="motivation-title">{getRandom(intros).replace('{name}', user?.name || 'there')}👋</h1>
        <p className="motivation-sub">{getRandom(subs).replace('{store}', store?.name || 'your business')}</p>

        <blockquote className="motivation-quote">
          “{quote.quote}”
          <footer>- {quote.author}</footer>
        </blockquote>
      </div>
    </div>
  );
};

export default MotivationPage;