import OrganizationSchema from './OrganizationSchema';

const HomeSEO = () => {
  // Metadata is handled via generateMetadata in page.tsx
  // This component only renders schema markup
  return <OrganizationSchema />;
};

export default HomeSEO;
