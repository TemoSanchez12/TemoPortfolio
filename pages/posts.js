import dbConnect from '../utils/connectDB'
import { getAllPosts } from '../utils/posts'
import PostList from '../components/posts/posts-list'
// import Filter from '../components/ui/filter'

const PostPage = ({ posts }) => {
  // const categories = ['Instagram', 'Youtube', 'DevTo', 'Linkedin']

  return (
    <>
      {/* <Filter categories={categories} /> */}
      <PostList posts={posts} />
    </>
  )
}

export default PostPage

export const getStaticProps = async (req, res) => {
  await dbConnect()

  const posts = await getAllPosts()

  const serializablePost = posts.map((post) => ({
    id: post._id.toString(),
    plataform: post.plataform,
    readingTime: post.readingTime,
    link: post.link,
    image: `https://res.cloudinary.com/batemo12/${post.image}`,
    date: post.date.toString(),
  }))

  return {
    props: {
      posts: serializablePost,
    },
    revalidate: 86400,
  }
}
