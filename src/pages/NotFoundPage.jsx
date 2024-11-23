import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../NotFoundPage.css'; // Assuming you're adding the CSS to a separate file
import { displayContext } from '../context/displayContext';

const NotFoundPage = () => {
  const {setNotFound} = useContext(displayContext)
  return (
    <section className="page_404 h-screen flex items-center justify-center">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className="four_zero_four_bg">
                <p className="text-9xl text-center text-black ">404</p>
              </div>

              <div className="contant_box_404 text-black">
                <h2 className="text-3xl font-semibold text-black font-serif">Look like you're lost !</h2>
                <p className='text-black' >The page you are looking for is not available!</p>
                <Link
                  to="/"
                  onClick={() => setNotFound(false)}
                  className="inline-block px-6 py-3 my-4 bg-gradient-to-r from-green-500 to-green-700 text-white text-lg font-bold rounded-full shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
