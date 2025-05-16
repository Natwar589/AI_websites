export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 transition-all duration-500">
      <h1 className="text-6xl font-bold text-white mb-4 animate-bounce transition-transform duration-300 hover:scale-110">
        Hello
      </h1>
      <h2 className="text-5xl font-semibold text-yellow-300 animate-pulse transition-opacity duration-500 hover:opacity-80">
        Neelam
      </h2>
      <div className="mt-8 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-110">
        <svg 
          className="w-16 h-16 text-purple-600 transition-colors duration-300 hover:text-indigo-700" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
          />
        </svg>
      </div>
    </div>
  );
}
