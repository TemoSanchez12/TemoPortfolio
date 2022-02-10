import Image from 'next/image'

const PostItem = ({ image, plataform, readingTime, link, date }) => {
  const plataformIcons = {
    youtube: '/images/icons/youtube.png',
    instagram: '/images/icons/instagram.png',
    devto: '/images/icons/devto.png',
    linkedin: '/images/icons/linkedin.png',
  }

  let timeAgo = ''
  const postDate = new Date(date)
  const dateNow = new Date()
  const dayTime = 1000 * 3600 * 24

  const diference = dateNow.getTime() - postDate.getTime()

  if (diference < dayTime) {
    timeAgo = 'Today'
  } else if (diference < dayTime * 14) {
    timeAgo = `${(diference / dayTime).toFixed(0)} days ago`
  } else if (diference < dayTime * 30) {
    timeAgo = `${(diference / (dayTime * 7)).toFixed(0)} weeks ago`
  } else {
    timeAgo = `${(diference / (dayTime * 30)).toFixed(0)} months ago`
  }

  return (
    <li>
      <div
        className='post-item__card'
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className='post-item__content'>
          <div className='post-item__plataform'>
            <div className='post-item__image'>
              <Image
                src={plataformIcons[plataform]}
                alt={plataform}
                width={70}
                height={70}
              />
            </div>
            <time>{timeAgo}</time>
          </div>

          <div className='post-item__link'>
            <p>{readingTime} min reading time</p>
            <a href={link}>See post</a>
          </div>
        </div>
      </div>
    </li>
  )
}

export default PostItem
