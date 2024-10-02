import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link'; // Import Link for navigation

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Eco Route Planner',
  description: 'Optimize delivery routes for minimal carbon emissions',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white p-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-xl font-bold">
              <Link href="/">AI Eco Route Planner</Link>
            </h1>
            <div>
              <Link href="/auth/login" className="px-4 hover:underline">Login</Link>
              <Link href="/auth/registration" className="px-4 hover:underline">Sign Up</Link>
            </div>
          </nav>
        </header>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-blue-600 text-white p-4 text-center">
          &copy; 2024 AI Eco Route Planner
        </footer>
      </body>
    </html>
  );
}
