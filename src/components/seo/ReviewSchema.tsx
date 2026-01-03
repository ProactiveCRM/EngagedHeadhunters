import { Helmet } from 'react-helmet-async';

interface Review {
  author: string;
  reviewBody: string;
  ratingValue: number;
  datePublished?: string;
}

interface ReviewSchemaProps {
  reviews: Review[];
  itemReviewed?: {
    name: string;
    type: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
  };
}

const ReviewSchema = ({ 
  reviews, 
  itemReviewed = { name: "Engaged Headhunters", type: "Organization" },
  aggregateRating
}: ReviewSchemaProps) => {
  const reviewSchemas = reviews.map((review, index) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewBody": review.reviewBody,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.ratingValue,
      "bestRating": 5,
      "worstRating": 1
    },
    "datePublished": review.datePublished || new Date().toISOString().split('T')[0],
    "itemReviewed": {
      "@type": itemReviewed.type,
      "name": itemReviewed.name
    }
  }));

  const aggregateSchema = aggregateRating ? {
    "@context": "https://schema.org",
    "@type": itemReviewed.type,
    "name": itemReviewed.name,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.ratingValue,
      "bestRating": aggregateRating.bestRating || 5,
      "worstRating": 1,
      "reviewCount": aggregateRating.reviewCount
    }
  } : null;

  return (
    <Helmet>
      {reviewSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
      {aggregateSchema && (
        <script type="application/ld+json">
          {JSON.stringify(aggregateSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default ReviewSchema;
