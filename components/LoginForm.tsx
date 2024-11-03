// components/LoginForm.js
"use client";

import { useState } from 'react';
import { postRequest } from '../shared/mihan/index';
import { setCookie } from '../shared/helpers/cookie';
import { API_BASE_URL } from "../shared/config";
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
       
      const data = await postRequest(`${API_BASE_URL}/api/token`, { username, password });
      console.log('Login successful', data);
      if (data.accessToken && data.refreshToken) {
        setCookie('accessToken', data.accessToken, { expires: 1 }); 
        setCookie('refreshToken', data.refreshToken, { expires: 7 }); 
      }
    } catch (error:any) {
      console.error('Login failed', error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-gray-700">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
