const WorkCard = ({ image, link, name, description }) => {
  console.log(image)
  return (
    <a href={link} className='work-card__anchor'>
      <div
        className='work-card__card'
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className='work-card__card-content'>
          <h3 className='work-card__card-title'>{name} </h3>
          <p className='work-card__card-body'>{description}</p>
        </div>
      </div>
    </a>
  )
}

export default WorkCard
