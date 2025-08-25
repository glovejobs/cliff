import { Tv, Layers, Image, Globe, User, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ScrollableContainer } from '../components/ui/scrollable-container';

const ExpandedSidebar = ({ activeItem }: { activeItem?: string }) => {
  const location = useLocation();
  
  const getActiveItem = () => {
    if (activeItem) return activeItem;
    
    const path = location.pathname;
    if (path === '/tv') return 'tv';
    if (path === '/library') return 'library';
    if (path === '/community') return 'community';
    if (path === '/') return 'explore';
    return 'explore';
  };
  
  const currentActiveItem = getActiveItem();

  const mainMenuItems = [
    { id: 'tv', icon: Tv, label: 'TV', path: '/tv' },
    { id: 'explore', icon: Layers, label: 'Explore', path: '/' },
    { id: 'library', icon: Image, label: 'Library', path: '/library' },
  ];

  const communityItems = [
    { id: 'general', label: 'General', path: '/community/general' },
    { id: 'announcements', label: 'Announcements', path: '/community/announcements' },
    { id: 'rules', label: 'Rules', path: '/community/rules' },
    { id: 'create', label: 'Create', path: '/community/create' },
  ];

  const bottomMenuItems = [
    { id: 'characters', icon: User, label: 'Characters', path: '/characters' },
    { id: 'sets', icon: MapPin, label: 'Sets', path: '/sets' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[252px] bg-transparent flex flex-col py-7 pb-3 pl-8 pr-6 z-50">
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
                flex items-center gap-3 h-[46px] pl-2 pr-4 py-3 rounded-lg transition-all duration-200
                ${isActive ? 'bg-nav-hover' : 'hover:bg-nav-hover'}
              `}
              style={{ opacity }}
            >
              <Icon size={20} className="text-text-primary" />
              <span className="text-text-primary text-base font-normal leading-relaxed flex-1">
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
              flex items-center gap-3 h-[46px] pl-2 pr-4 py-3 rounded-lg transition-all duration-200
              ${currentActiveItem === 'community' ? 'bg-nav-hover' : 'hover:bg-nav-hover'}
            `}
          >
            <Globe size={20} className="text-text-primary" />
            <span className="text-text-primary text-base font-normal leading-relaxed flex-1">
              Community
            </span>
          </Link>
          
          {/* Community Sub-items */}
          <div className="flex flex-col relative">
            {/* Thread line */}
            <div className="absolute left-7 top-0 w-0.5 h-[186px] bg-nav-hover"></div>
            
            {communityItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="flex items-center h-[46px] px-4 py-3 rounded-lg transition-all duration-200 hover:bg-nav-hover opacity-30"
              >
                <span className="text-text-primary text-base font-normal leading-relaxed flex-1 ml-6">
                  {item.label}
                </span>
              </Link>
            ))}
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
                flex items-center gap-3 h-[46px] pl-2 pr-4 py-3 rounded-lg transition-all duration-200
                ${isActive ? 'bg-nav-hover' : 'hover:bg-nav-hover'}
              `}
              style={{ opacity }}
            >
              <Icon size={20} className="text-text-primary" />
              <span className="text-text-primary text-base font-normal leading-relaxed flex-1">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

interface RoomRowProps {
  name: string;
  description: string;
  owner: string;
  members: string[];
  activityImages: string[];
  isHighlighted?: boolean;
}

const RoomRow = ({ name, description, owner, members, activityImages, isHighlighted = false }: RoomRowProps) => {
  return (
    <div className={`flex items-center h-20 ${isHighlighted ? 'bg-nav-hover' : ''} rounded-lg`}>
      {/* Room */}
      <div className="flex flex-col justify-center px-2.5 w-[360px] h-full border-r-2 border-brand-primary">
        <h3 className="text-text-primary text-sm font-bold leading-5">{name}</h3>
        <p className="text-text-secondary text-sm font-bold leading-5 line-clamp-2">{description}</p>
      </div>
      
      {/* Owner */}
      <div className="flex justify-center items-center px-2.5 w-[109px] h-full border-r-2 border-brand-primary">
        <span className="text-text-primary text-sm font-bold leading-5 text-center">{owner}</span>
      </div>
      
      {/* Active Members */}
      <div className="flex justify-center items-center px-2.5 w-[228px] h-full border-r-2 border-brand-primary">
        <div className="flex items-center gap-1">
          {members.slice(0, 3).map((member, index) => (
            <img
              key={index}
              src={member}
              alt="Member"
              className="w-10 h-10 rounded-full"
            />
          ))}
          {members.length > 3 && (
            <div className="flex items-center justify-center w-6 h-6 bg-surface-neutral rounded-lg">
              <span className="text-text-secondary text-sm font-normal">+{members.length - 3}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Activity */}
      <div className="flex justify-center items-center px-2.5 flex-1 h-full">
        <div className="flex items-center gap-0.5">
          {activityImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Activity"
              className="w-[70px] h-10 rounded"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Community = () => {
  const tabs = [
    { id: 'all', label: 'All', active: true },
    { id: 'public', label: 'Public', active: false },
    { id: 'private', label: 'Private', active: false },
    { id: 'following', label: 'Following', active: false },
  ];

  const rooms = [
    {
      name: 'General',
      description: 'Connect, share ideas, and chat about everything AI video.',
      owner: 'Official',
      members: [
        'https://api.builder.io/api/v1/image/assets/TEMP/d17fa821e74744e66468f119a4ac6ac6a6a2195a?width=80',
        'https://api.builder.io/api/v1/image/assets/TEMP/9bd9fb271055c171759e5632266b7e9c703f5e0a?width=80',
        'https://api.builder.io/api/v1/image/assets/TEMP/dce9d290aea54b7832f919eeb66efede8cd0ae54?width=80',
        'additional'
      ],
      activityImages: [
        'https://api.builder.io/api/v1/image/assets/TEMP/062274d2306256151304ee1d165b91820262d32d?width=140',
        'https://api.builder.io/api/v1/image/assets/TEMP/89c1196c0d7830cf57126c7c2c4d2f1558ee93d1?width=140',
        'https://api.builder.io/api/v1/image/assets/TEMP/31b82520b77ed45c4b85c0bf24989c0475983631?width=140',
        'https://api.builder.io/api/v1/image/assets/TEMP/4b6b5d6acea9c5945f915a22cd4f8eb779b5aff2?width=140',
        'https://api.builder.io/api/v1/image/assets/TEMP/247f438db2f9bc92a769f6d4ebe9ab24e40ee83c?width=140'
      ],
      isHighlighted: true
    },
    {
      name: 'Announcements',
      description: 'Stay updated with the latest news, features, and community highlights.',
      owner: 'Official',
      members: [
        'https://api.builder.io/api/v1/image/assets/TEMP/d17fa821e74744e66468f119a4ac6ac6a6a2195a?width=80',
        'https://api.builder.io/api/v1/image/assets/TEMP/9bd9fb271055c171759e5632266b7e9c703f5e0a?width=80',
        'https://api.builder.io/api/v1/image/assets/TEMP/dce9d290aea54b7832f919eeb66efede8cd0ae54?width=80',
        'additional'
      ],
      activityImages: [
        'https://api.builder.io/api/v1/image/assets/TEMP/89c1196c0d7830cf57126c7c2c4d2f1558ee93d1?width=140',
        'https://api.builder.io/api/v1/image/assets/TEMP/31b82520b77ed45c4b85c0bf24989c0475983631?width=140',
        'https://api.builder.io/api/v1/image/assets/TEMP/4b6b5d6acea9c5945f915a22cd4f8eb779b5aff2?width=140',
        'https://api.builder.io/api/v1/image/assets/TEMP/247f438db2f9bc92a769f6d4ebe9ab24e40ee83c?width=140'
      ],
      isHighlighted: true
    },
    {
      name: 'Rules',
      description: 'Guidelines to keep our space respectful, creative, and constructive.',
      owner: 'Official',
      members: [
        'https://api.builder.io/api/v1/image/assets/TEMP/9bd9fb271055c171759e5632266b7e9c703f5e0a?width=80',
        'https://api.builder.io/api/v1/image/assets/TEMP/dce9d290aea54b7832f919eeb66efede8cd0ae54?width=80'
      ],
      activityImages: [
        'https://api.builder.io/api/v1/image/assets/TEMP/062274d2306256151304ee1d165b91820262d32d?width=140',
        'https://api.builder.io/api/v1/image/assets/TEMP/89c1196c0d7830cf57126c7c2c4d2f1558ee93d1?width=140',
        'https://api.builder.io/api/v1/image/assets/TEMP/31b82520b77ed45c4b85c0bf24989c0475983631?width=140',
        'https://api.builder.io/api/v1/image/assets/TEMP/4b6b5d6acea9c5945f915a22cd4f8eb779b5aff2?width=140',
        'https://api.builder.io/api/v1/image/assets/TEMP/247f438db2f9bc92a769f6d4ebe9ab24e40ee83c?width=140'
      ]
    },
    {
      name: 'Create',
      description: 'Drop your prompts, scenes, or concepts. This is your creative playground.',
      owner: 'Official',
      members: [
        'https://api.builder.io/api/v1/image/assets/TEMP/d17fa821e74744e66468f119a4ac6ac6a6a2195a?width=80'
      ],
      activityImages: [
        'https://api.builder.io/api/v1/image/assets/TEMP/062274d2306256151304ee1d165b91820262d32d?width=140',
        'https://api.builder.io/api/v1/image/assets/TEMP/89c1196c0d7830cf57126c7c2c4d2f1558ee93d1?width=140',
        'https://api.builder.io/api/v1/image/assets/TEMP/31b82520b77ed45c4b85c0bf24989c0475983631?width=140'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-app-bg relative">
      {/* Expanded Sidebar */}
      <ExpandedSidebar activeItem="community" />

      {/* Fixed Header Section */}
      <div className="fixed top-0 left-[252px] right-0 z-40 bg-app-bg px-6">
        <div className="pt-6 pb-4">
          <div className="flex flex-col justify-center items-start gap-2.5 max-w-[600px] w-full mx-auto">
            <h1 className="text-text-primary text-3xl font-normal leading-tight w-full text-center">
              Rooms
            </h1>
            <p className="text-text-primary text-base font-normal leading-relaxed w-full text-center">
              A space to create and collaborate on prompts and video generations
            </p>
          </div>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <main className="ml-[252px] px-6 min-h-screen" style={{ paddingTop: '138px' }}>
        <ScrollableContainer className="h-screen" style={{ height: 'calc(100vh - 138px)' }}>
          <div className="flex flex-col items-center gap-12 flex-1">
          
          {/* Content */}
          <div className="flex flex-col gap-6 flex-1 w-full">
            {/* Tabs */}
            <div className="flex items-start">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`
                    flex justify-center items-center px-3 py-1 rounded-t border-b
                    ${tab.active 
                      ? 'text-text-primary border-gray-300' 
                      : 'text-text-secondary border-transparent'
                    }
                  `}
                >
                  <span className="text-base font-normal leading-relaxed">
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
            
            {/* Table */}
            <div className="flex flex-col relative">
              {/* Table Header */}
              <div className="flex items-center h-10 mb-2">
                <div className="flex justify-center items-center px-2.5 w-[360px] h-full">
                  <span className="text-text-secondary text-sm font-bold leading-5 w-full">Room</span>
                </div>
                <div className="flex justify-center items-center px-2.5 w-[109px] h-full">
                  <span className="text-text-secondary text-sm font-bold leading-5 text-center">Owner</span>
                </div>
                <div className="flex justify-center items-center px-2.5 w-[228px] h-full">
                  <span className="text-text-secondary text-sm font-bold leading-5 text-center">Active</span>
                </div>
                <div className="flex justify-center items-center px-2.5 flex-1 h-full">
                  <span className="text-text-secondary text-sm font-bold leading-5">Activity</span>
                </div>
              </div>
              
              {/* Table Rows */}
              <div className="flex flex-col gap-2">
                {rooms.map((room, index) => (
                  <RoomRow
                    key={index}
                    name={room.name}
                    description={room.description}
                    owner={room.owner}
                    members={room.members}
                    activityImages={room.activityImages}
                    isHighlighted={room.isHighlighted}
                  />
                ))}
              </div>
            </div>
            
            {/* Spacer */}
            <div className="h-6"></div>
          </div>
          </div>
        </ScrollableContainer>
      </main>
    </div>
  );
};

export default Community;
