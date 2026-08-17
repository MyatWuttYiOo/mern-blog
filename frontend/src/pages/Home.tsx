import { useEffect, useState } from "react";
import API from "../api/axios";
import PostCard from "../components/PostCard";
import { useDebounce } from "../hooks/useDebounce"; 

export interface Post {
  _id: string;
  title: string;
  content: string;
  author?: {
    username: string;
  };
  createdAt?: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await API.delete(`/posts/${id}`);
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/posts?search=${debouncedSearch}`);
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [debouncedSearch]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Search Bar Section */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search posts by title or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        {loading && (
          <span className="absolute right-4 top-3.5 text-xs text-indigo-400 animate-pulse">
            Searching...
          </span>
        )}
      </div>

      {/* Loading State */}
      {loading && posts.length === 0 ? (
        <div className="text-center py-12 text-slate-400">Loading posts...</div>
      ) : posts.length === 0 ? (
        /* Empty State */
        <div className="text-center py-12 bg-slate-900/50 rounded-xl border border-slate-800">
          <p className="text-slate-400">No posts found.</p>
        </div>
      ) : (
        /* Posts List Grid */
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}