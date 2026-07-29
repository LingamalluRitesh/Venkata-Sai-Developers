import logoDefault from '../../logo.png'
import { useSiteContext } from '../context/SiteContext'

export default function Hero() {
  const { siteData } = useSiteContext()
  const heroImage = siteData.heroImageUrl || logoDefault

  return (
    <>
      <style>{`
        /* Floating Bottle / Hero Image Animation */
        @keyframes floatBottle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }

        .floatingBottle {
          animation: floatBottle 4s ease-in-out infinite;
        }

        /* Water Bubbles Animation */
        @keyframes bubbleFloat {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-90vh) scale(1.3);
            opacity: 0;
          }
        }

        .bubble {
          position: absolute;
          bottom: -80px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(3px);
          animation: bubbleFloat linear infinite;
          pointer-events: none;
        }

        /* SVG Wave Movement */
        @keyframes waveMove {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes waveMove2 {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        .waves {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 120px;
          overflow: hidden;
          pointer-events: none;
        }

        .wave {
          position: absolute;
          width: 200%;
          height: 100%;
          background-repeat: repeat-x;
          background-size: 1200px 120px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath fill='%2300b4d8' fill-opacity='0.35' d='M0,64L40,58.7C80,53,160,43,240,42.7C320,43,400,53,480,69.3C560,85,640,107,720,106.7C800,107,880,85,960,80C1040,75,1120,85,1160,90.7L1200,96V120H0Z'/%3E%3C/svg%3E");
        }

        .wave1 {
          animation: waveMove 10s linear infinite;
        }

        .wave2 {
          opacity: 0.5;
          animation: waveMove2 14s linear infinite;
        }
      `}</style>

      <section
        id="home"
        className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cyan-50 via-white to-cyan-100 flex items-center pt-32 pb-20"
      >
        {/* Floating Bubbles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="bubble"
              style={{
                left: `${(i * 5.2) % 100}%`,
                width: `${10 + (i % 5) * 6}px`,
                height: `${10 + (i % 5) * 6}px`,
                animationDuration: `${6 + (i % 6) * 1.5}s`,
                animationDelay: `${(i % 5) * 1.2}s`,
              }}
            />
          ))}
        </div>

        {/* Water Theme Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(rgba(0,180,216,0.08), rgba(255,255,255,0.18))",
          }}
        />

        {/* Hero Content - Expanded Width to fill full screen */}
        <div className="relative z-10 w-full max-w-[95%] xl:max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-16 min-h-[75vh] flex flex-col-reverse lg:flex-row items-center justify-between gap-12">

          {/* Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
            
            {/* 24/7 Availability Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-extrabold shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>24/7 Service & Installation Available All Days</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              style={{ fontFamily: "Lora, serif" }}
            >
              <span className="text-[#00b4d8]">Pure Water, </span>
              <span className="text-[#001e3c]">Healthy Life</span>
            </h1>

            <p className="mt-4 text-gray-700 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Delivering clean, safe and mineral-balanced drinking water with trusted 24/7 technician support for homes, businesses and commercial RO plants across Andhra Pradesh.
            </p>

            {/* Direct WhatsApp Action */}
            <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-4">
              <a
                href={`https://wa.me/${siteData.phoneNumber.replace(/[^0-9]/g, '')}?text=Hi%2C%20I%20need%20water%20purifier%20service%2Finstallation`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-3"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                <span>Chat 24/7 on WhatsApp</span>
              </a>

              <a
                href={`tel:${siteData.phoneNumber}`}
                className="px-8 py-4 rounded-full bg-[#0056a8] hover:bg-[#003870] text-white font-bold text-sm shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-3"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.27 1.11l-2.37 2.4z"/>
                </svg>
                <span>Call 24/7 Helpline</span>
              </a>
            </div>

          </div>

          {/* Image - Clean display matching original */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={heroImage}
              alt="Water Purifier"
              className="floatingBottle w-full max-w-sm sm:max-w-md lg:max-w-2xl object-contain drop-shadow-2xl"
            />
          </div>

        </div>

        {/* Animated Waves */}
        <div className="waves">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
        </div>
      </section>
    </>
  );
}