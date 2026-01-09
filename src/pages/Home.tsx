import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'

import ChatBot from './ChatBot'

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <ChatBot />
      <Banner />
      <Testimonial />
      <Newsletter />
    </>
  )
}

export default Home
