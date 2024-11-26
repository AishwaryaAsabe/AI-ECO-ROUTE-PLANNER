// "use client";
// import './globals.css';
// import { Inter } from 'next/font/google';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// const inter = Inter({ subsets: ['latin'] });

// // export const metadata = {
// //   title: 'AI Eco Route Planner',
// //   description: 'Optimize delivery routes for minimal carbon emissions',
// // };

// export default function RootLayout({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const router = useRouter();

//   // Check if the user is logged in by verifying the token in localStorage
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   // Logout function to clear the token and update the state
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     localStorage.removeItem('userId');
//     setIsLoggedIn(false);
//     router.push('/'); // Redirect to home or login page after logout
//   };

//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <header className="bg-blue-600 text-white p-4">
//           <nav className="flex justify-between items-center">
//             <h1 className="text-xl font-bold">
//               <Link href="/">AI Eco Route Planner</Link>
//             </h1>
//             <div className="flex space-x-16">
//               {isLoggedIn ? (
//                 <button onClick={handleLogout} className="hover:backdrop:after text-white">
//                   Logout
//                 </button>
//               ) : (
//                 <>
//                   <Link href="/pages/home" className="hover:backdrop:after">Home</Link>
//                   <Link href="/pages/about" className="hover:backdrop:after">About</Link>
//                   <Link href="/pages/contact" className="hover:backdrop:after">Contact</Link>
//                   <Link href="/auth/login" className="hover:backdrop:after">Login</Link>
//                   <Link href="/auth/registration" className="hover:backdrop:after">Sign Up</Link>
//                 </>
//               )}
//             </div>
//           </nav>
//         </header>

//         <main className="container mx-auto p-4">{children}</main>

//         {/* Footer */}
//         <footer className="bg-gray-900 text-white py-8">
//           <div className="container mx-auto text-center">
//             <p>&copy; 2024 AI EcoRoute Planner. All rights reserved.</p>
//             <div className="mt-4">
//               <Link href="/about" className="text-gray-400 hover:text-white px-4">About</Link>
//               <Link href="/privacy-policy" className="text-gray-400 hover:text-white px-4">Privacy Policy</Link>
//               <Link href="/terms" className="text-gray-400 hover:text-white px-4">Terms & Conditions</Link>
//             </div>
//           </div>
//         </footer>
//       </body>
//     </html>
//   );
// }


"use client"; // Make sure this is at the top if using Client Component
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css'

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if the user is logged in by verifying the token in localStorage
  useEffect(() => {
    // This effect will run whenever the component mounts or when the token changes
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set state based on the token presence
  }, []);
  
  // You might want to check the token here too when logging in
  const handleLogin = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  };
  
  // Logout function to clear the token and update the state
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    router.push('/'); // Redirect to home or login page after logout
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white p-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-xl font-bold">
              <Link href="/">AI Eco Route Planner</Link>
            </h1>
            <div className="flex space-x-16">
              {isLoggedIn ? (
                <button onClick={handleLogout} className="hover:backdrop:after text-white">
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/pages/home" className="hover:backdrop:after">Home</Link>
                  <Link href="/pages/about" className="hover:backdrop:after">About</Link>
                  <Link href="/pages/contact" className="hover:backdrop:after">Contact</Link>
                  <Link href="/auth/login" className="hover:backdrop:after">Login</Link>
                  <Link href="/auth/registration" className="hover:backdrop:after">Sign Up</Link>
                </>
              )}
            </div>
          </nav>
        </header>

        <main className="container mx-auto p-4">
          {React.isValidElement(children) 
            ? React.cloneElement(children, { onLogin: handleLogin }) 
            : children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 AI EcoRoute Planner. All rights reserved.</p>
            <div className="mt-4">
              <Link href="/about" className="text-gray-400 hover:text-white px-4">About</Link>
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white px-4">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white px-4">Terms & Conditions</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
