import { Search, Plus, User, Settings, Film, Clock } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  currentPage?: 'tv' | 'library' | 'explore' | 'characters' | 'sets' | 'community';
}

const Header = ({ currentPage = 'explore' }: HeaderProps) => {
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [promptText, setPromptText] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleNewSceneClick = () => {
    setShowPromptModal(true);
  };

  const handleCloseModal = () => {
    setShowPromptModal(false);
    setPromptText('');
  };

  const handleSubmitPrompt = () => {
    if (!promptText.trim()) return;
    console.log('Submitting prompt:', promptText);
    handleCloseModal();
  };

  return (
    <>
      <header className="flex justify-between items-center w-full relative">
        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-nav-bg rounded-full px-4 py-3 w-[360px]">
          <span className="text-text-secondary flex-1 text-base font-normal">
            Search
          </span>
          <Search size={16} className="text-text-primary" strokeWidth={1.6} />
        </div>

        {/* Action Buttons and Avatar */}
        <div className="flex items-center gap-3">
          {/* Share your story button */}
          <button className="flex items-center justify-center gap-2 bg-brand-primary border border-brand-primary rounded-lg px-3 py-3 text-brand-text text-base font-normal transition-colors hover:bg-opacity-90">
            Share your story
          </button>

          {/* New scene button */}
          <button
            ref={buttonRef}
            onClick={handleNewSceneClick}
            className="flex items-center justify-center gap-2 bg-surface-neutral border border-border-neutral rounded-lg px-3 py-3 text-text-dark text-base font-normal transition-colors hover:bg-opacity-90"
          >
            <Plus size={16} className="text-text-dark" strokeWidth={1.6} />
            New scene
          </button>

          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/9e1049624f15a39f810df66dbfc884a730489857?width=80"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Prompt Modal for Explore Page (in header) */}
        {showPromptModal && currentPage === 'explore' && (
          <div className="absolute top-full right-0 mt-1 w-[520px] bg-app-bg border border-brand-primary rounded-lg p-6 z-50 shadow-lg">
            <div className="flex flex-col gap-4">
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Start typing or paste your script"
                className="w-full h-32 bg-surface-neutral rounded-lg p-4 text-text-primary text-base resize-none border-none outline-none placeholder:text-text-tertiary"
              />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-3 py-2 bg-brand-primary rounded-lg text-text-primary text-sm hover:bg-opacity-90 transition-colors">
                    <User size={14} />
                    Character
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-brand-primary rounded-lg text-text-primary text-sm hover:bg-opacity-90 transition-colors">
                    <Settings size={14} />
                    Set
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-brand-primary rounded-lg text-text-primary text-sm hover:bg-opacity-90 transition-colors">
                    <Film size={14} />
                    16:9
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-brand-primary rounded-lg text-text-primary text-sm hover:bg-opacity-90 transition-colors">
                    <Clock size={14} />
                    1m
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCloseModal}
                    className="flex items-center justify-center p-2 hover:bg-brand-primary rounded-lg transition-colors"
                  >
                    <Plus size={16} className="text-text-primary rotate-45" />
                  </button>
                  <button
                    onClick={handleSubmitPrompt}
                    disabled={!promptText.trim()}
                    className="flex items-center justify-center p-2 hover:bg-brand-primary rounded-lg transition-colors disabled:opacity-50"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7.99992 12.6668V3.3335M7.99992 3.3335L3.33325 8.00016M7.99992 3.3335L12.6666 8.00016" stroke="#F3F3F3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Dark Overlay for Explore Page */}
      {showPromptModal && currentPage === 'explore' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={handleCloseModal}
        />
      )}

      {/* Floating Prompt Modal for TV/Library Pages */}
      {showPromptModal && (currentPage === 'tv' || currentPage === 'library') && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleCloseModal}
          />
          <div className="fixed top-24 right-6 w-[520px] bg-app-bg border border-brand-primary rounded-lg p-6 z-50 shadow-lg">
            <div className="flex flex-col gap-4">
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Start typing or paste your script"
                className="w-full h-32 bg-surface-neutral rounded-lg p-4 text-text-primary text-base resize-none border-none outline-none placeholder:text-text-tertiary"
              />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-3 py-2 bg-brand-primary rounded-lg text-text-primary text-sm hover:bg-opacity-90 transition-colors">
                    <User size={14} />
                    Character
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-brand-primary rounded-lg text-text-primary text-sm hover:bg-opacity-90 transition-colors">
                    <Settings size={14} />
                    Set
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-brand-primary rounded-lg text-text-primary text-sm hover:bg-opacity-90 transition-colors">
                    <Film size={14} />
                    16:9
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-brand-primary rounded-lg text-text-primary text-sm hover:bg-opacity-90 transition-colors">
                    <Clock size={14} />
                    1m
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCloseModal}
                    className="flex items-center justify-center p-2 hover:bg-brand-primary rounded-lg transition-colors"
                  >
                    <Plus size={16} className="text-text-primary rotate-45" />
                  </button>
                  <button
                    onClick={handleSubmitPrompt}
                    disabled={!promptText.trim()}
                    className="flex items-center justify-center p-2 hover:bg-brand-primary rounded-lg transition-colors disabled:opacity-50"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7.99992 12.6668V3.3335M7.99992 3.3335L3.33325 8.00016M7.99992 3.3335L12.6666 8.00016" stroke="#F3F3F3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
