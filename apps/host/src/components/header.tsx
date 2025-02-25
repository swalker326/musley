import { useAuth } from "../providers/AuthProvider";
import { Button } from "@/components/ui/button";

export function Header() {
  const { login, logout, loggedIn } = useAuth();
  return (
    <header className="p-4">
      <div>
        {loggedIn ? (
          <Button onClick={() => logout()}>Logout</Button>
        ) : (
          <Button onClick={() => login()}>Login</Button>
        )}
      </div>
    </header>
  );
}
