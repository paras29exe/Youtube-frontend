import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProtectedComponent = ({ children }) => {
    const { userData } = useSelector(state => state.auth)

    useEffect(() => { }, [userData])

    if (!userData) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-zinc-900">
                <div className="max-w-md w-full mx-4 bg-zinc-800 rounded-lg shadow-lg p-6">
                    <div className="text-center">
                        <div className="text-6xl text-blue-500 dark:text-white mb-4">🎥</div>
                        <h2 className="text-2xl font-bold text-blue-500 dark:text-white mb-2">Access Denied</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-4">You are not authorized to view this page.</p>
                        <Link to={"/auth/api/v1/login"} className="block w-full bg-blue-500 text-white hover:bg-blue-500/80 py-2 rounded-md mb-2">Log In</Link>
                        <Link to={"/"} className="block w-full bg-zinc-600 text-white hover:bg-zinc-600/80 py-2 rounded-md">Homepage</Link>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedComponent;