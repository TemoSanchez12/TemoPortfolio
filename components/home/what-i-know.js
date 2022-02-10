import ComponentContainer from '../ui/component-container'
import Subtitle from '../ui/subtitle'
import TechCard from './tech-card'

const WhatIKnow = () => {
  return (
    <ComponentContainer>
      <Subtitle>
        My<span> stack</span>
      </Subtitle>

      <div className='what-i-know__grid-container'>
        <div className='what-i-know__grid'>
          <div className='what-i-know__one'>
            <TechCard path='/images/techs/reactjs.png' alt='React.js' />
          </div>
          <div className='what-i-know__two'>
            <TechCard path='/images/techs/mongodb.png' alt='mongodb' />
          </div>
          <div className='what-i-know__three'>
            <TechCard path='/images/techs/nodejs.png' alt='Node.js' />
          </div>
          <div className='what-i-know__five'>
            <TechCard path='/images/techs/expressjs.png' alt='Express.js' />
          </div>
          <div className='what-i-know__four'>
            <TechCard path='/images/techs/nextjs.png' alt='Next.js' />
          </div>
        </div>
      </div>
    </ComponentContainer>
  )
}

export default WhatIKnow
