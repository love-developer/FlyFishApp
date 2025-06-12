"use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from 'next/navigation';
// import { activityService } from '../../services/activity.service.js';
import styles from "./activityCard.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../../app/globals.css';


// const reviewsData = [
//   {
//     id: 1,
//     name: "Feroze Venience",
//     date: "3 Jan 2024",
//     stars: 5,
//     avatar:
//       "https://randomuser.me/api/portraits/men/32.jpg",
//     text: `We loved it!! The surf lessons were super fun, educational and really exciting!
//            With the perfect balance between pushing yourself and enjoying yourself!`,
//   },
//   {
//     id: 2,
//     name: "Emma R.",
//     date: "19 Mar 2025",
//     stars: 5,
//     avatar:
//       "https://randomuser.me/api/portraits/women/44.jpg",
//     text: `Had an amazing time! The staff was super friendly, and the experience was beyond thrilling.
//            The views were stunning, and everything was well-organized. Can't wait to come back!`,
//   },
//   {
//     id: 3,
//     name: "Hannah W.",
//     date: "13 Feb 2025",
//     stars: 5,
//     avatar:
//       "https://randomuser.me/api/portraits/women/65.jpg",
//     text: `I was a bit nervous as it was my first time trying watersports, but the instructors were patient and encouraging.
//            They made the whole experience enjoyable and stress-free. I'll definitely be back!`,
//     images: [
//       "/images/watersport1.jpg",
//       "/images/watersport2.jpg",
//       "/images/watersport3.jpg",
//     ],
//   },
// ];

// function StarRating({ count }) {
//   const totalStars = 5;
//   return (
//     <div className={styles.starrating} aria-label={`${count} stars`}>
//       {[...Array(totalStars)].map((_, i) => (
//         <svg
//           key={i}
//           width="16"
//           height="16"
//           viewBox="0 0 24 24"
//           fill={i < count ? "#FFA500" : "#ddd"}
//           xmlns="http://www.w3.org/2000/svg"
//           aria-hidden="true"
//         >
//           <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//         </svg>
//       ))}
//     </div>
//   );
// }

// const BookingScreen = () => {
//   const [activity, setActivity] = useState(null);
//   const [timeSlot, setTimeSlot] = useState("");
//   const [equipmentCount, setEquipmentCount] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [date, setDate] = useState("2025.04.18");
//   const [duration, setDuration] = useState(45);
//   const [time, setTime] = useState("");
//   const [equipment, setEquipment] = useState(1);
//   const [calendarSelected, setCalendarSelected] = useState(18);

//   const calendarDays = [13, 14, 15, 16, 17, 18, 19];

//   const searchParams = useSearchParams();
//   const activityId = searchParams.get('id');

//   useEffect(() => {
//     const fetchActivity = async () => {
//       try {
//         setLoading(true);
//         const data = await activityService.activityById(activityId);
//         setActivity(data);
//       } catch (err) {
//         console.log(err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (activityId) fetchActivity();
//   }, [activityId]);

//   if (loading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <div className={styles.spinner}></div>
//       </div>
//     );
//   }
//   if (error) return <div className={styles.error}>Error: {error}</div>;
//   if (!activity) return <div className={styles.error}>Activity not found</div>;

//   const handleDateChange = (e) => setDate(e.target.value);
//   const handleTimeSlotChange = (e) => setTimeSlot(e.target.value);
//   const handleEquipmentChange = (type) => {
//     if (type === "increment" && equipmentCount < 5) setEquipmentCount(equipmentCount + 1);
//     if (type === "decrement" && equipmentCount > 1) setEquipmentCount(equipmentCount - 1);
//   };

//   return (
//     <div className={styles.container}>
//     {/* Hero Image */}
//     <img
//       src={activity.images[0]}
//       alt="Flyboard image"
//       width={1024}
//       height={420}
//       className={styles.heroImage}
//       priority
//     />

//     {/* Title & Price */}
//     <div className={styles.titlePrice}>
//       <h1>{activity.title}</h1>
//       <div className={styles.price}>350 AED</div>
//     </div>

//     {/* Location */}
//     <div className={styles.location}>
//       <svg
//         aria-hidden="true"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         viewBox="0 0 24 24"
//       >
//         <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1118 0z" />
//         <circle cx="12" cy="10" r="3" />
//       </svg>
//       Pullman Marjan Island
//     </div>

//     {/* Description */}
//     <p className={styles.description}>
//       Perfect way to explore calm water alone or with a friend because it is both exciting and
//       stable. Perfor withPerfect way to explore calm water alone or with friend because it is
//       both exciting and stable. Perfect way to explore calm alone or witht
//     </p>

//     {/* Offers */}
//     <div className={styles.offersContainer}>
//       <button className="offer-button">
//         <svg
//           aria-hidden="true"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M9 12l2 2 4-4" />
//           <path d="M12 22c5.523 0 10-4.477 10-10 0-1.523-.417-2.945-1.15-4.186M15.243 15.243L12 12m0 0L8.757 8.757" />
//         </svg>
//         35% Offer
//       </button>

//       <button className={styles.offerButton}>
//         <svg
//           aria-hidden="true"
//           fill="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.9 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
//         </svg>
//         40 Reward Points
//       </button>

//       <button className={styles.offerButton}>
//         <svg
//           aria-hidden="true"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           viewBox="0 0 24 24"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M3 3v18l7-7 4 4 7-7V3z" />
//         </svg>
//         39 Reviews
//       </button>

//       <button className={styles.offerButton}>
//         <svg
//           aria-hidden="true"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           viewBox="0 0 24 24"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M4 12v3a3 3 0 003 3h3" />
//           <path d="M16 8l5 5-5 5" />
//         </svg>
//         Share with Others
//       </button>
//     </div>

//     {/* Booking Section */}
//     <div className={styles.booking}>
//       <div className={styles.bookingleft} role="region" aria-label="Booking form">
//         {/* Step 1 */}
//         <div className={styles.step}>
//           <div className={styles.stepheader}>
//             <div className={styles.stepbadge} aria-label="Step 1" tabIndex={-1}>
//               1
//             </div>
//             <h3 className={styles.steptitle}>Select The Date And Time Duration</h3>
//             <div>{duration} min</div>
//           </div>
//           <div
//             style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", alignItems: "center" }}
//           >
//             <input
//               className={styles.selectInput}
//               type="text"
//               aria-label="Selected date"
//               readOnly
//               value={date}
//               style={{
//                 cursor: "pointer",
//                 background: "#ff9400",
//                 borderRadius: "6px",
//                 padding: "0.4rem 0.8rem",
//                 fontWeight: "600",
//                 color: "white",
//                 minWidth: "120px",
//                 border: "none",
//                 textAlign: "center",
//                 userSelect: "none",
//               }}
//             />

//             <div className={styles.durationcontrol} role="group" aria-label="Duration controls">
//               <button
//                 aria-label="Decrease duration"
//                 onClick={() => setDuration((d) => (d > 15 ? d - 15 : d))}
//                 type="button"
//               >
//                 –
//               </button>
//               <span aria-live="polite" aria-atomic="true">
//                 {duration} min
//               </span>
//               <button
//                 aria-label="Increase duration"
//                 onClick={() => setDuration((d) => (d < 120 ? d + 15 : d))}
//                 type="button"
//               >
//                 +
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Step 2 */}
//         <div className={styles.step}>
//           <div className={styles.stepheader}>
//             <div className={styles.stepbadge} aria-label="Step 2" tabIndex={-1}>
//               2
//             </div>
//             <h3 className={styles.steptitle}>Select A Time</h3>
//           </div>
//           <select
//             className={styles.selectInput}
//             aria-label="Select time"
//             onChange={(e) => setTime(e.target.value)}
//             value={time}
//           >
//             <option value="">Select</option>
//             <option value="09:00 AM">09:00 AM</option>
//             <option value="10:00 AM">10:00 AM</option>
//             <option value="11:00 AM">11:00 AM</option>
//             <option value="12:00 PM">12:00 PM</option>
//           </select>
//         </div>

//         {/* Step 3 */}
//         <div className={styles.step}>
//           <div className={styles.stepheader}>
//             <div className={styles.stepbadge} aria-label="Step 3" tabIndex={-1}>
//               3
//             </div>
//             <h3 className={styles.steptitle}>No. of Equipment</h3>
//           </div>
//           <div
//             className={styles.equipcontrol}
//             role="group"
//             aria-label="Number of equipment control"
//           >
//             <button
//               aria-label="Decrease equipment"
//               type="button"
//               onClick={() => setEquipment((e) => (e > 1 ? e - 1 : e))}
//             >
//               –
//             </button>
//             <span aria-live="polite" aria-atomic="true">
//               {equipment}
//             </span>
//             <button
//               aria-label="Increase equipment"
//               type="button"
//               onClick={() => setEquipment((e) => e + 1)}
//             >
//               +
//             </button>
//           </div>
//         </div>

//         <button className={styles.addcartbtn} type="button">
//           Add to cart
//         </button>
//       </div>

//       {/* Right Booking Section */}
//       <div className={styles.bookingright} role="region" aria-label="Calendar and Tips">
//         <div className={styles.calendarwrapper}>
//           <div className={styles.calendarheader}>
//             <div>Select Date</div>
//             <div className={styles.calendarmonthyear}>
//               <button className={styles.calendarnavbtn} disabled aria-label="Previous year">
//                 &lt;
//               </button>
//               <span>2025 April</span>
//               <button className={styles.calendarnavbtn} disabled aria-label="Next year">
//                 &gt;
//               </button>
//             </div>
//           </div>
//           <div className={styles.calendardaysrow} aria-hidden="true">
//             {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
//               <div key={d}>{d}</div>
//             ))}
//           </div>
//           <div className={styles.calendardates}>
//             {/* Blank days before 13 */}
//             {[...Array(6)].map((_, i) => (
//               <div key={"blank" + i} />
//             ))}
//             {calendarDays.map((day) => (
//               <button
//                 key={day}
//                 className={`calendar-date ${
//                   calendarSelected === day ? "selected" : ""
//                 }`}
//                 onClick={() => setCalendarSelected(day)}
//                 type="button"
//                 aria-pressed={calendarSelected === day}
//                 aria-label={`Select day ${day} April 2025`}
//               >
//                 {day}
//               </button>
//             ))}
//           </div>
//           <div
//             className={styles.calendarsavebtn}
//             onClick={() => alert("Date saved: 2025-04-" + calendarSelected)}
//             tabIndex={0}
//             role="button"
//             aria-label="Save selected date"
//             onKeyDown={(e) => {
//               if (e.key === "Enter") alert("Date saved: 2025-04-" + calendarSelected);
//             }}
//           >
//             Save
//           </div>
//         </div>

//         <div className={styles.tipsbox} aria-label="Tips">
//           <div className={styles.tipsheader}>
//             <div>
//               <svg
//                 aria-hidden="true"
//                 width="20"
//                 height="20"
//                 fill="none"
//                 stroke="#d87d00"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 viewBox="0 0 24 24"
//                 style={{ verticalAlign: "middle", marginRight: "0.15rem" }}
//               >
//                 <path d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
//               </svg>
//               Tips
//             </div>
//             <span
//               className={styles.tipsloadmore}
//               tabIndex={0}
//               role="button"
//               onClick={() => alert("Load more tips")}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") alert("Load more tips");
//               }}
//             >
//               Load more tips
//             </span>
//           </div>
//           <ul className={styles.tipslist}>
//             <li>Check the weather forecast for any changes</li>
//             <li>Wear comfortable swimwear or water-friendly clothing</li>
//             <li>Arrive at least 15 minutes before your booking</li>
//           </ul>
//         </div>
//       </div>
//     </div>

//     {/* Reviews Section */}
//     <section className={styles.reviewssection} aria-label="Reviews">
//       <div className={styles.reviewsheader} tabIndex={0}>
//         Reviews (39) <span aria-hidden="true">▼</span>
//       </div>

//       {reviewsData.map(({ id, name, date, stars, avatar, text, images }) => (
//         <article key={id} className={styles.review} tabIndex={0} aria-label={`Review by ${name}`}>
//           <div className={styles.reviewheader}>
//             <img
//               src={avatar}
//               alt={`Avatar of ${name}`}
//               width={40}
//               height={40}
//               className={styles.reviewavatar}
//             />
//             <div className={styles.reviewinfo}>
//               <div className={styles.reviewname}>{name}</div>
//               <div className={styles.reviewdate}>{date}</div>
//             </div>
//           </div>
//           <StarRating count={stars} />
//           <p className={styles.reviewtext}>{text}</p>
//           {images && (
//             <div className={styles.reviewimages}>
//               {images.map((src, i) => (
//                 <img
//                   key={i}
//                   src={src}
//                   alt={`Review image ${i + 1} by ${name}`}
//                   width={90}
//                   height={55}
//                   style={{ borderRadius: "6px", objectFit: "cover" }}
//                 />
//               ))}
//             </div>
//           )}
//         </article>
//       ))}
//     </section>
//   </div>
//   );
// };

// export default BookingScreen;






import { ChevronLeftIcon, ChevronRightIcon, MapPinIcon } from "lucide-react";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/accordin";
import { AspectRatio } from "../../components/apect-ratio";
import { Avatar } from "../../components/avatar";
import { Button } from "../../components/button";
import { Card, CardContent } from "../../components/card";
import { Separator } from "../../components/separator";

// Data for reviews
const reviews = [
  {
    id: 1,
    name: "Feroze Venience",
    date: "3 Jan 2024",
    rating: 5,
    comment:
      "We loved it!! The surf lessons were super fun, educational and really exciting! With the perfect balance between pushing yourself and enjoying yourself!",
    avatar: "https://c.animaapp.com/mbphwhpjnWlerN/img/profiles.png",
    images: [],
  },
  {
    id: 2,
    name: "Emma R.",
    date: "19 Mar 2025",
    rating: 5,
    comment:
      "Had an amazing time! The staff was super friendly, and the experience was beyond thrilling. The views were stunning, and everything was well-organized. Can't wait to come back!",
    avatar: "https://c.animaapp.com/mbphwhpjnWlerN/img/ellipse-12.png",
    images: [],
  },
  {
    id: 3,
    name: "Hannah W.",
    date: "13 Feb 2025",
    rating: 5,
    comment:
      "I was a bit nervous as it was my first time trying watersports, but the instructors were patient and encouraging. They made the whole experience enjoyable and stress-free. I'll definitely be back!",
    avatar: "https://c.animaapp.com/mbphwhpjnWlerN/img/profiles-1.png",
    images: [
      "https://c.animaapp.com/mbphwhpjnWlerN/img/dsc-3439-1.png",
      "https://c.animaapp.com/mbphwhpjnWlerN/img/unsplash-aegemp8l9te.png",
      "https://c.animaapp.com/mbphwhpjnWlerN/img/dsc-3983-2.png",
    ],
  },
];

// Data for tips
const tips = [
  "Check the weather forecast for any changes",
  "Wear comfortable swimwear or water-friendly clothing",
  "Arrive at least 15 minutes before your booking",
];

// Data for weekdays
const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

// Data for calendar days
const calendarDays = [13, 14, 15, 16, 17, 18, 19];

// Data for feature badges
const featureBadges = [
  {
    icon: "https://c.animaapp.com/mbphwhpjnWlerN/img/icon-3.svg",
    text: "35% Offer",
  },
  {
    icon: "https://c.animaapp.com/mbphwhpjnWlerN/img/icon-7.svg",
    text: "40 Reward Points",
  },
  {
    icon: "https://c.animaapp.com/mbphwhpjnWlerN/img/icon-8.svg",
    text: "39 Reviews",
  },
  {
    icon: "https://c.animaapp.com/mbphwhpjnWlerN/img/icon-5.svg",
    text: "ShareIcon with Others",
  },
];

export const BookingScreen = () => {
  return (
    <section className="flex flex-col w-full max-w-[850px] items-center gap-[51px] mx-auto">
      {/* Activity Image and Blur Effect */}
      <div className="flex-col items-start gap-[60px] flex relative self-stretch w-full">
        <div className="absolute w-[692px] h-20 top-[350px] left-[79px] bg-[#2d2d2d] blur-[50px]" />

        <AspectRatio
          ratio={850 / 440}
          className="w-full rounded-3xl overflow-hidden"
        >
          <img
            className="w-full h-full object-cover"
            alt="Flyboard activity"
            src="https://c.animaapp.com/mbphwhpjnWlerN/img/dsc-7746-1.png"
          />
        </AspectRatio>

        <div className="flex flex-col items-start gap-8 w-full">
          {/* Activity Title and Price */}
          <div className="flex flex-col items-start gap-3 w-full">
            <div className="flex flex-col items-start gap-2 w-full">
              <div className="flex items-center justify-between w-full">
                <h1 className="font-medium text-[#2d2d2d] text-[40px] leading-10 [font-family:'Petrona',Helvetica]">
                  Flyboard
                </h1>
                <div className="font-medium text-[#2d2d2d] text-[40px] text-right leading-10 [font-family:'Petrona',Helvetica]">
                  350 Aed
                </div>
              </div>

              <div className="flex items-center w-full">
                <div className="inline-flex items-center">
                  <MapPinIcon className="w-6 h-6" />
                  <span className="font-normal text-[#2d2d2d] text-base leading-4 [font-family:'Inter',Helvetica]">
                    Pullman Marjan Island
                  </span>
                </div>
              </div>
            </div>

            {/* Activity Description */}
            <div className="flex items-center justify-center w-full mb-[-31px]">
              <p className="flex-1 font-normal text-[#2d2d2d] text-lg leading-[25.2px] [font-family:'Inter',Helvetica]">
                Perfect way to explore calm water alone or with a friend because
                it is both exc iting and stable. Perfor withtPerfect way to
                explore calm water alone or with friend because it is both
                exciting and stable. Perfect way to explore calm alone or witht
              </p>
            </div>
          </div>

          {/* Feature Badges */}
          <div className="flex items-center gap-6 w-full">
            {featureBadges.map((badge, index) => (
              <Card
                key={index}
                className={`flex items-center justify-center gap-1 px-3 py-2.5 ${index === 1 || index === 3 ? "w-[210px]" : "flex-1"} bg-white rounded-xl shadow-[0px_1px_5px_#0000001a]`}
              >
                <CardContent className="flex items-center justify-center gap-1 p-0">
                  <img
                    className="w-9 h-9"
                    alt={`Icon for ${badge.text}`}
                    src={badge.icon}
                  />
                  <span className="font-normal text-[#2d2d2d] text-lg leading-[18px] whitespace-nowrap [font-family:'Inter',Helvetica]">
                    {badge.text}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="flex items-center justify-center gap-[30px] w-full">
        {/* Left Column - Booking Steps */}
        <div className="flex flex-col w-[380px] items-start gap-[18px]">
          {/* Step 1: Date and Time Duration */}
          <Card className="flex flex-col items-start justify-center gap-[15px] p-5 w-full bg-white rounded-xl shadow-[0px_1px_5px_#0000001a]">
            <CardContent className="p-0 w-full space-y-4">
              <div className="inline-flex items-center justify-center gap-4">
                <div className="w-6 h-6 bg-[#1fbb00] rounded-[100px] flex items-center justify-center">
                  <span className="font-normal text-white text-xs text-center leading-3 [font-family:'Inter',Helvetica]">
                    1
                  </span>
                </div>
                <span className="font-normal text-[#2d2d2d] text-sm leading-[14px] whitespace-nowrap [font-family:'Inter',Helvetica]">
                  Select The Date And Time Duration
                </span>
              </div>

              <div className="flex h-12 items-center justify-center gap-7 w-full">
                <Button className="flex-1 h-12 bg-[#ff8800] rounded-[10px] shadow-[0px_1px_10px_#0000001a] hover:bg-[#e67a00]">
                  <span className="font-bold text-white text-sm text-center tracking-[-0.43px] leading-[22px] whitespace-nowrap [font-family:'Inter',Helvetica]">
                    2025.04.18
                  </span>
                </Button>

                <div className="flex gap-[15px] flex-1 items-center">
                  <div className="flex h-12 items-center justify-between px-2 py-1.5 flex-1 bg-white rounded-[10px] shadow-[0px_1px_10px_#0000001a]">
                    <div className="w-[34px] h-[34px] bg-[#ff8800] rounded-[10px] overflow-hidden flex items-center justify-center">
                      <img
                        className="w-[17px] h-[3px]"
                        alt="Minus"
                        src="https://c.animaapp.com/mbphwhpjnWlerN/img/vector.svg"
                      />
                    </div>

                    <span className="w-[50px] h-2.5 font-normal text-black text-[13px] text-center leading-[13px] whitespace-nowrap [font-family:'Inter',Helvetica]">
                      45 min
                    </span>

                    <div className="w-[34px] h-[34px] bg-[#ff8800] rounded-[10px] overflow-hidden flex items-center justify-center">
                      <img
                        className="w-[17px] h-[17px]"
                        alt="Plus"
                        src="https://c.animaapp.com/mbphwhpjnWlerN/img/vector-1.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Select A Time */}
          <Card className="flex items-center justify-between p-5 w-full bg-white rounded-xl shadow-[0px_1px_5px_#0000001a]">
            <CardContent className="p-0 w-full flex items-center justify-between">
              <div className="inline-flex items-center gap-4">
                <div className="w-6 h-6 bg-[#2d2d2d] rounded-[100px] flex items-center justify-center">
                  <span className="font-normal text-white text-xs text-center leading-3 [font-family:'Inter',Helvetica]">
                    2
                  </span>
                </div>
                <span className="font-normal text-[#2d2d2d] text-sm leading-[14px] whitespace-nowrap [font-family:'Inter',Helvetica]">
                  Select A Time
                </span>
              </div>

              <Button
                variant="outline"
                className="w-[148px] h-12 bg-white rounded-[10px] shadow-[0px_1px_5px_#0000001a]"
              >
                <span className="font-medium text-[#2d2d2d] text-base text-center tracking-[-0.43px] leading-[22px] whitespace-nowrap [font-family:'Inter',Helvetica]">
                  Select
                </span>
              </Button>
            </CardContent>
          </Card>

          {/* Step 3: No. of Equipment */}
          <Card className="flex items-center justify-between p-5 w-full bg-white rounded-xl shadow-[0px_1px_5px_#0000001a]">
            <CardContent className="p-0 w-full flex items-center justify-between">
              <div className="inline-flex items-center gap-4">
                <div className="w-6 h-6 bg-[#2d2d2d] rounded-[100px] flex items-center justify-center">
                  <span className="font-normal text-white text-xs text-center leading-3 [font-family:'Inter',Helvetica]">
                    3
                  </span>
                </div>
                <span className="font-normal text-[#2d2d2d] text-sm leading-[14px] whitespace-nowrap [font-family:'Inter',Helvetica]">
                  No. of Equipment
                </span>
              </div>

              <div className="flex w-[132px] h-12 items-center justify-center px-[11px] py-1.5 bg-white rounded-xl shadow-[0px_1px_10px_#0000001a]">
                <img
                  className="w-[34px] h-[34px] ml-[-4.00px]"
                  alt="Remove"
                  src="https://c.animaapp.com/mbphwhpjnWlerN/img/remove.svg"
                />
                <span className="w-[50px] h-3 font-medium text-[#2d2d2d] text-sm text-center leading-[14px] whitespace-nowrap [font-family:'Inter',Helvetica]">
                  1
                </span>
                <div className="w-[34px] h-[34px] mr-[-4.00px] bg-[#ff8800] rounded-[10px] overflow-hidden flex items-center justify-center">
                  <img
                    className="w-[17px] h-[17px]"
                    alt="Plus"
                    src="https://c.animaapp.com/mbphwhpjnWlerN/img/vector-1.svg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add to Cart Button */}
          <Button className="flex justify-center items-center w-full h-12 bg-[#ff8800] rounded-[10px] hover:bg-[#e67a00]">
            <img
              className="w-12 h-12"
              alt="Cart icon"
              src="https://c.animaapp.com/mbphwhpjnWlerN/img/icons.svg"
            />
            <span className="font-medium text-white text-lg text-center leading-normal [font-family:'Inter',Helvetica]">
              Add to cart
            </span>
          </Button>
        </div>

        {/* Right Column - CalendarIcon and Tips */}
        <div className="flex flex-col w-[440px] items-start gap-[26px]">
          {/* CalendarIcon */}
          <Card className="flex flex-col h-[200px] items-center justify-between py-3 w-full bg-white rounded-xl overflow-hidden shadow-[0px_1px_5px_#0000001a]">
            <CardContent className="p-0 w-full space-y-4">
              {/* Weekdays */}
              <div className="flex w-[346px] h-12 items-start justify-center mx-auto bg-white">
                {weekdays.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center gap-2.5 flex-1 self-stretch"
                  >
                    <span className="font-normal text-[#2d2d2d] text-base text-center leading-4 font-m3-body-large">
                      {day}
                    </span>
                  </div>
                ))}
              </div>

              {/* CalendarIcon Days */}
              <div className="flex flex-col items-center px-3 w-full">
                <div className="flex w-full items-start justify-center bg-white">
                  <div className="flex flex-col w-12 h-12 items-center justify-center">
                    <div className="inline-flex items-center justify-center rounded-[100px] overflow-hidden">
                      <div className="inline-flex items-center justify-center p-2">
                        <ChevronLeftIcon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center py-1.5 flex-1 bg-neutral-100 rounded-md border border-solid border-[#d0d0d0]">
                    {calendarDays.map((day, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center gap-2.5 flex-1 self-stretch"
                      >
                        <div
                          className={`w-10 h-10 items-center justify-center rounded-[100px] flex ${day === 18 ? "bg-[#ff8800]" : ""}`}
                        >
                          <div className="w-10 h-10 justify-center gap-2.5 flex items-center">
                            <span
                              className={`font-m3-body-large text-center whitespace-nowrap ${day === 18 ? "text-white" : "text-[#2d2d2d]"}`}
                            >
                              {day}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col w-12 h-12 items-center justify-center">
                    <div className="inline-flex items-center justify-center rounded-[100px] overflow-hidden">
                      <div className="inline-flex items-center justify-center p-2">
                        <ChevronRightIcon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CalendarIcon Footer */}
              <div className="flex items-center justify-between pl-4 pr-3 py-1 w-full">
                <div className="w-[66px] justify-around gap-2 pl-2 pr-1 py-2.5 rounded-[100px] overflow-hidden flex items-center">
                  <span className="font-medium text-[#2d2d2d] text-sm text-center tracking-[0.10px] leading-5 whitespace-nowrap [font-family:'Roboto',Helvetica]">
                    2025
                  </span>
                </div>

                <div className="w-[197px] justify-between p-2.5 rounded-[100px] overflow-hidden flex items-center">
                  <img
                    className="w-[18px] h-[18px]"
                    alt="Previous month"
                    src="https://c.animaapp.com/mbphwhpjnWlerN/img/icon-1.svg"
                  />
                  <span className="w-[130px] font-medium text-[#2d2d2d] tracking-[0.10px] leading-5 text-center [font-family:'Roboto',Helvetica] text-sm">
                    April
                  </span>
                  <img
                    className="w-[18px] h-[18px]"
                    alt="Next month"
                    src="https://c.animaapp.com/mbphwhpjnWlerN/img/icon-2.svg"
                  />
                </div>

                <div className="flex flex-col w-[66px] h-10 items-center justify-center gap-2 rounded-md overflow-hidden">
                  <div className="justify-center gap-2 px-3 py-2.5 flex-1 self-stretch w-full flex items-center">
                    <span className="w-fit mt-[-1.00px] font-normal text-[#ff8800] leading-[14px] font-m3-label-large text-sm text-center">
                      Save
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips Section */}
          <Card className="flex h-[186px] gap-[19px] px-6 py-3 w-full bg-white rounded-xl overflow-hidden shadow-[0px_1px_5px_#0000001a]">
            <CardContent className="p-0 w-full space-y-4">
              <div className="flex w-full items-center justify-between">
                <div className="inline-flex items-center">
                  <img
                    className="w-9 h-9"
                    alt="Tips icon"
                    src="https://c.animaapp.com/mbphwhpjnWlerN/img/icon-9.svg"
                  />
                  <span className="h-[26px] font-bold text-[#ff8800] text-sm leading-[14px] [font-family:'Inter',Helvetica]">
                    Tips
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5">
                  <span className="font-bold text-[#ff8800] text-sm text-right leading-[14px] whitespace-nowrap [font-family:'Inter',Helvetica]">
                    Load more tips
                  </span>
                  <div className="w-5 h-5">
                    <img
                      className="w-4 h-3.5 mt-[3px] ml-[3px]"
                      alt="Arrow"
                      src="https://c.animaapp.com/mbphwhpjnWlerN/img/group.png"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start">
                {tips.map((tip, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center justify-center gap-1.5 mb-2"
                  >
                    <img
                      className="w-6 h-6"
                      alt="StarIcon icon"
                      src="https://c.animaapp.com/mbphwhpjnWlerN/img/mdi-star-four-points.svg"
                    />
                    <p className="w-[368px] h-[34px] font-normal text-[#2d2d2d] text-sm leading-[14px] [font-family:'Inter',Helvetica]">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Divider */}
      <Separator className="w-[656.5px]" />

      {/* Reviews Section */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="reviews" className="border-none">
          <AccordionTrigger className="flex items-center justify-between w-full py-2.5 px-0">
            <h2 className="font-light text-[#2d2d2d] text-[22px] leading-[22px] [font-family:'Inter',Helvetica]">
              Reviews (39)
            </h2>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="flex-col items-start gap-[30px] flex w-full">
              {reviews.map((review) => (
                <Card
                  key={review.id}
                  className="flex flex-col items-start justify-center gap-[19px] p-5 w-full bg-white rounded-[10px] shadow-[0px_1px_5px_#0000001a]"
                >
                  <CardContent className="p-0 w-full space-y-4">
                    <div className="flex items-center gap-[17px] w-full">
                      <Avatar className="w-12 h-12 rounded-[100px]">
                        <img
                          className="w-full h-full object-cover"
                          alt={`${review.name}'s avatar`}
                          src={review.avatar}
                        />
                      </Avatar>

                      <div className="flex flex-col h-[38px] items-start justify-between flex-1">
                        <div className="flex items-center justify-between w-full">
                          <span className="font-bold text-[#2d2d2d] text-[13px] leading-normal [font-family:'Inter',Helvetica]">
                            {review.name}
                          </span>
                          <span className="font-normal text-[#b0aeae] text-xs leading-normal [font-family:'Inter',Helvetica]">
                            {review.date}
                          </span>
                        </div>

                        <div className="flex items-center gap-[3px] w-full">
                          {Array(review.rating)
                            .fill(0)
                            .map((_, i) => (
                              <img
                                key={i}
                                className="w-4 h-4"
                                alt="Star"
                                src="https://c.animaapp.com/mbphwhpjnWlerN/img/mingcute-star-fill.svg"
                              />
                            ))}
                        </div>
                      </div>
                    </div>

                    <div className="items-center flex w-full">
                      <p className="flex-1 font-normal text-[#3d3d3d] text-sm leading-[19.6px] [font-family:'Inter',Helvetica]">
                        {review.comment}
                      </p>
                    </div>

                    {review.images.length > 0 && (
                      <div className="inline-flex items-center gap-2">
                        {review.images.map((image, index) => (
                          <div
                            key={index}
                            className="w-20 h-20 rounded-lg shadow-[0px_2px_4px_#5b606840] overflow-hidden"
                          >
                            <div className="w-full h-20">
                              <div className="relative h-20">
                                <img
                                  className="absolute w-20 h-20 top-0 left-0 object-cover"
                                  alt={`Review image ${index + 1}`}
                                  src={image}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
