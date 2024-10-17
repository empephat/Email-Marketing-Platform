function Footer() {
  const checkUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/status", {
        credentials: "include", // This line adds the credentials
      });
      if (!response.ok) {
        throw new Error("Failed to check user credentials");
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <footer className="relative p-4 text-center text-white bg-green-600">
      <p>&copy; 2024 Monkey Emails Corp. All rights reserved.</p>
      <button
        onClick={checkUser}
        className="absolute rounded p-1 hover:shadow-md  border top-4 left-3"
      >
        Check user status
      </button>
    </footer>
  );
}

export default Footer;
