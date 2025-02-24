import { useAuth } from "../providers/AuthProvider";

export function Header() {
  const { login, logout, loggedIn } = useAuth();
  console.log("loggedIn", loggedIn);
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          {loggedIn ? (
            <button
              onClick={() => logout()}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => login()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
