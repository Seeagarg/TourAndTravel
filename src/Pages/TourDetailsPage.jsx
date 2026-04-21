import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import tours from "../Data/Detail.json";
import TourDetails from "./PlaceDetail";
import { getTourBySlug_api, getTourReviews_api, base_url } from "../Services/Api";
import axios from "axios";

const TourDetailsPage = () => {
  const { slug } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTourDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(getTourBySlug_api(slug));
        const result = response.data;
        if (result.status === 200 && result.data) {
          const apiTour = result.data;
          // Map API data to the format expected by PlaceDetail / TourDetailComponents
          const mappedTour = {
            id: apiTour.id,
            slug: apiTour.slug || slug,
            place: apiTour.placeName || "Himachal",
            title: apiTour.title || apiTour.tourName,
            subtitle: apiTour.shortDescription || apiTour.description || "",
            duration: apiTour.duration || "",
            starting_price: apiTour.startingPrice || apiTour.price || 0,
            original_price: apiTour.originalPrice || apiTour.price || 0,
            currency: "INR",
            rating: apiTour.rating || 4.5,
            total_reviews: apiTour.reviewsCount || 0,
            images: {
              cover: apiTour.coverImage 
                ? (apiTour.coverImage.startsWith('http') ? apiTour.coverImage : `${base_url}${apiTour.coverImage}`)
                : (apiTour.tourImages?.[0] 
                    ? (apiTour.tourImages[0].startsWith('http') ? apiTour.tourImages[0] : `${base_url}${apiTour.tourImages[0]}`)
                    : "https://picsum.photos/1200/600"),
              gallery: (apiTour.tourImages || apiTour.images || []).map(img => 
                img.startsWith('http') ? img : `${base_url}${img}`
              ),
              destination: apiTour.destinationImage,
              stay: apiTour.stayImage,
              activity: apiTour.activityImage
            },
            summary: apiTour.summary || "",
            activities: apiTour.activities || [],
            highlights: apiTour.highlights || [],
            itinerary: (apiTour.itinerary || []).map(day => ({
              ...day,
              day: day.dayNumber || day.day // Normalize day vs dayNumber
            })),
            inclusions: apiTour.inclusions || [],
            exclusions: apiTour.exclusions || [],

            faqs: apiTour.faqs || [],
            reviews: apiTour.reviews || []
          };
          setTour(mappedTour);

          // Fetch extra reviews from the new API if ID exists
          const tourId = apiTour.id || apiTour._id;
          if (tourId) {
            try {
              const reviewsResponse = await axios.get(getTourReviews_api(tourId));
              const reviewsResult = reviewsResponse.data;
              
              const rawReviews = (reviewsResult.status === 200 && Array.isArray(reviewsResult.data)) 
                ? reviewsResult.data 
                : (Array.isArray(reviewsResult) ? reviewsResult : []);

              if (rawReviews.length > 0) {
                setTour(prev => ({
                  ...prev,
                  reviews: rawReviews.map(r => ({
                    name: r.userName || r.user_name || r.name || r.reviewer_name || "Happy Traveler",
                    text: r.comment || r.review_text || r.text || r.review || "",
                    images: r.images || []
                  }))
                }));
              }
            } catch (revErr) {
              console.error("Error fetching extra reviews:", revErr);
            }
          }
        } else {
          setTour(null);
        }
      } catch (error) {
        console.error("Error fetching tour details:", error);
        setTour(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchTourDetails();
    }
  }, [slug]);

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Loading Tour Details...</h2></div>;
  if (!tour) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Tour not found</h2></div>;

  return <TourDetails tour={tour} />;
};

export default TourDetailsPage;
