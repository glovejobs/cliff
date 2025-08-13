import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Sets = () => {
  return (
    <div className="min-h-screen bg-app-bg relative">
      {/* Sidebar */}
      <Sidebar activeItem="sets" />
      
      {/* Main Content */}
      <main className="ml-20 px-6 pt-3 pb-6 min-h-screen">
        <div className="max-w-[1320px] mx-auto">
          {/* Header */}
          <Header />
          
          {/* Content */}
          <div className="flex flex-col items-center gap-12 flex-1 mt-10">
            {/* Hero Section */}
            <div className="flex max-w-[600px] flex-col justify-center items-start gap-2.5 w-full">
              <h1 className="w-full text-text-primary text-center text-[32px] font-normal leading-[120%]">
                What set will you create?
              </h1>
              <p className="w-full text-text-primary text-center text-base font-normal leading-[140%]">
                Choose the world your story lives in. From quiet cafés to cosmic battlefields. Every scene starts with a setting.
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
                  <div className="flex w-[194px] h-[200px] p-[85px_0] flex-col justify-center items-center gap-3 rounded-2xl bg-nav-bg cursor-pointer hover:bg-opacity-80 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M5 12H19" stroke="#F5F5F5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="text-text-primary text-center text-sm font-normal leading-[140%]">
                      New set
                    </div>
                  </div>

                  {/* Sahara Desert set card */}
                  <div className="flex w-[265px] h-[200px] relative rounded-2xl bg-nav-bg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity group">
                    <img 
                      src="https://api.builder.io/api/v1/image/assets/TEMP/7eb9c7eba5885e8b0ae8af18246deceb74c22e6f?width=530" 
                      alt="Sahara Desert"
                      className="w-full h-full object-cover"
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
                    "https://api.builder.io/api/v1/image/assets/TEMP/335074587128e5312a96ccfc390e68eff84d45f7?width=460",
                    "https://api.builder.io/api/v1/image/assets/TEMP/071f1acf87ad1177616e9f4c241d503d9c7a790a?width=460",
                    "https://api.builder.io/api/v1/image/assets/TEMP/5efb5b8f51ea45d8ff54925ad6b9df53dfb9d2a7?width=530",
                    "https://api.builder.io/api/v1/image/assets/TEMP/f6eef26825a9c448b8c41f6e0a42f7abce2b8a23?width=530",
                    "https://api.builder.io/api/v1/image/assets/TEMP/fd46e9193c7a4cd659dd8d49afba0b156b17c37d?width=460",
                    "https://api.builder.io/api/v1/image/assets/TEMP/b466cd315d76e8beb4bc8462588d672bb9e3450e?width=530",
                    "https://api.builder.io/api/v1/image/assets/TEMP/c88df77378a9cf284d44f3df86cb403236f7b91a?width=426",
                    "https://api.builder.io/api/v1/image/assets/TEMP/a606e3cd657ef1f565c63df985092b597d7c90ec?width=530",
                    "https://api.builder.io/api/v1/image/assets/TEMP/7d982f5a651e632b331f4ee9a53a500ee5a1a888?width=530",
                    "https://api.builder.io/api/v1/image/assets/TEMP/4206d632139b0c9c1c0fae8559ee35303fecb0e2?width=426"
                  ].map((src, index) => (
                    <div key={index} className="flex h-[200px] min-w-[194.4px] max-w-[265px] relative rounded-2xl bg-nav-bg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity group flex-1">
                      <img 
                        src={src}
                        alt={`Community set ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      <div className="absolute bottom-3 right-3">
                        <div className="flex justify-end items-center gap-1 p-0.5 rounded-lg">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_heart)">
                              <path d="M10.4201 2.30494C10.1647 2.04944 9.86147 1.84676 9.52774 1.70848C9.19401 1.5702 8.8363 1.49902 8.47506 1.49902C8.11382 1.49902 7.75611 1.5702 7.42238 1.70848C7.08865 1.84676 6.78544 2.04944 6.53006 2.30494L6.00006 2.83494L5.47006 2.30494C4.95421 1.78909 4.25458 1.49929 3.52506 1.49929C2.79554 1.49929 2.09591 1.78909 1.58006 2.30494C1.06421 2.82078 0.774414 3.52042 0.774414 4.24994C0.774414 4.97945 1.06421 5.67909 1.58006 6.19494L6.00006 10.6149L10.4201 6.19494C10.6756 5.93956 10.8782 5.63634 11.0165 5.30261C11.1548 4.96888 11.226 4.61118 11.226 4.24994C11.226 3.88869 11.1548 3.53099 11.0165 3.19726C10.8782 2.86353 10.6756 2.56031 10.4201 2.30494Z" stroke="#F5F5F5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_heart">
                                <rect width="12" height="12" fill="white"/>
                              </clipPath>
                            </defs>
                          </svg>
                          <span className="text-text-primary text-[11px] font-normal leading-4 tracking-[0.5px]">
                            89
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sets;
