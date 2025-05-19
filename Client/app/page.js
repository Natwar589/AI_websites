
import { redirect } from 'next/navigation';

export default function Home() {
  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('auth-token');

  if (!isAuthenticated) {
    redirect('/auth');
  } else {
    redirect('/dashboard');
  }

  return null;
}
