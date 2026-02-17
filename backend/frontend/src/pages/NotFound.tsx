import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#1a1d29] via-[#23273a] to-[#2d3142] p-5">
      
      <div className="text-center bg-[#1e212e]/90 backdrop-blur-2xl rounded-3xl p-12 shadow-[0_25px_80px_rgba(0,0,0,0.6)] border border-white/5 transition-all duration-500 hover:shadow-[0_30px_100px_rgba(74,159,245,0.25)] max-w-lg w-full">
        
        {/* 404 Number */}
        <h1 className="text-[120px] font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#4A9FF5] to-[#6BB5FF] leading-none animate-pulse">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mt-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-white/60 mt-3">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-block mt-8 px-8 py-3 bg-linear-to-r from-[#4A9FF5] to-[#357ABD] text-white rounded-xl font-bold tracking-wide shadow-lg transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_10px_30px_rgba(74,159,245,0.4)] active:scale-[0.95]"
        >
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
