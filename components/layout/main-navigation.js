import Link from 'next/link'

const MainNavigation = () => {
  return (
    <nav className='main-navigation__nav'>
      <ul className='main-navigation__list'>
        <li>
          <Link href='/'>HOME</Link>
        </li>
        <li>
          <Link href='/portfolio'>PORTFOLIO</Link>
        </li>
        <li>
          <Link href='/posts'>POST</Link>
        </li>
      </ul>
    </nav>
  )
}

export default MainNavigation
