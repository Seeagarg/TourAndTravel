import React, { useState } from 'react';
import styles from './Admin.module.css';

const ManageReviews = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [reviews, setReviews] = useState([
    { id: 1, user: 'Rahul Sharma', tour: 'Kashmir Paradise', rating: 5, status: 'Approved', text: 'Amazing experience!' },
    { id: 2, user: 'Anjali Gupta', tour: 'Goa Coastal', rating: 4, status: 'Pending', text: 'Loved the beaches but the hotel was okay.' },
    { id: 3, user: 'Amit Patel', tour: 'Delhi Heritage', rating: 5, status: 'Approved', text: 'Very informative tour guide.' },
  ]);

  const [formData, setFormData] = useState({
    user: '', tour: '', rating: 5, status: 'Approved', text: ''
  });

  const handleEdit = (review) => {
    setEditingReview(review);
    setFormData(review);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this review?')) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  const handleApprove = (id) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
  };

  const resetForm = () => {
    setFormData({ user: '', tour: '', rating: 5, status: 'Approved', text: '' });
    setEditingReview(null);
    setShowModal(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingReview) {
      setReviews(reviews.map(r => r.id === editingReview.id ? formData : r));
    } else {
      setReviews([...reviews, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>Customer Reviews</h1>
          <p>Moderate and manage feedback from travelers.</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => { resetForm(); setShowModal(true); }}>+ Add Review</button>
      </div>

      <div className={styles.card}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Tour Package</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(review => (
                <tr key={review.id}>
                  <td>{review.user}</td>
                  <td>{review.tour}</td>
                  <td>⭐ {review.rating}</td>
                  <td>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '6px', 
                      fontSize: '0.75rem',
                      background: review.status === 'Approved' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                      color: review.status === 'Approved' ? '#22c55e' : '#eab308'
                    }}>
                      {review.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {review.status === 'Pending' && (
                        <button className={`${styles.btnOutline} ${styles.btnSuccess}`} onClick={() => handleApprove(review.id)}>Approve</button>
                      )}
                      <button className={styles.btnOutline} onClick={() => handleEdit(review)}>Edit</button>
                      <button className={`${styles.btnOutline} ${styles.btnDanger}`} onClick={() => handleDelete(review.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{editingReview ? 'Edit Review' : 'Add New Review'}</h2>
              <button className={styles.closeBtn} onClick={resetForm}>&times;</button>
            </div>
            <form onSubmit={handleSave} className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>User Name</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  required
                  value={formData.user}
                  onChange={e => setFormData({...formData, user: e.target.value})}
                  placeholder="e.g. John Doe" 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Tour Package</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  required
                  value={formData.tour}
                  onChange={e => setFormData({...formData, tour: e.target.value})}
                  placeholder="e.g. Goa Trip" 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Rating (1-5)</label>
                <input 
                  type="number" 
                  min="1" max="5"
                  className={styles.input} 
                  value={formData.rating}
                  onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Status</label>
                <select 
                  className={styles.select}
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>Review Images (List of URLs)</label>
                {formData.images?.map((img, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input 
                      className={styles.input} 
                      value={img}
                      onChange={e => {
                        const newImages = [...formData.images];
                        newImages[i] = e.target.value;
                        setFormData({...formData, images: newImages});
                      }}
                      placeholder="https://..."
                    />
                    <button type="button" className={styles.btnOutline} style={{color: '#ef4444'}} onClick={() => {
                      setFormData({...formData, images: formData.images.filter((_, idx) => idx !== i)});
                    }}>Remove</button>
                  </div>
                ))}
                <button type="button" className={styles.btnOutline} onClick={() => setFormData({...formData, images: [...(formData.images || []), '']})}>+ Add Image</button>
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>Review Text</label>
                <textarea 
                  className={styles.textarea} 
                  required
                  value={formData.text}
                  onChange={e => setFormData({...formData, text: e.target.value})}
                  placeholder="What did the customer say?"
                ></textarea>
              </div>
              <div className={styles.fullWidth} style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className={styles.btnPrimary}>Save Review</button>
                <button type="button" className={styles.btnOutline} onClick={resetForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageReviews;
