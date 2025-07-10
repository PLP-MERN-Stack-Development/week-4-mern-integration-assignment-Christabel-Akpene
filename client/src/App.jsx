import {Routes, Route} from "react-router";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import SinglePost from "./pages/SinglePost";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}> 
        <Route index element={<Home/>}/>
        <Route path="/addPost" element={<AddPost/>}/>
        <Route path="/posts/:id" element={<SinglePost/>}/>
        <Route path="/edit/:id" element={<AddPost/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
