import React from 'react'
import './About.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Title from '../../components/title/Title'
import Countup from 'react-countup'
import aboutUspng from '../../assets/aboutUspng.png'
import sponsor1 from '../../assets/sponsor1.png'
import sponsor2 from '../../assets/sponsor2.png'
import sponsor3 from '../../assets/sponsor3.png'
import sponsor4 from '../../assets/sponsor4.png'
import sponsor5 from '../../assets/sponsor5.png'

function About() {
  return (
    <>
      <Header title={'About Us'} subtitle={'khalfi aymen'}></Header>
      <AbooutSection />
      <Footer />
    </>
  )
}
export function AbooutSection() {


  return (
    <div className="section about">
      <div className='part1'>
        <div className="part_header">
          <Title title={'About'} subtitle={'What do you know about us ...?'} />
        </div>
        <div className="part_footer flexCenter">
          <div className="part_footer_left">
            <img src={aboutUspng} alt="img" />
          </div>
          <div className="part_footer_right">
            <p className="p">
              Welcome to our innovative web platform dedicated to the Prediction and Management of Video Game Addiction.
              Committed to fostering healthy gaming habits, we leverage cutting-edge technology to forecast potential addiction risks and offer personalized management strategies.
            </p>
            <p className="p">
              Our platform combines advanced analytics, user-friendly interfaces, and evidence-based interventions to empower users in maintaining a balanced and fulfilling gaming experience. With a focus on proactive prediction and responsive support, we strive to create a community that promotes responsible gaming, emphasizing the well-being of users. Join us on this journey as we redefine the intersection of technology and mental health in the realm of video gaming.
            </p>

          </div>
        </div>

      </div>
      <div className='part2'>
        <div className="part">
          <h1>Our Fans</h1>
          <p className='p'>more than <span>+<Countup start={500} end={1000} duration={1.5}  enableScrollSpy /></span></p>
        </div>
        <div className="part">
          <h1>Our Patients</h1>
          <p className='p'>more than <span>+<Countup end={294} duration={1.5}  enableScrollSpy /></span></p>
        </div>
        <div className="part">
          <h1>Our Doctors</h1>
          <p className='p'>more than <span>+<Countup end={76} duration={1.5}  enableScrollSpy /></span></p>
        </div>
      </div>
      <div className='part3'>
        <div className="part_header">
          <Title title={'sponsor'} subtitle={'some of our sponsors'} />
        </div>
        <div className="part_footer">
          <div> <img src={sponsor5} alt="img" /></div>
          <div> <img src={sponsor4} alt="img" /></div>
          <div> <img src={sponsor3} alt="img" /></div>
          <div> <img src={sponsor2} alt="img" /></div>
          <div> <img src={sponsor1} alt="img" /></div>
        </div>
      </div>
    </div>
  )
}

export default About