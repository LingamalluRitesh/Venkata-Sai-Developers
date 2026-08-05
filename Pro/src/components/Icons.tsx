import React from 'react';

// Official WhatsApp Green Circular Icon Component
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 500 500"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* WhatsApp Green Circle */}
    <circle cx="250" cy="250" r="230" fill="#25D366" />
    
    {/* Inner White Gloss Ring */}
    <circle cx="250" cy="250" r="225" stroke="white" strokeOpacity="0.3" strokeWidth="6" />

    {/* WhatsApp Inner White Speech Bubble & Handset */}
    <path
      d="M250 80C156.1 80 80 156.1 80 250C80 280.9 88.2 310.8 103.8 337L80 424L169.5 400.5C194.7 414.2 222.1 420 250 420C343.9 420 420 343.9 420 250C420 156.1 343.9 80 250 80ZM250 391.5C224.8 391.5 200.1 384.7 178.4 371.8L173.3 368.7L120.7 382.5L134.7 331.2L131.3 325.8C117 303.1 109.5 277 109.5 250C109.5 172.5 172.5 109.5 250 109.5C327.5 109.5 390.5 172.5 390.5 250C390.5 327.5 327.5 391.5 250 391.5ZM326.5 298.5C322.3 296.4 301.7 286.3 297.9 284.9C294.1 283.5 291.3 282.8 288.5 287C285.7 291.2 277.7 300.7 275.3 303.5C272.9 306.3 270.5 306.7 266.3 304.6C262.1 302.5 248.6 298.1 232.6 283.8C220.1 272.7 211.7 259 209.3 254.8C206.9 250.6 209 248.3 211.1 246.2C213 244.3 215.3 241.3 217.4 238.9C219.5 236.5 220.2 234.7 221.6 231.9C223 229.1 222.3 226.7 221.3 224.6C220.3 222.5 211.9 201.8 208.4 193.4C205 185.2 201.5 186.3 199 186.2C196.6 186.1 193.8 186.1 191 186.1C188.2 186.1 183.6 187.2 179.8 191.4C176 195.6 165.2 205.7 165.2 226.3C165.2 246.9 180.2 266.8 182.3 269.6C184.4 272.4 211.9 314.7 253.9 332.8C263.9 337.1 271.7 339.7 277.8 341.6C287.8 344.8 296.9 344.3 304.1 343.3C312.1 342.1 328.7 333.2 332.2 323.4C335.7 313.6 335.7 305.2 334.7 303.5C333.6 301.7 330.7 300.6 326.5 298.5Z"
      fill="white"
    />
  </svg>
);

// Ultra-Sleek Professional Phone Call Icon Component
export const PhoneCallIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 500 500"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Premium Royal Blue Circular Badge */}
    <circle cx="250" cy="250" r="230" fill="url(#phone_call_blue_grad)" />
    <defs>
      <linearGradient id="phone_call_blue_grad" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="0.5" stopColor="#2563EB" />
        <stop offset="1" stopColor="#1E40AF" />
      </linearGradient>
    </defs>
    
    {/* Gloss Highlight Overlay */}
    <circle cx="250" cy="250" r="225" stroke="white" strokeOpacity="0.3" strokeWidth="6" />

    {/* Perfectly Centered Phone Handset SVG Path */}
    <path
      d="M346.5 306.8C332.7 293 313.8 294.6 299.7 308.7C294.5 313.9 287.4 316.8 280 316.8C272.6 316.8 265.5 313.9 260.3 308.7L203.3 251.7C192.9 241.3 192.9 224.4 203.3 214L215.7 201.6C229.8 187.5 231.4 168.6 217.6 154.8L197.8 135C184 121.2 165.1 122.8 151 136.9L147.9 140C132.2 155.7 130.2 179.6 143.1 207.1C156 234.6 180.5 269.8 213.3 302.6C246.1 335.4 281.3 359.9 308.8 372.8C336.3 385.7 360.2 383.7 375.9 368L379 364.9C393.1 350.8 394.7 331.9 380.9 318.1L361.1 298.3L346.5 306.8Z"
      fill="white"
    />

    {/* Call Signal Rings */}
    <path
      d="M350 170C375 195 375 235 350 260"
      stroke="white"
      strokeWidth="20"
      strokeLinecap="round"
      strokeOpacity="0.9"
    />
    <path
      d="M385 135C425 175 425 255 385 295"
      stroke="white"
      strokeWidth="20"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />
  </svg>
);
