import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const AddPost = () => {
  const inputData = {
    title: "",
    post: "",
  };

  const [formData, setFormData] = useState(inputData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function editPost() {
      if (id) {
        try {
          const response = await axios.get(`/api/posts/${id}`);
          setFormData({ title: response.data.title, post: response.data.post });
          setLoading(false);
        } catch (err) {
          console.log(err.message);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    editPost();
  }, [id]);

  function onInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  function handleValidation() {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!formData.post.trim()) {
      newErrors.post = "Post is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (handleValidation()) {
      setErrors({});
      try {
        if (id) {
          await axios.put(`/api/posts/${id}`, formData);
        } else {
          await axios.post("/api/posts", formData);
          setFormData(inputData);
        }
        navigate("/");
      } catch (err) {
        console.log(err);

        const backendErrors = err.response.data.errors;
        if (backendErrors) {
          const validationErrors = {};
          backendErrors.forEach((error) => {
            validationErrors[error.path] = error.msg;
          });
          setErrors(validationErrors);
        }
      }
    }
  }

  return (
    <div className="min-h-dvh max-w-3/4 mx-auto mt-8">
      {loading ? (
        <p className="text-2xl my-10">Loading ...</p>
      ) : (
        <div>
          <p className="text-2xl italic m-4">{ id ? "Edit Post" : "New Post"}</p>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="block text-xl my-1 ">
                Title:{" "}
              </label>
              <input
                className={`border w-3/4 rounded-sm h-10 p-2 outline-hidden  ${
                  errors.title ? "border-red-600" : ""
                }`}
                type="text"
                name="title"
                value={formData.title}
                onChange={onInputChange}
              />
              <div>
                {errors.title && (
                  <p className="text-red-500 text-sm"> {errors.title} </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="post" className="block text-xl my-1">
                Post:{" "}
              </label>
              <textarea
                className={`border w-3/4  rounded-sm h-32 p-2 outline-hidden ${
                  errors.post ? "border-red-600" : ""
                }`}
                type="text"
                name="post"
                value={formData.post}
                onChange={onInputChange}
              />
              <div>
                {errors.post && (
                  <p className="text-red-500 text-sm"> {errors.post} </p>
                )}
              </div>
            </div>
            <button
              className="border p-2 rounded-md my-4 cursor-pointer bg-gray-800 text-white "
              type="Submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddPost;
