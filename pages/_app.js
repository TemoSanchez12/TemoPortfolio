import MainLayout from '../components/layout/main-layout'
import '../styles/globals.css'
import '../styles/stars.css'

function MyApp({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default MyApp
