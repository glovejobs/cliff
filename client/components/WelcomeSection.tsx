import { Plus, User, MapPin, Clock, ArrowUp } from 'lucide-react';

const WelcomeSection = () => {
  return (
    <section className="w-full mb-10">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center gap-6 py-20 px-40 rounded-2xl mb-6 relative">
        {/* Background placeholder */}
        <div className="absolute inset-0 bg-nav-bg rounded-2xl"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-3 text-center max-w-4xl">
          <h1 className="text-text-primary text-3xl font-normal leading-tight">
            Welcome back, James!
          </h1>
          <p className="text-text-primary text-base font-normal leading-relaxed">
            Continue your storytelling journey or start something new.
          </p>
        </div>
      </div>

      {/* Script Editor */}
      <div className="flex flex-col gap-2">
        {/* Textarea */}
        <div className="flex flex-col bg-nav-hover rounded-lg p-4 min-h-[120px] relative">
          <div className="text-text-secondary text-base font-normal leading-relaxed mb-auto">
            Start typing or paste your script
          </div>
          
          {/* Bottom controls */}
          <div className="flex justify-between items-end pt-4">
            {/* Left side controls */}
            <div className="flex items-center gap-1.5">
              {/* Add button */}
              <button className="flex items-center justify-center p-2 rounded-lg hover:bg-black hover:bg-opacity-10 transition-colors">
                <Plus size={16} className="text-text-primary" strokeWidth={1.6} />
              </button>

              {/* Character button */}
              <button className="flex items-center gap-2 bg-black bg-opacity-10 backdrop-blur-sm rounded-lg px-2 py-2 text-brand-text text-base font-normal hover:bg-opacity-20 transition-colors">
                <User size={16} className="text-text-primary" strokeWidth={1.6} />
                Character
              </button>

              {/* Set button */}
              <button className="flex items-center gap-2 bg-black bg-opacity-10 backdrop-blur-sm rounded-lg px-2 py-2 text-brand-text text-base font-normal hover:bg-opacity-20 transition-colors">
                <MapPin size={16} className="text-text-primary" strokeWidth={1.6} />
                Set
              </button>

              {/* Aspect ratio button */}
              <button className="flex items-center gap-2 bg-black bg-opacity-10 backdrop-blur-sm rounded-lg px-2 py-2 text-brand-text text-base font-normal hover:bg-opacity-20 transition-colors">
                <div className="w-4 h-2.5 border-2 border-text-primary rounded-sm"></div>
                16:9
              </button>

              {/* Time button */}
              <button className="flex items-center gap-2 bg-black bg-opacity-10 backdrop-blur-sm rounded-lg px-2 py-2 text-brand-text text-base font-normal hover:bg-opacity-20 transition-colors">
                <Clock size={16} className="text-text-primary" strokeWidth={1.6} />
                1m
              </button>
            </div>

            {/* Right side - Submit button */}
            <button className="flex items-center justify-center p-2 rounded-lg hover:bg-black hover:bg-opacity-10 transition-colors">
              <ArrowUp size={16} className="text-text-primary" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
