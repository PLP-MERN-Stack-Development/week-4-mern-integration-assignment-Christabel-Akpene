import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/posts")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

return (
  <div className="min-h-dvh max-w-3/4 mx-auto mt-8">
    <p className="text-2xl italic m-4">All Posts</p>
    {loading ? <p className="text-2xl my-10">Loading ...</p> : (
      <div>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="my-8 cursor-pointer">
                <Link to={`/edit/${post._id}`}>
                  <p className="">
                    <FaEdit />
                  </p>
                </Link>

                <Link to={`/posts/${post._id}`}>
                  <p className="py-2 text-2xl font-bold">{post.title}</p>
                  <p className="py-4">
                    {post.post.split(" ").slice(0, 6).join(" ") + "..."}
                  </p>
                </Link>
                <hr />
              </div>
            ))
          ) : (
            <p>No Posts Yet</p>
          )}
      </div>
    )}
  </div>
);
};

export default Home;
