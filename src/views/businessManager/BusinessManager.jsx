import React, { useMemo, useState } from 'react';
import Sidebar from './Sidebar';
import MenuManager from './MenuManager';
import BusinessProfileManager from './BusinessProfileManager';
import OrderManager from './OrderManager';
import StatsDashboard from '../StatsDashboard';
import './styles/BusinessManager.css'; 
import TeamManager from './TeamManager';
import { useParams } from 'react-router-dom';
import HelpManager from './HelpManager';
import MotivationPage from './MotivationPage';
import StockManager from './StockManager';
import AdminAlertManager from './AdminAlertManager';


const BusinessManager = ({user, store, setStoreDetails, orders, products, stores}) => {
  const [activeTab, setActiveTab] = useState('Stats');

  const { id } = useParams();

  // Safely find the current store based on URL param
  const storeFromUrl = useMemo(() => stores?.find(s => s.id === parseInt(id)), [id, stores]);

  // Determine which store to use (fallback to props.store if URL-based store not found)
  const selectedStore = storeFromUrl || store;

  // Early return if store not found
  if (!selectedStore) return <p className="store-site-error">Store not found.</p>;

  // Assign fallback images
  const wallpaper = selectedStore.wallpaper || "https://placehold.co/1000x300?text=Store+Wallpaper";
  const logo = selectedStore.logo || "https://placehold.co/100x100?text=Logo";

  // Merge store info with fallbacks applied
  const storeInfo = {
    ...selectedStore,
    wallpaper,
    logo,
  };
  
  const userx = sessionStorage.getItem('bitepilot_user');

  const TABS = {
  Alerts: <AdminAlertManager storeId={storeInfo}/>,
  Menu: <MenuManager products={products} storeInfo={storeInfo}/>,
  Profile: <BusinessProfileManager storeInfo={storeInfo}/>,
  Orders: <OrderManager store={storeInfo} products={products}/>,
  Stats: <StatsDashboard  orders={orders} store={storeInfo}/>,
  Promos: <div>Promos coming soon</div>,
  Team: <TeamManager store={storeInfo}/>,
  Stock: <StockManager products={products} orders={orders}/>,
  Settings: <div>Settings and integrations</div>,
  Help: <HelpManager/>,
};

  return (
    <div className="business-manager-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <MotivationPage user={user || userx} store={storeInfo}/>
      <main className="business-main">
        <h1 className="business-main-title">{`${storeInfo?.name} - ${activeTab}`}</h1>
        <div className="business-tab-view">
          {TABS[activeTab]}
        </div>
      </main>
    </div>
  );
};

export default BusinessManager;
