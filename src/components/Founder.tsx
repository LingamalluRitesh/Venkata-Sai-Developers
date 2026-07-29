import founderImgDefault from '../../founder.png'
import { useSiteContext } from '../context/SiteContext'

export default function Founder() {
  const { siteData } = useSiteContext()

  const founderImg = siteData.founderImgUrl || founderImgDefault

  return (
    <section id="founder" className="py-24 relative overflow-hidden bg-white text-[#001e3c]">
      <div className="w-full max-w-[95%] xl:max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Main Glassmorphic Container */}
        <div className="rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-[#f0f8ff] via-[#e8f4fd] to-white border border-[#c3ddf0] shadow-xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Founder Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-full max-w-sm sm:max-w-md">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-cyan-400 to-[#0056a8] opacity-30 blur-xl group-hover:opacity-50 transition duration-500" />
                
                <div className="relative rounded-3xl overflow-hidden border-2 border-white shadow-2xl bg-white">
                  <img
                    src={founderImg}
                    alt={siteData.founderName}
                    className="w-full h-[400px] sm:h-[460px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001e3c]/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <div className="text-xl font-extrabold font-serif">{siteData.founderName}</div>
                    <div className="text-xs text-cyan-300 font-bold tracking-wider uppercase">
                      {siteData.founderRole}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Message & Vision */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 border border-cyan-300 text-[#0056a8] text-xs font-bold tracking-widest uppercase">
                <span>FOUNDER'S MESSAGE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001e3c] tracking-tight font-serif">
                Committed to Pure Drinking Water For Every Family & Business
              </h2>

              <p className="text-[#4a6d8c] text-base sm:text-lg leading-relaxed">
                {siteData.founderBio}
              </p>

              {/* Founder Quote Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#c3ddf0] shadow-md space-y-3 relative">
                <div className="text-3xl text-cyan-500 font-serif leading-none">“</div>
                <p className="text-[#001e3c] font-bold text-sm sm:text-base italic leading-relaxed pl-2">
                  {siteData.founderQuote}
                </p>
                <div className="text-xs text-[#0056a8] font-bold tracking-wider uppercase pl-2">
                  — {siteData.founderName}, Founder
                </div>
              </div>

              {/* Trust Stats Row */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#c3ddf0]">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#0056a8]">10+</div>
                  <div className="text-xs text-[#4a6d8c] font-semibold">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#0056a8]">5,000+</div>
                  <div className="text-xs text-[#4a6d8c] font-semibold">Happy Homes in AP</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">24/7</div>
                  <div className="text-xs text-[#4a6d8c] font-semibold">Technician Support</div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
