import Image from 'next/image'

const TechCard = ({ path, alt }) => {
  return (
    <div className='tech-card__card'>
      <Image src={path} alt={alt} width={400} height={200} />
    </div>
  )
}

export default TechCard
