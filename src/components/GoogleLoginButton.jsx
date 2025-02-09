import { toast } from "react-toastify";
import { loginWithGoogle } from "../store/asyncThunks/authThunk";
import { GoogleLogin } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const handleGoogleLogin = async () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${encodeURIComponent(import.meta.env.VITE_GOOGLE_CLIENT_ID)}` +
        `&redirect_uri=${encodeURIComponent(import.meta.env.VITE_GOOGLE_REDIRECT_URI)}` +
        `&response_type=token` +
        `&scope=openid%20email%20profile`;

    window.open(googleAuthUrl, "_self");

};

const GoogleLoginButton = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // if you want to login using google redirect window instead of popup
    useEffect(() => {
        // Extract token from URL hash
        const hashParams = new URLSearchParams(location.hash.substring(1));
        const token = hashParams.get("access_token");

        if (token) {
            try {
                // Dispatch the loginWithGoogle thunk with the token
                dispatch(loginWithGoogle(token)).unwrap()
                    .then(() => {

                        navigate(-3);
                        toast.success(<p className='font-sans font-semibold'>Google Login successful!</p>, options);
                    })
            } catch (error) {
                toast.error(<p className='font-sans font-semibold'>Google Login failed</p>, options);
            }
        }
    }, [location]);

    return (
        <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-white text-black font-semibold rounded-lg shadow-lg transition focus:outline-none"
        >
            <img
                src="../../../src/assets/googleLogo.png"
                alt="Google Logo"
                className="w-5 h-5"
            />
            <span className="text-black">Sign in with Google</span>
        </button>
    );
};

export default GoogleLoginButton;
