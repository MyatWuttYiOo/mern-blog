import { Link } from "react-router-dom";

interface PostProps {
  post: {
    _id: string;
    title: string;
    content: string;
    author?: { username: string };
  };
  onDelete: (id: string) => void;
}

export default function PostCard({ post, onDelete }: PostProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-5 mb-4 rounded-xl shadow-md hover:border-slate-700 transition-colors">
      <h3 className="text-xl font-bold text-slate-100 mb-2">{post.title}</h3>
      <p className="text-slate-400 text-sm mb-3">
        {post.content.substring(0, 100)}...
      </p>
      <p className="text-xs text-slate-500 mb-4">
        By: <span className="font-medium text-slate-300">{post.author?.username || "Anonymous"}</span>
      </p>

      <div className="flex items-center gap-3 pt-3 border-t border-slate-800 text-sm">
        <Link
          to={`/posts/${post._id}`}
          className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
        >
          Read More
        </Link>
        <Link
          to={`/posts/edit/${post._id}`}
          className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(post._id)}
          className="ml-auto text-rose-500 hover:text-rose-400 font-medium transition-colors cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}