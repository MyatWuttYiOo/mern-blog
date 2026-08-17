import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
interface Post {
  _id: string;
  title: string;
  content: string;
  author?: {
    _id: string;
    username: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState <Post | null>(null);

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
    try {
      await API.delete(`/posts/${id}`);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p><small>By: {post.author?.username || "Anonymous"}</small></p>
      <p>{post.content}</p>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => navigate(`/posts/edit/${post._id}`)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}