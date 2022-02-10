import Image from 'next/image'

const Hero = () => {
  return (
    <div className='hero__container'>
      <div className='hero__text-container'>
        <h1 className='hero__text'>
          I am <span className='hero__name'>Temo Sanchez</span> Full Stack{' '}
          <br /> JavaScript Developer
        </h1>
      </div>

      <div className='hero__image'>
        <Image
          src='/images/indexImage.png'
          alt='Imagen Inicio'
          width={500}
          height={500}
        />
      </div>
    </div>
  )
}

export default Hero
