"use client";

import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useAuth } from '../../context/AuthContext';
import { TransactionsService } from '../../services/transaction.service';
import { format } from 'date-fns';

const BookingHistory = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [bookings, setBookings] = useState([]);
  const [componentLoading, setComponentLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const transactionService = new TransactionsService();

  useEffect(() => {   
    if (!authLoading) { 
      if (user && user.uid) {
        fetchBookings("lHgPSvkk2SdCckY8xjKuvHwcaiY2");
      } else {
        setComponentLoading(false);
      } 
    }
  }, [user, authLoading]);

  const fetchBookings = async (uid) => {
    setComponentLoading(true);
    try {
      const myBookings = await transactionService.getMyBookings(uid);
      const formattedBookings = myBookings.map(booking => ({
        id: booking.bookingId,      
        title: booking.activity?.name || 'N/A',
        location: booking.activity?.location || 'N/A',
        date: booking.start ? format(booking.start.toDate(), 'EEEE, dd MMM yyyy') : 'N/A',
        time: booking.start && booking.end ? `${format(booking.start.toDate(), 'hh:mm a')} to ${format(booking.end.toDate(), 'hh:mm a')}`: 'N/A',
        duration: `${booking.duration || 0} mins`,
        people: booking.people || 0,
        equipment: booking.noOfItems || 0,
        price: booking.price || 0,
        status: booking.status || 'N/A', 
        imageUrl: booking.activity?.images?.[0] || '/placeholder.png'
      }));
      setBookings(formattedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setComponentLoading(false);
    }
  };

  const getStatusForFiltering = (status) => {
    const s = status?.toLowerCase();
    if (s === 'booked' || s === 'rescheduled') return 'upcoming';
    if (s === 'completed') return 'past';
    if (s === 'cancelled') return 'canceled';
    return 'other';
  };

  const getStatusButton = (status) => {
    switch (getStatusForFiltering(status)) {
      case 'upcoming':
        return <button className={`${styles.statusBtn} ${styles.bookAgainBtn}`}>Book Again</button>;
      case 'past':
        return <button className={`${styles.statusBtn} ${styles.successBtn}`}>Success</button>;
      case 'canceled':
        return <button className={`${styles.statusBtn} ${styles.canceledBtn}`}>Canceled</button>;
      default:
        return null;
    }
  };
  
  const filteredBookings = bookings.filter(booking => {
      const filterStatus = getStatusForFiltering(booking.status);
      if (activeTab === 'All') return true;
      if (activeTab === 'Upcoming') return filterStatus === 'upcoming';
      if (activeTab === 'Past') return filterStatus === 'past';
      if (activeTab === 'Canceled') return filterStatus === 'canceled';
      return false;
  });

  if (authLoading || componentLoading) {
    return <div className={styles.centeredMessage}>Loading your bookings...</div>;
  }

  if (!user) {
    return <div className={styles.centeredMessage}>Please log in to see your booking history.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button 
          className={activeTab === 'All' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('All')}>
          All
        </button>
        <button 
          className={activeTab === 'Upcoming' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('Upcoming')}>
          Upcoming
        </button>
        <button 
          className={activeTab === 'Past' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('Past')}>
          Past
        </button>
        <button 
          className={activeTab === 'Canceled' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('Canceled')}>
          Cancelled
        </button>
      </div>

      <div className={styles.bookingsList}>
        {filteredBookings.length > 0 ? (
          filteredBookings.map(booking => (
            <div key={booking.id} className={styles.bookingCard}>
              <img src={booking.imageUrl} alt={booking.title} className={styles.bookingImage} />
              <div className={styles.bookingDetails}>
                <div className={styles.header}>
                    <p className={styles.title}>{booking.title}</p>
                    {getStatusButton(booking.status)}
                </div>
                <div className={styles.info}><img src='/location.png' alt="location icon" className={styles.infoIcon}/> {booking.location}</div>
                <div className={styles.info}><img src='/calendar.png' alt="calendar icon" className={styles.infoIcon}/> {booking.date}</div>
                <div className={styles.info}><img src='/clock.png' alt="clock icon" className={styles.infoIcon}/> {booking.time} ({booking.duration})</div>
                <div className={styles.footer}>
                    <div className={styles.tags}>
                        <span className={styles.tag}>{booking.people} {booking.people > 1 ? 'People' : 'Person'}</span>
                        <span className={styles.tag}>{booking.equipment} Equipment</span>
                    </div>
                    <span className={styles.price}>{booking.price} AED</span>
                </div>
              </div>
            </div>
          ))
        ) : (
            <p className={styles.noBookings}>No bookings found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default BookingHistory; 