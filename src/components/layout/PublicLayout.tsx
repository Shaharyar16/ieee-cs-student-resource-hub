import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/navigation/AnnouncementBar';

export default function PublicLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Header />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex-1"
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
}
