import React from 'react';
import { AdminPanel } from '@/components/AdminPanel';
import { useAuth } from '@/hooks/useAuth';
import { ResponsiveLayout } from '@/components/ResponsiveLayout';

export default function AdminPage() {
  const { user } = useAuth();

  return (
    <ResponsiveLayout>
      <div className="container mx-auto px-4 py-8">
        <AdminPanel user={user} />
      </div>
    </ResponsiveLayout>
  );
}