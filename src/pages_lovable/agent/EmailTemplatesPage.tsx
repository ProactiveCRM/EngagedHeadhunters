import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { EmailTemplates } from '@/components/research/EmailTemplates';

const EmailTemplatesPage = () => {
  return (
    <DashboardLayout title="Email Templates">
      <EmailTemplates />
    </DashboardLayout>
  );
};

export default EmailTemplatesPage;
