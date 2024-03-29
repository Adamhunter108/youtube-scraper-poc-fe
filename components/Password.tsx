import { useState, useEffect } from "react";

export default function Password() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const isAuth = sessionStorage.getItem("isAuthenticated");
    if (isAuth === "true") {
      setAuthenticated(true);
    }
  }, []);

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password === process.env.NEXT_PUBLIC_UI_PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem("isAuthenticated", "true");
      setError(false);
    } else {
      setError(true);
    }
  }

  if (isAuthenticated) {
    return null;
  }
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="p-5 bg-white rounded-lg shadow-lg text-center"
      >
        <div className="mb-4">{/* LOGO CAN GO HERE */}</div>
        <div className="text-lg font-semibold mb-4 text-black">
          This page requires a password to view:
        </div>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter password"
          className="p-2 mb-2 border border-gray-300 text-black rounded w-full"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#7775D6] text-white rounded hover:bg-[#4f4ea1]"
        >
          Submit
        </button>
        {error && (
          <div className="text-red-500 mt-2">
            Incorrect password. Please try again.
          </div>
        )}
        <div className="mt-4 text-black">
          Please email{" "}
          <a
            href="mailto:hello@adamhunter.website"
            className="text-[#7775D6] hover:text-[#4f4ea1]"
          >
            hello@adamhunter.website
          </a>{" "}
          for help
        </div>
      </form>
    </div>
  );
}
