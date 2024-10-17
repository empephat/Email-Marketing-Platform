import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "GET",
        credentials: "include", // Viktigt för att skicka med cookies
      });
      if (response.ok) {
        navigate("/login");
      } else {
        console.error("Utloggning misslyckades");
      }
    } catch (error) {
      console.error("Fel vid utloggning:", error);
    }
  };

  return (
    <header className="bg-green-600 text-white p-4">
      <nav>
        <ul className="flex justify-center space-x-4">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/campaigns" className="hover:underline">
              Campaigns
            </Link>
          </li>
          <li>
            <Link to="/campaign-detail" className="hover:underline">
              Campaign Detail
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </li>
          <li>
            <button className="hover:underline" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
