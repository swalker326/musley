import { Link } from "@tanstack/react-router";

export const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="text-white text-xl font-bold">Musley</span>
          <ul className="flex gap-4">
            <li>
              <Link className="text-gray-300 hover:text-white transition-colors" to="/">Home</Link>
            </li>
            <li>
              <Link className="text-gray-300 hover:text-white transition-colors" to="/email">Email</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};