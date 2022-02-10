import ComponentContainer from '../ui/component-container'
import Subtitle from '../ui/subtitle'
import WorkCard from '../ui/work-card'

const Works = ({ works }) => {
  return (
    <ComponentContainer>
      <Subtitle>
        Some of <span>my works</span>
      </Subtitle>

      <div className='works__works-container'>
        {works.map((work) => (
          <WorkCard
            key={work.id}
            image={work.image}
            link={work.link}
            name={work.name}
            description={work.description}
          />
        ))}
      </div>
    </ComponentContainer>
  )
}

export default Works
