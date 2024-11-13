import envMode from "@/components/helper/checkENVmode";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch(`${envMode()}/auth/logout`, {
        method: "GET",
        credentials: "include", // Viktigt för att skicka med cookies
      });
      if (response.ok) {
        setLoggedIn(false);
        navigate("/");
      } else {
        console.error("Utloggning misslyckades");
      }
    } catch (error) {
      console.error("Fel vid utloggning:", error);
    }
  };
  // Check if user is logged in
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${envMode()}/auth/status`, {
          credentials: "include",
        });
        const data = await response.json();
        setLoggedIn(data.isAuthenticated);
      } catch (err) {
        console.error("Failed to check authentication status:", err);
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <header className="bg-green-600 text-white p-4">
      <nav>
        <ul className="flex justify-center space-x-6">
          <li>
            <Link
              to="/"
              className="relative hover:text-white/80 transition duration-300"
            >
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 hover:w-full"></span>
            </Link>
          </li>
          {!loggedIn ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="relative hover:text-white/80 transition duration-300"
                >
                  Login
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="relative hover:text-white/80 transition duration-300"
                >
                  Register
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 hover:w-full"></span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/campaigns"
                  className="relative hover:text-white/80 transition duration-300"
                >
                  Campaigns
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/campaign-detail"
                  className="relative hover:text-white/80 transition duration-300"
                >
                  Campaign Manager
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 hover:w-full"></span>
                </Link>
              </li>
              <li>
                <button className="hover:underline" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
