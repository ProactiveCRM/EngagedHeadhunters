"use client";

import { useEffect, useState } from "react";
import { getLatestBlogPosts, getActiveJobs } from "@/lib/builder-supabase";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Calendar } from "lucide-react";

/**
 * Renders the latest blog posts fetched from Supabase.
 */
export function LatestBlogPosts({ limit = 3, title = "Latest from our Blog" }: { limit?: number; title?: string }) {
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            const data = await getLatestBlogPosts(limit);
            setPosts(data);
            setIsLoading(false);
        }
        fetchPosts();
    }, [limit]);

    if (isLoading) return <div className="py-10 text-center">Loading posts...</div>;
    if (posts.length === 0) return null;

    return (
        <section className="py-12">
            <div className="flex justify-between items-end mb-8">
                <h2 className="text-3xl font-bold">{title}</h2>
                <Button variant="ghost" asChild>
                    <Link href="/blog">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-all">
                        {post.featured_image && (
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={post.featured_image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        )}
                        <CardHeader>
                            <div className="text-xs text-primary font-bold mb-2 uppercase tracking-wider">{post.category}</div>
                            <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                                <Link href={`/blog/${post.slug || post.id}`}>{post.title}</Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                            <div className="flex items-center text-xs text-muted-foreground italic">
                                <Calendar className="mr-1 h-3 w-3" />
                                {new Date(post.created_at).toLocaleDateString()}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}

/**
 * Renders active job openings fetched from Supabase.
 */
export function ActiveJobsGrid({ limit = 4, title = "Current Job Openings" }: { limit?: number; title?: string }) {
    const [jobs, setJobs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchJobs() {
            const data = await getActiveJobs(limit);
            setJobs(data);
            setIsLoading(false);
        }
        fetchJobs();
    }, [limit]);

    if (isLoading) return <div className="py-10 text-center">Loading jobs...</div>;
    if (jobs.length === 0) return null;

    return (
        <section className="py-12 bg-muted/30 rounded-3xl px-8">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                <p className="text-muted-foreground">Exclusive opportunities across healthcare, tech, and finance.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {jobs.map((job) => (
                    <Card key={job.id} className="border-primary/10 hover:border-primary/40 transition-colors">
                        <CardContent className="p-6">
                            <Briefcase className="h-8 w-8 text-primary mb-4" />
                            <h3 className="font-bold text-lg mb-1 line-clamp-1">{job.job_title}</h3>
                            <div className="text-sm text-muted-foreground mb-4">{job.location} • {job.employment_type}</div>
                            <Button variant="outline" size="sm" className="w-full" asChild>
                                <a href={`https://jobs.engagedheadhunters.com/jobs/${job.id}`} target="_blank" rel="noopener">View Details</a>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="text-center mt-8">
                <Button asChild>
                    <a href="https://jobs.engagedheadhunters.com" target="_blank" rel="noopener">View All Openings</a>
                </Button>
            </div>
        </section>
    );
}
