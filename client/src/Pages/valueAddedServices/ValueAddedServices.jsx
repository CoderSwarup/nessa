
import hero from '../../assets/images/valueAddedServicesImages/hero.jpg'
import Navbar from '../../Components/Header/Navbar';
import SideComponent from '../../Components/sideComponent/SideComponent';
import {
  corporateCusomters,
  ngologos,
  ourRulerUpliftmentsSolution,
  ourRulerUpliftmentsSolutionRightSection,
  ourValuePreposition,
} from './ValueAddedServicesConfig';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import smartVillageSolutions from '../../assets/images/valueAddedServicesImages/smartVillageSolution.png';
import smartVillageHome from '../../assets/images/valueAddedServicesImages/smartVillageHome.png';
import solarBasedIrrigation from '../../assets/images/valueAddedServicesImages/solarBasedIrrigation.png';
import smartCommunityCenter from '../../assets/images/valueAddedServicesImages/smartCommunityCenter.png';
import waterTreatmentPlants from '../../assets/images/valueAddedServicesImages/waterTreatmentPlant.png';
import solarBasedLight from '../../assets/images/valueAddedServicesImages/solarBasedLight.png';
import villageStadiumLight from '../../assets/images/valueAddedServicesImages/villageStadiumLight.png';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '../../Components/Footer';
import Mp from '../../Components/Mp';

export const ValueAddedServices = () => {

    const whyChooseNessaBoxData = [
        {
            title: 'Expert Team',
            description: 'We boast a multidisciplinary team of seasoned professionals.',
        },
        {
            title: 'Comprehensive Service',
            description: 'We offer CSR policy formulation, program design, monitoring and evaluation, CSR reporting, and tax-efficient project structures.',
        },
        {
            title: 'Strategic Expertise',
            description: 'Our team excels in defining CSR strategies, implementation modalities, and developing standardized processes and systems for effective CSR implementation.',
        },
        {
            title: 'Client Support',
            description: 'We assist clients in onboarding partners, monitoring and evaluating projects, and keeping the CSR committee updated with industry trends and reporting.',
        },
        {
            title: 'Real-Time Monitoring',
            description: 'Our CSR tool provides real-time information to stakeholders and facilitates concurrent project monitoring.',
        },
        {
            title: 'Thorough Consulting',
            description: 'Our CSR project management services offer a comprehensive consulting approach, ensuring effective and impactful CSR initiatives.',
        },
    ]

    const [hover, sethover] = useState('')

    const whyChooseNessaBox = (item, index) => {
        return (

            <div
                key={index}
                onMouseEnter={() => sethover(index)}
                onMouseLeave={() => sethover('')}
                className="w-[25vw] pt-[20px] rounded-2xl shadow-md max-lg:w-[40vw] max-md:w-full relative overflow-hidden cursor-pointer"
                style={{
                    background:
                        'linear-gradient(to right, #841D84, #3DC3BB, #FF8983)',
                }}
            >
                <AnimatePresence>
                    {hover === index && (
                        <motion.div
                            key="overlay"
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{
                                duration: 0.3,
                                ease: 'easeInOut'
                            }}
                            className="absolute inset-0 rounded-2xl bg-blue-500"
                        />
                    )}
                </AnimatePresence>
                <div className="border-2  h-full border-blue-500 bg-white w-full rounded-2xl p-6 shadow-md">
                    <div className="flex items-center mb-4 relative z-[2]">
                        <RiLightbulbFlashLine className={`text-4xl  ${hover === index ? 'text-white ' : 'text-blue-500'}`} />
                    </div>
                    <h3 className={`text-xl font-semibold mb-2 relative z-[2]  ${hover === index ? 'text-white ' : 'text-blue-500'} `}>
                        {item.title}
                    </h3>
                    <p className={`relative z-[2]  ${hover === index ? 'text-white ' : 'text-black'}`}>
                        {item.description}
                    </p>
                </div>
            </div>
        )
    }

  return (
      <div className="overflow-hidden">
          <Navbar />
          <SideComponent />

          <div className="w-full h-[300px] max-sm:h-[200px] relative flex items-center  justify-center ">
              <img
                  className="w-full h-full object-cover absolute  "
                  src={hero}
                  alt=""
              />
              {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white  relative z-[2] drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] px-[5vw]">
                  Value Added Services
              </h1> */}
          </div>

          <div className="py-[50px]">
              <div className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                  <span className="text-blue-500"> Empowering Communities</span> <br /> Delivering Impactful Solution
              </div>
              <div className="w-full flex justify-center">
                  <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
              </div>

              <Mp />
          </div>

          <div className="py-[5vw]  ">
              <div className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                  <span className="text-blue-500"> Our Value</span> Preposition
              </div>
              <div className="w-full flex justify-center">
                  <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
              </div>

              <div className="grid grid-cols-3 justify-items-center max-lg:grid-cols-2 max-md:grid-cols-1 gap-4 gap-y-8 px-[5vw] py-8">
                  {whyChooseNessaBoxData.map((item, index) => whyChooseNessaBox(item, index))}
              </div>
          </div>

          <div className=" ">
              <div className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                  Our <span className="text-blue-500"> ruler upliftments </span> solution
              </div>
              <div className="w-full flex justify-center">
                  <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
              </div>

              <div className="flex max-lg:flex-col   px-[5vw]">
                  <div className=" max-lg:w-full  grid grid-cols-2 max-md:grid-cols-1 gap-y-8 mt-[50px] w-[70%] ">
                      {ourRulerUpliftmentsSolution.map((item, index) => (
                          <div
                              key={index}
                              className="flex w-full justify-center items-center">
                              <div className="relative h-[400px] flex justify-center items-center">
                                  <img
                                      className=" w-full h-full  object-cover"
                                      src={item.poster}
                                      alt=""
                                  />
                                  <h1 className="absolute bottom-0 rounded-md w-[95%] bg-white text-xl py-[10px] mb-[10px] flex items-center justify-center  z-[2]">
                                      {item.title}
                                  </h1>
                              </div>
                          </div>
                      ))}
                  </div>

                  <div className="w-[30%] max-lg:w-full  mt-[50px] grid grid-cols-1 max-lg:grid-cols-4 max-md:grid-cols-2    ">
                      {ourRulerUpliftmentsSolutionRightSection.map((item, index) => (
                          <div
                              key={index}
                              className="w-full  h-[200px] flex flex-col items-center ">
                              <div className="w-[100px] h-[100px] rounded-full text-3xl font-semibold bg-orange-400  flex items-center justify-center">
                                  {item.inCircleNumbers}
                              </div>
                              <div className="text-lg text-center">{item.title}</div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          <h1
              className="px-[5vw] my-[50px] text-6xl font-bold text-white text-center "
              style={{ WebkitTextStroke: '1px   black' }}>
              {' '}
              We support communities in creating lasting positive impact
          </h1>
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-y-[50px] mb-[50px]">
              <div className="flex flex-col items-center justify-center px-[100px]">
                  <h1 className="text-6xl font-bold text-green-500 mb-3 ">228%</h1>
                  <h1 className="text-center text-lg ">Profit Increase per community on average</h1>
              </div>
              <div className="flex flex-col items-center justify-center px-[100px]">
                  <h1 className="text-6xl font-bold text-amber-950 mb-3 ">18%</h1>
                  <h1 className="text-center text-lg ">Reduction of average farmer’s costs</h1>
              </div>
              <div className="flex flex-col items-center justify-center px-[100px]">
                  <h1 className="text-6xl font-bold text-green-500 mb-3 ">74%</h1>
                  <h1 className="text-center text-lg ">Increase Environmental Awareness</h1>
              </div>
          </div>

          <div className="w-full px-[5vw] grid grid-cols-2 max-md:grid-cols-1 gap-y-8  text-lg">
              <div className="">
                  <div className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                      <span className="text-blue-500"> Smart Village </span> Solutions
                  </div>
                  <div className="flex items-center justify-center mt-[50px]">
                      <img
                          src={smartVillageSolutions}
                          alt=""
                          className="w-[80%] object-cover"
                      />
                  </div>
              </div>
              <div className="grid grid-cols-2 maxsmi:grid-cols-1 text-center ">
                  <div className=" h-[200px] flex flex-col mb-[20px] items-center">
                      <img
                          className="w-[80%] h-[80%]  object-contain"
                          src={smartVillageHome}
                          alt=""
                      />
                      <h1>Smart Village Home</h1>
                  </div>
                  <div className=" h-[200px] flex flex-col mb-[20px] items-center">
                      <img
                          className="w-[80%] h-[80%]  object-contain"
                          src={solarBasedIrrigation}
                          alt=""
                      />
                      <h1>Solar Based Irrigation</h1>
                  </div>
                  <div className=" h-[200px] flex flex-col mb-[20px] items-center">
                      <img
                          className="w-[80%] h-[80%]  object-contain"
                          src={smartCommunityCenter}
                          alt=""
                      />
                      <h1>Smart Community Center</h1>
                  </div>
                  <div className=" h-[200px] flex flex-col mb-[20px] items-center">
                      <img
                          className="w-[80%] h-[80%]  object-contain"
                          src={waterTreatmentPlants}
                          alt=""
                      />
                      <h1>Water Treatment Plants</h1>
                  </div>
                  <div className=" h-[200px] flex flex-col mb-[20px] items-center">
                      <img
                          className="w-[80%] h-[80%]  object-contain"
                          src={solarBasedLight}
                          alt=""
                      />
                      <h1>Solar Based Light</h1>
                  </div>
                  <div className=" h-[200px] flex flex-col mb-[20px] items-center">
                      <img
                          className="w-[80%] h-[80%]  object-contain"
                          src={villageStadiumLight}
                          alt=""
                      />
                      <h1>Village Stadium Light</h1>
                  </div>
              </div>
          </div>

          <div className="px-[5vw] mb-8">
              <div className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                  <span className="text-blue-500"> Our Distinguished </span> Customers
              </div>
              <div className="w-full flex justify-center">
                  <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
              </div>
              <h1 className="text-xl font-semibold my-[30px]">Corporates</h1>
              <div className="justify-items-center grid grid-cols-5  max-[800px]:grid-cols-4 max-sm:grid-cols-3 max-[400px]:grid-cols-2 gap-[20px] ">
                  {corporateCusomters.map((item, index) => (
                      <img
                          key={index}
                          className="h-[100px] w-[200px] p-[20px] rounded-xl border border-black object-contain"
                          src={item}
                          alt=""
                      />
                  ))}
              </div>
              <h1 className="text-xl font-semibold my-[30px]">NGO</h1>
              <div className="justify-items-center grid grid-cols-5  max-[800px]:grid-cols-4 max-sm:grid-cols-3 max-[400px]:grid-cols-2 gap-[20px] ">
                  {ngologos.map((item, index) => (
                      <img
                          key={index}
                          className="h-[100px] w-[200px]  p-[20px] rounded-xl border border-black object-contain"
                          src={item}
                          alt=""
                      />
                  ))}
              </div>
          </div>
          <Footer />
      </div>
  )
};
