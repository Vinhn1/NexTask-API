import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error('Passwords do not match!');
        }

        setLoading(true);
        try {
            await axios.post(`/api/v1/auth/reset-password/${token}`, { password });
            toast.success('Password reset successfully!');
            navigate('/auth');
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
                <header className="mb-8">
                    <h1 className="text-[28px] font-extrabold text-[#1b1b23] leading-tight tracking-tight mb-3">
                        Set new password
                    </h1>
                    <p className="text-[#464554] text-sm leading-relaxed">
                        Your new password must be different from previously used passwords.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-[#1b1b23] uppercase tracking-[0.1em]">
                            New Password
                        </label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-3.5 bg-[#fcf8ff] border border-slate-200 rounded-xl text-sm
                                     focus:outline-none focus:border-[#4648d4] focus:ring-4 focus:ring-indigo-50 
                                     transition-all duration-300 placeholder:text-slate-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-[#1b1b23] uppercase tracking-[0.1em]">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-3.5 bg-[#fcf8ff] border border-slate-200 rounded-xl text-sm
                                     focus:outline-none focus:border-[#4648d4] focus:ring-4 focus:ring-indigo-50 
                                     transition-all duration-300 placeholder:text-slate-400"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-[#4648d4] text-white font-bold rounded-xl
                                 shadow-[0_8px_20px_rgba(70,72,212,0.25)] hover:shadow-[0_12px_25px_rgba(70,72,212,0.35)]
                                 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                <footer className="mt-10 pt-6 border-t border-slate-50 text-center">
                    <Link to="/auth" className="text-sm font-bold text-slate-500 hover:text-[#4648d4] transition-colors inline-flex items-center gap-2">
                        Back to Log In
                    </Link>
                </footer>
            </div>
        </div>
    );
};
