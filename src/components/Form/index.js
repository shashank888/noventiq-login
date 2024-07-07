import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@mui/material";
import {
  EmailOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import "./style.css";
import { publicEmailProviders, Languages } from "../../config";
import Toggler from "../UI/toggler";

const isCorporateEmail = (email) => {
  const emailDomain = email.split("@")[1];
  return publicEmailProviders.includes(emailDomain);
};

const LoginForm = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const validateEmail = () => {
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return t("validation.email.required");
    } else if (!emailRegex.test(email)) {
      return t("validation.email.invalidFormat");
    } else {
      if (isCorporateEmail(email)) {
        return t("validation.email.domainRestriction");
      }
    }
    return ""; // No error
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
  };

  // Function to handle Remember Me checkbox change
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailError = validateEmail();
    if (emailError) {
      alert(emailError);
      return;
    }

    if(!password.trim()){
        alert(t("validation.password.required"));
        return; 
    }
    setEmail('')
    setPassword('')
    setShowPassword('')
    setRememberMe(false)
    // Handle login logic here
  };
  useEffect(() => {
    // Check if current language is initialized and supported
    if (!initialized) {
      if (Languages.some((lang) => lang.value === i18n.language)) {
        i18n.changeLanguage(i18n.language);
      } else {
        i18n.changeLanguage("en"); // Default to English
      }
      setInitialized(true);
    }
  }, [initialized, i18n]);

  return (
    <div className="main-login-conatiner">
      <img src="../logo.png" className="logo" />
      <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-container-inner">
            <div className="login-input">
              <div className="form-label">{t("email")}:</div>
              <TextField
                //   label={t("email")}
                type="email"
                value={email}
                onChange={handleEmailChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: false,
                }}
                className="input-text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="login-input">
              <div className="form-label">{t("password")}:</div>
              <div style={{ flex: 1 }}>
                <TextField
                  // label={t("password")}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: false,
                  }}
                  class="input-text"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <div className="forgot-pass">Forgot Password</div>
              </div>
            </div>

            {initialized && (
              <div className="login-input">
                <div className="form-label">{t("language")}:</div>
                <Select
                  value={i18n.language}
                  onChange={handleLanguageChange}
                  fullWidth
                  className="lang-select"
                >
                  {Languages.map((lang) => (
                    <MenuItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            )}

            <div className="remeber-container">
              <Toggler
                isChecked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <div className="remeber-text">Remember Me</div>
            </div>
          </div>
          <div className="submit-button">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "200px", backgroundColor: "#000000" }}
            >
              {t("login")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
