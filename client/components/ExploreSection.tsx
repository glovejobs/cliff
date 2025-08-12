import { Play } from 'lucide-react';

interface VideoCardProps {
  title: string;
  author: string;
  views: string;
  thumbnail: string;
  poster?: string;
  width?: 'normal' | 'wide';
}

const VideoCard = ({ title, author, views, thumbnail, poster, width = 'normal' }: VideoCardProps) => {
  return (
    <div className={`flex flex-col gap-1 ${width === 'wide' ? 'flex-1 min-w-[170px] max-w-[340px]' : 'w-[170px] min-w-[170px] max-w-[340px]'}`}>
      {/* Video Thumbnail */}
      <div className="relative h-[227px] bg-white rounded overflow-hidden group cursor-pointer">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>
        
        {/* Poster overlay for wider videos */}
        {poster && (
          <div className="absolute left-2.5 bottom-2.5 w-[75px] h-[111px] bg-white rounded-md overflow-hidden">
            <img
              src={poster}
              alt={`${title} poster`}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-opacity-40 transition-colors">
            <Play size={20} className="text-white ml-1" fill="white" />
          </div>
        </div>
      </div>
      
      {/* Video Info */}
      <div className="flex flex-col gap-0">
        <h3 className="text-white text-base font-bold leading-snug">
          {title}
        </h3>
        <p className="text-text-secondary text-xs font-normal leading-4 tracking-wide">
          {author}
        </p>
        <p className="text-text-secondary text-xs font-normal leading-4 tracking-wide">
          {views}
        </p>
      </div>
    </div>
  );
};

const ExploreSection = () => {
  const videos = [
    {
      title: 'The Hulk',
      author: 'Kekeerth 111',
      views: '5.6k views • 2 days ago',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/b4014bcbbeeb78324df447c6578ee125e5091ad6?width=340',
      width: 'normal' as const
    },
    {
      title: 'No Time to Die',
      author: 'Cody Mcvie',
      views: '5.6k views • 2 days ago',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/a483a083d8845919fca65b47ef1fe48a55f0bd9e?width=680',
      poster: 'https://api.builder.io/api/v1/image/assets/TEMP/7046e1c5a358f238db2cc9d40e93753e2e9f26d3?width=150',
      width: 'wide' as const
    },
    {
      title: 'Van Dixon',
      author: 'Ishima Zari',
      views: '5.6k views • 2 days ago',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/f31039ab94cdea2814b91cfe7dca3f14e122629d?width=340',
      width: 'normal' as const
    },
    {
      title: 'Shooted Real',
      author: 'Patrick Moss',
      views: '5.6k views • 2 days ago',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/c5036b7f75a1cd748506ad4a63dfdea420e8d895?width=680',
      poster: 'https://api.builder.io/api/v1/image/assets/TEMP/cc6a822720215ba0b83b04d035f903c36a39bf34?width=150',
      width: 'wide' as const
    },
    {
      title: 'Natures ville',
      author: 'Tanjiro Aamas',
      views: '5.6k views • 2 days ago',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/64ea088f4edc01241e8c82a573dd11a4b061999b?width=340',
      width: 'normal' as const
    },
    {
      title: 'Avengers: Endgame',
      author: 'Dan Masjid',
      views: '5.6k views • 2 days ago',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/181c397da9a0bff1fe73eb87e8b9865532db44cd?width=680',
      poster: 'https://api.builder.io/api/v1/image/assets/TEMP/957ee6370ab93d24f25179990b5ca52edc8bb70b?width=150',
      width: 'wide' as const
    },
    {
      title: 'The Matrix',
      author: 'Jeffery Bazzaria',
      views: '5.6k views • 2 days ago',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/31f416147c1b0b6afff9dd2e949fe0b207f333f5?width=680',
      poster: 'https://api.builder.io/api/v1/image/assets/TEMP/8cdb6007c4b3ac0926b4f4b25f73349ffb0f4dea?width=150',
      width: 'wide' as const
    },
    {
      title: 'Inception',
      author: 'Guillermo Morandos',
      views: '5.6k views • 2 days ago',
      thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/9c590909350635fa8407a4e758da6a2ce38e3a51?width=680',
      poster: 'https://api.builder.io/api/v1/image/assets/TEMP/13c4292c71b0794a1167c80feb54747d17982999?width=150',
      width: 'wide' as const
    }
  ];

  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-text-primary text-base font-bold leading-relaxed">
          Explore
        </h2>
      </div>

      {/* Video Grid */}
      <div className="flex flex-wrap gap-6 items-start">
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            title={video.title}
            author={video.author}
            views={video.views}
            thumbnail={video.thumbnail}
            poster={video.poster}
            width={video.width}
          />
        ))}
      </div>
      
      {/* Spacer */}
      <div className="h-6 mt-6"></div>
    </section>
  );
};

export default ExploreSection;
