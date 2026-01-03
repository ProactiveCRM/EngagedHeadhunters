import { useState, useEffect } from 'react';
import {   } from 'next/navigation';
import Link from 'next/link';
import { Plus, FolderOpen, Users, MessageSquare, TrendingUp, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import AdminRoute from '@/components/AdminRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

interface DashboardStats {
  totalListings: number;
  activeAgents: number;
  newSubmissions: number;
  totalUsers: number;
}

const AdminDashboardContent = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalListings: 0,
    activeAgents: 0,
    newSubmissions: 0,
    totalUsers: 0,
  });
  const [submissionsByDate, setSubmissionsByDate] = useState<{ date: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);

    const [listingsRes, profilesRes, submissionsRes] = await Promise.all([
      supabase.from('directory_listings').select('id', { count: 'exact' }),
      supabase.from('profiles').select('id, role, is_active'),
      supabase.from('contact_submissions').select('id, created_at, status').order('created_at', { ascending: false }).limit(100),
    ]);

    // Calculate stats
    const profiles = profilesRes.data || [];
    const submissions = submissionsRes.data || [];

    setStats({
      totalListings: listingsRes.count || 0,
      activeAgents: profiles.filter(p => p.role === 'agent' && p.is_active).length,
      newSubmissions: submissions.filter(s => s.status === 'new').length,
      totalUsers: profiles.length,
    });

    // Process submissions by date
    const byDateMap = new Map<string, number>();
    submissions.forEach(sub => {
      if (sub.created_at) {
        const date = sub.created_at.split('T')[0];
        byDateMap.set(date, (byDateMap.get(date) || 0) + 1);
      }
    });
    setSubmissionsByDate(
      Array.from(byDateMap.entries())
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(-14)
    );

    setLoading(false);
  }

  return (
    <DashboardLayout title="Dashboard">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button asChild>
          <Link href="/admin/directory/new" className="gap-2">
            <Plus className="h-4 w-4" />
            New Listing
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/admin/directory">View All Listings</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/admin/users">Manage Users</Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Directory Listings"
          value={stats.totalListings}
          description="Active listings"
          icon={<FolderOpen className="h-5 w-5 text-primary" />}
        />
        <StatsCard
          title="Active Agents"
          value={stats.activeAgents}
          description="Approved recruiters"
          icon={<Users className="h-5 w-5 text-primary" />}
        />
        <StatsCard
          title="New Submissions"
          value={stats.newSubmissions}
          description="Pending review"
          icon={<MessageSquare className="h-5 w-5 text-primary" />}
        />
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          description="All profiles"
          icon={<Users className="h-5 w-5 text-primary" />}
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Submissions Over Time */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Submissions (Last 14 Days)
          </h3>
          {submissionsByDate.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={submissionsByDate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis />
                <RechartsTooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-muted-foreground">
              No data yet
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              href="/admin/directory"
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FolderOpen className="h-5 w-5 text-primary" />
                <span className="font-medium">Manage Directory</span>
              </div>
              <span className="text-muted-foreground">→</span>
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium">User Management</span>
              </div>
              <span className="text-muted-foreground">→</span>
            </Link>
            <Link
              href="/admin/submissions"
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span className="font-medium">View Submissions</span>
              </div>
              <span className="text-muted-foreground">→</span>
            </Link>
            <Link
              href="/admin/blog"
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-medium">Blog Posts</span>
              </div>
              <span className="text-muted-foreground">→</span>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const NewAdminDashboard = () => (
  <AdminRoute>
    <AdminDashboardContent />
  </AdminRoute>
);

export default NewAdminDashboard;
