import { useState } from 'react';
import { Plus, ArrowUp } from 'lucide-react';

const WelcomeSection = () => {
  const [script, setScript] = useState('');

  return (
    <section className="w-full mb-10">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center gap-6 py-20 px-40 rounded-2xl mb-6 relative">
        {/* Background placeholder */}
        <div className="absolute inset-0 bg-nav-bg rounded-2xl"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-3 text-center max-w-4xl">
          <h1 className="text-text-primary text-[32px] font-normal leading-[120%]">
            Welcome back, James!
          </h1>
          <p className="text-text-primary text-base font-normal leading-[140%]">
            Continue your storytelling journey or start something new.
          </p>
        </div>
      </div>

      {/* Script Editor */}
      <div className="flex flex-col gap-2">
        {/* Textarea Field */}
        <div className="flex h-[189px] flex-col items-start gap-2 w-full">
          <div className="flex min-w-[240px] min-h-20 p-3 flex-col items-start flex-1 w-full rounded-lg bg-nav-hover relative">
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Start typing or paste your script"
              className="w-full h-full bg-transparent text-text-primary text-base font-normal leading-[140%] placeholder:text-text-secondary resize-none outline-none border-none"
              style={{ minHeight: '100px' }}
            />

            {/* Bottom controls */}
            <div className="flex justify-between items-end flex-1 w-full">
              {/* Left side - Add button */}
              <button className="flex p-2 justify-center items-center gap-2 rounded-lg hover:bg-black hover:bg-opacity-10 transition-colors">
                <Plus size={16} className="text-text-primary" strokeWidth={1.6} />
              </button>

              {/* Right side - Submit button */}
              <button className="flex p-2 justify-center items-center gap-2 rounded-lg hover:bg-black hover:bg-opacity-10 transition-colors">
                <ArrowUp size={16} className="text-text-primary" strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
