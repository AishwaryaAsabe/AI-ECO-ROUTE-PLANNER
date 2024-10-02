// import VehicleForm from './components/VehicleForm';

// export default function Home() {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
//       <VehicleForm />
//     </div>
//   );
// }



// app/page.js
"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page when the app is accessed
    router.push('/auth/login');
  }, [router]);

  return null; // or a loading spinner/message if needed
}
