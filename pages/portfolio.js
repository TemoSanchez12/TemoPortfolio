import dbConnect from '../utils/connectDB'
import { getAllWorks } from '../utils/works'

import Works from '../components/portfolio/works'

const PortfolioPage = ({ works }) => {
  return (
    <>
      <Works works={works} />
    </>
  )
}

export default PortfolioPage

export const getStaticProps = async (context) => {
  await dbConnect()

  const works = await getAllWorks()

  const serializableWorks = works.map((w) => ({
    name: w.name,
    image: `https://res.cloudinary.com/batemo12/${w.image}`,
    id: w._id.toString(),
    link: w.link,
    tech: w.tech,
    description: w.description,
  }))

  return {
    props: {
      works: serializableWorks,
    },
    revalidate: 86400,
  }
}
