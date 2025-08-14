import { Search, Plus, User, Settings, Film, Clock, MapPin, Heart, PlusSquare, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  currentPage?: 'tv' | 'library' | 'explore' | 'characters' | 'sets' | 'community';
}

const Header = ({ currentPage = 'explore' }: HeaderProps) => {
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [showCharacterModal, setShowCharacterModal] = useState(false);
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

  const handleCharacterClick = () => {
    setShowCharacterModal(true);
  };

  const handleCloseCharacterModal = () => {
    setShowCharacterModal(false);
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
          <div
            className="absolute top-full mt-1 w-[748px] h-[189px] flex flex-col gap-2 rounded-lg border z-50"
            style={{
              right: '52px', // Align to right edge of "New scene" button
              borderColor: 'rgba(118, 118, 118, 1)',
              backdropFilter: 'blur(2px)'
            }}
          >
            <div
              className="flex min-h-20 p-3 px-4 flex-col gap-2 flex-1 rounded-lg relative"
              style={{ backgroundColor: 'rgba(67, 67, 67, 1)' }}
            >
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Start typing or paste your script"
                className="flex-1 w-full bg-transparent text-text-tertiary text-base resize-none border-none outline-none placeholder:text-text-tertiary"
              />

              <div className="flex justify-between items-end">
                <div className="flex items-center gap-1.5">
                  <button
                    className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors hover:bg-brand-primary"
                  >
                    <Plus size={16} className="text-text-primary" strokeWidth={1.6} />
                  </button>
                  <button
                    onClick={handleCharacterClick}
                    className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors"
                    style={{
                      background: 'rgba(0, 0, 0, 0.10)',
                      backdropFilter: 'blur(2px)'
                    }}
                  >
                    <User size={16} className="text-text-primary" strokeWidth={1.6} />
                    <span className="text-text-primary text-base font-normal leading-none">Character</span>
                  </button>
                  <button
                    className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors"
                    style={{
                      background: 'rgba(0, 0, 0, 0.10)',
                      backdropFilter: 'blur(2px)'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <g clipPath="url(#clip0_3589_2387)">
                        <path d="M14 6.6665C14 11.3332 8 15.3332 8 15.3332C8 15.3332 2 11.3332 2 6.6665C2 5.0752 2.63214 3.54908 3.75736 2.42386C4.88258 1.29864 6.4087 0.666504 8 0.666504C9.5913 0.666504 11.1174 1.29864 12.2426 2.42386C13.3679 3.54908 14 5.0752 14 6.6665Z" stroke="#F3F3F3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 8.6665C9.10457 8.6665 10 7.77107 10 6.6665C10 5.56193 9.10457 4.6665 8 4.6665C6.89543 4.6665 6 5.56193 6 6.6665C6 7.77107 6.89543 8.6665 8 8.6665Z" stroke="#F3F3F3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_3589_2387">
                          <rect width="16" height="16" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-text-primary text-base font-normal leading-none">Set</span>
                  </button>
                  <button
                    className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors"
                    style={{
                      background: 'rgba(0, 0, 0, 0.10)',
                      backdropFilter: 'blur(2px)'
                    }}
                  >
                    <div className="flex w-4 h-4 justify-center items-center">
                      <div className="w-4 h-2.5 border border-text-primary rounded-sm"></div>
                    </div>
                    <span className="text-text-primary text-base font-normal leading-none">16:9</span>
                  </button>
                  <button
                    className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors"
                    style={{
                      background: 'rgba(0, 0, 0, 0.10)',
                      backdropFilter: 'blur(2px)'
                    }}
                  >
                    <Clock size={16} className="text-text-primary" strokeWidth={1.6} />
                    <span className="text-text-primary text-base font-normal leading-none">1m</span>
                  </button>
                </div>

                <button
                  onClick={handleSubmitPrompt}
                  disabled={!promptText.trim()}
                  className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors hover:bg-brand-primary disabled:opacity-50"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8.00004 12.6668V3.3335M8.00004 3.3335L3.33337 8.00016M8.00004 3.3335L12.6667 8.00016" stroke="#F3F3F3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
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
          <div
            className="fixed top-24 w-[748px] h-[189px] flex flex-col gap-2 rounded-lg border z-50 shadow-lg"
            style={{
              right: '6rem', // Position from right side
              borderColor: 'rgba(118, 118, 118, 1)',
              backdropFilter: 'blur(2px)'
            }}
          >
            <div
              className="flex min-h-20 p-3 px-4 flex-col gap-2 flex-1 rounded-lg relative"
              style={{ backgroundColor: 'rgba(67, 67, 67, 1)' }}
            >
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Start typing or paste your script"
                className="flex-1 w-full bg-transparent text-text-tertiary text-base resize-none border-none outline-none placeholder:text-text-tertiary"
              />

              <div className="flex justify-between items-end">
                <div className="flex items-center gap-1.5">
                  <button
                    className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors hover:bg-brand-primary"
                  >
                    <Plus size={16} className="text-text-primary" strokeWidth={1.6} />
                  </button>
                  <button
                    onClick={handleCharacterClick}
                    className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors"
                    style={{
                      background: 'rgba(0, 0, 0, 0.10)',
                      backdropFilter: 'blur(2px)'
                    }}
                  >
                    <User size={16} className="text-text-primary" strokeWidth={1.6} />
                    <span className="text-text-primary text-base font-normal leading-none">Character</span>
                  </button>
                  <button
                    className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors"
                    style={{
                      background: 'rgba(0, 0, 0, 0.10)',
                      backdropFilter: 'blur(2px)'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <g clipPath="url(#clip0_3589_2387)">
                        <path d="M14 6.6665C14 11.3332 8 15.3332 8 15.3332C8 15.3332 2 11.3332 2 6.6665C2 5.0752 2.63214 3.54908 3.75736 2.42386C4.88258 1.29864 6.4087 0.666504 8 0.666504C9.5913 0.666504 11.1174 1.29864 12.2426 2.42386C13.3679 3.54908 14 5.0752 14 6.6665Z" stroke="#F3F3F3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 8.6665C9.10457 8.6665 10 7.77107 10 6.6665C10 5.56193 9.10457 4.6665 8 4.6665C6.89543 4.6665 6 5.56193 6 6.6665C6 7.77107 6.89543 8.6665 8 8.6665Z" stroke="#F3F3F3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_3589_2387">
                          <rect width="16" height="16" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-text-primary text-base font-normal leading-none">Set</span>
                  </button>
                  <button
                    className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors"
                    style={{
                      background: 'rgba(0, 0, 0, 0.10)',
                      backdropFilter: 'blur(2px)'
                    }}
                  >
                    <div className="flex w-4 h-4 justify-center items-center">
                      <div className="w-4 h-2.5 border border-text-primary rounded-sm"></div>
                    </div>
                    <span className="text-text-primary text-base font-normal leading-none">16:9</span>
                  </button>
                  <button
                    className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors"
                    style={{
                      background: 'rgba(0, 0, 0, 0.10)',
                      backdropFilter: 'blur(2px)'
                    }}
                  >
                    <Clock size={16} className="text-text-primary" strokeWidth={1.6} />
                    <span className="text-text-primary text-base font-normal leading-none">1m</span>
                  </button>
                </div>

                <button
                  onClick={handleSubmitPrompt}
                  disabled={!promptText.trim()}
                  className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors hover:bg-brand-primary disabled:opacity-50"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8.00004 12.6668V3.3335M8.00004 3.3335L3.33337 8.00016M8.00004 3.3335L12.6667 8.00016" stroke="#F3F3F3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
