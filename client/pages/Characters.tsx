import { Plus, Heart } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { ScrollableContainer } from '../components/ui/scrollable-container';

interface CharacterCardProps {
  image: string;
  name?: string;
  likes?: number;
  isNewCharacter?: boolean;
}

const CharacterCard = ({ image, name, likes, isNewCharacter = false }: CharacterCardProps) => {
  if (isNewCharacter) {
    return (
      <div className="flex flex-col justify-center items-center h-[268px] min-w-[194.4px] max-w-[265px] gap-3 rounded-2xl bg-nav-bg cursor-pointer hover:bg-opacity-80 transition-colors flex-1">
        <Plus size={24} className="text-text-primary" strokeWidth={2.5} />
        <span className="text-text-primary text-sm font-normal leading-relaxed text-center">
          New character
        </span>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col justify-end items-start h-[268px] min-w-[194.4px] max-w-[265px] p-3 gap-3 rounded-2xl bg-nav-bg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 flex-1">
      <img
        src={image}
        alt={name || 'Character'}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex justify-between items-end w-full">
        {name && (
          <span className="text-text-primary text-sm font-normal leading-relaxed">
            {name}
          </span>
        )}

        {likes !== undefined && (
          <div className="flex items-center gap-1 px-0.5 py-0.5 rounded-lg">
            <Heart size={12} className="text-text-primary" strokeWidth={1.2} />
            <span className="text-text-primary text-xs font-medium leading-4 tracking-wide">
              {likes}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const Characters = () => {
  const communityCharacters = [
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/b4eb7f80085b73954020840c94ee13c30eb67dd3?width=398',
      likes: 89
    },
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/c00b1bbb9b292460f2351cc1a85cfabb8cc441b1?width=398',
      likes: 89
    },
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/42b4d4eea6bbb7d4bcd9d47e7d9f2a70baa0f64c?width=398',
      likes: 89
    },
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/2066adc980f6b487485883b119d25008010aca63?width=398',
      likes: 89
    },
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/c3b78ca8f2bc8d7f0c3f8bba537dd9f27d017db8?width=398',
      likes: 89
    },
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/84a78dfeec795c8dc9b19c193e95b5082212757f?width=398',
      likes: 89
    },
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/94971340828890b7894dad439132cbe3f820aa11?width=530',
      likes: 89
    },
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/170ce90e078f40461c5a3728cc845aad3dcbd50e?width=530',
      likes: 89
    },
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/714c871527aa3fbbade4c5d1e19f62c8a8331723?width=530',
      likes: 89
    },
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/2d42e574725bb4c2148eb24f11d3e8f9f8f1efed?width=530',
      likes: 89
    }
  ];

  return (
    <div className="min-h-screen bg-app-bg relative">
      {/* Sidebar */}
      <Sidebar activeItem="characters" />
      
      {/* Fixed Header */}
      <div className="fixed top-0 left-20 right-0 z-40 bg-app-bg px-6">
        <div className="max-w-[1320px] mx-auto pt-6 pb-4">
          <div className="flex justify-between items-center w-full">
            {/* Search Bar */}
            <div className="flex items-center gap-2 bg-nav-bg rounded-full px-4 py-3 w-[360px]">
              <span className="text-text-secondary flex-1 text-base font-normal">
                Search
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z" stroke="#F3F3F3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Action Buttons and Avatar */}
            <div className="flex items-center gap-3">
              {/* New character button */}
              <button className="flex items-center justify-center gap-2 bg-surface-neutral border border-border-neutral rounded-lg px-3 h-10 text-text-dark text-base font-normal transition-colors hover:bg-opacity-90" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
                <Plus size={16} className="text-text-dark" strokeWidth={1.6} />
                New character
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
          </div>
        </div>
      </div>
      
      {/* Main Scrollable Content */}
      <main className="ml-20 px-6 min-h-screen" style={{ paddingTop: '106px' }}>
        <ScrollableContainer className="h-screen" style={{ height: 'calc(100vh - 106px)' }}>
          <div className="max-w-[1320px] mx-auto">
            {/* Content */}
            <div className="flex flex-col items-center gap-12 flex-1">
              {/* Hero Section */}
              <div className="flex flex-col justify-center items-start gap-2.5 max-w-[600px] w-full">
                <h1 className="text-text-primary text-3xl font-normal leading-tight w-full text-center">
                  What character will you create?
                </h1>
                <p className="text-text-primary text-base font-normal leading-relaxed w-full text-center">
                  Create original characters or save familiar ones. Your cast is entirely yours. Who will shape your story next?
                </p>
              </div>
              
              {/* Content Sections */}
              <div className="flex flex-col items-center gap-12 flex-1 w-full">
                {/* Your Characters Section */}
                <div className="flex flex-col gap-6 w-full">
                  <h2 className="text-text-primary text-base font-bold leading-relaxed w-full">
                    Your characters
                  </h2>
                  <div className="flex items-start gap-6 w-full">
                    <CharacterCard isNewCharacter={true} image="" />
                    <CharacterCard 
                      image="https://api.builder.io/api/v1/image/assets/TEMP/864cb8656c43905cf5fa13e4a63eaa625a8daeb4?width=388"
                      name="David Burton"
                    />
                  </div>
                </div>

                {/* Explore Community Characters Section */}
                <div className="flex flex-col gap-6 w-full">
                  <h2 className="text-text-primary text-base font-bold leading-relaxed w-full">
                    Explore community characters
                  </h2>
                  <div className="flex flex-wrap gap-6 w-full">
                    {communityCharacters.map((character, index) => (
                      <CharacterCard
                        key={index}
                        image={character.image}
                        likes={character.likes}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Spacer */}
                <div className="h-3"></div>
              </div>
            </div>
          </div>
        </ScrollableContainer>
      </main>
    </div>
  );
};

export default Characters;
