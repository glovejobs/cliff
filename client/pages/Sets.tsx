import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import NewSetModal from "../components/NewSetModal";
import CommunityCard from "../components/CommunityCard";
import { ScrollableContainer } from "../components/ui/scrollable-container";

interface SavedSet {
  image: string;
  likes: number;
  type: "character" | "set";
  name?: string;
}

const Sets = () => {
  const [showNewSetModal, setShowNewSetModal] = useState(false);
  const [savedSets, setSavedSets] = useState<SavedSet[]>([]);

  const handleNewSetClick = () => {
    setShowNewSetModal(true);
  };

  const handleCloseModal = () => {
    setShowNewSetModal(false);
  };

  const handleCreateSet = (setData: any) => {
    console.log("Creating set:", setData);
    // Handle set creation logic here
  };

  const handleBookmarkSet = (cardData: { image: string; likes: number; type: "character" | "set" }) => {
    const newSet: SavedSet = {
      ...cardData,
      name: `Saved Set ${savedSets.length + 1}`, // Generate a name
    };
    setSavedSets(prev => [...prev, newSet]);
  };
  return (
    <div className="min-h-screen bg-app-bg relative">
      {/* Sidebar */}
      <Sidebar activeItem="sets" />

      {/* Fixed Header */}
      <div className="fixed top-0 left-20 right-0 z-40 bg-app-bg px-6">
        <div className="max-w-[1320px] mx-auto pt-6 pb-4">
          <Header currentPage="sets" onNewSetClick={handleNewSetClick} />
        </div>
      </div>

      {/* Main Scrollable Content */}
      <main className="ml-20 px-6 min-h-screen" style={{ paddingTop: "106px" }}>
        <ScrollableContainer
          className="h-screen"
          style={{ height: "calc(100vh - 106px)" }}
        >
          <div className="max-w-[1320px] mx-auto">
            {/* Content */}
            <div className="flex flex-col items-center gap-12 flex-1 mt-10">
              {/* Hero Section */}
              <div className="flex max-w-[600px] flex-col justify-center items-start gap-2.5 w-full">
                <h1 className="w-full text-text-primary text-center text-[32px] font-normal leading-[120%]">
                  What set will you create?
                </h1>
                <p className="w-full text-text-primary text-center text-base font-normal leading-[140%]">
                  Choose the world your story lives in. From quiet cafés to
                  cosmic battlefields. Every scene starts with a setting.
                </p>
              </div>

              {/* Content Sections */}
              <div className="flex flex-col items-center gap-12 flex-1 w-full">
                {/* Your sets section */}
                <div className="flex flex-col items-start gap-6 w-full">
                  <h2 className="w-full text-text-primary text-base font-bold leading-[140%]">
                    Your sets
                  </h2>
                  <div className="flex items-start gap-6 w-full">
                    {/* New set card */}
                    <div
                      onClick={handleNewSetClick}
                      className="flex w-[194px] h-[200px] p-[85px_0] flex-col justify-center items-center gap-3 rounded-2xl bg-nav-bg cursor-pointer hover:bg-opacity-80 transition-colors"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 5V19M5 12H19"
                          stroke="#F5F5F5"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="text-text-primary text-center text-sm font-normal leading-[140%]">
                        New set
                      </div>
                    </div>

                    {/* Sahara Desert set card */}
                    <div className="flex w-[265px] h-[200px] relative rounded-2xl bg-nav-bg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity group">
                      <img
                        src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=530&h=200&fit=crop&crop=center"
                        alt="Sahara Desert"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/530x200/2a2a2a/ffffff?text=Sahara+Desert";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="text-text-primary text-sm font-normal leading-[140%]">
                          Sahara Desert
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explore community sets section */}
                <div className="flex flex-col items-start gap-6 w-full">
                  <h2 className="w-full text-text-primary text-base font-bold leading-[140%]">
                    Explore community sets
                  </h2>
                  <div className="flex items-start content-start gap-6 w-full flex-wrap">
                    {/* Community set cards */}
                    {[
                      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=460&h=200&fit=crop&crop=center",
                      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=460&h=200&fit=crop&crop=center",
                      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=530&h=200&fit=crop&crop=center",
                      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=530&h=200&fit=crop&crop=center",
                      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=460&h=200&fit=crop&crop=center",
                      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=530&h=200&fit=crop&crop=center",
                      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=426&h=200&fit=crop&crop=center",
                      "https://images.unsplash.com/photo-1504870712357-65ea720d6078?w=530&h=200&fit=crop&crop=center",
                      "https://images.unsplash.com/photo-1541600383005-565c949cf552?w=530&h=200&fit=crop&crop=center",
                      "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=426&h=200&fit=crop&crop=center",
                    ].map((src, index) => (
                      <CommunityCard
                        key={index}
                        image={src}
                        likes={89}
                        type="set"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollableContainer>
      </main>

      {/* New Set Modal */}
      <NewSetModal
        isOpen={showNewSetModal}
        onClose={handleCloseModal}
        onCreateSet={handleCreateSet}
      />
    </div>
  );
};

export default Sets;
