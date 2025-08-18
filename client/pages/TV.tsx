import { useState, useRef, useEffect } from "react";
import {
  Play,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Share2,
  FileText,
  X,
  Download,
  Copy,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ScrollableContainer } from "../components/ui/scrollable-container";

const TV = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentsOpenedFromDetails, setCommentsOpenedFromDetails] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Johnny Magic',
      avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/b8e9ff78111840cedbff6e9d6405300c2a42eaa8?width=80',
      text: 'This is so nice to watch, I love it!! 💖',
      timestamp: '22h'
    }
  ]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(89);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoLikes, setVideoLikes] = useState([142, 89, 203, 167, 156]); // Track likes separately
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCopiedFeedback, setShowCopiedFeedback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videos = [
    {
      id: 'prompt-floor',
      title: 'The Prompt Floor',
      src: 'https://cdn.builder.io/o/assets%2F617016228c9243e3b70f57624716a0e1%2Ff34ab02cd9b54be5a8cf11c2a13ae949?alt=media&token=005cee05-b139-4895-97fd-e10b939f1887&apiKey=617016228c9243e3b70f57624716a0e1',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/ae4e8c13075e64b7209a5f67540fbb6b82c43f26?width=82',
      prompt: "Create a witty, fast‑paced, and slightly surreal film titled The Prompt Floor. The story dives into the unseen world of AI cinema — where human writers and artificial minds collaborate, clash, and improvise on a secret floor of a futuristic film studio. Show the drama, comedy, and chaos of prompts coming to life, blending meta‑humor, heartfelt moments, and visually inventive sequences that reveal how ideas evolve from text to screen.",
      views: '8.2k',
      year: '2024'
    },
    {
      id: 'nada-skincare',
      title: 'Nada Skincare ad',
      src: 'https://cdn.builder.io/o/assets%2F617016228c9243e3b70f57624716a0e1%2F3bd305393904499f993b2da9a384bde1?alt=media&token=d3c57b20-24ea-4448-b242-2328f26b86c6&apiKey=617016228c9243e3b70f57624716a0e1',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/1e810018ba559b80ef3bd7b4264ac0910600e3d3?width=228',
      prompt: "Create a fresh, uplifting ad for 'Nada' — a gentle, minimalist skincare line that celebrates natural beauty. Highlight its clean ingredients, hydrating feel, and confidence‑boosting results. Use warm, soft visuals and an inspiring, feel‑good tone.",
      views: '5.6k',
      year: '2025'
    },
    {
      id: 'time-in-motion',
      title: 'Time in Motion',
      src: 'https://cdn.builder.io/o/assets%2F617016228c9243e3b70f57624716a0e1%2Fe4628b7c94f5420bb196daae4c7af7e6?alt=media&token=bcab6baa-2a44-46ca-9aa5-4c1065798a60&apiKey=617016228c9243e3b70f57624716a0e1',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/ae4e8c13075e64b7209a5f67540fbb6b82c43f26?width=82',
      prompt: "Create a sleek, cinematic shot of a single human hand wearing an elegant wristwatch. The background is softly blurred to keep full focus on the watch. Use smooth, slow camera motion — starting from the side of the wrist, gliding in a gentle arc to reveal the watch face in perfect lighting. Highlight the craftsmanship, polished metal, and fine details of the design, with warm, high‑end lifestyle tones that evoke sophistication and precision.",
      views: '12.3k',
      year: '2025'
    },
    {
      id: 'homebound',
      title: 'Homebound',
      src: 'https://cdn.builder.io/o/assets%2F617016228c9243e3b70f57624716a0e1%2F65a0425066ae44ab96be2fbabee7a7bc?alt=media&token=41a53cf5-0bb3-4880-b9bb-b7b132c20291&apiKey=617016228c9243e3b70f57624716a0e1',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/1e810018ba559b80ef3bd7b4264ac0910600e3d3?width=228',
      prompt: "Capture a cinematic, early‑evening scene of a professional Nigerian woman driving home through the bustling roads of Lagos after a day at work. She sits in the driver's seat, city lights and golden‑hour hues streaming through the car windows. The camera alternates between smooth tracking shots outside — revealing vibrant street life, honking traffic, and roadside vendors — and intimate interior angles that show her relaxed yet thoughtful mood. Ambient sounds of the city mix with the low hum of the car, evoking warmth, resilience, and everyday beauty.",
      views: '8.7k',
      year: '2025'
    },
    {
      id: 'ikea-unboxing',
      title: 'IKEA unboxing',
      src: 'https://cdn.builder.io/o/assets%2F617016228c9243e3b70f57624716a0e1%2Fa57112836c604e479d8bb214e88bbf2d?alt=media&token=bb21bd58-98dd-42aa-b064-126f12ade915&apiKey=617016228c9243e3b70f57624716a0e1',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/1e810018ba559b80ef3bd7b4264ac0910600e3d3?width=228',
      prompt: "Create a cinematic, one-take unboxing where a single IKEA flat-pack box on a clean studio floor unfolds into a full, cozy bedroom layout. Start with a top-down shot; as the camera slowly descends, the box opens in a smooth origami motion. Panels slide, hinge, and lock with satisfying clicks: a birch bed frame assembles, a mattress unfurls, nightstands glide out, a wardrobe rises, and a soft rug rolls into place. Use Scandinavian minimalism: light wood, matte white, muted gray textiles. Warm 3000K lighting strips tuck under the bed and headboard; a pendant drops in and turns on as everything snaps together. Keep the motion precise and elegant—hyperreal practical effects with subtle CGI polish. Transition from top-down to a slow 180° orbit around the finished room, sunlight grazing textures, plants adding life. No people, no visible tools, no hard cuts. 4K, 35mm lens feel, gentle ambient music synchronized to assembly cues.",
      views: '15.2k',
      year: '2025'
    }
  ];

  const [framePositions, setFramePositions] = useState({
    offLeft: (currentVideoIndex - 2 + videos.length) % videos.length,
    left: (currentVideoIndex - 1 + videos.length) % videos.length,
    center: currentVideoIndex,
    right: (currentVideoIndex + 1) % videos.length,
    offRight: (currentVideoIndex + 2) % videos.length
  });

  const currentVideo = videos[framePositions.center];

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

  const handleCommentsClick = () => {
    if (showDetails) {
      // If details panel is open, swap to comments (overlay)
      setShowDetails(false);
      setShowComments(true);
      setCommentsOpenedFromDetails(true);
    } else {
      // If no panel is open, slide out comments
      setShowComments(!showComments);
      setCommentsOpenedFromDetails(false);
    }
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: comments.length + 1,
      author: 'You',
      avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/1f1a162f3d7a0cbf3d0126cdb330d609b152b836?width=80',
      text: commentText.trim(),
      timestamp: 'now'
    };

    setComments([...comments, newComment]);
    setCommentText('');
  };

  const handleCopyPrompt = () => {
    // Check if we're in an iframe or restricted environment
    const isIframe = window.self !== window.top;
    const hasClipboardPermissions = navigator.clipboard && window.isSecureContext && !isIframe;

    // Use fallback method for iframe environments to avoid permission errors
    if (!hasClipboardPermissions) {
      copyToClipboardFallback(currentVideo.prompt);
      return;
    }

    // Try modern Clipboard API only if we're confident it will work
    navigator.clipboard.writeText(currentVideo.prompt).then(() => {
      // Show success feedback
      setShowCopiedFeedback(true);
      setTimeout(() => setShowCopiedFeedback(false), 2000);
    }).catch(() => {
      // If it fails, use fallback
      copyToClipboardFallback(currentVideo.prompt);
    });
  };

  const copyToClipboardFallback = (text: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      textArea.style.opacity = '0';
      textArea.setAttribute('readonly', '');
      document.body.appendChild(textArea);

      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(0, 99999); // For mobile devices

      const successful = document.execCommand('copy');
      if (!successful) {
        throw new Error('execCommand copy failed');
      }

      // Show success feedback
      setShowCopiedFeedback(true);
      setTimeout(() => setShowCopiedFeedback(false), 2000);

    } catch (err) {
      console.error('Copy fallback failed:', err);
    } finally {
      // Clean up
      const textArea = document.querySelector('textarea[readonly]');
      if (textArea && textArea.parentNode) {
        textArea.parentNode.removeChild(textArea);
      }
    }
  };

  const handleLikeClick = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    // Update the like count for current video
    setVideoLikes(prev => {
      const newLikes = [...prev];
      newLikes[currentVideoIndex] = newLikedState
        ? newLikes[currentVideoIndex] + 1
        : newLikes[currentVideoIndex] - 1;
      return newLikes;
    });
  };

  const handleMuteClick = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleNextVideo = () => {
    if (isTransitioning) return;

    const video = videoRef.current;
    if (video) {
      video.pause();
    }

    setIsPlaying(false);
    setIsLiked(false);
    setIsTransitioning(true);

    // Shift all positions to the left (next)
    const newPositions = {
      offLeft: framePositions.left,
      left: framePositions.center,
      center: framePositions.right,
      right: framePositions.offRight,
      offRight: (framePositions.offRight + 1) % videos.length
    };

    setFramePositions(newPositions);
    setCurrentVideoIndex(newPositions.center);

    // Complete the transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const handlePrevVideo = () => {
    if (isTransitioning) return;

    const video = videoRef.current;
    if (video) {
      video.pause();
    }

    setIsPlaying(false);
    setIsLiked(false);
    setIsTransitioning(true);

    // Shift all positions to the right (prev)
    const newPositions = {
      offLeft: (framePositions.offLeft - 1 + videos.length) % videos.length,
      left: framePositions.offLeft,
      center: framePositions.left,
      right: framePositions.center,
      offRight: framePositions.right
    };

    setFramePositions(newPositions);
    setCurrentVideoIndex(newPositions.center);

    // Complete the transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
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
          <Header currentPage="tv" />
        </div>
      </div>

      {/* Main Content */}
      <main className="ml-20 px-6 pb-6 h-screen flex flex-col justify-start items-center" style={{ paddingTop: '106px' }}>
        <div className="flex flex-col h-full w-full max-w-[1320px]">
          {/* Video Player Content */}
          <div className="flex-1 flex flex-col gap-3 min-h-0">
            {/* Video Player Area */}
            <div className="flex items-center gap-3 flex-1 w-full min-h-0 relative">
              {/* Left Frame (Previous) */}
              <div
                className="h-full relative rounded-lg overflow-hidden transition-all duration-500 ease-in-out w-[60px] cursor-pointer"
                onClick={handlePrevVideo}
              >
                <img
                  src={videos[framePositions.left].thumbnail}
                  alt="Previous video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[25px] h-[25px] bg-white bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play size={12} className="text-white ml-0.5" fill="white" />
                  </div>
                </div>
              </div>

              {/* Center Frame (Main Video) */}
              <div className="h-full relative rounded-lg overflow-hidden cursor-pointer transition-all duration-500 ease-in-out flex-1">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  onClick={handlePlayPause}
                  muted={isMuted}
                  loop
                  preload="metadata"
                  key={videos[framePositions.center].id}
                >
                  <source
                    src={videos[framePositions.center].src}
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

              {/* Right Frame (Next) */}
              <div
                className="h-full relative rounded-lg overflow-hidden transition-all duration-500 ease-in-out w-[60px] cursor-pointer"
                onClick={handleNextVideo}
              >
                <img
                  src={videos[framePositions.right].thumbnail}
                  alt="Next video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[25px] h-[25px] bg-white bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play size={12} className="text-white ml-0.5" fill="white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Controls Section - New Remote Design */}
            <div className="flex items-center justify-center gap-4 flex-shrink-0 w-full">
              {/* New Remote Control */}
              <div className="flex items-center gap-3 px-12 py-0 rounded-full border border-black bg-[linear-gradient(180deg,#363636_7.69%,#171717_95.5%),radial-gradient(154.49%_116.65%_at_80.37%_-2.35%,#000_0%,#656565_100%),#000] backdrop-blur-sm h-[110px]">

                {/* Left Control Section */}
                <div className="flex items-center gap-3">
                  {/* Maximize Button */}
                  <div className="group relative">
                    <button className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-in-out" style={{
                      background: 'linear-gradient(330deg, #242424 12.95%, #383838 86.08%)',
                      border: '1px solid #A3A3A3',
                      boxShadow: '0 0 1.212px 1.212px rgba(0, 0, 0, 0.50) inset, 0 0 0.303px 0.303px rgba(0, 0, 0, 0.46)',
                      filter: 'drop-shadow(0 0 0.303px rgba(0, 0, 0, 0.46))'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M5.33333 2.00012L3.33333 2.00012C2.97971 2.00012 2.64057 2.1406 2.39052 2.39065C2.14048 2.64069 2 2.97983 2 3.33346L2 5.33346M14 5.33346L14 3.33346C14 2.97984 13.8595 2.6407 13.6095 2.39065C13.3594 2.1406 13.0203 2.00012 12.6667 2.00012L10.6667 2.00012M10.6667 14.0001L12.6667 14.0001C13.0203 14.0001 13.3594 13.8596 13.6095 13.6096C13.8595 13.3596 14 13.0204 14 12.6668L14 10.6668M2 10.6668L2 12.6668C2 13.0204 2.14047 13.3595 2.39052 13.6096C2.64057 13.8596 2.97971 14.0001 3.33333 14.0001L5.33333 14.0001" stroke="#F3F3F3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      Maximize
                    </div>
                  </div>

                  {/* Power Button */}
                  <div className="group relative">
                    <button className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-in-out" style={{
                      background: 'linear-gradient(330deg, #575656 12.95%, #7A7A7A 86.08%)',
                      border: '1px solid #696969',
                      boxShadow: '0 0 1.212px 1.212px rgba(0, 0, 0, 0.50) inset, 0 0 0.303px 0.303px rgba(0, 0, 0, 0.46)',
                      filter: 'drop-shadow(0 0 0.303px rgba(0, 0, 0, 0.46))'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12.2399 4.4268C13.0788 5.26599 13.6501 6.3351 13.8814 7.49893C14.1128 8.66276 13.9939 9.86906 13.5397 10.9653C13.0855 12.0615 12.3165 12.9985 11.3298 13.6577C10.3431 14.3169 9.18319 14.6687 7.99658 14.6687C6.80998 14.6687 5.65002 14.3169 4.66336 13.6577C3.67671 12.9985 2.90768 12.0615 2.45349 10.9653C1.99931 9.86906 1.88038 8.66276 2.11173 7.49893C2.34308 6.33509 2.91433 5.26599 3.75325 4.4268M7.99992 1.33347L7.99992 8.00013" stroke="#900B09" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      Power
                    </div>
                  </div>

                  {/* Mute Button */}
                  <div className="group relative">
                    <button onClick={handleMuteClick} className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-in-out" style={{
                      background: 'linear-gradient(330deg, #242424 12.95%, #383838 86.08%)',
                      border: '1px solid #A3A3A3',
                      boxShadow: '0 0 1.212px 1.212px rgba(0, 0, 0, 0.50) inset, 0 0 0.303px 0.303px rgba(0, 0, 0, 0.46)',
                      filter: 'drop-shadow(0 0 0.303px rgba(0, 0, 0, 0.46))'
                    }}>
                      {isMuted ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M12.7 3.75712C13.5393 4.59641 14.1107 5.66577 14.3421 6.82991C14.5735 7.99405 14.4545 9.20066 14 10.2971C13.812 10.7501 13.769 10.8871 13.478 11.2811M11.272 8.83412C11.272 8.83412 11.5 8.39412 11.5 8.00012C11.4998 7.20454 11.1836 6.4416 10.621 5.87912M5.246 5.30912C5.08 5.45012 5 5.50012 5 5.50012H2.5V10.5001H5L8.5 13.5001V8.83412M6.43 4.26512L8.5 2.50012V6.07512M2 2.00012L14 14.0001" stroke="#F5F5F5"/>
                        </svg>
                      ) : (
                        <Volume2 size={16} className="text-white" strokeWidth={1.2} />
                      )}
                    </button>
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      {isMuted ? 'Unmute' : 'Mute'}
                    </div>
                  </div>

                  {/* Play/Pause Button */}
                  <div className="group relative">
                    <button onClick={handlePlayPause} className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-in-out" style={{
                      background: 'linear-gradient(330deg, #242424 12.95%, #383838 86.08%)',
                      border: '1px solid #A3A3A3',
                      boxShadow: '0 0 1.212px 1.212px rgba(0, 0, 0, 0.50) inset, 0 0 0.303px 0.303px rgba(0, 0, 0, 0.46)',
                      filter: 'drop-shadow(0 0 0.303px rgba(0, 0, 0, 0.46))'
                    }}>
                      {isPlaying ? (
                        <div className="flex gap-0.5">
                          <div className="w-px h-2 bg-white rounded-sm"></div>
                          <div className="w-px h-2 bg-white rounded-sm"></div>
                        </div>
                      ) : (
                        <Play size={16} className="text-white ml-0.5" fill="white" />
                      )}
                    </button>
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      {isPlaying ? 'Pause' : 'Play'}
                    </div>
                  </div>
                </div>

                {/* Volume Control */}
                <div className="h-[86px] flex flex-col items-center justify-between py-3 px-2.5 rounded-full" style={{
                  background: 'linear-gradient(330deg, #242424 12.95%, #383838 86.08%)',
                  border: '0.931px solid #6B6B6B',
                  boxShadow: '0 0 1.162px 1.162px rgba(0, 0, 0, 0.50) inset, 0 0 0.291px 0.291px rgba(0, 0, 0, 0.46)'
                }}>
                  <button className="flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7.99992 3.33347L7.99992 12.6668M3.33325 8.00013L12.6666 8.00013" stroke="#F3F3F3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button className="flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3.33325 8.00012L12.6666 8.00012" stroke="#F3F3F3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                {/* Center Display */}
                <div className="relative w-[134px] h-[134px] rounded-full bg-gray-800 overflow-hidden">
                  <img
                    src={videos[framePositions.center].thumbnail}
                    alt="Now playing"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-sm font-medium leading-tight">
                        {currentVideo.title}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Control Section */}
                <div className="flex flex-col gap-1.5">
                  {/* Comments Button */}
                  <button onClick={handleCommentsClick} className="flex items-center gap-2 h-10 px-3 rounded-full transition-all duration-300 ease-in-out" style={{
                    background: 'linear-gradient(330deg, #242424 12.95%, #383838 86.08%)',
                    border: '1px solid #A3A3A3'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 17 16" fill="none">
                      <path d="M14.0557 7.66678C14.058 8.54669 13.8524 9.4147 13.4557 10.2001C12.9853 11.1413 12.2622 11.9329 11.3673 12.4863C10.4724 13.0397 9.44116 13.333 8.389 13.3334C7.50908 13.3357 6.64107 13.1302 5.85566 12.7334L2.05566 14.0001L3.32233 10.2001C2.92562 9.4147 2.72004 8.54669 2.72233 7.66678C2.72274 6.61462 3.01607 5.58334 3.56948 4.68848C4.12288 3.79361 4.9145 3.07049 5.85566 2.60011C6.64107 2.2034 7.50909 1.99782 8.389 2.00011L8.72233 2.00011C10.1119 2.07677 11.4244 2.66329 12.4084 3.64735C13.3925 4.63142 13.979 5.94388 14.0557 7.33345L14.0557 7.66678Z" stroke="#F3F3F3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-white text-xs font-medium">1</span>
                  </button>

                  {/* Like Button */}
                  <button onClick={handleLikeClick} className={`flex items-center gap-2 h-10 px-3 rounded-full transition-all duration-300 ease-in-out ${
                    isLiked ? 'bg-red-500 border border-red-500' : ''
                  }`} style={!isLiked ? {
                    background: 'linear-gradient(330deg, #242424 12.95%, #383838 86.08%)',
                    border: '1px solid #A3A3A3'
                  } : {}}>
                    <svg width="16" height="16" viewBox="0 0 17 16" fill="none">
                      <path d="M13.949 3.07345C13.6085 2.73279 13.2042 2.46255 12.7592 2.27818C12.3143 2.0938 11.8373 1.9989 11.3557 1.9989C10.874 1.9989 10.3971 2.0938 9.95209 2.27818C9.50712 2.46255 9.10283 2.73279 8.76233 3.07345L8.05566 3.78012L7.349 3.07345C6.6612 2.38566 5.72835 1.99926 4.75566 1.99926C3.78297 1.99926 2.85012 2.38566 2.16233 3.07345C1.47453 3.76125 1.08813 4.6941 1.08813 5.66678C1.08813 6.63947 1.47453 7.57232 2.16233 8.26012L8.05566 14.1535L13.949 8.26012C14.2897 7.91962 14.5599 7.51533 14.7443 7.07036C14.9286 6.62538 15.0235 6.14845 15.0235 5.66679C15.0235 5.18513 14.9286 4.70819 14.7443 4.26322C14.5599 3.81824 14.2897 3.41396 13.949 3.07345Z" stroke="#F3F3F3" strokeLinecap="round" strokeLinejoin="round" fill={isLiked ? "#F3F3F3" : "none"}/>
                    </svg>
                    <span className="text-white text-xs font-medium">{videoLikes[currentVideoIndex]}</span>
                  </button>
                </div>

                {/* Far Right Control Section */}
                <div className="flex flex-col gap-1.5">
                  {/* Magic Wand Button */}
                  <div className="group relative">
                    <button className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-in-out" style={{
                      background: 'linear-gradient(330deg, #242424 12.95%, #383838 86.08%)',
                      border: '1px solid #A3A3A3',
                      boxShadow: '0 0 1.212px 1.212px rgba(0, 0, 0, 0.50) inset, 0 0 0.303px 0.303px rgba(0, 0, 0, 0.46)',
                      filter: 'drop-shadow(0 0 0.303px rgba(0, 0, 0, 0.46))'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 17 16" fill="none">
                        <path d="M9.33953 8.51844L7.90733 7.08624C7.71213 6.89104 7.61453 6.79344 7.5092 6.74124C7.30886 6.64196 7.07366 6.64196 6.87326 6.74124C6.768 6.79344 6.67038 6.89104 6.47515 7.08624C6.27992 7.28151 6.1823 7.37911 6.13012 7.48438C6.03084 7.68478 6.03084 7.91998 6.13012 8.12031C6.1823 8.22564 6.27992 8.32324 6.47515 8.51844L7.90733 9.95064M9.33953 8.51844L13.6362 12.8151C13.8314 13.0103 13.929 13.1079 13.9812 13.2132C14.0805 13.4136 14.0805 13.6488 13.9812 13.8492C13.929 13.9544 13.8314 14.052 13.6362 14.2473C13.4409 14.4425 13.3433 14.5401 13.2381 14.5923C13.0377 14.6916 12.8025 14.6916 12.6021 14.5923C12.4968 14.5401 12.3992 14.4425 12.204 14.2473L7.90733 9.95064M9.33953 8.51844L7.90733 9.95064" stroke="#F3F3F3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.3891 1.33347L11.5856 1.86453C11.8433 2.56091 11.9721 2.9091 12.2261 3.1631C12.4801 3.4171 12.8283 3.54594 13.5247 3.80362L14.0557 4.00013L13.5247 4.19665C12.8283 4.45433 12.4801 4.58317 12.2261 4.83717C11.9721 5.09117 11.8433 5.43935 11.5856 6.13573L11.3891 6.6668L11.1925 6.13573C10.9349 5.43936 10.806 5.09117 10.552 4.83717C10.298 4.58317 9.94988 4.45433 9.25348 4.19665L8.72241 4.00013L9.25348 3.80362C9.94988 3.54594 10.298 3.4171 10.552 3.1631C10.806 2.9091 10.9349 2.56091 11.1925 1.86453L11.3891 1.33347Z" stroke="#F3F3F3" strokeLinejoin="round"/>
                        <path d="M4.05566 2.66678L4.20305 3.06508C4.39631 3.58736 4.49294 3.84851 4.68344 4.03901C4.87394 4.2295 5.13508 4.32613 5.65736 4.51939L6.05566 4.66678L5.65736 4.81417C5.13508 5.00743 4.87394 5.10406 4.68344 5.29456C4.49294 5.48505 4.39631 5.7462 4.20305 6.26848L4.05566 6.66678L3.90828 6.26848C3.71502 5.7462 3.61838 5.48505 3.42788 5.29456C3.23739 5.10406 2.97624 5.00743 2.45396 4.81417L2.05566 4.66678L2.45396 4.51939C2.97624 4.32613 3.23739 4.2295 3.42788 4.039C3.61838 3.84851 3.71502 3.58736 3.90828 3.06508L4.05566 2.66678Z" stroke="#F3F3F3" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      Remix
                    </div>
                  </div>

                  {/* Info Button */}
                  <div className="group relative">
                    <button onClick={handleDetailsClick} className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-in-out" style={{
                      background: 'linear-gradient(330deg, #242424 12.95%, #383838 86.08%)',
                      border: '1px solid #A3A3A3',
                      boxShadow: '0 0 1.212px 1.212px rgba(0, 0, 0, 0.50) inset, 0 0 0.303px 0.303px rgba(0, 0, 0, 0.46)',
                      filter: 'drop-shadow(0 0 0.303px rgba(0, 0, 0, 0.46))'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 17 16" fill="none">
                        <path d="M8.05558 10.6668L8.05558 8.00013M8.05558 5.33347L8.06225 5.33347M14.7222 8.00013C14.7222 11.682 11.7375 14.6668 8.05558 14.6668C4.37368 14.6668 1.38891 11.682 1.38891 8.00013C1.38892 4.31823 4.37368 1.33347 8.05558 1.33347C11.7375 1.33347 14.7222 4.31824 14.7222 8.00013Z" stroke="#F3F3F3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      Details
                    </div>
                  </div>
                </div>

              </div>

              {/* Navigation Arrows (hidden but functionality preserved) */}
              <div className="hidden">
                <button onClick={handlePrevVideo} className="p-2">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={handleNextVideo} className="p-2">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Dark Overlay Background */}
      {(showDetails || showComments) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out z-40"
          onClick={() => {
            if (showDetails) handleDetailsClick();
            if (showComments) {
              if (commentsOpenedFromDetails) {
                // Return to details panel
                setShowComments(false);
                setShowDetails(true);
                setCommentsOpenedFromDetails(false);
              } else {
                // Close comments completely
                setShowComments(false);
              }
            }
          }}
        />
      )}

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
              <div className="flex items-center justify-between">
                <h3 className="text-text-primary text-base font-bold leading-snug">
                  Prompt
                </h3>
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center justify-center gap-1 px-2 h-8 border rounded-lg transition-colors group bg-brand-primary border-brand-primary hover:bg-opacity-90"
                  title={showCopiedFeedback ? 'Copied!' : 'Copy prompt'}
                >
                  {showCopiedFeedback ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-primary">
                        <polyline points="20,6 9,17 4,12"></polyline>
                      </svg>
                      <span className="text-text-primary text-xs font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="text-text-primary" strokeWidth={1.6} />
                      <span className="text-text-primary text-xs font-medium">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-text-primary text-base leading-relaxed">
                {currentVideo.prompt}
              </p>
            </div>

            {/* Details Grid */}
            <div className="flex flex-col gap-0">
              <div className="flex items-start justify-between py-6 border-t border-border-neutral">
                <span className="text-text-primary text-base font-bold">Title</span>
                <span className="text-text-primary text-base text-right">{currentVideo.title}</span>
              </div>
              <div className="flex items-start justify-between py-6 border-t border-border-neutral">
                <span className="text-text-primary text-base font-bold">Year</span>
                <span className="text-text-primary text-base text-right">{currentVideo.year}</span>
              </div>
              <div className="flex items-start justify-between py-6 border-t border-border-neutral">
                <span className="text-text-primary text-base font-bold">Views</span>
                <span className="text-text-primary text-base text-right">{currentVideo.views}</span>
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
            <button
              onClick={handleLikeClick}
              className={`flex items-center gap-2 border rounded-lg px-3 py-3 text-base font-normal transition-all ${
                isLiked
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'bg-brand-primary border-brand-primary text-brand-text hover:bg-opacity-90'
              }`}
            >
              <Heart
                size={16}
                className={isLiked ? "text-white" : "text-text-primary"}
                strokeWidth={1.6}
                fill={isLiked ? "currentColor" : "none"}
              />
              {videoLikes[currentVideoIndex]}
            </button>
            <button
              onClick={handleCommentsClick}
              className="flex items-center gap-2 bg-brand-primary border border-brand-primary rounded-lg px-3 py-3 text-brand-text text-base font-normal hover:bg-opacity-90 transition-colors"
            >
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

      {/* Comments Panel */}
      <div
        className={`fixed top-0 right-0 h-screen w-[516px] bg-app-bg border-l border-brand-primary transform transition-transform duration-500 ease-in-out z-50 ${
          showComments ? 'translate-x-0' : 'translate-x-full'
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
              onClick={() => {
                if (commentsOpenedFromDetails) {
                  // Return to details panel
                  setShowComments(false);
                  setShowDetails(true);
                  setCommentsOpenedFromDetails(false);
                } else {
                  // Close comments completely
                  setShowComments(false);
                }
              }}
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
                {currentVideo.prompt}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-border-neutral pt-6"></div>

            {/* Comments Section */}
            <div className="flex flex-col gap-6 flex-1 relative">
              <ScrollableContainer className="flex-1">
                <div className="flex flex-col gap-6 pr-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-3">
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex flex-col gap-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-text-primary text-base font-bold">{comment.author}</span>
                          <span className="text-text-primary text-base">{comment.text}</span>
                        </div>
                        <span className="text-text-secondary text-sm">{comment.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollableContainer>
            </div>

            {/* Comment Input */}
            <div className="mt-auto">
              <div className="flex flex-col h-[120px] min-h-[80px] p-3 px-4 rounded-lg" style={{ backgroundColor: '#434343' }}>
                <div className="flex-1">
                  <textarea
                    placeholder="Add a comment to join the conversation"
                    className="w-full h-full bg-transparent text-text-primary text-base resize-none border-none outline-none placeholder:text-text-tertiary"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                </div>
                <div className="flex justify-between items-end">
                  <button
                    className="flex items-center justify-center p-2 hover:bg-brand-primary rounded-lg transition-colors"
                    onClick={() => {
                      // Add emoji or attachment functionality
                      console.log('Add attachment clicked');
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7.99992 3.3335V12.6668M3.33325 8.00016H12.6666" stroke="#F3F3F3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    className="flex items-center justify-center p-2 hover:bg-brand-primary rounded-lg transition-colors disabled:opacity-50"
                    disabled={!commentText.trim()}
                    onClick={handleSubmitComment}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7.99992 12.6668V3.3335M7.99992 3.3335L3.33325 8.00016M7.99992 3.3335L12.6666 8.00016" stroke="#F3F3F3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TV;
