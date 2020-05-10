import React, { useContext } from "react";
import { useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const AuthPage = () => {
  const { login } = useContext(AuthContext);
  const message = useMessage();
  const { request, loading, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      message(error);
      clearError();
    }
  }, [error, message, clearError]);

  const changedHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const signInHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      login(data);
    } catch (e) {}
  };

  const signUpHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className="row">
      <div className="col sm offset-s3">
        <h2>Спрощення посилання</h2>

        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизація</span>
            <div>
              <div className="input-field ">
                <input
                  placeholder="Введіть е-mail"
                  type="email"
                  name="email"
                  id="email"
                  className="app-input app-input--auth"
                  value={form.email}
                  onChange={changedHandler}
                />
                <label htmlFor="email">E-mail</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Введіть пароль"
                  type="password"
                  name="password"
                  id="password"
                  className="app-input app-input--auth"
                  value={form.password}
                  onChange={changedHandler}
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 8 }}
              onClick={() => signInHandler()}
              disabled={loading}
            >
              Увійти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={() => signUpHandler()}
              disabled={loading}
            >
              Зареєструватись
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
