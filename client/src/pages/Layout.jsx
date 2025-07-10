import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div>
        <Navigation/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout