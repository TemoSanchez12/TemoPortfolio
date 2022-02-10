import ComponentContainer from '../ui/component-container'
import Subtitle from '../ui/subtitle'

const AboutMe = () => {
  return (
    <ComponentContainer>
      <Subtitle>
        Something <span>about me</span>
      </Subtitle>

      <p>
        Hey! Hi, I am a Full Stack developer specializing in JavaScript based
        technologies and environments, lover of quality development, using best
        practices and clean code. I think there is no perfect code, but we
        always have to do our best to get as close as possible
      </p>
      <p>
        I love being in constant learning, either improving what I already know
        or learning new knowledge, I am a good team player and I believe that
        communication is the most important thing for the correct functioning of
        the team.
      </p>
    </ComponentContainer>
  )
}

export default AboutMe
