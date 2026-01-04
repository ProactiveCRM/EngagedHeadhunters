"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { PasswordStrengthIndicator } from '@/components/auth/PasswordStrengthIndicator';
import { ArrowLeft, Mail } from 'lucide-react';
import { signInSchema, signUpSchema, forgotPasswordSchema, resetPasswordSchema } from '@/lib/validation';
import { cn } from '@/lib/utils';

function AuthContent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<'auth' | 'forgot' | 'reset'>('auth');
    const [resetEmailSent, setResetEmailSent] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { signIn, signUp, resetPassword, updatePassword, user } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();

    const clearError = (field: string) => {
        if (errors[field]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[field];
                return next;
            });
        }
    };

    useEffect(() => {
        // Check for mode=reset in URL (from password reset email)
        const urlMode = searchParams.get('mode');
        if (urlMode === 'reset') {
            setMode('reset');
        }

        // Check for type=recovery in hash (Supabase recovery flow)
        if (typeof window !== 'undefined') {
            const hash = window.location.hash.substring(1);
            if (hash) {
                const params = new URLSearchParams(hash);
                const type = params.get('type');
                if (type === 'recovery') {
                    setMode('reset');
                }
            }
        }
    }, [searchParams]);

    useEffect(() => {
        // Redirect if already authenticated (but not if in reset mode)
        if (user && mode !== 'reset') {
            router.push('/agent/dashboard');
            return;
        }

        if (typeof window !== 'undefined') {
            // Parse URL hash for auth errors
            const hash = window.location.hash.substring(1);
            if (hash) {
                const params = new URLSearchParams(hash);
                const errorCode = params.get('error_code');
                const errorDescription = params.get('error_description');

                if (errorCode) {
                    const friendlyMessages: Record<string, string> = {
                        'otp_expired': 'This email link has expired or was already used. Please request a new password reset.',
                        'access_denied': 'Authentication was denied. Please try again.',
                        'invalid_request': 'Invalid authentication request. Please try again.',
                    };

                    toast({
                        title: "Authentication Notice",
                        description: friendlyMessages[errorCode] || decodeURIComponent(errorDescription || 'An error occurred'),
                    });

                    // Clear the hash from URL
                    window.history.replaceState(null, '', window.location.pathname + window.location.search);
                }
            }
        }
    }, [user, router, toast, mode]);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const result = signInSchema.safeParse({ email, password });
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach(err => {
                if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setLoading(true);
        const { error } = await signIn(result.data.email, result.data.password);

        if (error) {
            toast({
                title: "Sign in failed",
                description: error.message,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Welcome back!",
                description: "You've been signed in successfully.",
            });
            router.push('/agent/dashboard');
        }

        setLoading(false);
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const result = signUpSchema.safeParse({ email, password });
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach(err => {
                if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setLoading(true);
        const { error } = await signUp(result.data.email, result.data.password);

        if (error) {
            toast({
                title: "Sign up failed",
                description: error.message,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Account created!",
                description: "Please check your email to verify your account.",
            });
        }

        setLoading(false);
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const result = forgotPasswordSchema.safeParse({ email });
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach(err => {
                if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setLoading(true);
        const { error } = await resetPassword(result.data.email);

        if (error) {
            toast({
                title: "Reset failed",
                description: error.message,
                variant: "destructive",
            });
        } else {
            setResetEmailSent(true);
            toast({
                title: "Check your email",
                description: "We've sent you a password reset link.",
            });
        }

        setLoading(false);
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const result = resetPasswordSchema.safeParse({ password, confirmPassword });
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach(err => {
                if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setLoading(true);
        const { error } = await updatePassword(result.data.password);

        if (error) {
            toast({
                title: "Update failed",
                description: error.message,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Password updated!",
                description: "Your password has been changed successfully.",
            });
            if (typeof window !== 'undefined') {
                window.history.replaceState(null, '', '/auth');
            }
            router.push('/agent/dashboard');
        }

        setLoading(false);
    };

    const renderForgotPasswordForm = () => (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
                <CardDescription className="text-center">
                    {resetEmailSent
                        ? "Check your inbox for the reset link"
                        : "Enter your email to receive a password reset link"
                    }
                </CardDescription>
            </CardHeader>
            <CardContent>
                {resetEmailSent ? (
                    <div className="text-center space-y-4">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            We've sent a password reset link to <strong>{email}</strong>.
                            Click the link in the email to reset your password.
                        </p>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                                setMode('auth');
                                setResetEmailSent(false);
                                setEmail('');
                                setErrors({});
                            }}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Sign In
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="reset-email">Email</Label>
                            <Input
                                id="reset-email"
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    clearError('email');
                                }}
                                className={cn(errors.email && "border-destructive")}
                            />
                            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            className="w-full"
                            onClick={() => {
                                setMode('auth');
                                setErrors({});
                            }}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Sign In
                        </Button>
                    </form>
                )}
            </CardContent>
        </Card>
    );

    const renderResetPasswordForm = () => (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Set New Password</CardTitle>
                <CardDescription className="text-center">
                    Enter your new password below
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                            id="new-password"
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                clearError('password');
                            }}
                            className={cn(errors.password && "border-destructive")}
                        />
                        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                        {password && !errors.password && <PasswordStrengthIndicator password={password} />}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                clearError('confirmPassword');
                            }}
                            className={cn(errors.confirmPassword && "border-destructive")}
                        />
                        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );

    const renderAuthForm = () => (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Welcome</CardTitle>
                <CardDescription className="text-center">
                    Sign in to your agent account or create a new one
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="signin" className="w-full" onValueChange={() => setErrors({})}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signin">
                        <form onSubmit={handleSignIn} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="signin-email">Email</Label>
                                <Input
                                    id="signin-email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        clearError('email');
                                    }}
                                    className={cn(errors.email && "border-destructive")}
                                />
                                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="signin-password">Password</Label>
                                <Input
                                    id="signin-password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        clearError('password');
                                    }}
                                    className={cn(errors.password && "border-destructive")}
                                />
                                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </Button>
                            <button
                                type="button"
                                className="w-full text-sm text-primary hover:underline"
                                onClick={() => {
                                    setMode('forgot');
                                    setErrors({});
                                }}
                            >
                                Forgot your password?
                            </button>
                        </form>
                    </TabsContent>

                    <TabsContent value="signup">
                        <form onSubmit={handleSignUp} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="signup-email">Email</Label>
                                <Input
                                    id="signup-email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        clearError('email');
                                    }}
                                    className={cn(errors.email && "border-destructive")}
                                />
                                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="signup-password">Password</Label>
                                <Input
                                    id="signup-password"
                                    type="password"
                                    placeholder="Choose a strong password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        clearError('password');
                                    }}
                                    className={cn(errors.password && "border-destructive")}
                                />
                                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                                {password && !errors.password && <PasswordStrengthIndicator password={password} />}
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? 'Creating account...' : 'Create Account'}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );

    return (
        <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary mb-2">Agent Portal</h1>
                <p className="text-muted-foreground">
                    {mode === 'reset'
                        ? 'Create a new password for your account'
                        : mode === 'forgot'
                            ? 'Reset your password'
                            : 'Access your dashboard to manage your profile and blog content'
                    }
                </p>
            </div>

            {mode === 'forgot' && renderForgotPasswordForm()}
            {mode === 'reset' && renderResetPasswordForm()}
            {mode === 'auth' && renderAuthForm()}

            <div className="text-center mt-6">
                <Link
                    href="/"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                    ← Back to homepage
                </Link>
            </div>
        </div>
    );
}

const AuthClient = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="container mx-auto px-4 pt-28 pb-16">
                <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
                    <AuthContent />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
};

export default AuthClient;
