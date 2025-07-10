import { NavLink, Link } from "react-router"
const Navigation = () => {
  return (
    <div className='flex justify-between my-2 mx-5' >
        <div className=''>
          <Link to={"/"}>
            <h1 className='font-extrabold text-2xl'>My Blog</h1>

          </Link>
        </div>

        <nav>
            <ul className='flex gap-3 cursor-pointer'>
                <NavLink to={"/"} className={({isActive}) => `hover:text-gray-500 transition duration-300 ease-in-out ${isActive ? "text-gray-500" : "text-black"}`}>Home</NavLink>
                <NavLink to={"/addPost"} className={({isActive}) => `hover:text-gray-500 transition duration-300 ease-in-out ${isActive ? "text-gray-500" : "text-black"}`}>Add Blog</NavLink>
            </ul>
        </nav>
    </div>
  )
}

export default Navigation