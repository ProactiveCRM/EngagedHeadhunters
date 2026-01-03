import { SEOHead } from './SEOHead';
import { useAgentSEO, generatePersonSchema, generateBreadcrumbSchema } from '@/hooks/useSEOData';

interface AgentSEOProps {
  username: string;
}

export const AgentSEO = ({ username }: AgentSEOProps) => {
  const { data: agent, isLoading } = useAgentSEO(username);

  if (isLoading || !agent) {
    return null;
  }

  const name = agent.full_name || agent.username;
  const title = `${name} - ${agent.title || 'Recruiting Professional'}`;
  const description = agent.bio || agent.headline || 
    `Connect with ${name}, a professional recruiter${agent.niche ? ` specializing in ${agent.niche}` : ''} at Engaged Headhunters.`;

  const personSchema = generatePersonSchema(agent);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Agents', url: '/agents' },
    { name: name, url: `/${agent.username}` },
  ]);

  // Add aggregate rating if available
  const aggregateRatingSchema = agent.rating && agent.reviews_count ? {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: agent.rating,
    reviewCount: agent.reviews_count,
    bestRating: 5,
    worstRating: 1,
  } : null;

  return (
    <SEOHead
      title={title}
      description={description}
      canonical={`/${agent.username}`}
      type="profile"
      image={agent.avatar_url || undefined}
      keywords={agent.specialties?.join(', ') || agent.niche || undefined}
    >
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      {aggregateRatingSchema && (
        <script type="application/ld+json">
          {JSON.stringify(aggregateRatingSchema)}
        </script>
      )}
    </SEOHead>
  );
};

export default AgentSEO;
