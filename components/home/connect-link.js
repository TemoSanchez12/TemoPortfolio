import Image from 'next/image'

const ConnectLink = ({ path, alt, text, link }) => {
  return (
    <div className='network-container'>
      <div className='icon-container'>
        <Image src={path} alt={alt} width={30} height={30} />
      </div>
      <a href={link}>
        <p>{text}</p>
      </a>
    </div>
  )
}

export default ConnectLink
