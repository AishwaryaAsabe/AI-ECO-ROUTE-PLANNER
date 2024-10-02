// app/components/Login.js

"use client"; // Ensure this component is a client component
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter(); // Use useRouter here

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace this with your login logic
    try {
      // Simulate an API call
      if (email === 'test@test.com' && password === 'password') {
        // On successful login, redirect to the dashboard or another page
        router.push('/dashboard'); // Change to your desired route
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setError(error.message); // Set the error message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow-md bg-white">
      <h3 className="text-lg font-semibold mb-2">Login</h3>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded mb-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Login</button>
    </form>
  );
}
