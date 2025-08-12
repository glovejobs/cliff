import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import WelcomeSection from '../components/WelcomeSection';
import ExploreSection from '../components/ExploreSection';

export default function Index() {
  return (
    <div className="min-h-screen bg-app-bg relative">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-20 p-6 min-h-screen">
        <div className="max-w-[1320px] mx-auto">
          {/* Header */}
          <Header />
          
          {/* Welcome Section */}
          <WelcomeSection />
          
          {/* Explore Section */}
          <ExploreSection />
        </div>
      </main>
    </div>
  );
}
