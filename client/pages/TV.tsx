import { useState, useRef, useEffect } from "react";
import {
  Play,
  SkipBack,
  Pause,
  SkipForward,
  Repeat,
  VolumeX,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Share2,
  FileText,
  X,
  Download,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const TV = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(89);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  };

  const handleLikeClick = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  // Sync video state with our controls
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  return (
    <div className="h-screen bg-app-bg relative overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeItem="tv" />

      {/* Fixed Header */}
      <div className="fixed top-0 left-20 right-0 z-40 bg-app-bg px-6">
        <div className="max-w-[1320px] mx-auto pt-6 pb-4">
          <Header />
        </div>
      </div>

      {/* Main Content */}
      <main className="ml-20 px-6 pb-6 h-screen flex flex-col justify-start items-center" style={{ paddingTop: '106px' }}>
        <div className="flex flex-col h-full w-full max-w-[1320px]">
          {/* Video Player Content */}
          <div className="flex-1 flex flex-col gap-3 min-h-0">
            {/* Video Player Area */}
            <div className="flex items-center gap-3 flex-1 w-full min-h-0">
              {/* Left Side Video */}
              <div 
                className={`${
                  isPlaying ? 'w-0 opacity-0' : 'w-[60px] opacity-100'
                } flex-shrink-0 h-full relative rounded-lg overflow-hidden transition-all duration-500 ease-in-out`}
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/74d4309d658b5e8b28f5b3150c6dd3db871e721c?width=228"
                  alt="Side video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
                <button className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[25px] h-[25px] bg-white bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play
                      size={12}
                      className="text-white ml-0.5"
                      fill="white"
                    />
                  </div>
                </button>
              </div>

              {/* Main Video Player */}
              <div className="flex-1 h-full relative rounded-lg overflow-hidden cursor-pointer">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  onClick={handlePlayPause}
                  muted
                  loop
                  preload="metadata"
                >
                  <source
                    src="https://cdn.builder.io/o/assets%2F617016228c9243e3b70f57624716a0e1%2F3bd305393904499f993b2da9a384bde1?alt=media&token=d3c57b20-24ea-4448-b242-2328f26b86c6&apiKey=617016228c9243e3b70f57624716a0e1"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>

                {/* Play button overlay - only shown when paused */}
                {!isPlaying && (
                  <div
                    className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-20 cursor-pointer"
                    onClick={handlePlayPause}
                  >
                    <button
                      className="w-[120px] h-[120px] bg-white bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-opacity-40 transition-colors"
                      onClick={handlePlayPause}
                    >
                      <Play size={48} className="text-white ml-2" fill="white" />
                    </button>
                  </div>
                )}
              </div>

              {/* Right Side Video */}
              <div 
                className={`${
                  isPlaying ? 'w-0 opacity-0' : 'w-[60px] opacity-100'
                } flex-shrink-0 h-full relative rounded-lg overflow-hidden transition-all duration-500 ease-in-out`}
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/1e810018ba559b80ef3bd7b4264ac0910600e3d3?width=228"
                  alt="Side video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
                <button className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[25px] h-[25px] bg-white bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play
                      size={12}
                      className="text-white ml-0.5"
                      fill="white"
                    />
                  </div>
                </button>
              </div>
            </div>

            {/* Controls Section - Centered */}
            <div className="flex items-center justify-center gap-4 flex-shrink-0 w-full">
              {/* Invisible balancing div on the left - same size as remix button */}
              <div className="w-[86px] h-[46px] flex-shrink-0"></div>
              
              {/* Main Controller - Horizontal Flexbox Layout */}
              <div className="flex items-center gap-3 bg-nav-bg border border-brand-primary rounded-2xl p-5 backdrop-blur-sm">
                {/* TV Icon - Far left */}
                <div className="group relative">
                  <button className="flex items-center justify-center w-[86px] h-[86px] bg-brand-primary border border-brand-primary rounded-lg hover:bg-opacity-90 transition-colors">
                    <svg
                      className="w-[34.4px] h-[34.4px]"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.167 3.66699L18.0003 10.8337L10.8337 3.66699M6.53366 10.8337H29.467C31.0502 10.8337 32.3337 12.1171 32.3337 13.7003V29.467C32.3337 31.0502 31.0502 32.3337 29.467 32.3337H6.53366C4.95044 32.3337 3.66699 31.0502 3.66699 29.467V13.7003C3.66699 12.1171 4.95044 10.8337 6.53366 10.8337Z"
                        stroke="#F5F5F5"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                    TV off
                  </div>
                </div>

                {/* Media Controls Column */}
                <div className="flex flex-col gap-1.5">
                  {/* Top Row: Skip back, Pause/Play, Skip forward */}
                  <div className="flex gap-3">
                    <div className="group relative">
                      <button className="flex items-center justify-center w-10 h-10 p-3 bg-brand-primary border border-brand-primary rounded-lg hover:bg-opacity-90 transition-colors">
                        <SkipBack
                          size={16}
                          className="text-text-primary"
                          strokeWidth={1.6}
                        />
                      </button>
                      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                        Skip back
                      </div>
                    </div>

                    <div className="group relative">
                      <button
                        className="flex items-center justify-center w-10 h-10 p-3 bg-brand-primary border border-brand-primary rounded-lg hover:bg-opacity-90 transition-colors"
                        onClick={handlePlayPause}
                      >
                        {isPlaying ? (
                          <Pause
                            size={16}
                            className="text-text-primary"
                            strokeWidth={1.6}
                          />
                        ) : (
                          <Play
                            size={16}
                            className="text-text-primary ml-0.5"
                            strokeWidth={1.6}
                            fill="currentColor"
                          />
                        )}
                      </button>
                      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                        {isPlaying ? 'Pause' : 'Play'}
                      </div>
                    </div>

                    <div className="group relative">
                      <button className="flex items-center justify-center w-10 h-10 p-3 bg-brand-primary border border-brand-primary rounded-lg hover:bg-opacity-90 transition-colors">
                        <SkipForward
                          size={16}
                          className="text-text-primary"
                          strokeWidth={1.6}
                        />
                      </button>
                      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                        Skip forward
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Repeat, Mute, Maximize */}
                  <div className="flex gap-3">
                    <div className="group relative">
                      <button className="flex items-center justify-center w-10 h-10 p-3 bg-brand-primary border border-brand-primary rounded-lg hover:bg-opacity-90 transition-colors">
                        <Repeat
                          size={16}
                          className="text-text-primary"
                          strokeWidth={1.2}
                        />
                      </button>
                      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                        Repeat
                      </div>
                    </div>

                    <div className="group relative">
                      <button className="flex items-center justify-center w-10 h-10 p-3 bg-brand-primary border border-brand-primary rounded-lg hover:bg-opacity-90 transition-colors">
                        <VolumeX
                          size={16}
                          className="text-text-primary"
                          strokeWidth={1.2}
                        />
                      </button>
                      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                        Mute
                      </div>
                    </div>

                    <div className="group relative">
                      <button className="flex items-center justify-center w-10 h-10 p-3 bg-brand-primary border border-brand-primary rounded-lg hover:bg-opacity-90 transition-colors">
                        <Maximize2
                          size={16}
                          className="text-text-primary"
                          strokeWidth={1.6}
                        />
                      </button>
                      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                        Maximize
                      </div>
                    </div>
                  </div>
                </div>

                {/* Previous/Next Video Section */}
                <div className="flex flex-col justify-center items-center bg-brand-primary rounded-lg p-2.5 gap-2.5 w-[112px] h-[86px]">
                  <div className="flex items-center gap-2.5">
                    <div className="group relative">
                      <button>
                        <ChevronLeft
                          size={16}
                          className="text-text-primary"
                          strokeWidth={1.6}
                        />
                      </button>
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                        Previous video
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-lg overflow-hidden relative">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/ae4e8c13075e64b7209a5f67540fbb6b82c43f26?width=82"
                        alt="Now playing"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
                    </div>
                    <div className="group relative">
                      <button>
                        <ChevronRight
                          size={16}
                          className="text-text-primary"
                          strokeWidth={1.6}
                        />
                      </button>
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                        Next video
                      </div>
                    </div>
                  </div>
                  <div className="text-brand-text text-center text-xs font-medium leading-4 tracking-wide">
                    Nada Skincare ad
                  </div>
                </div>

                {/* Like and Comment Buttons - Vertical Stack */}
                <div className="flex flex-col gap-1.5">
                  <button className="flex items-center justify-center gap-2 w-[68px] h-10 bg-brand-primary border border-brand-primary rounded-lg px-3 py-3 text-brand-text text-base font-normal hover:bg-opacity-90 transition-colors">
                    <Heart
                      size={16}
                      className="text-text-primary"
                      strokeWidth={1.6}
                    />
                    89
                  </button>

                  <button className="flex items-center justify-center gap-2 w-[68px] h-10 bg-brand-primary border border-brand-primary rounded-lg px-3 py-3 text-brand-text text-base font-normal hover:bg-opacity-90 transition-colors">
                    <MessageCircle
                      size={16}
                      className="text-text-primary"
                      strokeWidth={1.6}
                    />
                    1
                  </button>
                </div>

                {/* Share and Details - Vertical Stack */}
                <div className="flex flex-col gap-1.5">
                  <div className="group relative">
                    <button className="flex items-center justify-center w-10 h-10 p-3 bg-brand-primary border border-brand-primary rounded-lg hover:bg-opacity-90 transition-colors">
                      <Share2
                        size={16}
                        className="text-text-primary"
                        strokeWidth={1.6}
                      />
                    </button>
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      Share
                    </div>
                  </div>

                  <div className="group relative">
                    <button
                      className="flex items-center justify-center w-10 h-10 p-3 bg-brand-primary border border-brand-primary rounded-lg hover:bg-opacity-90 transition-colors"
                      onClick={handleDetailsClick}
                    >
                      <FileText
                        size={16}
                        className="text-text-primary"
                        strokeWidth={1.6}
                      />
                    </button>
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      Details
                    </div>
                  </div>
                </div>
              </div>

              {/* Remix Button */}
              <button className="flex items-center gap-2 bg-brand-primary border border-brand-primary rounded-lg px-3 py-3 text-brand-text text-base font-normal hover:bg-opacity-90 transition-colors">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.28387 8.51817L7.85167 7.08597C7.65647 6.89077 7.55887 6.79317 7.45353 6.74097C7.2532 6.64168 7.018 6.64168 6.8176 6.74097C6.71233 6.79317 6.61471 6.89077 6.41949 7.08597C6.22425 7.28124 6.12664 7.37884 6.07446 7.4841C5.97518 7.6845 5.97518 7.9197 6.07446 8.12004C6.12664 8.22537 6.22425 8.32297 6.41949 8.51817L7.85167 9.95037M9.28387 8.51817L13.5805 12.8148C13.7757 13.01 13.8733 13.1076 13.9255 13.213C14.0248 13.4133 14.0248 13.6485 13.9255 13.8489C13.8733 13.9542 13.7757 14.0518 13.5805 14.247C13.3853 14.4422 13.2877 14.5398 13.1824 14.592C12.982 14.6913 12.7468 14.6913 12.5465 14.592C12.4411 14.5398 12.3435 14.4422 12.1483 14.247L7.85167 9.95037M9.28387 8.51817L7.85167 9.95037"
                    stroke="currentColor"
                    strokeWidth="1.3125"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.3332 1.3335L11.5297 1.86456C11.7874 2.56094 11.9162 2.90913 12.1702 3.16313C12.4242 3.41713 12.7724 3.54597 13.4688 3.80365L13.9998 4.00016L13.4688 4.19668C12.7724 4.45436 12.4242 4.5832 12.1702 4.8372C11.9162 5.0912 11.7874 5.43938 11.5297 6.13576L11.3332 6.66683L11.1366 6.13576C10.879 5.43939 10.7501 5.0912 10.4961 4.8372C10.2421 4.5832 9.89397 4.45436 9.19757 4.19668L8.6665 4.00016L9.19757 3.80365C9.89397 3.54597 10.2421 3.41713 10.4961 3.16313C10.7501 2.90913 10.879 2.56094 11.1366 1.86456L11.3332 1.3335Z"
                    stroke="currentColor"
                    strokeWidth="1.3125"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 2.6665L4.14739 3.0648C4.34065 3.58708 4.43728 3.84823 4.62778 4.03873C4.81827 4.22922 5.07942 4.32586 5.6017 4.51912L6 4.6665L5.6017 4.81389C5.07942 5.00715 4.81827 5.10378 4.62777 5.29428C4.43728 5.48478 4.34065 5.74592 4.14739 6.2682L4 6.6665L3.85261 6.2682C3.65935 5.74592 3.56272 5.48478 3.37222 5.29428C3.18173 5.10378 2.92058 5.00715 2.3983 4.81389L2 4.6665L2.3983 4.51912C2.92058 4.32586 3.18173 4.22922 3.37222 4.03872C3.56272 3.84823 3.65935 3.58708 3.85261 3.0648L4 2.6665Z"
                    stroke="currentColor"
                    strokeWidth="1.3125"
                    strokeLinejoin="round"
                  />
                </svg>
                Remix
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Details Panel */}
      <div
        className={`fixed top-0 right-0 h-screen w-[516px] bg-app-bg border-l border-brand-primary transform transition-transform duration-500 ease-in-out z-50 ${
          showDetails ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6 gap-10">
          {/* Header with profile and close button */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/1f1a162f3d7a0cbf3d0126cdb330d609b152b836?width=80"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex items-start gap-4 flex-1">
                <div className="flex flex-col gap-0.5">
                  <div className="text-text-primary text-base font-bold leading-snug">
                    Cody McVie
                  </div>
                  <div className="text-text-secondary text-sm leading-relaxed">
                    1 week ago
                  </div>
                </div>
                <button className="flex items-center justify-center gap-2 bg-surface-neutral border border-border-neutral rounded-lg px-2 py-1 text-text-dark text-xs font-medium">
                  Follow
                </button>
              </div>
            </div>
            <button
              onClick={handleDetailsClick}
              className="flex items-center justify-center w-10 h-10 bg-brand-primary border border-brand-primary rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <X size={16} className="text-text-primary" strokeWidth={1.6} />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6 flex-1">
            {/* Prompt Section */}
            <div className="flex flex-col gap-2.5">
              <h3 className="text-text-primary text-base font-bold leading-snug">
                Prompt
              </h3>
              <p className="text-text-primary text-base leading-relaxed">
                Create a fresh, uplifting ad for 'Nada' — a gentle, minimalist skincare line that celebrates natural beauty. Highlight its clean ingredients, hydrating feel, and confidence‑boosting results. Use warm, soft visuals and an inspiring, feel‑good tone.
              </p>
            </div>

            {/* Details Grid */}
            <div className="flex flex-col gap-0">
              <div className="flex items-start justify-between py-6 border-t border-border-neutral">
                <span className="text-text-primary text-base font-bold">Title</span>
                <span className="text-text-primary text-base text-right">Nada Skincare ad</span>
              </div>
              <div className="flex items-start justify-between py-6 border-t border-border-neutral">
                <span className="text-text-primary text-base font-bold">Year</span>
                <span className="text-text-primary text-base text-right">2025</span>
              </div>
              <div className="flex items-start justify-between py-6 border-t border-border-neutral">
                <span className="text-text-primary text-base font-bold">Views</span>
                <span className="text-text-primary text-base text-right">5.6k</span>
              </div>
              <div className="flex items-start justify-between py-6 border-t border-border-neutral">
                <span className="text-text-primary text-base font-bold">Credits</span>
                <span className="text-text-primary text-base text-right">Cody Mcvie</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-end gap-3 flex-wrap">
            <button className="flex items-center gap-2 bg-brand-primary border border-brand-primary rounded-lg px-3 py-3 text-brand-text text-base font-normal hover:bg-opacity-90 transition-colors">
              <Share2 size={16} className="text-text-primary" strokeWidth={1.6} />
              Share
            </button>
            <button className="flex items-center justify-center bg-brand-primary border border-brand-primary rounded-lg p-3 hover:bg-opacity-90 transition-colors">
              <Download size={16} className="text-text-primary" strokeWidth={1.6} />
            </button>
            <button className="flex items-center gap-2 bg-brand-primary border border-brand-primary rounded-lg px-3 py-3 text-brand-text text-base font-normal hover:bg-opacity-90 transition-colors">
              <Heart size={16} className="text-text-primary" strokeWidth={1.6} />
              89
            </button>
            <button className="flex items-center gap-2 bg-brand-primary border border-brand-primary rounded-lg px-3 py-3 text-brand-text text-base font-normal hover:bg-opacity-90 transition-colors">
              <MessageCircle size={16} className="text-text-primary" strokeWidth={1.6} />
              1
            </button>
            <button className="flex items-center gap-2 bg-surface-neutral border border-border-neutral rounded-lg px-3 py-3 text-text-dark text-xs font-medium hover:bg-opacity-90 transition-colors">
              <svg
                className="w-4 h-4"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.28387 8.51817L7.85167 7.08597C7.65647 6.89077 7.55887 6.79317 7.45353 6.74097C7.2532 6.64168 7.018 6.64168 6.8176 6.74097C6.71233 6.79317 6.61471 6.89077 6.41949 7.08597C6.22425 7.28124 6.12664 7.37884 6.07446 7.4841C5.97518 7.6845 5.97518 7.9197 6.07446 8.12004C6.12664 8.22537 6.22425 8.32297 6.41949 8.51817L7.85167 9.95037M9.28387 8.51817L13.5805 12.8148C13.7757 13.01 13.8733 13.1076 13.9255 13.213C14.0248 13.4133 14.0248 13.6485 13.9255 13.8489C13.8733 13.9542 13.7757 14.0518 13.5805 14.247C13.3853 14.4422 13.2877 14.5398 13.1824 14.592C12.982 14.6913 12.7468 14.6913 12.5465 14.592C12.4411 14.5398 12.3435 14.4422 12.1483 14.247L7.85167 9.95037M9.28387 8.51817L7.85167 9.95037"
                  stroke="currentColor"
                  strokeWidth="1.3125"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.3332 1.3335L11.5297 1.86456C11.7874 2.56094 11.9162 2.90913 12.1702 3.16313C12.4242 3.41713 12.7724 3.54597 13.4688 3.80365L13.9998 4.00016L13.4688 4.19668C12.7724 4.45436 12.4242 4.5832 12.1702 4.8372C11.9162 5.0912 11.7874 5.43938 11.5297 6.13576L11.3332 6.66683L11.1366 6.13576C10.879 5.43939 10.7501 5.0912 10.4961 4.8372C10.2421 4.5832 9.89397 4.45436 9.19757 4.19668L8.6665 4.00016L9.19757 3.80365C9.89397 3.54597 10.2421 3.41713 10.4961 3.16313C10.7501 2.90913 10.879 2.56094 11.1366 1.86456L11.3332 1.3335Z"
                  stroke="currentColor"
                  strokeWidth="1.3125"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 2.6665L4.14739 3.0648C4.34065 3.58708 4.43728 3.84823 4.62778 4.03873C4.81827 4.22922 5.07942 4.32586 5.6017 4.51912L6 4.6665L5.6017 4.81389C5.07942 5.00715 4.81827 5.10378 4.62777 5.29428C4.43728 5.48478 4.34065 5.74592 4.14739 6.2682L4 6.6665L3.85261 6.2682C3.65935 5.74592 3.56272 5.48478 3.37222 5.29428C3.18173 5.10378 2.92058 5.00715 2.3983 4.81389L2 4.6665L2.3983 4.51912C2.92058 4.32586 3.18173 4.22922 3.37222 4.03872C3.56272 3.84823 3.65935 3.58708 3.85261 3.0648L4 2.6665Z"
                  stroke="currentColor"
                  strokeWidth="1.3125"
                  strokeLinejoin="round"
                />
              </svg>
              Remix
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TV;
