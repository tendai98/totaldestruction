import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

interface SocialLinksProps {
  className?: string;
}

export const SocialLinks = ({ className = "" }: SocialLinksProps) => {
  const socialLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://x.com/Polluters_Out?t=ZqgyGuXmZrXDO-eficwnng&s=09",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/share/1BJxPmXmG7/",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/company/kick-polluters-out/",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/kickpollutersout?igsh=MWloazhmYjd2bmt0OQ==",
    },
    {
      name: "TikTok",
      icon: null,
      url: "https://www.tiktok.com/@kickpollutersout?_t=ZM-90tVEayQLcK&_r=1",
    },
  ];

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 ${className}`}>
      <span className="text-white/70 text-sm font-semibold w-full sm:w-auto text-center sm:text-left">
        Follow #KickPollutersOut:
      </span>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#F97316] hover:text-[#F97316]/80 transition-colors group"
          aria-label={link.name}
        >
          {link.icon ? (
            <link.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          ) : (
            <span className="text-xs font-bold px-2 py-1 border border-[#F97316] rounded group-hover:bg-[#F97316]/10">
              TikTok
            </span>
          )}
        </a>
      ))}
    </div>
  );
};
