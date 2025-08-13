import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import WelcomeSection from '../components/WelcomeSection';
import ExploreSection from '../components/ExploreSection';
import { ScrollableContainer } from '../components/ui/scrollable-container';

export default function Index() {
  return (
    <div className="min-h-screen bg-app-bg relative">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-20 px-6 pt-6 pb-6 min-h-screen">
        <ScrollableContainer className="h-screen">
          <div className="max-w-[1320px] mx-auto">
          {/* Header */}
          <Header />
          
          {/* Welcome Section */}
          <WelcomeSection />
          
          {/* Explore Section */}
          <ExploreSection />
          </div>
        </ScrollableContainer>
      </main>
    </div>
  );
}
