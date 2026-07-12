import type { FooterColumn, FooterLinkItem } from '@/types';

/** The footer's fixed columns, in display order. */
export const footerColumns: FooterColumn[] = ['Explore', 'Society', 'Support'];

/**
 * Which links appear in the public footer, grouped by column. Managed live from
 * the admin "Footer" module — toggle links on/off, reorder them, or add new ones
 * to any column.
 */
export const footerLinks: FooterLinkItem[] = [
  // Explore
  { id: 'fl-papers', label: 'Past Papers', to: '/past-papers', column: 'Explore', enabled: true },
  { id: 'fl-courses', label: 'Courses', to: '/courses', column: 'Explore', enabled: true },
  { id: 'fl-datesheets', label: 'Date Sheets', to: '/date-sheets', column: 'Explore', enabled: true },
  { id: 'fl-events', label: 'Events', to: '/events', column: 'Explore', enabled: true },
  { id: 'fl-projects', label: 'Projects Expo', to: '/projects-expo', column: 'Explore', enabled: true },
  { id: 'fl-forms', label: 'Forms', to: '/forms', column: 'Explore', enabled: true },
  // Society
  { id: 'fl-about', label: 'About Us', to: '/about', column: 'Society', enabled: true },
  { id: 'fl-hierarchy', label: 'Hierarchy', to: '/about/hierarchy', column: 'Society', enabled: true },
  { id: 'fl-timeline', label: 'Timeline', to: '/about/timeline', column: 'Society', enabled: true },
  { id: 'fl-gallery', label: 'Gallery', to: '/gallery', column: 'Society', enabled: true },
  { id: 'fl-developers', label: 'Developers', to: '/developers', column: 'Society', enabled: true },
  // Support
  { id: 'fl-contribute', label: 'Contribute', to: '/contribute', column: 'Support', enabled: true },
  { id: 'fl-faq', label: 'FAQ & Contact', to: '/faq-contact', column: 'Support', enabled: true },
  { id: 'fl-quicklinks', label: 'Quick Links', to: '/quick-links', column: 'Support', enabled: true },
  { id: 'fl-privacy', label: 'Privacy & Disclaimer', to: '/privacy-disclaimer', column: 'Support', enabled: true },
];
