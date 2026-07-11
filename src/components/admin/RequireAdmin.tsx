import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { adminAuthService } from '@/services/adminAuthService';

/**
 * Route guard for the private /portal area. If there's no admin session, any
 * direct visit is bounced to the portal login — so even someone who discovers
 * the URL hits a locked door.
 */
export default function RequireAdmin({ children }: { children: ReactNode }) {
  if (!adminAuthService.getCurrentAdmin()) {
    return <Navigate to="/portal/login" replace />;
  }
  return <>{children}</>;
}
