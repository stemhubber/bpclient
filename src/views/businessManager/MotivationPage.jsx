import React, { useEffect, useState } from "react";
import "./styles/MotivationPage.css";

const quotes = [
  {
    quote:
      "Your business is your responsibility — your growth is your legacy. Own the outcome, refine the process.",
    author: "BitePilot",
  },
  {
    quote:
      "Success in business is not accidental — it's intentional. Built through discipline, resilience, and daily effort.",
    author: "BitePilot",
  },
  {
    quote:
      "Trust, consistency, and value — these are the cornerstones of every enduring business.",
    author: "BitePilot",
  },
  {
    quote:
      "Progress doesn’t require perfection — just commitment. Keep delivering, one customer at a time.",
    author: "BitePilot",
  },
  {
    quote:
      "Quiet seasons aren’t setbacks — they’re invitations to sharpen your strategy and strengthen your systems.",
    author: "BitePilot",
  },
  {
    quote:
      "Behind every successful business is someone who chose not to quit — even when no one was watching.",
    author: "BitePilot",
  },
  {
    quote:
      "Consistency outperforms talent when talent stops showing up. Stay the course.",
    author: "BitePilot",
  },
  {
    quote:
      "Customers may come and go — but your name, your reputation, and your standards endure.",
    author: "BitePilot",
  },
  {
    quote:
      "Some days build revenue. Others build resilience. Both are essential to the journey.",
    author: "BitePilot",
  },
  {
    quote:
      "Business isn't built on motivation — it's built on follow-through. Start. Continue. Complete.",
    author: "BitePilot",
  },
  {
    quote:
      "Use the quiet to evolve — improve your offer, elevate your thinking, and optimize your flow.",
    author: "BitePilot",
  },
  {
    quote:
      "You’re not just earning — you’re shaping a future that didn’t exist before you decided to begin.",
    author: "BitePilot",
  },
  {
    quote:
      "It may feel small today, but your courage to start sets you apart from the crowd.",
    author: "BitePilot",
  },
  {
    quote:
      "The best businesses don’t compete on price — they compete on trust, delivery, and experience.",
    author: "BitePilot",
  },
  {
    quote:
      "A slow week isn’t failure. It’s a signal. Reflect. Refine. Reset. Then go again.",
    author: "BitePilot",
  },
  {
    quote:
      "Integrity is doing what you said you’d do — especially when it’s inconvenient. That’s how businesses mature.",
    author: "BitePilot",
  },
  {
    quote:
      "Let your results speak. Work in silence. Deliver in excellence.",
    author: "BitePilot",
  },
  {
    quote:
      "Sustainable businesses aren’t built in a moment — they’re built daily, with care and consistency.",
    author: "BitePilot",
  },
  {
    quote:
      "You’re not behind — you’re becoming. Keep learning. Keep showing up. You’re right on time.",
    author: "BitePilot",
  },
  {
    quote:
      "Build like it matters — because it does. Someone’s waiting for what only you can create.",
    author: "BitePilot",
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

  const intros = [`Hey {name}! `, `Hi {name}!`, `Oh hey {name}!`];



  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  if (!isVisible) return null;

  return (
    <div className="motivation-modal-backdrop">
      <div className="motivation-modal">
        <button className="motivation-close" onClick={handleClose}>
          <i className="fa fa-times" />
        </button>
        <h1 className="motivation-title">
          {getRandom(intros).replace("{name}", user?.name || "there")}{"\n"}
          Word of the day?
          
        </h1>
        <hr></hr>

        <blockquote className="motivation-quote">
          “{quote.quote}”<footer>- {quote.author}</footer>
        </blockquote>
      </div>
    </div>
  );
};

export default MotivationPage;
