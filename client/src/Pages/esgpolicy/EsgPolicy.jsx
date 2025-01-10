import Footer from '../../Components/Footer'
import Navbar from '../../Components/Header/Navbar'
import SideComponent from '../../Components/sideComponent/SideComponent'
import { EsgPolicyConfig } from './EsgPolicyConfig'

const EsgPolicy = () => {
    
    
  return (
    <div className="overflow-hidden bg-white">
    {/* Header */}
    <Navbar />
    <SideComponent />
    <div className="bg-blue-200 text-black  py-20"> 
      <h1 className="text-2xl font-semibold text-center">{EsgPolicyConfig.title}</h1>
    </div>

    {/* Content */}
    <div className="max-w-[1200px] mx-auto px-8 py-6 space-y-8">
      {EsgPolicyConfig.sections.map((section) => (
        <section key={section.id}>
          <h2 className="text-lg font-semibold bg-gray-100 p-3">
            {section.title}
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            {section.content}
          </p>
        </section>
      ))}
    </div>

    <Footer/>
  </div>
  )
}

export default EsgPolicy