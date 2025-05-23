import React, { useState } from 'react';
import './styles/HelpManager.css';

const helpTopicsEnglish = [
  {
    category: 'Getting Started',
    icon: 'fa-rocket',
    articles: [
      { title: 'How to Register Your Business', content: 'Step 1: Go to Register Page. Step 2: Fill in your business details. Step 3: Click Submit.' },
      { title: 'Uploading Your Menu', content: 'Go to Menu Tab > Click Add Item > Fill in details and Save.' },
      { title: 'Set Your Logo and Wallpaper', content: 'Go to Business Tab > Upload images for logo and wallpaper.' },
    ],
  },
  {
    category: 'Managing Orders',
    icon: 'fa-receipt',
    articles: [
      { title: 'Order Status Explained', content: 'Preparing, Ready, Delivered, Cancelled. Update in the Orders tab.' },
      { title: 'Printing a Menu or Poster', content: 'In Menu Tab, click Print and choose an option.' },
    ],
  },
  {
    category: 'Stats & Dashboard',
    icon: 'fa-chart-line',
    articles: [
      { title: 'Reading Your Dashboard', content: 'View total orders, top items, revenue over time.' },
      { title: 'Top Customers and Insights', content: 'Available under the Stats tab.' },
    ],
  },
  {
    category: 'Support',
    icon: 'fa-life-ring',
    articles: [
      { title: 'Contact Us', content: 'WhatsApp us directly from the Help tab, or email support@bitepilot.app' },
    ],
  },
];

const helpTopicsXhosa = [
  {
    category: 'Ukuqala',
    icon: 'fa-rocket',
    articles: [
      {
        title: 'Ungayibhalisela Njani Ibhizinisi Lakho',
        content: 'Inyathelo 1: Yiya kwiphepha lokubhalisa. Inyathelo 2: Faka iinkcukacha zebhizinisi lakho. Inyathelo 3: Cofa u-Submit.'
      },
      {
        title: 'Ukulayisha iMenu Yakho',
        content: 'Yiya kwiMenu Tab > Cofa ku-Add Item > Faka iinkcukacha uze ucofe u-Save.'
      },
      {
        title: 'Misela iLogo kunye neWallpaper',
        content: 'Yiya kwiBusiness Tab > Layisha imifanekiso ye-logo ne-wallpaper.'
      },
    ],
  },
  {
    category: 'Ulawulo lweMiyalelo',
    icon: 'fa-receipt',
    articles: [
      {
        title: 'Inkcazo yeZimo zeMiyalelo',
        content: 'Ilungiselela, Ilungile, Ihanjisiwe, Irhoxisiwe. Hlaziya kwi-Orders tab.'
      },
      {
        title: 'Shicilela iMenu okanye iPoster',
        content: 'KwiMenu Tab, cofa kuPrint uze ukhethe into ofuna ukuyishicilela.'
      },
    ],
  },
  {
    category: 'IStatisti kunye neDashbhodi',
    icon: 'fa-chart-line',
    articles: [
      {
        title: 'Funda iDashbhodi Yakho',
        content: 'Jonga inani leemiyalelo, izinto ezithengiswa kakhulu, ingeniso ngexesha.'
      },
      {
        title: 'Abathengi abaPhambili kunye noHlaziyo',
        content: 'Fumaneka ngaphantsi kweStats tab.'
      },
    ],
  },
  {
    category: 'Inkxaso',
    icon: 'fa-life-ring',
    articles: [
      {
        title: 'Qhagamshelana Nathi',
        content: 'WhatsApp-a nathi ngqo kwi-Help tab, okanye uthumele i-imeyile ku support@bitepilot.app'
      },
    ],
  },
];

const HelpManager = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [language, setLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');

  const topics = language === 'en' ? helpTopicsEnglish : helpTopicsXhosa;

  const filteredTopics = topics.map(topic => ({
    ...topic,
    articles: topic.articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(topic => topic.articles.length > 0);

  return (
    <div className="help-page">
      <div className="help-header">
        <h1 className="help-title">Help Center</h1>
        
      </div>

      <input
        className="help-search"
        type="text"
        placeholder="Search help topics..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      <div
          className="language-toggle"
          title="Switch to language"
          onClick={() => setLanguage(prev => (prev === 'en' ? 'xh' : 'en'))}
        >
          🌍 {language === 'en' ? 'IsiXhosa' : 'English'}
        </div>

      <div className="help-categories">
        {filteredTopics.map(({ category, icon, articles }) => (
          <section key={category} className="help-category">
            <h2 className="help-section-title">
              <i className={`fa ${icon}`}></i> {category}
            </h2>
            <ul className="help-article-list">
              {articles.map(({ title, content }) => (
                <li key={title} className="help-article" onClick={() => setSelectedArticle({ title, content })}>
                  <h4>{title}</h4>
                  <p>Click to view help</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {selectedArticle && (
        <div className="help-modal" role="dialog" aria-modal="true">
          <div className="help-modal-content">
            <button
              className="help-modal-close"
              onClick={() => setSelectedArticle(null)}
              aria-label="Close help article"
            >
              <i className="fa fa-times" />
            </button>
            <h2>{selectedArticle.title}</h2>
            <p>{selectedArticle.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpManager;
