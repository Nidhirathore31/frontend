'use client';

import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const publicRoutes = ['/', '/login', '/register'];

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();
  const isRehydrated = useSelector((state) => state._persist?.rehydrated);

  useEffect(() => {
    if (!isRehydrated) return; // Wait for rehydration
    const isPublic = publicRoutes.includes(pathname);
    if (!token && !isPublic) {
      toast.error('You must be logged in to access this page');
      router.push('/login');
    }
  }, [token, pathname, router, isRehydrated]);

  // Wait for rehydration before rendering children
  if (!isRehydrated) return null;

  return children;
};

export default ProtectedRoute;
