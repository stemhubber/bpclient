import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import "./styles/AdminAuthWrapper.css";
import { StoreController } from "../services/StoreController";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import UserController from "../services/UserController";
import { formatAndValidateCellNumber } from "../utils/utils";

export default function AdminAuthWrapper({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [storeCode, setStoreCode] = useState("");
  const [store, setStore] = useState(null);
  const [modalText, setModalText] = useState({ text: "", status: null });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("enter"); // 'enter' | 'verify'
  const [otpCode, setOtpCode] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const s = StoreController.getStoreById(id);
    if (s) {
      setStore(s);
      setStoreCode(s.code);
      if (!s.code) setAuthorized(true)
    } else {
      setModalText({ text: "Store not found!", status: "error" });
    }
  }, [id]);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin-auth");
    if (saved === storeCode) {
      setModalText({ text: "Auth auto completed!", status: "success" });
      setAuthorized(true);
    }
  }, [storeCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encrypted = CryptoJS.MD5(inputCode).toString();
    if (encrypted === storeCode) {
      setModalText({ text: "Auth successful!", status: "success" });
      setAuthorized(true);
      sessionStorage.setItem("admin-auth", encrypted);
    } else {
      setModalText({ text: "Incorrect access code.", status: "error" });
    }
  };

  const dismissModal = () => {
    setModalText({ text: "", status: null });
  };

  const sendOTP = async () => {
    setModalText({ text: "", status: null });
    setLoading(true);

    try {
      const validator = formatAndValidateCellNumber(store.contacts);
      if (!validator.valid) {
        setModalText({ text: "❌ " + validator.error, status: "error" });
        return;
      }

      await UserController.sendOTP(validator.phone);
      setStep("verify");
      setModalText({ text: "📩 OTP sent to " + validator.phone, status: "success" });
    } catch (err) {
      setModalText({ text: "❌ " + err.message, status: "error" });
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const validator = formatAndValidateCellNumber(store.contacts);
      const response = await UserController.confirmOTP(validator.phone, otpCode);
      if (response.verified) {
        sessionStorage.setItem("admin-auth", storeCode);
        setAuthorized(true);
        setModalText({ text: "✅ Access granted via OTP", status: "success" });
      } else {
        setModalText({ text: "Invalid OTP", status: "error" });
      }
    } catch (err) {
      setModalText({ text: "❌ " + err.message, status: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (!authorized) {
    return (
      <div className="admin-auth-wrapper restricted-theme">
  <motion.div
    className="admin-auth-card restricted"
    initial={{ y: 40, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <div className="admin-auth-header">
      <h3 className="admin-auth-store">{store?.name}</h3>
    </div>

    <h2 className="admin-auth-title">🚫 Restricted Access</h2>
    <p className="admin-auth-desc">
      This area is reserved for verified business owners only.
    </p>

    {step === "enter" && (
      <form onSubmit={handleSubmit} className="admin-auth-form">
        <input
          autoFocus
          type="password"
          className="admin-auth-input"
          placeholder="Enter Access Code"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button type="submit" className="admin-auth-button">
          Unlock Access
        </button>
        <button
          type="button"
          className="admin-auth-forgot"
          disabled={loading}
          onClick={async () => {
            const confirm = window.confirm(
              "Send OTP code to your business number? " + store?.contacts
            );
            if (confirm) {
              await sendOTP();
            }
          }}
        >
          {loading ? "Sending..." : "Forgot access code?"}
        </button>
      </form>
    )}

    {step === "verify" && (
      <form onSubmit={verifyOTP} className="admin-auth-form">
        <input
          type="text"
          className="admin-auth-input"
          placeholder="🔐 Enter OTP sent to your number"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
        />
        <button type="submit" className="admin-auth-button">
          Verify OTP
        </button>
        <button
          type="button"
          className="admin-auth-forgot"
          disabled={loading}
          onClick={() => setStep("enter")}
        >
          Back to Access Code
        </button>
      </form>
    )}
  </motion.div>

  <AnimatePresence>
    {modalText.status && (
      <motion.div
        className={`admin-auth-modal ${modalText.status}`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={dismissModal}
      >
        <span
          className={`fa fa-${modalText.status === "success" ? "check" : "times"}`}
        />
        <h3>{modalText.text}</h3>
      </motion.div>
    )}
  </AnimatePresence>
</div>
    );
  }

  return <>{children}</>;
}
