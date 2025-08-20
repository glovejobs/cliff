import {
  Search,
  Plus,
  User,
  Settings,
  Film,
  Clock,
  MapPin,
  Heart,
  PlusSquare,
  X,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface HeaderProps {
  currentPage?:
    | "tv"
    | "library"
    | "explore"
    | "characters"
    | "sets"
    | "community";
}

const Header = ({ currentPage = "explore" }: HeaderProps) => {
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleNewSceneClick = () => {
    setShowPromptModal(true);
  };

  const handleCloseModal = () => {
    setShowPromptModal(false);
    setPromptText("");
  };

  const handleSubmitPrompt = () => {
    if (!promptText.trim()) return;
    console.log("Submitting prompt:", promptText);
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
        <div className="flex items-center gap-2 bg-nav-bg rounded-lg px-3 h-10 w-[360px]">
          <Search size={16} className="text-text-primary" strokeWidth={1.6} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 bg-transparent text-text-primary text-base font-normal border-none outline-none placeholder:text-text-secondary"
            style={{
              fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          />
        </div>

        {/* Action Buttons and Avatar */}
        <div className="flex items-center gap-3">
          {/* New scene button */}
          <button
            ref={buttonRef}
            onClick={handleNewSceneClick}
            className="flex items-center justify-center gap-2 bg-surface-neutral border border-border-neutral rounded-lg px-3 h-10 text-text-dark text-base font-normal transition-colors hover:bg-opacity-90"
            style={{
              fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 5.33333V10.6667M5.33333 8H10.6667M3.33333 2H12.6667C13.403 2 14 2.59695 14 3.33333V12.6667C14 13.403 13.403 14 12.6667 14H3.33333C2.59695 14 2 13.403 2 12.6667V3.33333C2 2.59695 2.59695 2 3.33333 2Z"
                stroke="#1E1E1E"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
        {showPromptModal && currentPage === "explore" && (
          <div
            className="absolute top-full mt-1 w-[748px] h-[189px] flex flex-col gap-2 rounded-lg border z-50"
            style={{
              right: "52px", // Align to right edge of "New scene" button
              borderColor: "rgba(118, 118, 118, 1)",
              backdropFilter: "blur(2px)",
            }}
          >
            <div
              className="flex min-h-20 p-3 px-4 flex-col gap-2 flex-1 rounded-lg relative"
              style={{ backgroundColor: "rgba(67, 67, 67, 1)" }}
            >
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Start typing or paste your script"
                className="flex-1 w-full bg-transparent text-text-tertiary text-base resize-none border-none outline-none placeholder:text-text-tertiary"
              />

              <div className="flex justify-between items-end">
                <div className="flex items-center gap-1.5">
                  <button className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors hover:bg-brand-primary">
                    <Plus
                      size={16}
                      className="text-text-primary"
                      strokeWidth={1.6}
                    />
                  </button>
                  <button
                    onClick={handleCharacterClick}
                    className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors"
                    style={{
                      background: "rgba(0, 0, 0, 0.10)",
                      backdropFilter: "blur(2px)",
                    }}
                  >
                    <User
                      size={16}
                      className="text-text-primary"
                      strokeWidth={1.6}
                    />
                    <span className="text-text-primary text-base font-normal leading-none">
                      Character
                    </span>
                  </button>
                  <button
                    className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors"
                    style={{
                      background: "rgba(0, 0, 0, 0.10)",
                      backdropFilter: "blur(2px)",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <g clipPath="url(#clip0_3589_2387)">
                        <path
                          d="M14 6.6665C14 11.3332 8 15.3332 8 15.3332C8 15.3332 2 11.3332 2 6.6665C2 5.0752 2.63214 3.54908 3.75736 2.42386C4.88258 1.29864 6.4087 0.666504 8 0.666504C9.5913 0.666504 11.1174 1.29864 12.2426 2.42386C13.3679 3.54908 14 5.0752 14 6.6665Z"
                          stroke="#F3F3F3"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 8.6665C9.10457 8.6665 10 7.77107 10 6.6665C10 5.56193 9.10457 4.6665 8 4.6665C6.89543 4.6665 6 5.56193 6 6.6665C6 7.77107 6.89543 8.6665 8 8.6665Z"
                          stroke="#F3F3F3"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3589_2387">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-text-primary text-base font-normal leading-none">
                      Set
                    </span>
                  </button>
                  <button
                    className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors"
                    style={{
                      background: "rgba(0, 0, 0, 0.10)",
                      backdropFilter: "blur(2px)",
                    }}
                  >
                    <div className="flex w-4 h-4 justify-center items-center">
                      <div className="w-4 h-2.5 border border-text-primary rounded-sm"></div>
                    </div>
                    <span className="text-text-primary text-base font-normal leading-none">
                      16:9
                    </span>
                  </button>
                  <button
                    className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors"
                    style={{
                      background: "rgba(0, 0, 0, 0.10)",
                      backdropFilter: "blur(2px)",
                    }}
                  >
                    <Clock
                      size={16}
                      className="text-text-primary"
                      strokeWidth={1.6}
                    />
                    <span className="text-text-primary text-base font-normal leading-none">
                      1m
                    </span>
                  </button>
                </div>

                <button
                  onClick={handleSubmitPrompt}
                  disabled={!promptText.trim()}
                  className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors hover:bg-brand-primary disabled:opacity-50"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8.00004 12.6668V3.3335M8.00004 3.3335L3.33337 8.00016M8.00004 3.3335L12.6667 8.00016"
                      stroke="#F3F3F3"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Dark Overlay for Explore Page */}
      {showPromptModal && currentPage === "explore" && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={handleCloseModal}
        />
      )}

      {/* Floating Prompt Modal for TV/Library Pages */}
      {showPromptModal &&
        (currentPage === "tv" || currentPage === "library") && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={handleCloseModal}
            />
            <div
              className="fixed top-24 w-[748px] h-[189px] flex flex-col gap-2 rounded-lg border z-50 shadow-lg"
              style={{
                right: "6rem", // Position from right side
                borderColor: "rgba(118, 118, 118, 1)",
                backdropFilter: "blur(2px)",
              }}
            >
              <div
                className="flex min-h-20 p-3 px-4 flex-col gap-2 flex-1 rounded-lg relative"
                style={{ backgroundColor: "rgba(67, 67, 67, 1)" }}
              >
                <textarea
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Start typing or paste your script"
                  className="flex-1 w-full bg-transparent text-text-tertiary text-base resize-none border-none outline-none placeholder:text-text-tertiary"
                />

                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-1.5">
                    <button className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors hover:bg-brand-primary">
                      <Plus
                        size={16}
                        className="text-text-primary"
                        strokeWidth={1.6}
                      />
                    </button>
                    <button
                      onClick={handleCharacterClick}
                      className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors"
                      style={{
                        background: "rgba(0, 0, 0, 0.10)",
                        backdropFilter: "blur(2px)",
                      }}
                    >
                      <User
                        size={16}
                        className="text-text-primary"
                        strokeWidth={1.6}
                      />
                      <span className="text-text-primary text-base font-normal leading-none">
                        Character
                      </span>
                    </button>
                    <button
                      className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors"
                      style={{
                        background: "rgba(0, 0, 0, 0.10)",
                        backdropFilter: "blur(2px)",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_3589_2387)">
                          <path
                            d="M14 6.6665C14 11.3332 8 15.3332 8 15.3332C8 15.3332 2 11.3332 2 6.6665C2 5.0752 2.63214 3.54908 3.75736 2.42386C4.88258 1.29864 6.4087 0.666504 8 0.666504C9.5913 0.666504 11.1174 1.29864 12.2426 2.42386C13.3679 3.54908 14 5.0752 14 6.6665Z"
                            stroke="#F3F3F3"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 8.6665C9.10457 8.6665 10 7.77107 10 6.6665C10 5.56193 9.10457 4.6665 8 4.6665C6.89543 4.6665 6 5.56193 6 6.6665C6 7.77107 6.89543 8.6665 8 8.6665Z"
                            stroke="#F3F3F3"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_3589_2387">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span className="text-text-primary text-base font-normal leading-none">
                        Set
                      </span>
                    </button>
                    <button
                      className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors"
                      style={{
                        background: "rgba(0, 0, 0, 0.10)",
                        backdropFilter: "blur(2px)",
                      }}
                    >
                      <div className="flex w-4 h-4 justify-center items-center">
                        <div className="w-4 h-2.5 border border-text-primary rounded-sm"></div>
                      </div>
                      <span className="text-text-primary text-base font-normal leading-none">
                        16:9
                      </span>
                    </button>
                    <button
                      className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors"
                      style={{
                        background: "rgba(0, 0, 0, 0.10)",
                        backdropFilter: "blur(2px)",
                      }}
                    >
                      <Clock
                        size={16}
                        className="text-text-primary"
                        strokeWidth={1.6}
                      />
                      <span className="text-text-primary text-base font-normal leading-none">
                        1m
                      </span>
                    </button>
                  </div>

                  <button
                    onClick={handleSubmitPrompt}
                    disabled={!promptText.trim()}
                    className="flex p-2 justify-center items-center gap-2 rounded-lg transition-colors hover:bg-brand-primary disabled:opacity-50"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8.00004 12.6668V3.3335M8.00004 3.3335L3.33337 8.00016M8.00004 3.3335L12.6667 8.00016"
                        stroke="#F3F3F3"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

      {/* Character Selection Modal */}
      {showCharacterModal && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={handleCloseCharacterModal}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="w-[1116px] h-[80vh] p-6 flex flex-col gap-10 rounded-2xl z-50"
              style={{ backgroundColor: "#171717" }}
            >
              {/* Header */}
              <div className="flex items-center gap-2.5 w-full">
                <h2 className="flex-1 text-text-primary text-xl font-normal leading-tight">
                  Characters
                </h2>
                <div className="flex justify-end items-center gap-3 flex-1">
                  <button className="flex p-3 justify-center items-center gap-2 rounded-lg border border-border-neutral bg-surface-neutral transition-colors hover:bg-opacity-90">
                    <PlusSquare
                      size={16}
                      className="text-text-dark"
                      strokeWidth={1.6}
                    />
                    <span className="text-text-dark text-base font-normal leading-none">
                      New character
                    </span>
                  </button>
                  <button
                    onClick={handleCloseCharacterModal}
                    className="flex p-3 justify-center items-center gap-2 rounded-lg border border-brand-primary bg-brand-primary transition-colors hover:bg-opacity-90"
                  >
                    <X
                      size={16}
                      className="text-text-primary"
                      strokeWidth={1.6}
                    />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 relative min-h-0">
                <div
                  className="overflow-y-auto pr-4"
                  style={{
                    height: "calc(80vh - 160px)",
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(156, 163, 175, 0.5) transparent",
                  }}
                >
                  <div className="flex flex-col gap-12">
                    {/* Your characters */}
                    <div className="flex flex-col gap-6">
                      <h3 className="text-text-primary text-base font-bold leading-relaxed">
                        Your characters
                      </h3>
                      <div className="flex gap-6">
                        {/* New character card */}
                        <div
                          className="flex flex-col justify-center items-center w-[194.4px] h-[268px] py-[85px] gap-3 rounded-2xl cursor-pointer hover:bg-opacity-80 transition-colors"
                          style={{ backgroundColor: "#232424" }}
                        >
                          <Plus
                            size={24}
                            className="text-text-primary"
                            strokeWidth={2.5}
                          />
                          <span className="text-text-primary text-sm font-normal leading-relaxed text-center">
                            New character
                          </span>
                        </div>

                        {/* David Burton character */}
                        <div
                          className="relative flex flex-col justify-end items-start h-[268px] w-[194.4px] p-3 gap-3 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
                          style={{ backgroundColor: "#232424" }}
                        >
                          <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/76b4f7963e4bf681cae0a3d3dcd8fdb678c36329?width=388"
                            alt="David Burton"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                          <span className="relative z-10 text-text-primary text-sm font-normal leading-relaxed">
                            David Burton
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Explore community characters */}
                    <div className="flex flex-col gap-6">
                      <h3 className="text-text-primary text-base font-bold leading-relaxed">
                        Explore community characters
                      </h3>
                      <div className="flex flex-wrap gap-6">
                        {[
                          "https://api.builder.io/api/v1/image/assets/TEMP/40b74ac71e98e7774f25157b955e8b38e45ebc7b?width=388",
                          "https://api.builder.io/api/v1/image/assets/TEMP/b93b59c211da9b1cd6455a6f7816a50c0b871723?width=388",
                          "https://api.builder.io/api/v1/image/assets/TEMP/a8834d98dc98b1e731de3ec6bdd1225c551d4756?width=388",
                          "https://api.builder.io/api/v1/image/assets/TEMP/6788181b325f4d2d5748e583d4157c63db50364b?width=388",
                          "https://api.builder.io/api/v1/image/assets/TEMP/245130976f9e07616a8b965c591af27f6150f057?width=388",
                          "https://api.builder.io/api/v1/image/assets/TEMP/be47c48d11659b8ba57123be7ece013a2b6d2d8f?width=388",
                          "https://api.builder.io/api/v1/image/assets/TEMP/98396b7f0e659d8fa3bcef97b87471ce4f48b5a1?width=388",
                          "https://api.builder.io/api/v1/image/assets/TEMP/1f7cec421b527a7eb13270643b0c53c6967d9267?width=388",
                          "https://api.builder.io/api/v1/image/assets/TEMP/93e008f4628ba8f83760e2ca87efaccbda4ed7f0?width=388",
                          "https://api.builder.io/api/v1/image/assets/TEMP/39f3cf41672806bcdb55c0b354cf3122e9e253cb?width=388",
                        ].map((image, index) => (
                          <div
                            key={index}
                            className="relative flex flex-col justify-end items-start h-[268px] min-w-[194.4px] max-w-[265px] p-3 gap-3 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 flex-1"
                            style={{ backgroundColor: "#232424" }}
                          >
                            <img
                              src={image}
                              alt={`Community character ${index + 1}`}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                            <div className="relative z-10 flex justify-end items-center w-full">
                              <div className="flex items-center gap-1 px-0.5 py-0.5 rounded-lg">
                                <Heart
                                  size={12}
                                  className="text-text-primary"
                                  strokeWidth={1.2}
                                />
                                <span className="text-text-primary text-xs font-medium leading-4 tracking-wide">
                                  89
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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
