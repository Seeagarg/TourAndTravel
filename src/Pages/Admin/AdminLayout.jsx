import React, { useEffect } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import styles from './Admin.module.css';
import { getCookie, removeCookie } from '../../utills/cookieManager';
import { Toaster } from 'react-hot-toast';

const AdminLayout = () => {
  const navigate = useNavigate();
  const token = getCookie('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    removeCookie('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  if (!token) return null;

  return (
    <div className={styles.adminContainer}>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        }}
      />
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Tours Admin</div>
        <nav className={styles.nav}>
          <NavLink 
            to="/admin" 
            end
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/admin/tours" 
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
          >
            Manage Tours
          </NavLink>
          <NavLink 
            to="/admin/locations" 
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
          >
            Manage Locations
          </NavLink>
          <NavLink 
            to="/admin/reviews" 
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
          >
            Manage Reviews
          </NavLink>
        </nav>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button 
            onClick={handleLogout} 
            className={styles.navLink}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
          >
            Logout
          </button>
          <Link to="/" className={styles.navLink}>Back to Site</Link>
        </div>
      </aside>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
