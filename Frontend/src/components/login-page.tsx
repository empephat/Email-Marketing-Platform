import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LoginPage() {
  const handleGoogleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      window.location.href = "http://localhost:3000/auth/google";
    } catch (error) {
      console.error("Fel vid Google-inloggning:", error);
      // Visa ett felmeddelande för användaren
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="mb-8">
        <svg
          className="w-12 h-12 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Welcome To Our Platform
      </h2>
      <Card className="w-full max-w-md p-6 bg-white shadow-md">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-green-800"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="w-full px-3 py-2 border border-green-300 rounded-md"
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-green-800"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-green-300 rounded-md"
              disabled
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* <Checkbox id="remember" disabled />
              <Label
                htmlFor="remember"
                className="text-sm text-green-800"
              >
                Remember me
              </Label> */}
            </div>
            {/* <Link to="#" className="text-sm text-green-600">
              Forgot Password?
            </Link> */}
          </div>
          <Button className="w-full py-2 mt-4 text-white bg-green-600 rounded-md">
            Login
          </Button>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 mt-2 text-green-600 border border-green-600 rounded-md"
          >
            Login with Google
          </button>
        </form>
      </Card>
      <p className="mt-4 text-sm text-green-700">
        Don't have an account?{" "}
        <Link to="/" className="font-medium text-green-800">
          Register
        </Link>
      </p>
    </div>
  );
}
