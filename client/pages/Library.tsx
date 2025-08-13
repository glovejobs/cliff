import { ChevronDown, Heart, Play, Edit } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { ScrollableContainer } from '../components/ui/scrollable-container';

interface MediaCardProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  posterImage: string;
  tag: string;
  remixCount: string;
}

const MediaCard = ({ title, subtitle, description, backgroundImage, posterImage, tag, remixCount }: MediaCardProps) => {
  return (
    <div className="flex flex-col gap-3 flex-1">
      {/* Media Container */}
      <div className="relative bg-white rounded overflow-hidden aspect-[3/2]">
        <img 
          src={backgroundImage} 
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>
        
        {/* Genre tag */}
        <div className="absolute top-3 left-3">
          <div className="bg-surface-neutral px-2 py-1 rounded-lg">
            <span className="text-text-dark text-xs font-medium leading-4 tracking-wide">
              {tag}
            </span>
          </div>
        </div>
        
        {/* Bottom content area */}
        <div className="absolute bottom-2.5 left-2.5 flex items-end gap-3 w-[calc(100%-20px)]">
          {/* Movie poster */}
          <div className="w-[75px] h-[111px] bg-white rounded-md overflow-hidden flex-shrink-0">
            <img 
              src={posterImage} 
              alt={`${title} poster`}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Title and date */}
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex flex-col gap-0">
              <h3 className="text-white text-xl font-medium leading-8">
                {title}
              </h3>
              <p className="text-text-secondary text-xs font-bold leading-5">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-col gap-3">
        {/* Title */}
        <div className="flex flex-col">
          <h4 className="text-text-primary text-sm font-bold leading-5">
            {title.includes('Time') ? "James Bond's Death" : 
             title.includes('Skywalker') ? "Rey's Heritage Revelation" : 
             "Rushed Final Season"}
          </h4>
        </div>
        
        {/* Description */}
        <p className="text-text-secondary text-sm font-bold leading-5 line-clamp-3">
          {description}
        </p>
        
        {/* Actions */}
        <div className="flex flex-col justify-center gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
              <Heart size={16} className="text-text-primary" strokeWidth={1.6} />
              <span className="text-brand-text text-xs font-medium leading-5">
                {remixCount}
              </span>
            </div>
            
            <button className="flex items-center gap-2 bg-surface-neutral border border-border-neutral rounded-lg px-2 py-2 text-text-dark text-xs font-medium hover:bg-opacity-90 transition-colors">
              <Play size={16} className="text-text-dark" strokeWidth={1.6} />
              Watch video
            </button>
            
            <button className="flex items-center gap-2 bg-brand-primary border border-brand-primary rounded-lg px-2 py-2 text-brand-text text-xs font-medium hover:bg-opacity-90 transition-colors">
              <Edit size={16} className="text-text-primary" strokeWidth={1.6} />
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Library = () => {
  const mediaItems = [
    {
      title: "No Time to Die",
      subtitle: "Yesterday",
      description: "Bond and Madeleine sit in a dimly lit safehouse in Morocco. Over a glass of scotch, they argue about trust, betrayal, and whether love has a place in espionage. Bond's phone buzzes with a new mission, but he hesitates — for once, the stakes feel personal.",
      backgroundImage: "https://api.builder.io/api/v1/image/assets/TEMP/3c5ea0d6416506e14069be6ab0c53d1103f00a79?width=845",
      posterImage: "https://api.builder.io/api/v1/image/assets/TEMP/f5418c276cc60ca0f580ff926769520c6081d9f5?width=150",
      tag: "Action",
      remixCount: "89 remixes"
    },
    {
      title: "The Rise of Skywalker",
      subtitle: "2 days ago",
      description: "Rey confronts Kylo Ren in the ruins of a fallen Jedi temple. As lightning crackles overhead, they debate whether legacy defines destiny. Rey insists the Force belongs to everyone, while Kylo argues power must be claimed. Their words echo through the stone as ghostly whispers of past Jedi swirl around them.",
      backgroundImage: "https://api.builder.io/api/v1/image/assets/TEMP/6b0bcedf19ff5df5863236c7193d35137278ff79?width=845",
      posterImage: "https://api.builder.io/api/v1/image/assets/TEMP/9012f6a40fcfcf1cef4527330fccdc70779fb621?width=150",
      tag: "Sci-Fi",
      remixCount: "46 remixes"
    },
    {
      title: "Game of Thrones",
      subtitle: "This week",
      description: "Arya and Tyrion share a quiet moment in the crypts of Winterfell. Surrounded by the dead, they discuss vengeance, legacy, and the cost of survival. Arya questions whether peace is ever real, while Tyrion wonders if monsters are born or made. A raven screeches overhead, signaling change.",
      backgroundImage: "https://api.builder.io/api/v1/image/assets/TEMP/6a7a1a4168e8ba99c0fbdf0f466e70f4c8041573?width=845",
      posterImage: "https://api.builder.io/api/v1/image/assets/TEMP/e76d9178f177e867e2f94d09e6f0dcf508dcf5b6?width=150",
      tag: "Fantasy",
      remixCount: "854 remixes"
    }
  ];

  return (
    <div className="min-h-screen bg-app-bg relative">
      {/* Sidebar */}
      <Sidebar activeItem="library" />

      {/* Fixed Header */}
      <div className="fixed top-0 left-20 right-0 z-40 bg-app-bg px-6">
        <div className="max-w-[1320px] mx-auto pt-6 pb-4">
          <Header />
        </div>
      </div>

      {/* Main Scrollable Content */}
      <main className="ml-20 px-6 min-h-screen" style={{ paddingTop: '106px' }}>
        <ScrollableContainer className="h-screen" style={{ height: 'calc(100vh - 106px)' }}>
          <div className="max-w-[1320px] mx-auto">
          
          {/* Library Content */}
          <div className="flex flex-col items-center gap-6 flex-1">
            {/* Page Title */}
            <div className="flex flex-col justify-center items-start gap-2.5 w-full">
              <h1 className="text-text-primary text-3xl font-normal leading-tight w-full">
                Library
              </h1>
            </div>
            
            {/* Sort Section and Media Cards */}
            <div className="flex flex-col gap-6 w-full">
              {/* Sort Controls */}
              <div className="flex items-center gap-3 w-full">
                <div className="flex items-center gap-2">
                  <span className="text-text-primary text-base font-bold leading-relaxed">
                    Sort by
                  </span>
                </div>
                <div className="flex items-center gap-1 flex-1">
                  <span className="text-text-secondary text-sm font-bold leading-none">
                    Date updated
                  </span>
                  <ChevronDown size={16} className="text-text-secondary" strokeWidth={1.6} />
                </div>
              </div>
              
              {/* Media Cards Grid */}
              <div className="flex gap-6 w-full">
                {mediaItems.map((item, index) => (
                  <MediaCard
                    key={index}
                    title={item.title}
                    subtitle={item.subtitle}
                    description={item.description}
                    backgroundImage={item.backgroundImage}
                    posterImage={item.posterImage}
                    tag={item.tag}
                    remixCount={item.remixCount}
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

export default Library;
