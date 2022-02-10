import AboutMe from '../components/home/about-me'
import LastWorks from '../components/home/last-works'
import WhatIKnow from '../components/home/what-i-know'
import FindMe from '../components/home/find-me'

import dbConnect from '../utils/connectDB'
import { getLastWorks } from '../utils/works'

export default function Home({ works }) {
  return (
    <>
      <AboutMe />
      <LastWorks works={works} />
      <WhatIKnow />
      <FindMe />
    </>
  )
}

export const getStaticProps = async () => {
  await dbConnect()

  const works = await getLastWorks()

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
