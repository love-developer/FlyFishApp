// pages/index.js
"use client";

import Head from 'next/head';
import styles from './cart.module.css';
import React from 'react'; // Add this import to fix the error
const cartItems = [
  {
    id: 1,
    name: 'Boat Trip',
    price: 650,
    location: 'Pullman Majaran Island',
    description: 'Perfect way to explore calm water alone or with a friend because it is both exciting and very nice experience.',
    people: '10 People',
    equipment: '1 Equipment',
    date: 'Wednesday, 14 May 2025',
    time: '10:15 PM to 11:15 PM (60 mins)',
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
  },
  {
    id: 2,
    name: 'Fly Board',
    price: 350,
    location: 'Pullman Majaran Island',
    description: 'Perfect way to explore calm water alone or with a friend because it is both exciting and very nice experience.',
    people: '10 People',
    equipment: '1 Equipment',
    date: 'Wednesday, 14 May 2025',
    time: '10:15 PM to 11:15 PM (60 mins)',
    image: 'https://via.placeholder.com/150',
    selected: true,
  },
  {
    id: 3,
    name: 'Parasailing',
    price: 250,
    location: 'Pullman Majaran Island',
    description: 'Perfect way to explore calm water alone or with a friend because it is both exciting and very nice experience.',
    people: '10 People',
    equipment: '1 Equipment',
    date: 'Wednesday, 14 May 2025',
    time: '10:15 PM to 11:15 PM (60 mins)',
    image: 'https://via.placeholder.com/150',
  },
];

export default function Cart() {
  const [items, setItems] = React.useState(cartItems);
  const [rewardPoints, setRewardPoints] = React.useState(120);
  const [couponDiscount, setCouponDiscount] = React.useState(0);

  const handleSelect = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const handleDelete = () => {
    setItems(items.filter(item => !item.selected));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.selected ? item.price : 0), 0);
  const total = subtotal - couponDiscount - rewardPoints;

  const handleRewardPoints = () => {
    if (rewardPoints > 0 && total > 0) {
      setRewardPoints(0);
    }
  };

  const handleCoupon = (e) => {
    if (e.target.value === 'SAVE20') {
      setCouponDiscount(20);
    } else {
      setCouponDiscount(0);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>My Cart - FlyFish</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="row">
        <div className="col-12">
          <div className={styles.cartHeader}>
            <h1>My Cart</h1>
            <div>
              <input type="checkbox" id="selectAll" />
              <label htmlFor="selectAll" className="ms-2">Select All</label>
              <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-12 col-md-8">
          <div className={styles.cartItems}>
            {items.map(item => (
              <div key={item.id} className={`card mb-3 ${styles.cartItem}`}>
                <div className="row g-0">
                  <div className="col-2">
                    <input
                      type="checkbox"
                      checked={item.selected || false}
                      onChange={() => handleSelect(item.id)}
                      className="m-3"
                    />
                  </div>
                  <div className="col-3">
                    <img src={item.image} alt={item.name} className={styles.itemImage} />
                  </div>
                  <div className="col-7">
                    <div className="card-body">
                      <h5 className="card-title d-flex justify-content-between">
                        {item.name} <span className={styles.price}>{item.price} AED</span>
                      </h5>
                      <p className="card-text">📍 {item.location}</p>
                      <p className="card-text">{item.description}</p>
                      <p className="card-text">{item.people} | {item.equipment}</p>
                      <p className="card-text">📅 {item.date} <span>⏰ {item.time}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className={`card p-3 ${styles.paymentSummary}`}>
            <h2>Payment Summary</h2>
            <div className={styles.summaryItem}>
              <span>Activities</span>
              <div>
                <p>1. Boat Trip <span>650 AED</span></p>
                <p>2. Fly Board <span>350 AED</span></p>
                <p>3. Parasailing <span>250 AED</span></p>
              </div>
            </div>
            <button onClick={handleRewardPoints} className={styles.rewardButton}>
              🔔 Use Reward Points <span>{rewardPoints} AED</span>
            </button>
            <div className={styles.coupon}>
              <input type="text" placeholder="coupon code" onChange={handleCoupon} className="form-control" />
            </div>
            <div className={styles.summaryItem}>
              <span>Sub Total</span>
              <span>{subtotal} AED</span>
            </div>
            <div className={styles.summaryItem}>
              <span>Offers & Discounts</span>
              <span>-{couponDiscount} AED</span>
            </div>
            <div className={styles.summaryItem}>
              <strong>Grand Total</strong>
              <strong>{total > 0 ? total : 0} AED</strong>
            </div>
            <div className={styles.paymentMethod}>
              <span>💳 Will Smith (2214****21)</span>
              <button className={styles.editButton}>Edit</button>
            </div>
            <button className={styles.checkoutButton}>Checkout</button>
            <p className={styles.terms}>Enjoy your day and book again for more offers and discounts! <a href="#">Learn more about FlyFish Terms & conditions.</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}