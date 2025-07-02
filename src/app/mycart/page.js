"use client";

import React, { useState } from "react";
import styles from "./mycart.module.css";
import Navbar from "../components/NavBar";

const mockCartItems = [
  {
    id: 1,
    title: "Boat Trip",
    location: "Pullman Marjan Island",
    date: "Thursday, 16 Jan 2025",
    time: "05.30pm to 06:30pm (60 mins)",
    people: 10,
    equipment: 1,
    price: 650,
    imageUrl: "/slide1.png",
  },
  {
    id: 2,
    title: "Fly Board",
    location: "Pullman Marjan Island",
    date: "Thursday, 16 Jan 2025",
    time: "06:45pm to 07:15pm (30 mins)",
    people: 1,
    equipment: 1,
    price: 350,
    imageUrl: "/slide1.png",
  },
  {
    id: 3,
    title: "Parasailing",
    location: "Pullman Marjan Island",
    date: "Thursday, 16 Jan 2025",
    time: "07:30pm to 08:30pm (60 mins)",
    people: 1,
    equipment: 1,
    price: 350,
    imageUrl: "/slide1.png",
  },
];

export default function MyCart() {
  const [items, setItems] = useState(mockCartItems);
  const [selected, setSelected] = useState(items.map((i) => i.id));
  const [rewardPoints, setRewardPoints] = useState(120);
  const [coupon, setCoupon] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selected.length === items.length) setSelected([]);
    else setSelected(items.map((i) => i.id));
  };

  const handleDelete = () => {
    setItems(items.filter((item) => !selected.includes(item.id)));
    setSelected([]);
  };

  const subtotal = items
    .filter((item) => selected.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);
  const total = subtotal - couponDiscount - rewardPoints;

  const handleRewardPoints = () => {
    if (rewardPoints > 0 && total > 0) {
      setRewardPoints(0);
    }
  };

  const handleCoupon = (e) => {
    setCoupon(e.target.value);
    if (e.target.value === "SAVE20") {
      setCouponDiscount(20);
    } else {
      setCouponDiscount(0);
    }
  };

  return (
    <div className={styles.cartPageContainer}>
      <Navbar />
      <div className={styles.cartHeader}>
        <span>My Cart</span>
        <div>
          <input
            type="checkbox"
            checked={selected.length === items.length}
            onChange={handleSelectAll}
            className={styles.itemCheckbox}
          />
          <span className={styles.selectAllLabel}>Select All</span>
          <button className={styles.deleteBtn} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      
      <div className={styles.cartMain}>
        <div className={styles.cartListSection}>
          {items.map((item) => (
            <div key={item.id} className={styles.cartItemCard}>
              <input
                type="checkbox"
                checked={selected.includes(item.id)}
                onChange={() => handleSelect(item.id)}
                className={styles.itemCheckbox}
              />
              <img
                src={item.imageUrl}
                alt={item.title}
                className={styles.cartItemImage}
              />
              <div className={styles.cartItemDetails}>
                <div className={styles.cartItemHeader}>
                  <span className={styles.cartItemTitle}>{item.title}</span>
                  <span className={styles.cartItemTime}>09:33</span>
                </div>
                <div className={styles.cartItemLocation}>
                  <img
                    src="/location.png"
                    alt="location"
                    className={styles.icon}
                  />
                  {item.location}
                </div>
                <div className={styles.cartItemDate}>
                  <img
                    src="/calendar.png"
                    alt="calendar"
                    className={styles.icon}
                  />
                  {item.date}
                </div>
                <div className={styles.cartItemTimeRow}>
                  <img src="/clock.png" alt="clock" className={styles.icon} />
                  {item.time}
                </div>
                <div className={styles.cartItemTags}>
                  <div className={styles.cartTags}>
                    <span className={styles.cartTag}>
                      {item.people} {item.people > 1 ? "People" : "Person"}
                    </span>
                    <span className={styles.cartTag}>
                      {item.equipment} Equipment
                    </span>
                  </div>
                  <span className={styles.cartItemTitle}>{item.price} AED</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.cartSummarySection}>
          <div className={styles.summaryBox}>
            <div className={styles.summaryTitle}>Payment Summary</div>
            <div className={styles.summaryActivities}>
              {items
                .filter((i) => selected.includes(i.id))
                .map((item, idx) => (
                  <div key={item.id} className={styles.summaryActivityRow}>
                    <span>
                      {idx + 1}. {item.title}
                    </span>
                    <span>{item.price} AED</span>
                  </div>
                ))}
            </div>
            <button className={styles.rewardBtn} onClick={handleRewardPoints}>
              Use Reward Points <span>{rewardPoints}</span>
            </button>
            <input
              type="text"
              placeholder="Add coupon code"
              value={coupon}
              onChange={handleCoupon}
              className={styles.couponInput}
            />
            <div className={styles.summaryRow}>
              <span>Sub Total</span>
              <span>{subtotal} AED</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Offers & Discounts</span>
              <span>-{couponDiscount} AED</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.grandTotalLabel}>Grand Total</span>
              <span className={styles.grandTotalValue}>
                {total > 0 ? total : 0} AED
              </span>
            </div>
            <div className={styles.paymentMethodBox}>
              <span>Will Smith (2214***21)</span>
              <button className={styles.editPaymentBtn}>Edit</button>
            </div>
            <button className={styles.checkoutBtn}>Checkout</button>
            <p className={styles.termsText}>
              Enjoy your day and book again for more offers and discounts!{" "}
              <a href="#">Learn more about FlyFish Terms & conditions.</a>
            </p>
          </div>
        </div>
      </div>
      <p className={styles.checkoutLink}>Checkout</p>
    </div>
  );
}
