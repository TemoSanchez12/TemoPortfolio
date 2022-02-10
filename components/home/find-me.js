import Image from 'next/image'

import ComponentContainer from '../ui/component-container'
import Subtitle from '../ui/subtitle'
import ConnectLink from './connect-link'

const FindMe = () => {
  return (
    <ComponentContainer>
      <Subtitle>
        <span>Find me</span> on the web
      </Subtitle>

      <div className='find-me__content'>
        <div>
          <ConnectLink
            path='/images/icons/instagram.png'
            alt='alt text'
            text='@temosanchez21'
            link='https://www.instagram.com/temosanchez12/'
          />
          <ConnectLink
            path='/images/icons/linkedin.png'
            alt='alt text'
            text='LinkedIn'
            link='https://www.linkedin.com/in/cuauht%C3%A9moc-alejandro-s%C3%A1nchez-carrillo-9859aa1b0/'
          />
          <ConnectLink
            path='/images/icons/youtube.png'
            alt='alt text'
            text='Temo Sanchez'
            link='https://www.youtube.com/channel/UCbXl4cpfRYN1I1NFgF4OnNQ'
          />
          <ConnectLink
            path='/images/icons/github2.png'
            alt='alt text'
            text='TemoSanchez12'
            link='https://github.com/TemoSanchez12'
          />
        </div>

        <div className='find-me__image-container'>
          <div>
            <Image
              src='/images/unnamed.jpg'
              alt='profile'
              width={600}
              height={600}
            />
          </div>
        </div>
      </div>
    </ComponentContainer>
  )
}

export default FindMe
