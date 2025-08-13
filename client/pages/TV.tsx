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
  FileText 
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const TV = () => {
  return (
    <div className="h-screen bg-app-bg relative overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeItem="tv" />

      {/* Main Content */}
      <main className="ml-20 px-6 pt-3 pb-6 h-screen flex flex-col">
        <div className="max-w-[1200px] mx-auto flex flex-col h-full">
          {/* Header */}
          <Header />

          {/* Video Player Content */}
          <div className="flex-1 flex flex-col gap-3 min-h-0">
            {/* Video Player Area */}
            <div className="flex items-center gap-3 flex-1 w-full min-h-0">
              {/* Left Side Video */}
              <div className="w-[60px] flex-shrink-0 h-full relative rounded-lg overflow-hidden">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/74d4309d658b5e8b28f5b3150c6dd3db871e721c?width=228"
                  alt="Side video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
                <button className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[25px] h-[25px] bg-white bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play size={12} className="text-white ml-0.5" fill="white" />
                  </div>
                </button>
              </div>

              {/* Main Video Player */}
              <div className="flex-1 h-full flex justify-center items-center bg-gray-300 rounded-lg relative">
                <button className="w-[120px] h-[120px] bg-white bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-opacity-40 transition-colors">
                  <Play size={48} className="text-white ml-2" fill="white" />
                </button>
              </div>

              {/* Right Side Video */}
              <div className="w-[60px] flex-shrink-0 h-full relative rounded-lg overflow-hidden">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/1e810018ba559b80ef3bd7b4264ac0910600e3d3?width=228"
                  alt="Side video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
                <button className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[25px] h-[25px] bg-white bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play size={12} className="text-white ml-0.5" fill="white" />
                  </div>
                </button>
              </div>
            </div>

            {/* Controls Section */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* Remix Button */}
              <div className="flex justify-end items-center">
                <button className="flex items-center gap-2 bg-brand-primary border border-brand-primary rounded-lg px-3 py-3 text-brand-text text-base font-normal hover:bg-opacity-90 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.28387 8.51817L7.85167 7.08597C7.65647 6.89077 7.55887 6.79317 7.45353 6.74097C7.2532 6.64168 7.018 6.64168 6.8176 6.74097C6.71233 6.79317 6.61471 6.89077 6.41949 7.08597C6.22425 7.28124 6.12664 7.37884 6.07446 7.4841C5.97518 7.6845 5.97518 7.9197 6.07446 8.12004C6.12664 8.22537 6.22425 8.32297 6.41949 8.51817L7.85167 9.95037M9.28387 8.51817L13.5805 12.8148C13.7757 13.01 13.8733 13.1076 13.9255 13.213C14.0248 13.4133 14.0248 13.6485 13.9255 13.8489C13.8733 13.9542 13.7757 14.0518 13.5805 14.247C13.3853 14.4422 13.2877 14.5398 13.1824 14.592C12.982 14.6913 12.7468 14.6913 12.5465 14.592C12.4411 14.5398 12.3435 14.4422 12.1483 14.247L7.85167 9.95037M9.28387 8.51817L7.85167 9.95037" stroke="currentColor" strokeWidth="1.3125" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.3333 1.3335L11.5298 1.86456C11.7875 2.56094 11.9164 2.90913 12.1704 3.16313C12.4244 3.41713 12.7725 3.54597 13.4689 3.80365L14 4.00016L13.4689 4.19668C12.7725 4.45436 12.4244 4.5832 12.1704 4.8372C11.9164 5.0912 11.7875 5.43938 11.5298 6.13576L11.3333 6.66683L11.1368 6.13576C10.8791 5.43939 10.7502 5.0912 10.4962 4.8372C10.2422 4.5832 9.89409 4.45436 9.19769 4.19668L8.66663 4.00016L9.19769 3.80365C9.89409 3.54597 10.2422 3.41713 10.4962 3.16313C10.7502 2.90913 10.8791 2.56094 11.1368 1.86456L11.3333 1.3335Z" stroke="currentColor" strokeWidth="1.3125" strokeLinejoin="round"/>
                    <path d="M4 2.6665L4.14739 3.0648C4.34065 3.58708 4.43728 3.84823 4.62778 4.03873C4.81827 4.22922 5.07942 4.32586 5.6017 4.51912L6 4.6665L5.6017 4.81389C5.07942 5.00715 4.81827 5.10378 4.62777 5.29428C4.43728 5.48478 4.34065 5.74592 4.14739 6.2682L4 6.6665L3.85261 6.2682C3.65935 5.74592 3.56272 5.48478 3.37222 5.29428C3.18173 5.10378 2.92058 5.00715 2.3983 4.81389L2 4.6665L2.3983 4.51912C2.92058 4.32586 3.18173 4.22922 3.37222 4.03872C3.56272 3.84823 3.65935 3.58708 3.85261 3.0648L4 2.6665Z" stroke="currentColor" strokeWidth="1.3125" strokeLinejoin="round"/>
                  </svg>
                  Remix
                </button>
              </div>

              {/* Media Controller */}
              <div className="flex items-start gap-12 bg-nav-bg border border-brand-primary rounded-2xl p-5 backdrop-blur-sm">
                {/* TV Icon */}
                <div className="flex items-center gap-3">
                  <button className="flex items-center justify-center p-3 bg-brand-primary border border-brand-primary rounded-lg">
                    <svg className="w-[34.4px] h-[34.4px]" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M25.1666 3.66699L18 10.8337L10.8333 3.66699M6.53329 10.8337H29.4666C31.0498 10.8337 32.3333 12.1171 32.3333 13.7003V29.467C32.3333 31.0502 31.0498 32.3337 29.4666 32.3337H6.53329C4.95008 32.3337 3.66663 31.0502 3.66663 29.467V13.7003C3.66663 12.1171 4.95008 10.8337 6.53329 10.8337Z" stroke="#F5F5F5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                {/* Media Controls */}
                <div className="flex flex-col justify-center items-start gap-1.5">
                  {/* Top Row Controls */}
                  <div className="flex items-start gap-3">
                    <button className="flex items-center justify-center p-3 bg-brand-primary border border-brand-primary rounded-lg hover:bg-opacity-90 transition-colors">
                      <SkipBack size={16} className="text-text-primary" strokeWidth={1.6} />
                    </button>
                    <button className="flex items-center justify-center p-3 bg-brand-primary border border-brand-primary rounded-lg hover:bg-opacity-90 transition-colors">
                      <Pause size={16} className="text-text-primary" strokeWidth={1.6} />
                    </button>
                    <button className="flex items-center justify-center p-3 bg-brand-primary border border-brand-primary rounded-lg hover:bg-opacity-90 transition-colors">
                      <SkipForward size={16} className="text-text-primary" strokeWidth={1.6} />
                    </button>
                  </div>

                  {/* Bottom Row Controls */}
                  <div className="flex items-start gap-3">
                    <button className="flex items-center justify-center p-3 bg-brand-primary border border-brand-primary rounded-lg hover:bg-opacity-90 transition-colors">
                      <Repeat size={16} className="text-text-primary" strokeWidth={1.2} />
                    </button>
                    <button className="flex items-center justify-center p-3 bg-brand-primary border border-brand-primary rounded-lg hover:bg-opacity-90 transition-colors">
                      <VolumeX size={16} className="text-text-primary" strokeWidth={1.2} />
                    </button>
                    <button className="flex items-center justify-center p-3 bg-brand-primary border border-brand-primary rounded-lg hover:bg-opacity-90 transition-colors">
                      <Maximize2 size={16} className="text-text-primary" strokeWidth={1.6} />
                    </button>
                  </div>
                </div>

                {/* Now Playing Section */}
                <div className="flex flex-col justify-center items-start gap-2.5 bg-brand-primary rounded-lg p-2.5 backdrop-blur-sm">
                  <div className="flex items-center gap-2.5">
                    <ChevronLeft size={16} className="text-text-primary" strokeWidth={1.6} />
                    <div className="w-10 h-10 rounded-lg overflow-hidden relative">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/ae4e8c13075e64b7209a5f67540fbb6b82c43f26?width=82"
                        alt="Now playing"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
                    </div>
                    <ChevronRight size={16} className="text-text-primary" strokeWidth={1.6} />
                  </div>
                  <div className="text-brand-text text-center text-xs font-medium leading-4 tracking-wide w-full">
                    No Time to Die
                  </div>
                </div>

                {/* Social Actions */}
                <div className="flex flex-col justify-center items-start gap-1.5">
                  <button className="flex items-center gap-2 bg-brand-primary border border-brand-primary rounded-lg px-3 py-3 text-brand-text text-base font-normal hover:bg-opacity-90 transition-colors">
                    <Heart size={16} className="text-text-primary" strokeWidth={1.6} />
                    89
                  </button>
                  <button className="flex items-center gap-2 bg-brand-primary border border-brand-primary rounded-lg px-3 py-3 text-brand-text text-base font-normal hover:bg-opacity-90 transition-colors w-full">
                    <MessageCircle size={16} className="text-text-primary" strokeWidth={1.6} />
                    1
                  </button>
                </div>

                {/* Additional Actions */}
                <div className="flex flex-col justify-center items-start gap-1.5">
                  <button className="flex items-center justify-center p-3 bg-brand-primary border border-brand-primary rounded-lg hover:bg-opacity-90 transition-colors">
                    <Share2 size={16} className="text-text-primary" strokeWidth={1.6} />
                  </button>
                  <button className="flex items-center justify-center p-3 bg-brand-primary border border-brand-primary rounded-lg hover:bg-opacity-90 transition-colors">
                    <FileText size={16} className="text-text-primary" strokeWidth={1.6} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TV;
