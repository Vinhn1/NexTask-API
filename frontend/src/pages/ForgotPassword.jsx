import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/v1/auth/forgot-password', { email });
            setIsSubmitted(true);
            toast.success('Reset link sent to your email!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fcf8ff] flex flex-col items-center justify-center p-6 font-['Inter']">
            <div className="mb-10 flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4648d4] to-[#06b6d4] rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center">
                    <span className="text-white font-black text-2xl">N</span>
                </div>
                <span className="text-xl font-bold text-[#1b1b23] tracking-tighter">NexTask</span>
            </div>

            <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(99,102,241,0.08)] border border-indigo-50 p-10 backdrop-blur-xl">
                {!isSubmitted ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <header className="mb-8">
                            <h1 className="text-[28px] font-extrabold text-[#1b1b23] leading-tight tracking-tight mb-3">
                                Forgot password?
                            </h1>
                            <p className="text-[#464554] text-sm leading-relaxed">
                                No worries, we'll send you reset instructions. Enter the email associated with your account.
                            </p>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-[#1b1b23] uppercase tracking-[0.1em]">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="e.g. vinh@nextask.com"
                                    className="w-full px-4 py-3.5 bg-[#fcf8ff] border border-slate-200 rounded-xl text-sm
                                             focus:outline-none focus:border-[#4648d4] focus:ring-4 focus:ring-indigo-50 
                                             transition-all duration-300 placeholder:text-slate-400"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-[#4648d4] text-white font-bold rounded-xl
                                         shadow-[0_8px_20px_rgba(70,72,212,0.25)] hover:shadow-[0_12px_25px_rgba(70,72,212,0.35)]
                                         hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="text-center animate-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-indigo-50 text-[#4648d4] rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-extrabold text-[#1b1b23] mb-3">Check your email</h2>
                        <p className="text-[#464554] text-sm mb-8 px-4">
                            We've sent a password reset link to <br/><span className="font-bold text-[#1b1b23]">{email}</span>
                        </p>
                        <button 
                            onClick={handleSubmit}
                            className="text-sm font-bold text-[#4648d4] hover:text-[#2f2ebe] transition-colors"
                        >
                            Didn't receive the email? Click to resend
                        </button>
                    </div>
                )}

                <footer className="mt-10 pt-6 border-t border-slate-50 text-center">
                    <Link to="/auth" className="text-sm font-bold text-slate-500 hover:text-[#4648d4] transition-colors inline-flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Log In
                    </Link>
                </footer>
            </div>
        </div>
    );
};

export default ForgotPassword;
