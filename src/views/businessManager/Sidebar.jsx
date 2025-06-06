import React from 'react';
import './styles/Sidebar.css'; // 👈 Import CSS

const tabs = [
  { label: 'Alerts', icon: 'fa-bell' },
  { label: 'Menu', icon: 'fa-utensils' },
  { label: 'Profile', icon: 'fa-store' },
  { label: 'Orders', icon: 'fa-receipt' },
  { label: 'Stats', icon: 'fa-chart-line' },
  { label: 'Promos', icon: 'fa-tags' },
  { label: 'Team', icon: 'fa-users-cog' },
  { label: 'Stock', icon: 'fa-archive' },
  { label: 'Settings', icon: 'fa-cog' },
  { label: 'Help', icon: 'fa-question-circle' },
];

const Sidebar = ({ activeTab, setActiveTab }) => (
  <aside className="sidebar">
    <h2 className="sidebar-title">Manager options</h2>
    <nav className="sidebar-nav">
      {tabs.map(tab => (
        <button
          key={tab.label}
          onClick={() => setActiveTab(tab.label)}
          className={`sidebar-btn ${activeTab === tab.label ? 'active' : ''}`}
        >
          <i className={`fa ${tab.icon}`} /> {tab.label}
        </button>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
