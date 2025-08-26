import { Tv, Layers, Image, Globe, User, MapPin, ArrowLeft, Download, Plus, ArrowUp } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ScrollableContainer } from "../components/ui/scrollable-container";
import { Button } from "../components/ui/button";
import { useState } from 'react';

const ExpandedSidebar = ({ activeRoom }: { activeRoom?: string }) => {
  const location = useLocation();

  const getActiveItem = () => {
    const path = location.pathname;
    if (path === "/tv") return "tv";
    if (path === "/library") return "library";
    if (path.startsWith("/community")) return "community";
    if (path === "/") return "explore";
    return "explore";
  };

  const currentActiveItem = getActiveItem();

  const mainMenuItems = [
    { id: "tv", icon: Tv, label: "TV", path: "/tv" },
    { id: "explore", icon: Layers, label: "Explore", path: "/" },
    { id: "library", icon: Image, label: "Library", path: "/library" },
  ];

  const communityItems = [
    { id: "general", label: "General", path: "/community/general" },
    {
      id: "announcements",
      label: "Announcements", 
      path: "/community/announcements",
    },
    { id: "rules", label: "Rules", path: "/community/rules" },
    { id: "create", label: "Create", path: "/community/create" },
  ];

  const bottomMenuItems = [
    { id: "characters", icon: User, label: "Characters", path: "/characters" },
    { id: "sets", icon: MapPin, label: "Sets", path: "/sets" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[252px] bg-transparent flex flex-col py-7 pb-3 pl-4 pr-6 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
          <svg
            width="27"
            height="27"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.118 17.6274L17.4702 14.1385M17.4702 14.1385L17.7491 13.7274C17.9287 13.4552 18.1781 13.2364 18.4713 13.0937C18.7644 12.951 19.0906 12.8898 19.4155 12.9163C19.7405 12.9429 20.0523 13.0564 20.3184 13.2448C20.5845 13.4332 20.795 13.6897 20.928 13.9874L23.8124 20.144C24.408 21.4129 23.5124 22.8885 22.1491 22.8885H5.85132C4.49132 22.8885 3.59577 21.4218 4.18355 20.1529L10.6369 6.19737C10.7809 5.8713 11.0174 5.5946 11.3171 5.4015C11.6167 5.20841 11.9664 5.10738 12.3229 5.11093C12.6793 5.11448 13.0269 5.22244 13.3227 5.42146C13.6184 5.62048 13.8493 5.90183 13.9869 6.23071L17.4702 14.1385Z"
              stroke="#2C2C2C"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.66663 17.3325C5.66663 17.3325 9.55552 15.6659 12.3333 17.3325C18.9688 21.3136 22.3333 17.3325 22.3333 17.3325"
              stroke="#2C2C2C"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-white text-base font-bold leading-6">Cliff</span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-1">
        {/* Main Menu Items */}
        {mainMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentActiveItem === item.id;
          const opacity = isActive ? 1 : 0.3;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`
                flex items-center gap-3 h-[46px] pl-4 pr-4 py-3 rounded-lg transition-all duration-200
                ${isActive ? "bg-nav-hover" : "hover:bg-nav-hover"}
              `}
              style={{ opacity }}
            >
              <Icon size={20} className="text-text-primary" />
              <span className="text-text-primary text-base font-normal leading-5 flex-1">
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Community Section */}
        <div className="flex flex-col">
          <Link
            to="/community"
            className={`
              flex items-center gap-3 h-[46px] pl-4 pr-4 py-3 rounded-lg transition-all duration-200
              ${currentActiveItem === "community" ? "bg-nav-hover" : "hover:bg-nav-hover"}
            `}
          >
            <Globe size={20} className="text-text-primary" />
            <span className="text-text-primary text-base font-normal leading-5 flex-1">
              Community
            </span>
          </Link>

          {/* Community Sub-items */}
          <div className="flex flex-col relative">
            {/* Thread line */}
            <div className="absolute left-7 top-0 w-0.5 h-[186px] bg-nav-hover"></div>

            {communityItems.map((item) => {
              const isActiveRoom = activeRoom === item.id;
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center h-[46px] pt-3 pr-4 pb-3 pl-[26px] rounded-lg transition-all duration-200 hover:bg-nav-hover ${!isActiveRoom ? 'opacity-30' : ''}`}
                >
                  <span className="text-text-primary text-base font-normal leading-5 flex-1 ml-6">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Menu Items */}
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentActiveItem === item.id;
          const opacity = isActive ? 1 : 0.3;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`
                flex items-center gap-3 h-[46px] pl-4 pr-4 py-3 rounded-lg transition-all duration-200
                ${isActive ? "bg-nav-hover" : "hover:bg-nav-hover"}
              `}
              style={{ opacity }}
            >
              <Icon size={20} className="text-text-primary" />
              <span className="text-text-primary text-base font-normal leading-5 flex-1">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

const CommunityRoom = () => {
  const { roomId } = useParams();
  const [messageInput, setMessageInput] = useState('');
  
  const roomData = {
    create: {
      title: "Create",
      description: "Drop your prompts, scenes, or concepts. This is your creative playground."
    },
    general: {
      title: "General", 
      description: "Connect, share ideas, and chat about everything AI video."
    },
    announcements: {
      title: "Announcements",
      description: "Stay updated with the latest news, features, and community highlights."
    },
    rules: {
      title: "Rules",
      description: "Guidelines to keep our space respectful, creative, and constructive."
    }
  };

  const currentRoom = roomData[roomId as keyof typeof roomData] || roomData.create;

  return (
    <div className="min-h-screen bg-app-bg relative">
      {/* Expanded Sidebar */}
      <ExpandedSidebar activeRoom={roomId} />

      {/* Main Content */}
      <main className="ml-[252px] px-6 min-h-screen">
        <div className="pt-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-10">
            <Button asChild size="default" variant="default">
              <Link to="/community">
                <ArrowLeft size={16} />
                Lobby
              </Link>
            </Button>
            
            <div className="flex flex-col flex-1">
              <h1 className="text-text-primary text-2xl font-bold leading-tight text-center">
                {currentRoom.title}
              </h1>
              <p className="text-text-neutral-tertiary text-base font-normal leading-relaxed text-center">
                {currentRoom.description}
              </p>
            </div>

            <Button asChild size="default" variant="default" className="opacity-0 pointer-events-none">
              <Link to="/community">
                Lobby
              </Link>
            </Button>
          </div>

          {/* Content Area */}
          <ScrollableContainer className="h-[calc(100vh-200px)]">
            <div className="flex flex-col justify-end items-start gap-6 h-full">
              {/* User Profile and Content */}
              <div className="flex flex-col gap-3">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/9e1049624f15a39f810df66dbfc884a730489857?width=80"
                    alt="User avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-brand-text text-base font-bold">James Brownlee</span>
                </div>

                {/* Content Video/Image */}
                <div className="relative w-[525px] h-[300px] rounded-2xl overflow-hidden">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/46c748b5e9237fa2abd2eceb96a20cfc92299e72?width=1050"
                    alt="Content"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-primary text-sm font-bold leading-5 line-clamp-3 max-w-[525px]">
                  A gritty urban rooftop at dusk, moments after a failed heist. One camera drone silently hovers overhead, unnoticed by the characters. Two masked figures argue over a betrayal, but their conversation is fragmented—echoed by snippets of surveillance footage layered over the scene. Neon light from distant billboards casts eerie reflections across their gear. The tension crackles as one reveals they were live-streamed the entire time. This is not just a crime—it was an audition. Flashbacks and glitchy overlays hint at a deeper game, where truth and performance blur.
                </p>

                {/* Tags and Actions */}
                <div className="flex items-center justify-between w-full max-w-[525px]">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 px-1 py-1 rounded-lg bg-brand-hover">
                      <div className="flex items-center justify-center w-5 h-5 relative">
                        <div className="w-4 h-[9px] border border-text-neutral-tertiary rounded-sm"></div>
                      </div>
                      <span className="text-text-brand-tertiary text-xs font-medium tracking-wide">16:9</span>
                    </div>
                    <div className="flex items-center px-1 py-1 h-7 rounded-lg bg-brand-hover">
                      <span className="text-text-brand-tertiary text-xs font-medium tracking-wide">Scene 1</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="default" className="text-xs">
                      Next scene
                    </Button>
                    <Button size="sm" variant="default" className="text-xs">
                      Redo
                    </Button>
                    <Button size="sm" variant="default" className="text-xs">
                      <Download size={16} />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs border-text-neutral-tertiary bg-surface-neutral text-text-dark hover:bg-surface-neutral/80">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.28387 8.51866L7.85167 7.08646C7.65647 6.89126 7.55887 6.79366 7.45353 6.74146C7.2532 6.64217 7.018 6.64217 6.8176 6.74146C6.71233 6.79366 6.61471 6.89126 6.41949 7.08646C6.22425 7.28172 6.12664 7.37932 6.07446 7.48459C5.97518 7.68499 5.97518 7.92019 6.07446 8.12052C6.12664 8.22586 6.22425 8.32346 6.41949 8.51866L7.85167 9.95086M9.28387 8.51866L13.5805 12.8153C13.7757 13.0105 13.8733 13.1081 13.9255 13.2135C14.0248 13.4138 14.0248 13.649 13.9255 13.8494C13.8733 13.9547 13.7757 14.0523 13.5805 14.2475C13.3853 14.4427 13.2877 14.5403 13.1824 14.5925C12.982 14.6918 12.7468 14.6918 12.5465 14.5925C12.4411 14.5403 12.3435 14.4427 12.1483 14.2475L7.85167 9.95086M9.28387 8.51866L7.85167 9.95086" stroke="#2C2C2C" strokeWidth="1.3125" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.3333 1.33301L11.5299 1.86407C11.7875 2.56045 11.9164 2.90864 12.1704 3.16264C12.4244 3.41664 12.7725 3.54548 13.4689 3.80316L14 3.99967L13.4689 4.19619C12.7725 4.45387 12.4244 4.58271 12.1704 4.83671C11.9164 5.09071 11.7875 5.43889 11.5299 6.13527L11.3333 6.66634L11.1368 6.13527C10.8791 5.4389 10.7503 5.09071 10.4963 4.83671C10.2423 4.58271 9.89412 4.45387 9.19772 4.19619L8.66666 3.99967L9.19772 3.80316C9.89412 3.54548 10.2423 3.41664 10.4963 3.16264C10.7503 2.90864 10.8791 2.56045 11.1368 1.86407L11.3333 1.33301Z" stroke="#2C2C2C" strokeWidth="1.3125" strokeLinejoin="round"/>
                        <path d="M4 2.66699L4.14739 3.06529C4.34065 3.58757 4.43728 3.84872 4.62778 4.03922C4.81827 4.22971 5.07942 4.32635 5.6017 4.51961L6 4.66699L5.6017 4.81438C5.07942 5.00764 4.81827 5.10427 4.62777 5.29477C4.43728 5.48527 4.34065 5.74641 4.14739 6.26869L4 6.66699L3.85261 6.26869C3.65935 5.74641 3.56272 5.48527 3.37222 5.29477C3.18173 5.10427 2.92058 5.00764 2.3983 4.81438L2 4.66699L2.3983 4.51961C2.92058 4.32635 3.18173 4.22971 3.37222 4.03921C3.56272 3.84872 3.65935 3.58757 3.85261 3.06529L4 2.66699Z" stroke="#2C2C2C" strokeWidth="1.3125" strokeLinejoin="round"/>
                      </svg>
                      Remix
                    </Button>
                  </div>
                </div>
              </div>

            </div>
          </ScrollableContainer>

          {/* Message Input - Fixed at bottom with 24px padding */}
          <div className="w-full pb-6">
            <div className="bg-nav-hover rounded-lg p-4 relative">
              <textarea
                placeholder="Message #Create"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="w-full bg-transparent border-0 outline-none resize-none text-base font-normal text-text-primary placeholder:text-text-default-tertiary min-h-[60px] pr-12"
                style={{
                  fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-nav-bg">
                  <Plus size={16} className="text-text-primary" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 hover:bg-nav-bg"
                  disabled={!messageInput.trim()}
                >
                  <ArrowUp size={16} className="text-text-primary" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunityRoom;
