"use client"

import React, { useState } from 'react';
import './AuthPage.css';
import Header from '../components/Header';
import { Password } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { setAuthState } from '../redux/authSlice';

interface JwtPayload {
  username: string,
  sub: string,
  isAdmin: boolean
}

export default function Login() {

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      const response = await fetch("https://website-backend-e2kt.onrender.com/auth/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: form.name,
          email: form.email,
          password: form.password,
          phoneNumber: form.phoneNumber
        })
      })
    } else {
      const response = await fetch("https://website-backend-e2kt.onrender.com/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: form.name,
          password: form.password
        })
      })

      if(response.ok) {
        const data = await response.json();
        localStorage.setItem('auth_token', data.access_token);

        const decoded = jwtDecode<JwtPayload>(data.access_token!);
        dispatch(setAuthState({token: data.access_token, user: {id: data.sub, username: data.username}}));

        if(decoded.isAdmin) {
          console.log("WELCOME ADMIN!");
          router.push("/admin");
        }

      } else {
        const error = await response.json();
        console.log(error.message);
      }
    }
  };

  return (
    <>
    <Header />
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>{isSignup ? 'Регистрация' : 'Вход'}</h2>

        <input
          type="text"
          name="name"
          placeholder="Потребителско име"
          value={form.name}
          onChange={handleChange}
          required
        />

        {isSignup && (<input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />)}

        <input
          type="password"
          name="password"
          placeholder="Парола"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">{isSignup ? 'Регистрация' : 'Вход'}</button>

        <p className="toggle-link" onClick={() => setIsSignup(!isSignup)}>
          {isSignup
            ? 'Вече имате акаунт? Влезте от тук.'
            : 'Нямате акаунт? Регистрирайте се сега.'}
        </p>
      </form>
    </div>
    </>
  );
};
