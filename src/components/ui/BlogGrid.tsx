"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

interface BlogPost {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  created_at: string;
}

export default function BlogGrid() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://skycart.xyz/api/v1/posts?per_page=10", {
          headers: {
             "Authorization": "Bearer 1|ShrQ5sREOU0fo2UlzdXF3AMiXwsnmWTpDqtyCvC4ed37d7f8"
          }
        });
        const json = await response.json();
        if (json && json.data) {
          setBlogs(json.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-20">
        <div className="w-8 h-8 rounded-full border-t-2 border-neon-purple animate-spin" />
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="w-full text-center py-20 text-white/50">
        No insights available at the moment.
      </div>
    );
  }

  return (
    <div className="w-full -mx-4 md:-mx-8 px-4 md:px-8">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        freeMode={true}
        mousewheel={{
          forceToAxis: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[FreeMode, Pagination, Mousewheel]}
        className="w-full pb-16 pt-4 px-4"
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog.id} className="pt-4 h-full">
            <a 
              // Directing user to their blog viewing mechanism (assuming slug-based view on origin domain or custom routing)
              href={`https://skycart.xyz/blog/${blog.slug}`} 
              target="_blank"
              rel="noreferrer"
              className="glass rounded-3xl p-6 group cursor-pointer border border-transparent hover:border-white/10 transition-all duration-300 block flex flex-col h-full bg-black/40 min-h-[350px]"
            >
              <div className="relative w-full h-[180px] bg-black/50 rounded-2xl overflow-hidden mb-6">
                 {/* Next.js Image component optimization is skipped for dynamic external blob integration */}
                 {blog.image ? (
                   <img src={blog.image} alt={blog.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-white/20">No Image</div>
                 )}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                 <div className="absolute bottom-3 left-3 flex gap-2">
                   <span className="px-2 py-1 bg-white/10 backdrop-blur-md rounded-md text-[10px] font-medium tracking-wider uppercase text-white/80 border border-white/10">
                     Article
                   </span>
                 </div>
              </div>
              <div className="flex justify-between items-start gap-4 flex-1">
                <div>
                  <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-neon-purple transition-colors line-clamp-2">
                    {blog.name}
                  </h3>
                  <p className="text-white/50 text-sm line-clamp-3 font-light mb-4 text-ellipsis overflow-hidden">
                    {blog.description}
                  </p>
                </div>
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-neon-purple group-hover:text-white transition-colors shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-white/10 text-xs text-white/40">
                 {new Date(blog.created_at).toLocaleDateString(undefined, {
                    year: 'numeric', month: 'long', day: 'numeric'
                 })}
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
