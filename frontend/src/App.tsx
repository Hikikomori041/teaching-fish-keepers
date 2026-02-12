import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-100">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-6 flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-3xl">🐟</span>
            <h1 className="text-2xl font-bold">Club Poisson</h1>
          </Link>
          <nav className="ml-auto flex gap-4 text-sm items-center">
            <Link to="/" className="inline-flex items-center gap-2 hover:underline">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 10.5 12 3l9 7.5" />
                <path d="M5 10v10h14V10" />
              </svg>
              Accueil
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 hover:underline"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 3 4 6v6c0 5 3.8 7.5 8 9 4.2-1.5 8-4 8-9V6l-8-3z" />
                  </svg>
                  Administration
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 hover:underline cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 3h4v18h-4" />
                    <path d="M10 17l5-5-5-5" />
                    <path d="M15 12H3" />
                  </svg>
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 hover:underline"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 3h4v18h-4" />
                  <path d="M10 17l5-5-5-5" />
                  <path d="M15 12H3" />
                </svg>
                Connexion
              </Link>
            )}
          </nav>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
