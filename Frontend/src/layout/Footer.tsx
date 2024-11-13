import envMode from "@/components/helper/checkENVmode";

function Footer() {
  const checkUser = async () => {
    try {
      const response = await fetch(`${envMode()}/auth/status`, {
        credentials: "include",
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
    <footer className="relative p-4 text-white bg-green-600 flex items-center justify-center">
      <div>
        <button
          onClick={checkUser}
          className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-700"
        >
          Check User Status
        </button>
      </div>
      <p className="mx-auto">
        &copy; 2024 Monkey Emails Corp. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
