import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules'
import awards02 from '../../../assets/images/homepageimages/awards/awards-02.png'
import awards03 from '../../../assets/images/homepageimages/awards/awards-03.png'
import awards04 from '../../../assets/images/homepageimages/awards/awards-04.png'
import { Link } from 'react-router-dom'

export default function RecoExSec2() {
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
            image: awards02
          },
          {
            image: awards03
          },
          {
            image: awards04
          }
        ].map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center justify-center gap-4">
              <img
                className="h-[300px] object-cover"
                src={slide.image}
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
