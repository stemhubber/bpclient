import React, { useState } from "react";
import Tesseract from "tesseract.js";
import "./styles/MenuOCRProductForm.css";

const parseMenuText = (text) => {
  const lines = text.split("\n").filter(Boolean);
  return lines.map((line) => {
    const match = line.match(/(.+?)\.*\s*R?(\d+)/i);
    if (match) {
      return {
        name: match[1].trim(),
        price: parseInt(match[2]),
        isAvailable: true,
        waitingTime: "20 minutes",
        description: "",
        img: "",
      };
    }
    return null;
  }).filter(Boolean);
};

const MenuOCRProductForm = ({ onProductsConfirm }) => {
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setProducts([]);
    }
  };

  const handleExtract = () => {
    if (!image) return;
    setLoading(true);
    Tesseract.recognize(image, "eng", {
      logger: m => console.log(m),
    }).then(({ data: { text } }) => {
      const parsed = parseMenuText(text);
      setProducts(parsed);
      setLoading(false);
    });
  };

  const handleChange = (i, field, value) => {
    const updated = [...products];
    updated[i][field] = value;
    setProducts(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onProductsConfirm(products);
  };

  return (
    <div className="ocr-form-container">
      <h2>📸 Upload Menu Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {image && (
        <img src={image} alt="Preview" className="ocr-preview" />
      )}

      <button
        onClick={handleExtract}
        disabled={!image || loading}
        className="ocr-button"
      >
        {loading ? "Extracting..." : "Extract Menu"}
      </button>

      {products.length > 0 && (
        <form onSubmit={handleSubmit} className="ocr-product-list">
          <h3>📝 Confirm Products</h3>
          {products.map((product, i) => (
            <div key={i} className="ocr-product-item">
              <input
                value={product.name}
                onChange={(e) => handleChange(i, "name", e.target.value)}
                placeholder="Product Name"
              />
              <input
                type="number"
                value={product.price}
                onChange={(e) => handleChange(i, "price", e.target.value)}
                placeholder="Price"
              />
            </div>
          ))}
          <button type="submit" className="ocr-submit-btn">
            ✅ Confirm Products
          </button>
        </form>
      )}
    </div>
  );
};

export default MenuOCRProductForm;
