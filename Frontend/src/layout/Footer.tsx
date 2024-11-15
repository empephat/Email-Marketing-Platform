import envMode from "@/components/helper/checkENVmode";
import { useAuth } from "@/hooks/useAuth";

function Footer() {
  const { state } = useAuth();

  const checkUser = async () => {
    try {
      const response = await fetch(`${envMode()}/auth/status`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to check user credentials");
      }
      const data = await response.json();
      console.log("From server:", data);
      console.log("From authContext:", state);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <footer className="relative p-4 text-center text-white bg-green-600">
      <p>&copy; 2024 Monkey Emails Corp. All rights reserved.</p>
      <button
        onClick={checkUser}
        className="absolute rounded p-1 hover:shadow-md  border top-3 left-3 bg-green-500 text-white hover:bg-green-700"
      >
        Check User Status
      </button>
    </footer>
  );
}

export default Footer;
