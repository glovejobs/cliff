import { Heart, Bookmark } from "lucide-react";

interface CommunityCardProps {
  image: string;
  likes: number;
  type: "character" | "set";
  authorName?: string;
  authorAvatar?: string;
  timeAgo?: string;
  onBookmark?: (cardData: { image: string; likes: number; type: "character" | "set" }) => void;
}

const CommunityCard = ({
  image,
  likes,
  type,
  authorName = "Cody McVie",
  authorAvatar = "https://api.builder.io/api/v1/image/assets/TEMP/9c3ebab57af6209ec0bb53f2f8dc22092180a12b?width=43",
  timeAgo = "1 week ago",
  onBookmark,
}: CommunityCardProps) => {
  const cardHeight = type === "character" ? "h-[268px]" : "h-[200px]";

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmark?.({ image, likes, type });
  };

  return (
    <div className={`group relative flex flex-col justify-end items-start ${cardHeight} min-w-[194.4px] max-w-[265px] p-3 gap-3 rounded-2xl bg-[#232424] overflow-hidden cursor-pointer flex-1`}>
      {/* Background Image */}
      <img
        src={image}
        alt={type === "character" ? "Community character" : "Community set"}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-200 linear"></div>
      
      {/* Bookmark Icon - Shows on hover */}
      <div
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 linear cursor-pointer"
        onClick={handleBookmarkClick}
      >
        <div className="flex items-center justify-center w-8 h-8 bg-[#2C2C2C] border border-[#2C2C2C] rounded-lg hover:bg-[#2C2C2C]/80 transition-colors">
          <Bookmark size={16} className="text-[#F5F5F5]" strokeWidth={1.6} />
        </div>
      </div>

      {/* Default State - Only likes */}
      <div className="relative z-10 flex justify-end items-end w-full group-hover:opacity-0 transition-opacity duration-200 linear">
        <div className="flex items-center gap-1 p-0.5 rounded-lg">
          <Heart size={12} className="text-[#F5F5F5]" strokeWidth={1.2} />
          <span className="text-[#F5F5F5] text-[11px] font-normal leading-4 tracking-[0.5px]" style={{fontFamily: 'Roboto, -apple-system, Roboto, Helvetica, sans-serif'}}>
            {likes}
          </span>
        </div>
      </div>

      {/* Hover State - Profile and likes */}
      <div className="relative z-10 flex justify-between items-end w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 linear">
        {/* Profile Section */}
        <div className="flex items-center gap-[6.5px] rounded-[4.3px]">
          <div className="flex items-center justify-center w-[22.6px] h-[22.6px] rounded-full overflow-hidden">
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-[1.1px]">
            <div className="text-[#F5F5F5] text-[9px] font-bold leading-[140%]" style={{fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif'}}>
              {authorName}
            </div>
            <div className="text-[#757575] text-[8px] font-normal leading-[140%]" style={{fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif'}}>
              {timeAgo}
            </div>
          </div>
        </div>

        {/* Likes Section */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg">
          <Heart size={12} className="text-[#F5F5F5]" strokeWidth={1.2} />
          <span className="text-[#F5F5F5] text-[11px] font-normal leading-4 tracking-[0.5px]" style={{fontFamily: 'Roboto, -apple-system, Roboto, Helvetica, sans-serif'}}>
            {likes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
