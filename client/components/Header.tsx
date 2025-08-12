import { Search, Plus } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex justify-between items-center w-full mb-10">
      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-nav-bg rounded-full px-4 py-3 w-[360px]">
        <span className="text-text-secondary flex-1 text-base font-normal">
          Search
        </span>
        <Search size={16} className="text-text-primary" strokeWidth={1.6} />
      </div>

      {/* Action Buttons and Avatar */}
      <div className="flex items-center gap-3">
        {/* Share your story button */}
        <button className="flex items-center justify-center gap-2 bg-brand-primary border border-brand-primary rounded-lg px-3 py-3 text-brand-text text-base font-normal transition-colors hover:bg-opacity-90">
          Share your story
        </button>

        {/* New scene button */}
        <button className="flex items-center justify-center gap-2 bg-surface-neutral border border-border-neutral rounded-lg px-3 py-3 text-text-dark text-base font-normal transition-colors hover:bg-opacity-90">
          <Plus size={16} className="text-text-dark" strokeWidth={1.6} />
          New scene
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
    </header>
  );
};

export default Header;
