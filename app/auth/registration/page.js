// app/auth/register/page.js

"use client";
import RegisterForm from '../../components/registration';

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
}
