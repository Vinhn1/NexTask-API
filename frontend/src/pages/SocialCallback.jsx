import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SocialCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { loginWithTokens } = useAuth();

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');

        if (accessToken && refreshToken) {
            loginWithTokens(accessToken, refreshToken)
                .then(() => {
                    navigate('/dashboard');
                })
                .catch((err) => {
                    console.error('Social login failed:', err);
                    navigate('/auth?error=social_failed');
                });
        } else {
            navigate('/auth?error=missing_tokens');
        }
    }, [searchParams, loginWithTokens, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcf8ff]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#4648d4] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[#464554] font-medium animate-pulse">Authenticating with Social Account...</p>
            </div>
        </div>
    );
};

export default SocialCallback;
