import React from 'react';
import styles from './Admin.module.css';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Tours', value: '24' },
    { title: 'Active Locations', value: '11' },
    { title: 'Pending Reviews', value: '15' },
    { title: 'Total Bookings', value: '128' },
  ];

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>Dashboard Overview</h1>
          <p>Welcome back, Admin!</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.btnPrimary}>Generate Report</button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <div key={idx} className={styles.statCard}>
            <div className={styles.statTitle}>{stat.title}</div>
            <div className={styles.statValue}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className={styles.card}>
        <h2>Recent Activity</h2>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tour</th>
                <th>Status</th>
                <th>Date</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map(i => (
                <tr key={i}>
                  <td>Himachal Snow Tour {i}</td>
                  <td><span style={{ color: '#22c55e' }}>Active</span></td>
                  <td>Oct 12, 2023</td>
                  <td>₹12,499</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
