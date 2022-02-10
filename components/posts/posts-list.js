import ComponentContainer from '../ui/component-container'
import PostItem from './post-item'
import Subtitle from '../ui/subtitle'

const PostList = ({ posts }) => {
  return (
    <ComponentContainer>
      <Subtitle>
        Popular <span>post</span>
      </Subtitle>
      <ul className='post-list__list'>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            image={post.image}
            plataform={post.plataform}
            readingTime={post.readingTime}
            link={post.link}
            date={post.date}
          />
        ))}
      </ul>
    </ComponentContainer>
  )
}

export default PostList
