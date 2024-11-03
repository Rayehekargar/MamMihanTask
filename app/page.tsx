import Image from "next/image";
import Link from 'next/link';
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <p className="mt-4 text-gray-700 text-center mb-4">
      This is the main landing page of the application.
    </p>
    <Link href="/login">
      <span className="mt-6 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        Go to Login
      </span>
    </Link>
  </div>
  );
}
