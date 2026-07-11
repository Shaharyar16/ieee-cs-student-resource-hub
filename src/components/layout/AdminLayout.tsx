import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-[#f4f2ec]">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="flex flex-1 flex-col"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}
