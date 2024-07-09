'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Task from './components/Task';


export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Home</h1>
      {session ? (
        <div>
          <div className="mb-4">
            <p className='text-xl mb-2 '>Name, {session.user?.name}</p>
            <p className='text-xl mb-2 '>Email, {session.user?.email}</p>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Sign Out
            </button>
            <Link href="/auth/signup">
              <button className="ml-4 text-blue-500 hover:underline">Sign Up</button>
            </Link>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Tasks</h2>
            <Task />
          </div>
        </div>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
}
