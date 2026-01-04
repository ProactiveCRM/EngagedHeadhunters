import { useState, useEffect } from 'react';
import { } from 'next/navigation';
import Link from 'next/link';
import { Users, FileText, MessageSquare, Settings, ChevronRight, UserCheck, UserX, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AdminRoute from '@/components/AdminRoute';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, LineChart, Line } from 'recharts';

interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  role: string | null;
  is_active: boolean | null;
  created_at: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  status: string | null;
  created_at: string | null;
  source_page: string | null;
  inquiry_type: string | null;
}

interface AnalyticsData {
  bySource: { name: string; count: number }[];
  byInquiry: { name: string; count: number }[];
  byDate: { date: string; count: number }[];
}

const COLORS = ['#0179D9', '#FF6B35', '#002855', '#10B981', '#8B5CF6', '#F59E0B'];

const AdminDashboardContent = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData>({ bySource: [], byInquiry: [], byDate: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    // Fetch profiles
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
    } else {
      setProfiles(profilesData || []);
    }

    // Fetch contact submissions with new fields
    const { data: submissionsData, error: submissionsError } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (submissionsError) {
      console.error('Error fetching submissions:', submissionsError);
    } else {
      setSubmissions(submissionsData || []);

      // Process analytics data
      const bySourceMap = new Map<string, number>();
      const byInquiryMap = new Map<string, number>();
      const byDateMap = new Map<string, number>();

      (submissionsData || []).forEach((sub) => {
        // By source
        const source = sub.source_page || 'Unknown';
        bySourceMap.set(source, (bySourceMap.get(source) || 0) + 1);

        // By inquiry type
        const inquiry = sub.inquiry_type || 'General';
        byInquiryMap.set(inquiry, (byInquiryMap.get(inquiry) || 0) + 1);

        // By date
        if (sub.created_at) {
          const date = sub.created_at.split('T')[0];
          byDateMap.set(date, (byDateMap.get(date) || 0) + 1);
        }
      });

      setAnalytics({
        bySource: Array.from(bySourceMap.entries())
          .map(([name, count]) => ({ name: formatSourceName(name), count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 8),
        byInquiry: Array.from(byInquiryMap.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count),
        byDate: Array.from(byDateMap.entries())
          .map(([date, count]) => ({ date, count }))
          .sort((a, b) => a.date.localeCompare(b.date))
          .slice(-14),
      });
    }

    setLoading(false);
  }

  function formatSourceName(source: string): string {
    return source
      .replace(/-page$/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  const pendingAgents = profiles.filter(p => p.role === 'agent' && !p.is_active);
  const activeAgents = profiles.filter(p => p.role === 'agent' && p.is_active);
  const newSubmissions = submissions.filter(s => s.status === 'new');
  const totalSubmissions = submissions.length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage agents, content, and site operations</p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="text-primary" size={24} />
                </div>
                <span className="text-3xl font-bold text-foreground">{profiles.length}</span>
              </div>
              <h3 className="font-semibold text-foreground">Total Users</h3>
              <p className="text-sm text-muted-foreground">All registered profiles</p>
            </div>

            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <UserCheck className="text-yellow-600" size={24} />
                </div>
                <span className="text-3xl font-bold text-foreground">{pendingAgents.length}</span>
              </div>
              <h3 className="font-semibold text-foreground">Pending Agents</h3>
              <p className="text-sm text-muted-foreground">Awaiting approval</p>
            </div>

            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <UserX className="text-green-600" size={24} />
                </div>
                <span className="text-3xl font-bold text-foreground">{activeAgents.length}</span>
              </div>
              <h3 className="font-semibold text-foreground">Active Agents</h3>
              <p className="text-sm text-muted-foreground">Currently active</p>
            </div>

            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-accent/20 p-3 rounded-full">
                  <MessageSquare className="text-accent" size={24} />
                </div>
                <span className="text-3xl font-bold text-foreground">{newSubmissions.length}</span>
              </div>
              <h3 className="font-semibold text-foreground">New Inquiries</h3>
              <p className="text-sm text-muted-foreground">Contact submissions</p>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <BarChart3 className="text-primary" size={24} />
              Form Submission Analytics
            </h2>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Submissions by Source Page */}
              <div className="bg-card rounded-xl p-6 border shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4">Submissions by Source Page</h3>
                {analytics.bySource.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.bySource} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
                      <RechartsTooltip />
                      <Bar dataKey="count" fill="#0179D9" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    No source data available yet
                  </div>
                )}
              </div>

              {/* Submissions by Inquiry Type */}
              <div className="bg-card rounded-xl p-6 border shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4">Submissions by Inquiry Type</h3>
                {analytics.byInquiry.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPie>
                      <Pie
                        data={analytics.byInquiry}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {analytics.byInquiry.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </RechartsPie>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    No inquiry type data available yet
                  </div>
                )}
              </div>
            </div>

            {/* Submissions Over Time */}
            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="text-primary" size={20} />
                Submissions Over Time (Last 14 Days)
              </h3>
              {analytics.byDate.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={analytics.byDate}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <RechartsTooltip />
                    <Line type="monotone" dataKey="count" stroke="#0179D9" strokeWidth={2} dot={{ fill: '#0179D9' }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                  No date data available yet
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link
              href="/admin/agents"
              className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Manage Agents</h3>
                  <p className="text-sm text-muted-foreground">Approve and edit agent profiles</p>
                </div>
                <ChevronRight className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>

            <Link
              href="/agent/blog"
              className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Blog Manager</h3>
                  <p className="text-sm text-muted-foreground">Create and manage posts</p>
                </div>
                <ChevronRight className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>

            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Total Submissions</h3>
                  <p className="text-2xl font-bold text-primary">{totalSubmissions}</p>
                </div>
                <PieChart className="text-primary" size={24} />
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border shadow-sm opacity-60">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Settings</h3>
                  <p className="text-sm text-muted-foreground">Coming soon</p>
                </div>
                <Settings className="text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Profiles */}
            <div className="bg-card rounded-xl border shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-foreground">Recent Profiles</h2>
              </div>
              <div className="divide-y">
                {loading ? (
                  <div className="p-6 text-center text-muted-foreground">Loading...</div>
                ) : profiles.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">No profiles found</div>
                ) : (
                  profiles.slice(0, 5).map((profile) => (
                    <div key={profile.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{profile.full_name || profile.username}</p>
                        <p className="text-sm text-muted-foreground">{profile.role || 'user'}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${profile.is_active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                          }`}>
                          {profile.is_active ? 'Active' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {profiles.length > 0 && (
                <div className="p-4 border-t">
                  <Link href="/admin/agents" className="text-primary hover:underline text-sm font-medium">
                    View all profiles →
                  </Link>
                </div>
              )}
            </div>

            {/* Recent Submissions */}
            <div className="bg-card rounded-xl border shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-foreground">Recent Contact Submissions</h2>
              </div>
              <div className="divide-y">
                {loading ? (
                  <div className="p-6 text-center text-muted-foreground">Loading...</div>
                ) : submissions.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">No submissions found</div>
                ) : (
                  submissions.slice(0, 5).map((submission) => (
                    <div key={submission.id} className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-foreground">{submission.name}</p>
                        <span className={`px-2 py-1 rounded-full text-xs ${submission.status === 'new'
                            ? 'bg-accent/20 text-accent'
                            : 'bg-muted text-muted-foreground'
                          }`}>
                          {submission.status || 'new'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{submission.email}</p>
                      {submission.source_page && (
                        <p className="text-xs text-primary mt-1">Source: {formatSourceName(submission.source_page)}</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const AdminDashboard = () => (
  <AdminRoute>
    <AdminDashboardContent />
  </AdminRoute>
);

export default AdminDashboard;