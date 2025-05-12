import React, { useState, useEffect } from "react";
import "./styles/StoreRegistrationForm.css";
import MenuOCRProductForm from "./MenuOCRProductForm";

const initialForm = {
  name: "",
  logo: "",
  wallpaper: "",
  location: "",
  contacts: "",
  lat: "",
  lng: "",
  openingTimes: "",
  description: "",
  owners: [{ name: "", img: "" }]
};

const StoreRegistrationForm = ({ onRegister }) => {
  const [form, setForm] = useState(initialForm);
  const [submittedStore, setSubmittedStore] = useState(null);
  const [storeProducts, setStoreProducts] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setForm(prev => ({ ...prev, lat: latitude, lng: longitude }));
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleOwnerChange = (i, key, value) => {
    const updated = [...form.owners];
    updated[i][key] = value;
    setForm(prev => ({ ...prev, owners: updated }));
  };

  const addOwner = () => {
    setForm(prev => ({ ...prev, owners: [...prev.owners, { name: "", img: "" }] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formatted = {
      ...form,
      coordinates: { lat: parseFloat(form.lat), lng: parseFloat(form.lng) }
    };
    onRegister(formatted);
    setSubmittedStore(formatted); // Store submitted data
    setForm(initialForm);         // Reset form
  };

  const handleProductsConfirm = (products) => {
    console.log("Final product list:", products);
    setStoreProducts(products);
    // You can save to Firebase or state here
  };

  return (
    <div className="store-register-container">
      {!submittedStore ? (
        <>
          <h2>Register Your Store</h2>
          <form className="store-form" onSubmit={handleSubmit}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Store Name" required />
            <input name="logo" value={form.logo} onChange={handleChange} placeholder="Logo URL" />
            <input name="wallpaper" value={form.wallpaper} onChange={handleChange} placeholder="Wallpaper URL" />
            <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
            <input name="contacts" value={form.contacts} onChange={handleChange} placeholder="Phone / Email" />
            <input name="openingTimes" value={form.openingTimes} onChange={handleChange} placeholder="Opening Times" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />

            <div className="map-preview">
              <label>Confirm Your Coordinates:</label>
              <input name="lat" value={form.lat} onChange={handleChange} placeholder="Latitude" required />
              <input name="lng" value={form.lng} onChange={handleChange} placeholder="Longitude" required />
              {form.lat && form.lng && (
                <iframe
                  title="store-map"
                  width="100%"
                  height="220"
                  frameBorder="0"
                  style={{ border: 0, marginTop: "0.5rem", borderRadius: "8px" }}
                  src={`https://maps.google.com/maps?q=${form.lat},${form.lng}&z=15&output=embed`}
                  allowFullScreen
                ></iframe>
              )}
            </div>

            <div className="owners-section">
              <h4>Owners</h4>
              {form.owners.map((owner, i) => (
                <div key={i} className="owner-fields">
                  <input
                    value={owner.name}
                    onChange={(e) => handleOwnerChange(i, "name", e.target.value)}
                    placeholder="Owner Name"
                  />
                  <input
                    value={owner.img}
                    onChange={(e) => handleOwnerChange(i, "img", e.target.value)}
                    placeholder="Owner Image URL"
                  />
                </div>
              ))}
              <button type="button" onClick={addOwner} className="add-owner-btn">+ Add Owner</button>
            </div>

            <MenuOCRProductForm onProductsConfirm={handleProductsConfirm} />

            {storeProducts && <textarea value={storeProducts} readOnly></textarea>}

            <button type="submit" className="register-store-btn">Register Store</button>
          </form>
        </>
      ) : (
        <div className="store-confirmation">
          <h2>🎉 Store Registered Successfully!</h2>
          <p>
            Your store <strong>{submittedStore.name}</strong> is now live at:
          </p>
          <div className="store-url-preview">
            <a
              href={`https://bitepilot.app/stores/${submittedStore.name.toLowerCase().replace(/\s+/g, "-")}`}
              target="_blank"
              rel="noreferrer"
            >
              https://bitepilot.app/stores/{submittedStore.name.toLowerCase().replace(/\s+/g, "-")}
            </a>
          </div>
          <p className="next-steps">You can now manage your menu, view orders, and update your store profile anytime.</p>
        </div>
      )}
    </div>
  );
};

export default StoreRegistrationForm;