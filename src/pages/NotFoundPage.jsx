import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { displayContext } from '../context/displayContext';

const NotFoundPage = () => {
  const { setNotFound } = useContext(displayContext)
  return (
    <section className=" bg-slate-200 h-screen flex flex-col items-center justify-center">

      <p className="text-9xl text-center text-black mb-20">404</p>
      <div className=" text-black flex justify-center flex-col items-center">
        <img src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png" alt="Monkey searching" />
        <h2 className="text-3xl font-semibold text-black ">Look like you're lost!</h2>
        <p className='text-black' >The page you are looking for is not available!</p>
        <Link
          to="/"
          onClick={() => setNotFound(false)}
          className="inline-block px-6 py-3 my-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-lg font-bold rounded-full shadow-lg transition-transform duration-200 hover:scale-105 "
        >
          Go to Home
        </Link>
      </div>

    </section>
  );
};

export default NotFoundPage;
