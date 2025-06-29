"use client"

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { activityService } from '../../services/activity.service';
import { bookingService, DateTimeRange } from '../../../utils/models/booking.service';
import Head from 'next/head';
import styles from './activityCard.module.css';
import Navbar from '../../components/NavBar';
import { addDays, startOfWeek, format, isSameDay, addWeeks, subWeeks } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import LoadingIndicator from '../../components/LoadingIndicator';
import { PackageModel } from '../../../utils/models/package.model';
import { packageService } from '../../services/package.service';
import { colors } from '@mui/material';

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const CustomDatePicker = ({ selectedDate, setSelectedDate }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(selectedDate, { weekStartsOn: 0 }));
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  const now = new Date();
  const isToday = (date: Date) => isSameDay(date, now);
  const isPast = (date: Date) => date < new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const isTodayAfter6pm = () => now.getHours() >= 18;

  const isDateDisabled = (date: Date) => {
    if (isPast(date)) return true;
    if (isToday(date) && isTodayAfter6pm()) return true;
    return false;
  };

  const handlePrevWeek = () => setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  const handleNextWeek = () => setCurrentWeekStart(addWeeks(currentWeekStart, 1));

  return (
    <div className={styles.datePickerWrapper}>
      <div className={styles.datePickerDays}>
        {daysOfWeek.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className={styles.datePickerNavRow}>
        <button onClick={handlePrevWeek} className={styles.datePickerArrowBtn}>&lt;</button>
        <div className={styles.datePickerDateRow}>
          {weekDates.map((date) => {
            const disabled = isDateDisabled(date);
            return (
              <button
                key={date.toISOString()}
                className={
                  styles.datePickerDateBtn +
                  (isSameDay(date, selectedDate) ? ' ' + styles.selected : '') +
                  (disabled ? ' ' + styles.disabled : '')
                }
                onClick={() => !disabled && setSelectedDate(date)}
                disabled={disabled}
              >
                {format(date, 'd')}
              </button>
            );
          })}
        </div>
        <button onClick={handleNextWeek} className={styles.datePickerArrowBtn}>&gt;</button>
      </div>
      <div className={styles.datePickerFooter}>
        <span>{format(currentWeekStart, 'yyyy')}</span>
        <span>{format(currentWeekStart, 'MMMM')}</span>
        <button className={styles.datePickerSaveBtn}>Save</button>
      </div>
    </div>
  );
};

const TimeSlotModal = ({ isOpen, onClose, onSave, slots, selectedSlot, setSelectedSlot, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.timeModalOverlay}>
      <div className={styles.timeModalContent}>
        <div className={styles.timeModalHeader}>
          <span className={styles.timeModalStepNumber}>2</span>
          <span className={styles.timeModalTitle}>Select the time</span>
        </div>
        <button onClick={onClose} className={styles.timeModalCloseBtn}>&times;</button>
        <div className={styles.timeSlotList}>
          {isLoading ? (
            <p>Loading slots...</p>
          ) : slots.length > 0 ? (
            slots.map((slot, index) => (
              <button
                key={index}
                className={`${styles.timeSlotBtn} ${selectedSlot?.start.getTime() === slot.start.getTime() ? styles.selected : ''}`}
                onClick={() => setSelectedSlot(slot)}
              >
                {format(slot.start, 'hh:mm a')}
              </button>
            ))
          ) : (
            <p>No available slots for this date and duration.</p>
          )}
        </div>
        <div className={styles.timeModalFooter}>
          <button onClick={onSave} className={styles.timeModalSaveBtn}>Save</button>
        </div>
      </div>
    </div>
  );
};

// Utility to merge date and tim


const BookPackageScreen = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  console.log("Activity ID from query string:", id);
  const [packages, setPackage] = useState<PackageModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<DateTimeRange[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<DateTimeRange | null>(null);
  const [tempSelectedSlot, setTempSelectedSlot] = useState<DateTimeRange | null>(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { user } = useAuth() as any;

  const tips = [
    'Check the weather forecast for any changes',
    'Wear comfortable swimwear or water-friendly clothing',
    'Arrive at least 15 minutes before your booking',
  ];

  const offers = [
    { icon: '✨', text: '35% Offer' },
    { icon: '♦', text: '40 Reward Points' },
    { icon: '★', text: '39 Reviews' },
    { icon: '↗', text: 'Share with Others' },
  ];

  useEffect(() => {
    const fetchActivityAndReviews = async () => {
      console.log(id);
      if (!id) return;
      try {
        setLoading(true);
        const packageData = await packageService.packageById(id as string);
        setPackage(packageData);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchActivityAndReviews();
  }, [id]);


  const handleSelectTimeClick = async () => {
    if (!packages) return;
    setIsLoadingSlots(true);
    setIsTimeModalOpen(true);
    try {
      // const result = await bookingService.fetchBookedSlotsFuture({
      //   rideDuration: activity.time[selectedTimeIndex],
      //   date: selectedDate,
      //   activityModel: activity,
      // });
      // setAvailableSlots(result.availableBookings);
    } catch (error) {
      console.error("Error fetching slots:", error);
      setAvailableSlots([]);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleSaveTime = () => {
    setSelectedSlot(tempSelectedSlot);
    setIsTimeModalOpen(false);
  };


  const handleAddToCart = async () => {
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }
    // Replace with your auth logic
    if (!user?.uid) {
      // Show login dialog/modal
      alert("Please log in to add to cart.");
      return;
    }

  };

  if (loading) return <LoadingIndicator text="Loading activity..." />;
  if (error) return <div>Error: {error}</div>;
  if (!packages) return <div style={{ marginRight: '6px', display: 'inline-flex', verticalAlign: 'middle', color: "red" }}>No package found.</div>;


  return (
    <div className={styles.container}>
      <Head>
        <title>FlyFish - Flyboard</title>
        <link href="https://fonts.googleapis.com/css2?family=Petrona:wght@500&family=Inter:wght@400&display=swap" rel="stylesheet" />
      </Head>
      <Navbar />
      <main className={styles.maincontent}>

        <section className={styles.hero}>
          <img src={packages.packageActivity[0].url} alt="Flyboard" className={styles.heroImage} />
          <div className={styles.heroText}>
            <div>
              <p className={styles.title}>{packages.title}</p>
              <p className={styles.location}>

                <span style={{ marginRight: '6px', display: 'inline-flex', verticalAlign: 'middle' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                    <path d="M8 15C8 15 13 10.5 13 6.75C13 4.12665 10.7614 2 8 2C5.23858 2 3 4.12665 3 6.75C3 10.5 8 15 8 15Z" stroke="#FF9100" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="8" cy="7" r="2" stroke="#FF9100" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                Pullman Marjan Island
              </p>
            </div>

            <p className={styles.price}>{packages.grandTotal} AED</p>
          </div>
          <p className={styles.description}>{packages.description}</p>
        </section>
        <section className={styles.offers}>
          {offers.map((offer, index) => (
            <button key={index} className={styles.offerButton}>
              {offer.icon} {offer.text}
            </button>
          ))}
        </section>
        <section className={styles.bookingSection}>
          <div className={styles.bookingForm}>
            <div className={styles.step}>
              <div className={styles.selectTimeFirst} style={{ marginBottom: '10px', display: "flex" }}>
                <span className={styles.stepNumber}>1</span>
                <span className={styles.stepLabel} style={{ marginLeft: "10px" }}>Select A Date</span>
              </div>
              <div className={styles.selectTime}>
                <button className={styles.dateButton}>{format(selectedDate, 'yyyy.MM.dd')}</button>

              </div>

            </div>
            <div className={styles.step}>
              <div style={{ marginBottom: '10px', display: "flex" }}>
                <span className={styles.stepNumber}>2</span>
                <span className={styles.stepLabel} style={{ marginLeft: "10px" }}>Select A Time</span>
              </div>

              <button className={styles.timeButton} onClick={handleSelectTimeClick}>
                {selectedSlot ? format(selectedSlot.start, 'hh:mm a') : 'Select'}
              </button>
            </div>
            <button className={styles.addToCart} onClick={handleAddToCart}>Add to cart</button>
          </div>
          <div className={styles.dates}>
            <CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

          </div>

        </section>
        <section className={styles.tips}>
          <p>
            <span style={{ color: '#FF9100', marginRight: 8 }}>💡 Tips</span>
            <button className={styles.loadMore} style={{ color: '#FF9100', background: 'none', border: 'none', float: 'right' }}>Load more tips</button>
          </p>
          <ul>
            {tips.map((tip, index) => (
              <li key={index} style={{ color: '#FF9100', display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ marginRight: 6, fontSize: 18 }}>★</span>
                <span style={{ color: '#222' }}>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <TimeSlotModal
        isOpen={isTimeModalOpen}
        onClose={() => setIsTimeModalOpen(false)}
        onSave={handleSaveTime}
        slots={availableSlots}
        selectedSlot={tempSelectedSlot}
        setSelectedSlot={setTempSelectedSlot}
        isLoading={isLoadingSlots}
      />
    </div>
  );
};

export default BookPackageScreen;