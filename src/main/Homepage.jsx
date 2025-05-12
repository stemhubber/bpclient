import React, { useState, useEffect } from "react";
import OrderService from "../services/OrderService";
import AdminView from "../views/AdminView";
import CustomerOrdersView from "../views/CustomerOrdersView";
import "./styles/HomePage.css";
import { Routes, Route} from "react-router-dom";
import ProductController from "../services/ProductsController";
import ReceiptView from "../views/ReceiptView";
import StatsDashboard from "../views/StatsDashboard";
import AuthPage from "../auth/AuthPages";
import UserDetailsPage from "./UserDetailsPage";
import CheckoutPage from "../views/CheckoutPage";
import AboutPage from "./AboutPage";
import { StoreList } from '../views/StoreList';
import StoreSite from '../views/StoreSite';
import StoreRegistrationForm from '../views/StoreRegistrationForm';
import { StoreController } from "../services/StoreController";
import WelcomePage from "./WelcomePage";
import StoreOrderingUI from "../views/StoreOrderingUI";

function HomePage() {
  const productController = new ProductController();
  const [products] = useState(productController.getAll());
  const [productsExtra] = useState(productController.getExtraPackages());
  const [orders, setOrders] = useState([]);
  const [receiptOrders, setReceiptOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [success_order, setSuccessOrder] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [cartMessage, setCartMessage] = useState('');
  const [stores, setStores] = useState([]);
  const [storeDetails, setStoreDetails] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError("");
  
    // Start listening to orders in real-time
    const unsubscribe = OrderService.listenToOrders((liveOrders) => {
      console.log(liveOrders);
      if (liveOrders) setOrders(liveOrders);
      setLoading(false); // stop spinner once first live data is in
    });
  
    // Cleanup when leaving page
    return () => {
      unsubscribe();
    };
  }, []);
  
  useEffect(() => {
    const existingUser = sessionStorage.getItem('bitepilot_user');
  
    if (existingUser) {
      setUser(JSON.parse(existingUser));
    }
  }, []);

    useEffect(() => {
      const fetchStores = () => {
        const allStores = StoreController.getAllStores();
        setStores(allStores);
      };
  
      fetchStores();
    }, []);
  
  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
    setCartMessage("Added "+product.name);
    setShowCart(true);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(p => p.id !== productId));
    setCartMessage("Remove one item!");
    if (cart.length === 1) setShowCart(false);
  };

  const handleConfirmAndPay = async (payload) => {
    if (cart.length === 0) return;

    setLoading(true);
    setError("");

    try {
      const created_orders = await OrderService.createOrders(cart,payload);
      setReceiptOrders(created_orders);
      setCart([]);
      setShowCart(false);
      setSuccessOrder(true);
    } catch (err) {
      console.error(err);
      setSuccessOrder(false);
      setError("Failed to confirm and pay. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMore = () => {
    setShowCart(false);
    setCartMessage('');
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setLoading(true);
    setError("");

    try {
      const orderToUpdate = orders.find((orderx) => orderId === orderx.id);
      await OrderService.updateOrderStatus(orderToUpdate.firestoreId || orderId, newStatus);
    } catch (err) {
      console.error(err);
      setError("Failed to update status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (cart) => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((sum, item) => sum + (item?.price || 0), 0);
  };

  const handleStoreRegister = (newStore) => {
    const newId = stores.length + 1;
    setStores([...stores, { id: newId, ...newStore }]);
    console.log("Store Registered:", newStore);
  };
  

  return (
    <div>
    <div className="home-page">
      
      {user && <UserDetailsPage userData={user}/>}

      {/* <AdminView orders={orders} onStatusChange={handleStatusChange} />
      <CustomerOrdersView orders={orders} /> */}
    </div>


      <Routes>
            <Route path="/" element={<WelcomePage/>} />
            <Route path="/menu/:id" element={<StoreOrderingUI 
            loading={loading}
            error={error}
            success_order={success_order}
            setSuccessOrder={setSuccessOrder}
            receiptOrders={receiptOrders}
            user={user}
            setUser={setUser}
            products={products}
            productsExtra={productsExtra}
            cart={cart}
            showCart={showCart}
            setShowCart={setShowCart}
            cartMessage={cartMessage}
            handleRemoveFromCart={handleRemoveFromCart}
            calculateTotal={calculateTotal}
            handleAddMore={handleAddMore}
            handleAddToCart={handleAddToCart}
            stores={stores}
            onChangeStoreDetails={setStoreDetails}
            />} />
            <Route path="/list" element={<StoreList stores={stores} />} />
            <Route path="/orders" element={<CustomerOrdersView orders={orders} />} />
            <Route path="/admin" element={<AdminView orders={orders} onStatusChange={handleStatusChange} />} />
            <Route path="/print" element={<ReceiptView orders={receiptOrders} user={user} setSuccessOrder={setSuccessOrder} store={storeDetails}/>} />
            <Route path="/stats" element={<StatsDashboard orders={orders}/>} />
            <Route path="/login" element={<AuthPage user={user} onUserLoggedIn={setUser}/>} />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/checkout" element={<CheckoutPage order={cart} handleConfirmAndPay={handleConfirmAndPay} user={user} setUser={setUser} calculateTotal={calculateTotal} totalOrders={orders?.length||1}/>} />
            <Route path="/store/:id" element={<StoreSite stores={stores}/>} />
            <Route path="/register-store" element={<StoreRegistrationForm onRegister={handleStoreRegister} />} />
        </Routes>
    </div>
  );
}

export default HomePage;
