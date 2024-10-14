import { Link } from "react-router-dom";

function Header() {
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
        </ul>
      </nav>
    </header>
  );
}

export default Header;
