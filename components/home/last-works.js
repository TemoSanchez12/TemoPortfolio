import ComponentContainer from '../ui/component-container'
import Subtitle from '../ui/subtitle'
import WorkCard from '../ui/work-card'

const LastWorks = ({ works }) => {
  return (
    <ComponentContainer>
      <Subtitle>
        Check up my last <span>works</span>
      </Subtitle>

      <div className='last-works__flex'>
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

export default LastWorks
