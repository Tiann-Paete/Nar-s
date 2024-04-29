import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { HiEye, HiEyeOff } from 'react-icons/hi'; 
import { FaLock, FaUser } from 'react-icons/fa'; 

const Home = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const response = await axios.post('http://localhost:8000/signin', { username, password });
      if (response.data.success) {
        router.push('/Pin'); 
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="bg-gradient-to-br from-orange-400 to-stone-900 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md bg-stone-700 rounded-lg shadow-md p-6 dark:bg-gray-400 dark:border dark:border-gray-300">
      <div className="flex items-center justify-center mb-2">
          <img src="/images/purenars.png" alt="Nar's Logo" className="w-auto h-20" />
        </div>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-white dark:text-white mb-10 ml-32">
          Nar's Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8" action="#">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-s-md">
              <FaUser className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </span>
              <input type="text" id="username" name="username" className=" rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 flex-1 min-w-0 p-2.5 
              dark:bg-gray-700 dark:text-white outline-orange-300" placeholder="Username" required />
            </div>
          </div>
          <div className="relative mt-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-l-md dark:bg-gray-600 
              dark:text-gray-400 dark:border-gray-600">
                <FaLock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </span>
              <input type={showPassword ? 'text' : 'password'} id="password" name="password" className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300
               text-gray-900 focus:border-primary-600 flex-1 min-w-0 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-orange-300" placeholder="Password" required />
              <button type="button" className=" mr-2 absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none" onClick={togglePasswordVisibility}>
                {showPassword ? <HiEyeOff className="text-gray-400" /> : <HiEye className="text-gray-400" />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full text-white bg-orange-500 hover:bg-amber-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
        </form>
      </div>
    </section>
  );
};

export default Home;
