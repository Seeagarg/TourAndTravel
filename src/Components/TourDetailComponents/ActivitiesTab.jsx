import styles from "./ActivitiesTab.module.css";

const ActivitiesTab = ({ tour }) => {
  if (!tour) return null;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Iconic Experiences in {tour.place}</h2>

      <div className={styles.experiences}>
        {(tour.activities?.length > 0 ? tour.activities : tour.highlights).map((item, index) => (
          <div key={index} className={styles.experienceCard}>
            <img 
              src={tour.images?.activity || `https://picsum.photos/400/300?sig=${index}`} 
              alt={item} 
            />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className={styles.itinerarySummary}>
        {tour.itinerary.slice(0, 3).map((day, idx) => (
          <div key={idx} className={styles.dayHeader}>
            <span className={styles.dayBadge}>DAY {day.day}</span>
            <h3 className={styles.dayTitle}>{day.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesTab;
