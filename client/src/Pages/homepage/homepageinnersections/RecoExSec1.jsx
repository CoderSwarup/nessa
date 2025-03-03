import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import news1 from '../../../assets/images/homepageimages/news/news1.jpeg';
import news2 from '../../../assets/images/homepageimages/news/news2.jpeg';
import news3 from '../../../assets/images/homepageimages/news/news3.jpg';
import { Link } from 'react-router-dom'


export default function RecoExSec1() {
  return (
      <div className="w-full">
          <style>
              {`
          .swiper {
            width: 100%;
            
          }
          .swiper-slide {
            text-align: center;
            font-size: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
          </style>

          <Swiper
              pagination={{
                  dynamicBullets: true
              }}
              modules={[Pagination, Autoplay]}
              autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
              }}
              watchSlidesProgress={true}
              observer={true}
              observeParents={true}
              className="mySwiper">
              {[
                  {
                      image: news1,
                      link: 'https://www.aninews.in/news/business/nessa-illumination-technologies-pvt-ltd-launched-smart-light-and-hybrid-solar-high-mast-at-rei-expo-202420241010181151/',
                      heading: ''
                  },
                  {
                      image: news2,
                      link: 'https://www.business-standard.com/content/press-releases-ani/nessa-illumination-technologies-pvt-ltd-launched-smart-light-and-hybrid-solar-high-mast-at-rei-expo-2024-124101001393_1.html',
                      heading: ''
                  },
                  {
                      image: news3,
                      link: 'https://www.business-standard.com/content/press-releases-ani/nessa-illumination-technologies-pvt-ltd-launched-smart-light-and-hybrid-solar-high-mast-at-rei-expo-2024-124101001393_1.html ',
                      heading: ''
                  }
              ].map((slide, index) => (
                  <SwiperSlide
                      key={index}
                      className="bg-[#EEF7FF]">
                      <Link
                          to={slide.link}
                          target="_blank"
                          className="flex flex-col items-center justify-center gap-4">
                          <img
                              className="w-[80%] h-[300px] object-cover"
                              src={slide.image}
                              alt=""
                          />
                          <h1 className="w-[70%]">{slide.heading}</h1>
                      </Link>
                  </SwiperSlide>
              ))}
          </Swiper>
      </div>
  )
}