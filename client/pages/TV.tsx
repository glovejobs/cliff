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
  const [commentsOpenedFromDetails, setCommentsOpenedFromDetails] =
    useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Johnny Magic",
      avatar:
        "https://api.builder.io/api/v1/image/assets/TEMP/b8e9ff78111840cedbff6e9d6405300c2a42eaa8?width=80",
      text: "This is so nice to watch, I love it!! 💖",
      timestamp: "22h",
    },
  ]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(89);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoLikes, setVideoLikes] = useState([142, 89, 203, 167, 156]); // Track likes separately
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCopiedFeedback, setShowCopiedFeedback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videos = [
    {
      id: "prompt-floor",
      title: "The Prompt Floor",
      src: "https://cdn.builder.io/o/assets%2F617016228c9243e3b70f57624716a0e1%2Ff34ab02cd9b54be5a8cf11c2a13ae949?alt=media&token=005cee05-b139-4895-97fd-e10b939f1887&apiKey=617016228c9243e3b70f57624716a0e1",
      thumbnail:
        "https://api.builder.io/api/v1/image/assets/TEMP/ae4e8c13075e64b7209a5f67540fbb6b82c43f26?width=82",
      prompt:
        "Create a witty, fast‑paced, and slightly surreal film titled The Prompt Floor. The story dives into the unseen world of AI cinema — where human writers and artificial minds collaborate, clash, and improvise on a secret floor of a futuristic film studio. Show the drama, comedy, and chaos of prompts coming to life, blending meta‑humor, heartfelt moments, and visually inventive sequences that reveal how ideas evolve from text to screen.",
      views: "8.2k",
      year: "2024",
    },
    {
      id: "nada-skincare",
      title: "Nada Skincare ad",
      src: "https://cdn.builder.io/o/assets%2F617016228c9243e3b70f57624716a0e1%2F3bd305393904499f993b2da9a384bde1?alt=media&token=d3c57b20-24ea-4448-b242-2328f26b86c6&apiKey=617016228c9243e3b70f57624716a0e1",
      thumbnail:
        "https://api.builder.io/api/v1/image/assets/TEMP/1e810018ba559b80ef3bd7b4264ac0910600e3d3?width=228",
      prompt:
        "Create a fresh, uplifting ad for 'Nada' — a gentle, minimalist skincare line that celebrates natural beauty. Highlight its clean ingredients, hydrating feel, and confidence‑boosting results. Use warm, soft visuals and an inspiring, feel‑good tone.",
      views: "5.6k",
      year: "2025",
    },
    {
      id: "time-in-motion",
      title: "Time in Motion",
      src: "https://cdn.builder.io/o/assets%2F617016228c9243e3b70f57624716a0e1%2Fe4628b7c94f5420bb196daae4c7af7e6?alt=media&token=bcab6baa-2a44-46ca-9aa5-4c1065798a60&apiKey=617016228c9243e3b70f57624716a0e1",
      thumbnail:
        "https://api.builder.io/api/v1/image/assets/TEMP/ae4e8c13075e64b7209a5f67540fbb6b82c43f26?width=82",
      prompt:
        "Create a sleek, cinematic shot of a single human hand wearing an elegant wristwatch. The background is softly blurred to keep full focus on the watch. Use smooth, slow camera motion — starting from the side of the wrist, gliding in a gentle arc to reveal the watch face in perfect lighting. Highlight the craftsmanship, polished metal, and fine details of the design, with warm, high‑end lifestyle tones that evoke sophistication and precision.",
      views: "12.3k",
      year: "2025",
    },
    {
      id: "homebound",
      title: "Homebound",
      src: "https://cdn.builder.io/o/assets%2F617016228c9243e3b70f57624716a0e1%2F65a0425066ae44ab96be2fbabee7a7bc?alt=media&token=41a53cf5-0bb3-4880-b9bb-b7b132c20291&apiKey=617016228c9243e3b70f57624716a0e1",
      thumbnail:
        "https://api.builder.io/api/v1/image/assets/TEMP/1e810018ba559b80ef3bd7b4264ac0910600e3d3?width=228",
      prompt:
        "Capture a cinematic, early‑evening scene of a professional Nigerian woman driving home through the bustling roads of Lagos after a day at work. She sits in the driver's seat, city lights and golden‑hour hues streaming through the car windows. The camera alternates between smooth tracking shots outside — revealing vibrant street life, honking traffic, and roadside vendors — and intimate interior angles that show her relaxed yet thoughtful mood. Ambient sounds of the city mix with the low hum of the car, evoking warmth, resilience, and everyday beauty.",
      views: "8.7k",
      year: "2025",
    },
    {
      id: "ikea-unboxing",
      title: "IKEA unboxing",
      src: "https://cdn.builder.io/o/assets%2F617016228c9243e3b70f57624716a0e1%2Fa57112836c604e479d8bb214e88bbf2d?alt=media&token=bb21bd58-98dd-42aa-b064-126f12ade915&apiKey=617016228c9243e3b70f57624716a0e1",
      thumbnail:
        "https://api.builder.io/api/v1/image/assets/TEMP/1e810018ba559b80ef3bd7b4264ac0910600e3d3?width=228",
      prompt:
        "Create a cinematic, one-take unboxing where a single IKEA flat-pack box on a clean studio floor unfolds into a full, cozy bedroom layout. Start with a top-down shot; as the camera slowly descends, the box opens in a smooth origami motion. Panels slide, hinge, and lock with satisfying clicks: a birch bed frame assembles, a mattress unfurls, nightstands glide out, a wardrobe rises, and a soft rug rolls into place. Use Scandinavian minimalism: light wood, matte white, muted gray textiles. Warm 3000K lighting strips tuck under the bed and headboard; a pendant drops in and turns on as everything snaps together. Keep the motion precise and elegant—hyperreal practical effects with subtle CGI polish. Transition from top-down to a slow 180° orbit around the finished room, sunlight grazing textures, plants adding life. No people, no visible tools, no hard cuts. 4K, 35mm lens feel, gentle ambient music synchronized to assembly cues.",
      views: "15.2k",
      year: "2025",
    },
  ];

  const [framePositions, setFramePositions] = useState({
    offLeft: (currentVideoIndex - 2 + videos.length) % videos.length,
    left: (currentVideoIndex - 1 + videos.length) % videos.length,
    center: currentVideoIndex,
    right: (currentVideoIndex + 1) % videos.length,
    offRight: (currentVideoIndex + 2) % videos.length,
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
      author: "You",
      avatar:
        "https://api.builder.io/api/v1/image/assets/TEMP/1f1a162f3d7a0cbf3d0126cdb330d609b152b836?width=80",
      text: commentText.trim(),
      timestamp: "now",
    };

    setComments([...comments, newComment]);
    setCommentText("");
  };

  const handleCopyPrompt = () => {
    // Check if we're in an iframe or restricted environment
    const isIframe = window.self !== window.top;
    const hasClipboardPermissions =
      navigator.clipboard && window.isSecureContext && !isIframe;

    // Use fallback method for iframe environments to avoid permission errors
    if (!hasClipboardPermissions) {
      copyToClipboardFallback(currentVideo.prompt);
      return;
    }

    // Try modern Clipboard API only if we're confident it will work
    navigator.clipboard
      .writeText(currentVideo.prompt)
      .then(() => {
        // Show success feedback
        setShowCopiedFeedback(true);
        setTimeout(() => setShowCopiedFeedback(false), 2000);
      })
      .catch(() => {
        // If it fails, use fallback
        copyToClipboardFallback(currentVideo.prompt);
      });
  };

  const copyToClipboardFallback = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      textArea.style.opacity = "0";
      textArea.setAttribute("readonly", "");
      document.body.appendChild(textArea);

      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(0, 99999); // For mobile devices

      const successful = document.execCommand("copy");
      if (!successful) {
        throw new Error("execCommand copy failed");
      }

      // Show success feedback
      setShowCopiedFeedback(true);
      setTimeout(() => setShowCopiedFeedback(false), 2000);
    } catch (err) {
      console.error("Copy fallback failed:", err);
    } finally {
      // Clean up
      const textArea = document.querySelector("textarea[readonly]");
      if (textArea && textArea.parentNode) {
        textArea.parentNode.removeChild(textArea);
      }
    }
  };

  const handleLikeClick = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    // Update the like count for current video
    setVideoLikes((prev) => {
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

  const handleVolumeUp = () => {
    const newVolume = Math.min(volume + 10, 100);
    setVolume(newVolume);
    const video = videoRef.current;
    if (video) {
      video.volume = newVolume / 100;
    }
  };

  const handleVolumeDown = () => {
    const newVolume = Math.max(volume - 10, 0);
    setVolume(newVolume);
    const video = videoRef.current;
    if (video) {
      video.volume = newVolume / 100;
    }
  };

  const handleMaximize = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isFullscreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if ((video as any).webkitRequestFullscreen) {
        (video as any).webkitRequestFullscreen();
      } else if ((video as any).msRequestFullscreen) {
        (video as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
      setIsFullscreen(false);
    }
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
      offRight: (framePositions.offRight + 1) % videos.length,
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
      offRight: framePositions.right,
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

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
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
      <main
        className="ml-20 px-6 pb-6 h-screen flex flex-col justify-start items-center"
        style={{ paddingTop: "106px" }}
      >
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
                    <Play
                      size={12}
                      className="text-white ml-0.5"
                      fill="white"
                    />
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
                      <Play
                        size={48}
                        className="text-white ml-2"
                        fill="white"
                      />
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
                    <Play
                      size={12}
                      className="text-white ml-0.5"
                      fill="white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Controls Section - Enhanced Remote Design */}
            <div className="flex items-center justify-center gap-4 flex-shrink-0 w-full">
              {/* Enhanced Remote Control */}
              <div
                className="flex items-center gap-3 px-12 py-0 rounded-full border border-black h-[110px]"
                style={{
                  background:
                    "linear-gradient(180deg, #363636 7.69%, #171717 95.5%), radial-gradient(154.49% 116.65% at 80.37% -2.35%, #000 0%, #656565 100%), #000",
                }}
              >
                {/* Left Control Section - 2x2 Grid */}
                <div
                  className="flex flex-wrap items-center w-[92px]"
                  style={{ alignContent: "center", gap: "6px 12px" }}
                >
                  {/* Top Row: Play/Pause - Mute */}
                  <div className="group relative">
                    <button
                      onClick={handlePlayPause}
                      className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-in-out"
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 41 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <filter
                            id="play-filter"
                            x="-0.134"
                            y="-0.606"
                            width="41.212"
                            height="41.233"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood
                              floodOpacity="0"
                              result="BackgroundImageFix"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feMorphology
                              radius="0.303"
                              operator="dilate"
                              in="SourceAlpha"
                              result="effect1_dropShadow"
                            />
                            <feOffset />
                            <feGaussianBlur stdDeviation="0.152" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.46 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow"
                              result="shape"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feMorphology
                              radius="1.212"
                              operator="erode"
                              in="SourceAlpha"
                              result="effect2_innerShadow"
                            />
                            <feOffset />
                            <feGaussianBlur stdDeviation="0.606" />
                            <feComposite
                              in2="hardAlpha"
                              operator="arithmetic"
                              k2="-1"
                              k3="1"
                            />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="shape"
                              result="effect2_innerShadow"
                            />
                          </filter>
                          <linearGradient
                            id="play-gradient"
                            x1="47.462"
                            y1="27.737"
                            x2="27.3"
                            y2="-6.829"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#242424" />
                            <stop offset="1" stopColor="#383838" />
                          </linearGradient>
                          <linearGradient
                            id="play-stroke"
                            x1="-4.049"
                            y1="9.737"
                            x2="11.301"
                            y2="45.184"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#A3A3A3" />
                            <stop offset="0.296" stopColor="#2B2B2B" />
                            <stop offset="0.791" stopColor="#0A0A0A" />
                            <stop offset="1" stopColor="#333333" />
                          </linearGradient>
                        </defs>
                        <g filter="url(#play-filter)">
                          <ellipse
                            cx="20.472"
                            cy="20.01"
                            rx="20"
                            ry="20.01"
                            fill="url(#play-gradient)"
                          />
                          <path
                            d="M20.472 0.5C31.241 0.5 39.972 9.235 39.972 20.01C39.972 30.785 31.242 39.521 20.472 39.521C9.703 39.521 0.972 30.785 0.972 20.01C0.972 9.235 9.703 0.5 20.472 0.5Z"
                            stroke="url(#play-stroke)"
                          />
                          <path
                            d="M20.472 0.5C31.241 0.5 39.972 9.235 39.972 20.01C39.972 30.785 31.242 39.521 20.472 39.521C9.703 39.521 0.972 30.785 0.972 20.01C0.972 9.235 9.703 0.5 20.472 0.5Z"
                            stroke="black"
                          />
                        </g>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        {isPlaying ? (
                          <div
                            style={{
                              width: "15.374px",
                              height: "9px",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                width: "1px",
                                height: "9px",
                                borderRadius: "0.187px",
                                background: "#D9D9D9",
                                position: "absolute",
                                left: "6px",
                                top: "0px",
                              }}
                            ></div>
                            <div
                              style={{
                                width: "1px",
                                height: "9px",
                                borderRadius: "0.187px",
                                background: "#D9D9D9",
                                position: "absolute",
                                left: "9px",
                                top: "0px",
                              }}
                            ></div>
                          </div>
                        ) : (
                          <Play
                            size={16}
                            className="text-white ml-0.5"
                            fill="white"
                          />
                        )}
                      </div>
                    </button>
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      {isPlaying ? "Pause" : "Play"}
                    </div>
                  </div>

                  <div className="group relative">
                    <button
                      onClick={handleMuteClick}
                      className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-in-out"
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 41 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <filter
                            id="mute-filter"
                            x="-0.134"
                            y="-0.606"
                            width="41.212"
                            height="41.233"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood
                              floodOpacity="0"
                              result="BackgroundImageFix"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feMorphology
                              radius="0.303"
                              operator="dilate"
                              in="SourceAlpha"
                              result="effect1_dropShadow"
                            />
                            <feOffset />
                            <feGaussianBlur stdDeviation="0.152" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.46 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow"
                              result="shape"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feMorphology
                              radius="1.212"
                              operator="erode"
                              in="SourceAlpha"
                              result="effect2_innerShadow"
                            />
                            <feOffset />
                            <feGaussianBlur stdDeviation="0.606" />
                            <feComposite
                              in2="hardAlpha"
                              operator="arithmetic"
                              k2="-1"
                              k3="1"
                            />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="shape"
                              result="effect2_innerShadow"
                            />
                          </filter>
                        </defs>
                        <g filter="url(#mute-filter)">
                          <ellipse
                            cx="20.472"
                            cy="20.01"
                            rx="20"
                            ry="20.01"
                            fill="url(#play-gradient)"
                          />
                          <path
                            d="M20.472 0.5C31.241 0.5 39.972 9.235 39.972 20.01C39.972 30.785 31.242 39.521 20.472 39.521C9.703 39.521 0.972 30.785 0.972 20.01C0.972 9.235 9.703 0.5 20.472 0.5Z"
                            stroke="url(#play-stroke)"
                          />
                          <path
                            d="M20.472 0.5C31.241 0.5 39.972 9.235 39.972 20.01C39.972 30.785 31.242 39.521 20.472 39.521C9.703 39.521 0.972 30.785 0.972 20.01C0.972 9.235 9.703 0.5 20.472 0.5Z"
                            stroke="black"
                          />
                        </g>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        {isMuted ? (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                          >
                            <path
                              d="M13.1722 3.757C14.0114 4.59629 14.5829 5.66565 14.8143 6.82979C15.0457 7.99392 14.9266 9.20054 14.4722 10.297C14.2842 10.75 14.2412 10.887 13.9502 11.281M11.7442 8.834C11.7442 8.834 11.9722 8.394 11.9722 8C11.972 7.20442 11.6558 6.44148 11.0932 5.879M5.71817 5.309C5.55217 5.45 5.47217 5.5 5.47217 5.5H2.97217V10.5H5.47217L8.97217 13.5V8.834M6.90217 4.265L8.97217 2.5V6.075M2.47217 2L14.4722 14"
                              stroke="#F5F5F5"
                            />
                          </svg>
                        ) : (
                          <Volume2
                            size={16}
                            className="text-white"
                            strokeWidth={1.2}
                          />
                        )}
                      </div>
                    </button>
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      {isMuted ? "Unmute" : "Mute"}
                    </div>
                  </div>

                  {/* Bottom Row: Power - Maximize */}
                  <div className="group relative">
                    <button className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-in-out">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 41 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            id="power-gradient"
                            x1="47.462"
                            y1="27.737"
                            x2="27.3"
                            y2="-6.829"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#575656" />
                            <stop offset="1" stopColor="#7A7A7A" />
                          </linearGradient>
                          <linearGradient
                            id="power-stroke"
                            x1="-4.049"
                            y1="9.737"
                            x2="11.301"
                            y2="45.184"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#A3A3A3" />
                            <stop offset="0.296" stopColor="#2B2B2B" />
                            <stop offset="0.791" stopColor="#0A0A0A" />
                            <stop offset="1" stopColor="#333333" />
                          </linearGradient>
                        </defs>
                        <g filter="url(#play-filter)">
                          <ellipse
                            cx="20.472"
                            cy="20.01"
                            rx="20"
                            ry="20.01"
                            fill="url(#power-gradient)"
                          />
                          <path
                            d="M20.472 0.5C31.241 0.5 39.972 9.235 39.972 20.01C39.972 30.785 31.242 39.521 20.472 39.521C9.703 39.521 0.972 30.785 0.972 20.01C0.972 9.235 9.703 0.5 20.472 0.5Z"
                            stroke="url(#power-stroke)"
                          />
                          <path
                            d="M20.472 0.5C31.241 0.5 39.972 9.235 39.972 20.01C39.972 30.785 31.242 39.521 20.472 39.521C9.703 39.521 0.972 30.785 0.972 20.01C0.972 9.235 9.703 0.5 20.472 0.5Z"
                            stroke="#696969"
                          />
                        </g>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                        >
                          <path
                            d="M12.7121 4.42659C13.5511 5.26578 14.1223 6.33488 14.3537 7.49871C14.585 8.66255 14.4661 9.86885 14.0119 10.9651C13.5577 12.0613 12.7887 12.9983 11.802 13.6575C10.8154 14.3167 9.65542 14.6685 8.46881 14.6685C7.28221 14.6685 6.12225 14.3167 5.13559 13.6575C4.14894 12.9983 3.37991 12.0613 2.92572 10.9651C2.47154 9.86884 2.3526 8.66254 2.58396 7.49871C2.81531 6.33488 3.38656 5.26578 4.22548 4.42659M8.47215 1.33325L8.47215 7.99992"
                            stroke="#900B09"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      Power
                    </div>
                  </div>

                  <div className="group relative">
                    <button
                      onClick={handleMaximize}
                      className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-in-out"
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 41 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g filter="url(#play-filter)">
                          <ellipse
                            cx="20.472"
                            cy="20.01"
                            rx="20"
                            ry="20.01"
                            fill="url(#play-gradient)"
                          />
                          <path
                            d="M20.472 0.5C31.241 0.5 39.972 9.235 39.972 20.01C39.972 30.785 31.242 39.521 20.472 39.521C9.703 39.521 0.972 30.785 0.972 20.01C0.972 9.235 9.703 0.5 20.472 0.5Z"
                            stroke="url(#play-stroke)"
                          />
                          <path
                            d="M20.472 0.5C31.241 0.5 39.972 9.235 39.972 20.01C39.972 30.785 31.242 39.521 20.472 39.521C9.703 39.521 0.972 30.785 0.972 20.01C0.972 9.235 9.703 0.5 20.472 0.5Z"
                            stroke="black"
                          />
                        </g>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                        >
                          <path
                            d="M5.8055 2L3.8055 2C3.45188 2 3.11274 2.14048 2.86269 2.39052C2.61264 2.64057 2.47217 2.97971 2.47217 3.33333L2.47217 5.33333M14.4722 5.33334L14.4722 3.33334C14.4722 2.97971 14.3317 2.64057 14.0816 2.39053C13.8316 2.14048 13.4925 2 13.1388 2L11.1388 2M11.1388 14L13.1388 14C13.4925 14 13.8316 13.8595 14.0816 13.6095C14.3317 13.3594 14.4722 13.0203 14.4722 12.6667L14.4722 10.6667M2.47217 10.6667L2.47217 12.6667C2.47217 13.0203 2.61264 13.3594 2.86269 13.6095C3.11274 13.8595 3.45188 14 3.8055 14L5.8055 14"
                            stroke="#F3F3F3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    </div>
                  </div>
                </div>

                {/* Enhanced Volume Control */}
                <div className="relative w-[34.865px] h-[86px]">
                  <div
                    className="w-[35px] h-[86px] rounded-full border-[0.931px] border-black absolute left-0 top-0"
                    style={{
                      background:
                        "linear-gradient(330deg, #242424 12.95%, #383838 86.08%), #2E2E2E",
                      boxShadow:
                        "0 0 1.162px 1.162px rgba(0, 0, 0, 0.50) inset, 0 0 0.291px 0.291px rgba(0, 0, 0, 0.46)",
                    }}
                  ></div>

                  <div className="group relative">
                    <button
                      onClick={handleVolumeUp}
                      className="absolute left-[9px] top-[12px] flex items-center justify-center transition-colors hover:opacity-80"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                      >
                        <path
                          d="M8.47215 3.33325L8.47215 12.6666M3.80548 7.99992L13.1388 7.99992"
                          stroke="#F3F3F3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <div className="absolute left-12 top-1/2 -translate-y-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      Volume Up ({volume}%)
                    </div>
                  </div>

                  <div className="group relative">
                    <button
                      onClick={handleVolumeDown}
                      className="absolute left-[9px] top-[58px] flex items-center justify-center transition-colors hover:opacity-80"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                      >
                        <path
                          d="M3.80548 8L13.1388 8"
                          stroke="#F3F3F3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <div className="absolute left-12 top-1/2 -translate-y-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      Volume Down ({volume}%)
                    </div>
                  </div>
                </div>

                {/* Enhanced Center Display */}
                <div className="relative w-[200px] h-[200px]">
                  {/* Outer Ring with Exact Figma Styling */}
                  <svg
                    width="200"
                    height="200"
                    viewBox="0 0 135 135"
                    fill="none"
                    className="absolute inset-0"
                  >
                    <defs>
                      <linearGradient
                        id="center-gradient"
                        x1="158.112"
                        y1="93.004"
                        x2="90.524"
                        y2="-22.928"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#242424" />
                        <stop offset="1" stopColor="#383838" />
                      </linearGradient>
                      <linearGradient
                        id="center-stroke"
                        x1="-14.695"
                        y1="32.648"
                        x2="36.756"
                        y2="151.524"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#A3A3A3" />
                        <stop offset="0.296" stopColor="#2B2B2B" />
                        <stop offset="0.791" stopColor="#0A0A0A" />
                        <stop offset="1" stopColor="#333333" />
                      </linearGradient>
                      <filter
                        id="center-inner-shadow"
                        x="6.739"
                        y="64.879"
                        width="4.577"
                        height="4.824"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dx="-0.877" dy="-0.439" />
                        <feGaussianBlur stdDeviation="0.219" />
                        <feComposite
                          in2="hardAlpha"
                          operator="arithmetic"
                          k2="-1"
                          k3="1"
                        />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.65 0 0 0 0 0.65 0 0 0 0 0.65 0 0 0 0.5 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="shape"
                          result="effect1_innerShadow"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dx="0.439" dy="0.877" />
                        <feGaussianBlur stdDeviation="0.219" />
                        <feComposite
                          in2="hardAlpha"
                          operator="arithmetic"
                          k2="-1"
                          k3="1"
                        />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="effect1_innerShadow"
                          result="effect2_innerShadow"
                        />
                      </filter>
                    </defs>

                    {/* Outer Ring */}
                    <path
                      d="M134.663 67.095C134.663 104.151 104.623 134.191 67.568 134.191C30.512 134.191 0.472 104.151 0.472 67.095C0.472 30.04 30.512 0 67.568 0C104.623 0 134.663 30.04 134.663 67.095ZM17.231 67.095C17.231 94.895 39.768 117.432 67.568 117.432C95.368 117.432 117.904 94.895 117.904 67.095C117.904 39.295 95.368 16.759 67.568 16.759C39.768 16.759 17.231 39.295 17.231 67.095Z"
                      fill="url(#center-gradient)"
                      stroke="url(#center-stroke)"
                      strokeWidth="2"
                    />
                    <path
                      d="M134.663 67.095C134.663 104.151 104.623 134.191 67.568 134.191C30.512 134.191 0.472 104.151 0.472 67.095C0.472 30.04 30.512 0 67.568 0C104.623 0 134.663 30.04 134.663 67.095ZM17.231 67.095C17.231 94.895 39.768 117.432 67.568 117.432C95.368 117.432 117.904 94.895 117.904 67.095C117.904 39.295 95.368 16.759 67.568 16.759C39.768 16.759 17.231 39.295 17.231 67.095Z"
                      stroke="black"
                      strokeWidth="2"
                    />
                  </svg>

                  {/* Inner Content Circle */}
                  <div className="w-[117px] h-[117px] rounded-full absolute left-[41.5px] top-[41.5px] overflow-hidden">
                    {/* Image Background */}
                    <img
                      src={videos[framePositions.center].thumbnail}
                      alt="Now playing"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                    {/* Overlay with blend modes matching Figma */}
                    <div className="absolute inset-0 bg-[#1E1E1E] opacity-50 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-black opacity-70"></div>

                    {/* Centered Text */}
                    <div className="absolute inset-0 flex items-center justify-center px-3">
                      <div className="text-center">
                        <div
                          className="text-[#F5F5F5] text-[15.27px] font-medium leading-[20.36px] tracking-[0.5px]"
                          style={{
                            fontFamily: "Outfit",
                            lineHeight: "1.33",
                            whiteSpace: "pre-line"
                          }}
                        >
                          {currentVideo.title.includes(" ") ? (
                            currentVideo.title.split(" ").map((word, index, arr) => (
                              index === Math.floor(arr.length / 2) ? (
                                <><br key={index}/>{word}</>
                              ) : (
                                index > 0 && index !== Math.floor(arr.length / 2) ? ` ${word}` : word
                              )
                            ))
                          ) : (
                            currentVideo.title
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Dots - positioned exactly as in Figma */}
                  <div className="group relative">
                    <button
                      onClick={handlePrevVideo}
                      className="absolute left-[13.5px] top-1/2 -translate-y-1/2 w-[4px] h-[4px] bg-white rounded-full shadow-sm hover:bg-gray-200 transition-colors"
                      style={{
                        filter: "drop-shadow(0 0 2px rgba(0, 0, 0, 0.5))",
                        boxShadow:
                          "inset 0 0 1px rgba(163, 163, 163, 0.65), inset 0 0 0.5px rgba(0, 0, 0, 0.25)",
                      }}
                    />
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      Previous Video
                    </div>
                  </div>

                  <div className="group relative">
                    <button
                      onClick={handleNextVideo}
                      className="absolute right-[13.5px] top-1/2 -translate-y-1/2 w-[4px] h-[4px] bg-white rounded-full shadow-sm hover:bg-gray-200 transition-colors"
                      style={{
                        filter: "drop-shadow(0 0 2px rgba(0, 0, 0, 0.5))",
                        boxShadow:
                          "inset 0 0 1px rgba(163, 163, 163, 0.65), inset 0 0 0.5px rgba(0, 0, 0, 0.25)",
                      }}
                    />
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      Next Video
                    </div>
                  </div>
                </div>

                {/* Right Control Section */}
                <div className="flex flex-col justify-center items-start gap-1.5">
                  <button
                    onClick={handleCommentsClick}
                    className="flex items-center gap-2.5 h-10 px-3 rounded-full border border-black transition-all duration-300 ease-in-out"
                    style={{
                      background: "linear-gradient(330deg, #242424 12.95%, #383838 86.08%)",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 17 16" fill="none">
                      <path
                        d="M14.5278 7.66669C14.5301 8.5466 14.3245 9.41461 13.9278 10.2C13.4575 11.1412 12.7343 11.9328 11.8395 12.4862C10.9446 13.0396 9.91333 13.3329 8.86116 13.3334C7.98125 13.3356 7.11324 13.1301 6.32783 12.7334L2.52783 14L3.7945 10.2C3.39778 9.41461 3.1922 8.5466 3.1945 7.66669C3.19491 6.61452 3.48824 5.58325 4.04164 4.68839C4.59505 3.79352 5.38667 3.0704 6.32783 2.60002C7.11324 2.20331 7.98125 1.99773 8.86117 2.00002L9.1945 2.00002C10.5841 2.07668 11.8965 2.66319 12.8806 3.64726C13.8647 4.63133 14.4512 5.94379 14.5278 7.33335L14.5278 7.66669Z"
                        stroke="#F3F3F3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div
                      className="flex-1 text-white text-center text-xs font-medium leading-4 tracking-[0.5px]"
                      style={{ fontFamily: "Roboto" }}
                    >
                      <span className="font-normal text-xs">1</span>
                    </div>
                  </button>

                  <button
                    onClick={handleLikeClick}
                    className={`flex items-center gap-2.5 h-10 px-3 rounded-full border transition-all duration-300 ease-in-out ${
                      isLiked ? "bg-red-500 border-red-500" : "border-black"
                    }`}
                    style={
                      !isLiked
                        ? {
                            background: "linear-gradient(330deg, #242424 12.95%, #383838 86.08%)",
                          }
                        : {}
                    }
                  >
                    <svg width="16" height="16" viewBox="0 0 17 16" fill="none">
                      <path
                        d="M14.4212 3.07333C14.0807 2.73267 13.6764 2.46243 13.2314 2.27805C12.7864 2.09368 12.3095 1.99878 11.8278 1.99878C11.3462 1.99878 10.8692 2.09368 10.4243 2.27805C9.97929 2.46243 9.575 2.73267 9.2345 3.07333L8.52783 3.78L7.82116 3.07333C7.13337 2.38554 6.20052 1.99914 5.22783 1.99914C4.25514 1.99914 3.32229 2.38554 2.6345 3.07333C1.9467 3.76112 1.5603 4.69397 1.5603 5.66666C1.5603 6.63935 1.9467 7.5722 2.6345 8.26L8.52783 14.1533L14.4212 8.26C14.7618 7.91949 15.0321 7.51521 15.2164 7.07024C15.4008 6.62526 15.4957 6.14832 15.4957 5.66667C15.4957 5.18501 15.4008 4.70807 15.2164 4.2631C15.0321 3.81812 14.7618 3.41384 14.4212 3.07333Z"
                        stroke="#F3F3F3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill={isLiked ? "#F3F3F3" : "none"}
                      />
                    </svg>
                    <div
                      className="flex-1 text-white text-center text-xs font-medium leading-4 tracking-[0.5px]"
                      style={{ fontFamily: "Roboto" }}
                    >
                      <span className="font-normal text-xs">
                        {videoLikes[currentVideoIndex]}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Far Right Control Section */}
                <div className="flex flex-col justify-center items-start gap-1.5">
                  <div className="group relative">
                    <button
                      className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-in-out"
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 41 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g filter="url(#play-filter)">
                          <ellipse
                            cx="20.472"
                            cy="20.01"
                            rx="20"
                            ry="20.01"
                            fill="url(#play-gradient)"
                          />
                          <path
                            d="M20.472 0.5C31.241 0.5 39.972 9.235 39.972 20.01C39.972 30.785 31.242 39.521 20.472 39.521C9.703 39.521 0.972 30.785 0.972 20.01C0.972 9.235 9.703 0.5 20.472 0.5Z"
                            stroke="url(#play-stroke)"
                          />
                          <path
                            d="M20.472 0.5C31.241 0.5 39.972 9.235 39.972 20.01C39.972 30.785 31.242 39.521 20.472 39.521C9.703 39.521 0.972 30.785 0.972 20.01C0.972 9.235 9.703 0.5 20.472 0.5Z"
                            stroke="black"
                          />
                        </g>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                        >
                          <path
                            d="M9.8117 8.51841L8.3795 7.08621C8.1843 6.89101 8.0867 6.79341 7.98137 6.74121C7.78103 6.64193 7.54583 6.64193 7.34543 6.74121C7.24017 6.79341 7.14255 6.89101 6.94732 7.08621C6.75209 7.28148 6.65447 7.37908 6.60229 7.48435C6.50301 7.68475 6.50301 7.91995 6.60229 8.12028C6.65447 8.22561 6.75209 8.32321 6.94732 8.51841L8.3795 9.95061M9.8117 8.51841L14.1084 12.8151C14.3036 13.0103 14.4012 13.1079 14.4534 13.2132C14.5526 13.4135 14.5526 13.6487 14.4534 13.8491C14.4012 13.9544 14.3036 14.052 14.1084 14.2473C13.9131 14.4425 13.8155 14.5401 13.7102 14.5923C13.5098 14.6915 13.2746 14.6915 13.0743 14.5923C12.969 14.5401 12.8714 14.4425 12.6762 14.2473L8.3795 9.95061M9.8117 8.51841L8.3795 9.95061"
                            stroke="#F3F3F3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.8612 1.33325L12.0577 1.86432C12.3154 2.5607 12.4443 2.90889 12.6983 3.16289C12.9523 3.41689 13.3004 3.54573 13.9968 3.80341L14.5279 3.99992L13.9968 4.19643C13.3004 4.45411 12.9523 4.58296 12.6983 4.83695C12.4443 5.09095 12.3154 5.43914 12.0577 6.13552L11.8612 6.66659L11.6647 6.13552C11.407 5.43915 11.2781 5.09095 11.0241 4.83695C10.7701 4.58295 10.422 4.45411 9.72559 4.19643L9.19452 3.99992L9.72559 3.80341C10.422 3.54573 10.7701 3.41689 11.0241 3.16289C11.2781 2.90889 11.407 2.5607 11.6647 1.86432L11.8612 1.33325Z"
                            stroke="#F3F3F3"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4.52783 2.66675L4.67522 3.06505C4.86848 3.58733 4.96511 3.84848 5.15561 4.03898C5.34611 4.22947 5.60725 4.3261 6.12953 4.51936L6.52783 4.66675L6.12953 4.81414C5.60725 5.00739 5.3461 5.10403 5.1556 5.29453C4.96511 5.48502 4.86848 5.74617 4.67522 6.26845L4.52783 6.66675L4.38044 6.26845C4.18718 5.74617 4.09055 5.48502 3.90005 5.29453C3.70956 5.10403 3.44841 5.00739 2.92613 4.81413L2.52783 4.66675L2.92613 4.51936C3.44841 4.3261 3.70956 4.22947 3.90005 4.03897C4.09055 3.84847 4.18719 3.58733 4.38045 3.06505L4.52783 2.66675Z"
                            stroke="#F3F3F3"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 px-2 py-1 bg-nav-bg text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      Remix
                    </div>
                  </div>

                  <div className="group relative">
                    <button
                      onClick={handleDetailsClick}
                      className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-in-out"
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 41 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g filter="url(#play-filter)">
                          <ellipse
                            cx="20.472"
                            cy="20.01"
                            rx="20"
                            ry="20.01"
                            fill="url(#play-gradient)"
                          />
                          <path
                            d="M20.472 0.5C31.241 0.5 39.972 9.235 39.972 20.01C39.972 30.785 31.242 39.521 20.472 39.521C9.703 39.521 0.972 30.785 0.972 20.01C0.972 9.235 9.703 0.5 20.472 0.5Z"
                            stroke="url(#play-stroke)"
                          />
                          <path
                            d="M20.472 0.5C31.241 0.5 39.972 9.235 39.972 20.01C39.972 30.785 31.242 39.521 20.472 39.521C9.703 39.521 0.972 30.785 0.972 20.01C0.972 9.235 9.703 0.5 20.472 0.5Z"
                            stroke="black"
                          />
                        </g>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                        >
                          <path
                            d="M8.52781 10.6666L8.52781 7.99992M8.52781 5.33325L8.53448 5.33325M15.1945 7.99992C15.1945 11.6818 12.2097 14.6666 8.52781 14.6666C4.84591 14.6666 1.86114 11.6818 1.86114 7.99992C1.86114 4.31802 4.84591 1.33325 8.52781 1.33325C12.2097 1.33325 15.1945 4.31802 15.1945 7.99992Z"
                            stroke="#F3F3F3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
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
          showDetails ? "translate-x-0" : "translate-x-full"
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
                  title={showCopiedFeedback ? "Copied!" : "Copy prompt"}
                >
                  {showCopiedFeedback ? (
                    <>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-text-primary"
                      >
                        <polyline points="20,6 9,17 4,12"></polyline>
                      </svg>
                      <span className="text-text-primary text-xs font-medium">
                        Copied
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy
                        size={14}
                        className="text-text-primary"
                        strokeWidth={1.6}
                      />
                      <span className="text-text-primary text-xs font-medium">
                        Copy
                      </span>
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
                <span className="text-text-primary text-base font-bold">
                  Title
                </span>
                <span className="text-text-primary text-base text-right">
                  {currentVideo.title}
                </span>
              </div>
              <div className="flex items-start justify-between py-6 border-t border-border-neutral">
                <span className="text-text-primary text-base font-bold">
                  Year
                </span>
                <span className="text-text-primary text-base text-right">
                  {currentVideo.year}
                </span>
              </div>
              <div className="flex items-start justify-between py-6 border-t border-border-neutral">
                <span className="text-text-primary text-base font-bold">
                  Views
                </span>
                <span className="text-text-primary text-base text-right">
                  {currentVideo.views}
                </span>
              </div>
              <div className="flex items-start justify-between py-6 border-t border-border-neutral">
                <span className="text-text-primary text-base font-bold">
                  Credits
                </span>
                <span className="text-text-primary text-base text-right">
                  Cody Mcvie
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-end gap-3 flex-wrap">
            <button className="flex items-center gap-2 bg-brand-primary border border-brand-primary rounded-lg px-3 py-3 text-brand-text text-base font-normal hover:bg-opacity-90 transition-colors">
              <Share2
                size={16}
                className="text-text-primary"
                strokeWidth={1.6}
              />
              Share
            </button>
            <button className="flex items-center justify-center bg-brand-primary border border-brand-primary rounded-lg p-3 hover:bg-opacity-90 transition-colors">
              <Download
                size={16}
                className="text-text-primary"
                strokeWidth={1.6}
              />
            </button>
            <button
              onClick={handleLikeClick}
              className={`flex items-center gap-2 border rounded-lg px-3 py-3 text-base font-normal transition-all ${
                isLiked
                  ? "bg-red-500 border-red-500 text-white"
                  : "bg-brand-primary border-brand-primary text-brand-text hover:bg-opacity-90"
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
              <MessageCircle
                size={16}
                className="text-text-primary"
                strokeWidth={1.6}
              />
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
          showComments ? "translate-x-0" : "translate-x-full"
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
                          <span className="text-text-primary text-base font-bold">
                            {comment.author}
                          </span>
                          <span className="text-text-primary text-base">
                            {comment.text}
                          </span>
                        </div>
                        <span className="text-text-secondary text-sm">
                          {comment.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollableContainer>
            </div>

            {/* Comment Input */}
            <div className="mt-auto">
              <div
                className="flex flex-col h-[120px] min-h-[80px] p-3 px-4 rounded-lg"
                style={{ backgroundColor: "#434343" }}
              >
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
                      console.log("Add attachment clicked");
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M7.99992 3.3335V12.6668M3.33325 8.00016H12.6666"
                        stroke="#F3F3F3"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    className="flex items-center justify-center p-2 hover:bg-brand-primary rounded-lg transition-colors disabled:opacity-50"
                    disabled={!commentText.trim()}
                    onClick={handleSubmitComment}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M7.99992 12.6668V3.3335M7.99992 3.3335L3.33325 8.00016M7.99992 3.3335L12.6666 8.00016"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TV;
