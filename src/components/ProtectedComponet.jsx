import { Link } from "react-router-dom";

const ProtectedComponent = ({ user, children }) => {
    if (!user) {
        return (
            <div className="flex items-center w-full justify-center min-h-screen bg-gray-900">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">You need to be logged in</h2>
                    <p className="text-gray-600 mb-6">Please log in to access this action.</p>
                    <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg text-lg hover:bg-blue-700 transition duration-200 ease-in-out">
                        Log In
                    </Link>
                </div>
            </div>

        );
    }

    return <>{children}</>;
};

export default ProtectedComponent;