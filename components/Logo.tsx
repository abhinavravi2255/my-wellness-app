export default function Logo({ size = 44, className = "" }: { size?: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 44 44" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      style={{ flexShrink: 0, boxShadow: "0 8px 24px var(--border-active)", borderRadius: "12px", transition: "all 0.3s ease" }}
    >
      <rect width="44" height="44" rx="12" fill="var(--primary)" />
      {/* Overlay gradient for depth */}
      <rect width="44" height="44" rx="12" fill="url(#brandGrad)" />
      
      {/* Modern, segmented data-block 'T' */}
      <path className="logo-path logo-path-1" d="M13 15C13 13.8954 13.8954 13 15 13H21V19H13V15Z" fill="white" fillOpacity="1" />
      <path className="logo-path logo-path-2" d="M23 13H29C30.1046 13 31 13.8954 31 15V19H23V13Z" fill="white" fillOpacity="0.6" />
      <path className="logo-path logo-path-3" d="M18 21H26V29C26 30.1046 25.1046 31 24 31H20C18.8954 31 18 30.1046 18 29V21Z" fill="white" fillOpacity="0.85" />
      
      <defs>
        <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary-light)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--primary-dark)" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
