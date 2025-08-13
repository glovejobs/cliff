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
