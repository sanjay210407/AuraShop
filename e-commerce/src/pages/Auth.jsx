import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Mail, Lock, User, Sparkles, ShieldCheck } from "lucide-react";

export default function Auth({ setCurrentTab }) {
  const { login, signup } = useAuth();
  const { showToast } = useToast();

  const [isLoginTab, setIsLoginTab] = useState(true);
  const [loading, setLoading] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!isLoginTab && !formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLoginTab && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isLoginTab) {
        await login(formData.email, formData.password);
        showToast("Welcome back! Logged in successfully.", "success");
      } else {
        await signup(formData.name, formData.email, formData.password);
        showToast("Account created successfully! Welcome to AuraShop.", "success");
      }
      
      // Go to home or shop page after success
      setCurrentTab("products");
    } catch (err) {
      showToast(err.message || "Authentication failed. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleTab = (isLogin) => {
    setIsLoginTab(isLogin);
    setErrors({});
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="auth-page fade-in">
      <div className="auth-form-card">
        {/* Brand Header */}
        <div className="auth-brand-header">
          <Sparkles className="auth-brand-icon" />
          <h2>AURA<span className="sub">SHOP</span></h2>
          <p>Elevate your space and modern lifestyle.</p>
        </div>

        {/* Tab Buttons */}
        <div className="auth-tabs-row">
          <button
            className={`auth-tab-btn ${isLoginTab ? "active" : ""}`}
            onClick={() => toggleTab(true)}
          >
            Sign In
          </button>
          <button
            className={`auth-tab-btn ${!isLoginTab ? "active" : ""}`}
            onClick={() => toggleTab(false)}
          >
            Create Account
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="auth-form-inputs">
          {/* Name Field - Sign Up Only */}
          {!isLoginTab && (
            <div className="auth-input-group">
              <label>Full Name</label>
              <div className="auth-field-wrapper">
                <User size={16} className="auth-field-icon" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={errors.name ? "input-error" : ""}
                />
              </div>
              {errors.name && <span className="auth-error-text">{errors.name}</span>}
            </div>
          )}

          {/* Email Field */}
          <div className="auth-input-group">
            <label>Email Address</label>
            <div className="auth-field-wrapper">
              <Mail size={16} className="auth-field-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className={errors.email ? "input-error" : ""}
              />
            </div>
            {errors.email && <span className="auth-error-text">{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div className="auth-input-group">
            <label>Password</label>
            <div className="auth-field-wrapper">
              <Lock size={16} className="auth-field-icon" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password (min 6 characters)"
                className={errors.password ? "input-error" : ""}
              />
            </div>
            {errors.password && <span className="auth-error-text">{errors.password}</span>}
          </div>

          {/* Confirm Password Field - Sign Up Only */}
          {!isLoginTab && (
            <div className="auth-input-group">
              <label>Confirm Password</label>
              <div className="auth-field-wrapper">
                <Lock size={16} className="auth-field-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Repeat your password"
                  className={errors.confirmPassword ? "input-error" : ""}
                />
              </div>
              {errors.confirmPassword && <span className="auth-error-text">{errors.confirmPassword}</span>}
            </div>
          )}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? (
              <span className="spinner"></span>
            ) : isLoginTab ? (
              "Sign In to Account"
            ) : (
              "Register Aura Account"
            )}
          </button>
        </form>

        {/* Demo credentials tip */}
        {isLoginTab && (
          <div className="demo-credentials-note">
            <ShieldCheck size={14} className="note-icon" />
            <p>Demo: Use any mock email and password (6+ chars) to log in instantly!</p>
          </div>
        )}
      </div>
    </div>
  );
}
