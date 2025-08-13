import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Characters = () => {
  return (
    <div className="min-h-screen bg-app-bg relative">
      {/* Sidebar */}
      <Sidebar activeItem="characters" />
      
      {/* Main Content */}
      <main className="ml-20 p-6 min-h-screen">
        <div className="max-w-[1320px] mx-auto">
          {/* Header */}
          <Header />
          
          {/* Content */}
          <div className="flex flex-col items-center justify-center flex-1 min-h-[400px]">
            <h1 className="text-text-primary text-3xl font-normal leading-tight mb-4">
              Characters
            </h1>
            <p className="text-text-secondary text-base font-normal leading-relaxed text-center max-w-md">
              Character management coming soon. This page will allow you to create and manage characters for your stories.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Characters;
