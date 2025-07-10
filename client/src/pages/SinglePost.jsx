import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setPost(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  async function handleDelete(id) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/posts/${id}`);
        await Swal.fire({
          title: "Deleted!",
          text: "Your post has been deleted.",
          icon: "success",
        });
        navigate("/");
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  return (
    <div className="w-3/4 m-auto min-h-[75dvh]">
      {loading ? (
        <p className="text-2xl my-10">Loading ...</p>
      ) : (
        <div className="my-8">
          <div className="flex justify-between">
            <p className="text-3xl cursor-pointer">
              <Link to={`/edit/${post._id}`}>
                <FaEdit />
              </Link>
            </p>
            <p
              className="text-3xl cursor-pointer"
              onClick={() => handleDelete(post._id)}
            >
              <MdDelete />
            </p>
          </div>
          <p className="py-2 text-2xl font-bold">{post.title}</p>
          <p className="py-4">{post.post}</p>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
