// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (

//     <nav className="flex ">
//       <h2 className="text-3xl font-bold text-blue-600">Bloggy</h2>
//       <Link to="/">Home</Link>
//       <Link to="/about">About</Link>
//       <Link to="/contact">Contact</Link>
//       <Link to="/posts/create">Create Post</Link>
//       <Link to="/sign-in">Sign In</Link>
//       <Link to="/sign-up">Sign Up</Link>
//     </nav>
//   );
// }
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-slate-100 px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <h2 className="text-2xl font-extrabold tracking-tight text-indigo-500 hover:text-indigo-400 transition-colors">
          <Link to="/">Bloggy</Link>
        </h2>

        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link 
            to="/" 
            className="hover:text-indigo-400 transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="hover:text-indigo-400 transition-colors"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="hover:text-indigo-400 transition-colors"
          >
            Contact
          </Link>

          {token ? (
            <>
              <Link 
                to="/posts/create" 
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Create Post
              </Link>
              <Link 
                to="#" 
                onClick={handleLogout}
                className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/sign-in" 
                className="hover:text-indigo-400 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/sign-up" 
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}