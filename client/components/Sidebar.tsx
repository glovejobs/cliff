import { Tv, Layers, Image, Globe, User, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  activeItem?: string;
}

const Sidebar = ({ activeItem: propActiveItem }: SidebarProps) => {
  const location = useLocation();

  // Determine active item from prop or current route
  const getActiveItem = () => {
    if (propActiveItem) return propActiveItem;

    const path = location.pathname;
    if (path === '/tv') return 'tv';
    if (path === '/') return 'explore';
    return 'explore';
  };

  const activeItem = getActiveItem();

  const menuItems = [
    { id: 'tv', icon: Tv, tooltip: 'TV', path: '/tv' },
    { id: 'explore', icon: Layers, tooltip: 'Explore', path: '/' },
    { id: 'library', icon: Image, tooltip: 'Library', path: '/library' },
    { id: 'community', icon: Globe, tooltip: 'Community', path: '/community' },
    { id: 'characters', icon: User, tooltip: 'Characters', path: '/characters' },
    { id: 'sets', icon: MapPin, tooltip: 'Sets', path: '/sets' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-auto bg-transparent flex flex-col items-start justify-start z-50">
      {/* Logo */}
      <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full mt-7 mb-10">
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

      {/* Navigation Menu */}
      <nav className="flex flex-col items-center gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          const opacity = isActive ? 1 : 0.3;

          return (
            <div key={item.id} className="group relative">
              <Link
                to={item.path}
                className={`
                  flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive
                    ? 'bg-nav-hover'
                    : 'hover:bg-nav-hover'
                  }
                `}
                style={{ opacity }}
              >
                <Icon size={20} className="text-text-primary" />
              </Link>

              {/* Tooltip */}
              <div className="absolute left-14 top-1/2 -translate-y-1/2 px-2 py-1 bg-nav-bg rounded text-xs text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                {item.tooltip}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
