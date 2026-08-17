import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      API.get(`/posts/${id}`).then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await API.put(`/posts/${id}`, { title, content });
      } else {
        await API.post(`/posts`, { title, content });
      }
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4 py-8">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-slate-100 mb-6 text-center">
          {isEdit ? "Edit Post" : "Create New Post"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Content
            </label>
            <textarea
              placeholder="Write your post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              required
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-none"
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-1/2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition-colors shadow-md cursor-pointer"
            >
              {isEdit ? "Update Post" : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}