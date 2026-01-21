import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addDays} from "date-fns";
import { PopupModal } from "react-calendly";

const timeSlots = [
  "08:00",  "08:20",  "08:40",  "09:00",  "09:20",  "09:40",  "10:00",  "10:20",  "10:40",  "11:00",  
  "11:20",  "11:40",  "12:00",  "12:20",  "12:40",  "13:00",  "13:20",  "13:40",  "14:00",  "14:20",  
  "14:40",  "15:00",  "15:20",  "15:40",  "16:00",  "16:20",  "16:40",  "17:00",  "17:20",  "17:40",
  "18:00",  "19:20",  "19:40",  "20:00",  "20:20",  "20:40",  "21:00",  "21:20",  "21:40",
];

const myProfile = {
  name: "Alex Khan",
  avatar: "",
  languages: ["English", "French"],
  rating: 4.9,
  reviews: 234,
  specialty: "Conversational Practice | English in Business & IT",
  calendlyUrl: ""
}

const lessonTypes = [
  {
    id: "quick_conversation", name: "One Mug Conversation", duration: "20 min", price: 10,
    description: "Perfect for a quick boost and ideal for a busy schedule. This 20-minute phone call is just enough time to warm up your language skills, practice a specific topic, or get a daily dose of conversation. Think of it as the time it takes to enjoy one mug of your favorite drink.",
  },
  {
    id: "lunch_conversation",  name: "Quick Lunch Conversation", duration: "40 min", price: 18,
    description: "Sustained practice for steady progress. Step beyond the warm-up. This 40-minute session allows for a more substantial exchange—perfect for navigating a real-life scenario, delving into a theme, or getting constructive feedback. A fulfilling practice session that fits into a lunch break.",
  },
  {
    id: "bench_conversation", name: "The Park Bench Chat", duration: "60 min", price: 25,
    description: "Immerse and transform your fluency. Our flagship session for maximum progress. A full hour of dedicated conversation allows for deep immersion, detailed correction, nuanced discussion, and truly building confidence. Walk away feeling like you've had a meaningful, fluency-boosting language experience.",
  },
];

const paymentMethods = [
  { id: "stripe", name: "Card (Stripe)" }, { id: "paypal", name: "PayPal" }, { id: "revolut", name: "Revolut Pay" },
];

const BookingSection = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const paddingDays = Array(monthStart.getDay()).fill(null);

  const isDateAvailable = (date) => () >= addDays(new Date(), 1);
  const isComplete = selectedDate && selectedTime && selectedType && selectedPayment;

  const price = selectedType ? (lessonTypes.find(l => l.id === selectedType) || {price: 0}).price : 0;

  const handleOpenCalendly = () => {
    if (isComplete) {
      setIsCalendlyOpen(true);
    }
  };

  const formatDateForCalendly = (date, time) => {
    if (!date || !time) return null;
    const dateStr = format(date, 'yyyy-MM-dd');
    return `${dateStr}T${time}:00`;
  };

  return (
    <section className="booking-section">
      <div className="booking-grid">
        <div className="booking-left">
          <div className="booking-card teacher-info-card">
            <h3>Alex</h3>
            <div className="my-profile">
              <img src={myProfile.avatar} alt ={myProfile.name} className="my-avatar" />
              <div className="my-details">
                <div className="my-name-rating">
                  <strong>{myProfile.name}</strong>
                  <span className="rating">⭐ {myProfile.rating} ({myProfile.reviews} reviews)</span>
                </div>
                <div className="my-languages">
                  <strong>Languages:</strong> {myProfile.languages.join(", ")}
                </div>
                <div className="my-specialty">
                  <strong>Specialty:</strong> {myProfile.specialty}
                </div>
                <p className="welcome-message">
                  Welcome to my website! I am {myProfile.name.split(' ')[0]}, your personal language teacher. 
                  Let's book a lesson that fits your schedule and learning goals!
                </p>
              </div>  
            </div>  
          </div>

          {/* Calendar */}
          <div className="booking-card">
            <div className="calendar-header">
              <h3>{format(currentMonth, "MMMM yyyy")}</h3>
              <div className="calendar-nav">
                <button className="accent-button" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}></button>
                <button className="accent-button" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}></button>
              </div>  
            </div>
            <div className="days-grid">
              {
                ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="day-label">{day}</div>
                ))
              }
              {paddingDays.map((_, i) => <div key={`p-${i}`} />)}
              {days.map(day => {
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const isAvailable = isDateAvailable(day);
                return (
                  <button 
                    key={day.toISOString()}
                    onClick={() => isAvailable && setSelectedDate(day)}
                    disabled={!isAvailable}
                    className={`day-cell ${isSelected ? "selected" : ""} ${isToday(day) ? "today" : ""} ${!isAvailable ? "disabled": ""}`}
                  >
                    {format(day, "d")}
                  </button>
                );
              })}
            </div>
          </div>  

          {/* Hours */}
          {selectedDate && (
            <div className="booking-card">
              <h3>Select Time</h3>
              <div className="time-grid">
                {timeSlots.map(time => (
                  <button 
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`time-slot ${selectedTime === time ? "selected" : ""}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Types of Classes */}
          <div className="booking-card">
            <h3>Choose Meeting Type</h3>
            {lessonTypes.map(lesson => (
              <button
                key={lesson.id}
                onClick={() => setSelectedType(lesson.id)}
                className={`lesson-card ${selectedType === lesson.id ? "selected" : ""}`}
              >
                <div className="lesson-header">
                  <strong>{lesson.name}</strong>
                  <span className="lesson-price">${lesson.price}</span>
                </div>
                <p className="lesson-description">{lesson.description}</p>
                <span className="lesson-duration">{lesson.duration}</span>
              </button>
            ))}
          </div>

          {/* Payments */}
          <div className="booking-card">
            <h3>Payment Method</h3>
            {paymentMethods.map(method => (
              <button
                key = {method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`payment-option ${selectedPayment === method.id ? "selected" : ""}`}
              >
                <span>{method.name}</span>
                <div className={`radio-circle ${selectedPayment === method.id ? "checked" : ""}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="booking-right">
          <div className="booking-card summary-card">
            <h3>Booking Summary</h3>

            <div className="teacher-summary">
              <div className="teacher-summary-header">
                <img src={myProfile.avatar} alt={myProfile.name} className="summary-avatar" />
                <div>
                  <strong>{myProfile.name}</strong>
                  <div className="summary-rating"> * {myProfile.rating} ({myProfile.reviews} reviews)</div>
                </div>
              </div>
            </div>

            <div className="summary-item">
              <span>Date</span>
              <span>{selectedDate ? format(selectedDate, "MMM d, yyy") : "—"}</span>  
            </div>
            <div className="summary-item">
              <span>Time</span>
              <span>{selectedTime || "—"}</span>  
            </div>
            <div className="summary-item">
              <span>Lesson Type</span>
              <span>{selectedType ? (lessonTypes.find(l => l.id === selectedType) || {name: "—"}).name : "—"}</span>  
            </div>
            <div className="summary-item">
              <span>Duration</span>
              <span>{selectedType ? (lessonTypes.find(l => l.id === selectedType) || {duration: "—"}).duration : "—"}</span>  
            </div>
            <div className="summary-item">
              <span>Payment</span>
              <span>{selectedPayment ? 
                (paymentMethods.find(p => p.id === selectedPayment) || {name: "—"}).name : "—"}</span>
            </div>

            <div className="summary-total">
              <div className="total-row">
                <span>
                  {selectedType ? (lessonTypes.find(l => l.id === selectedType) || {name: "Lesson"}).name : "Lesson"}
                </span>
                <span>€{price}.00</span>
              </div>
              <div className="total-row total-final">
                <span>Total</span>
                <span>€{price}.00</span>
              </div>
            </div>

            {/* Calendly Button */}
            <button 
              onClick={handleOpenCalendly}
              disabled={!isComplete}
              className={`confirm-button ${isComplete ? "" : "disabled"}`}
            >
              {isComplete ? "Schedule Your Lesson" : "Complete all fields"}
            </button>

            <p className="calendly-note">
              You'll be redirected to my Calendly to confirm your time slot.
            </p>
          </div>
        </div>
      </div>

      {/* Calendly Modal */}
      {isCalendlyOpen && (
        <PopupModal
          url={myProfile.calendlyUrl}
          prefill={{
            date: formatDateForCalendly(selectedDate, selectedTime),
            name: "Student Name", // will be provided by the form
            email: "", // possible to add email field
            customAnswers: {
              a1: `Lesson Type: ${lessonTypes.find(l => l.id === selectedType).name}`,
              a2: `Duration: ${lessonTypes.find(l => l.id === selectedType).duration}`,
              a3: `Selected Time: ${selectedDate ? format(selectedDate, "MMM d, yyyy") : ""} ${selectedTime || ""}`
            }
          }}
          onModalClose={() => setIsCalendlyOpen(false)}
          open={isCalendlyOpen}
          rootElement={document.getElementById("root")}
        />
      )}
    </section>
  );
};

export default BookingSection;