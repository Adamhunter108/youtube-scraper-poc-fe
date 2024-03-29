import Link from "next/link";
import Password from "@/components/Password";
import Search from "@/components/Search";

export default function SearchPage() {
  return (
    <div className="">
      <Password />
      <div className="p-4 mt-4 mb-2">
        <Link
          href="/"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <span aria-hidden="true">←</span> Back
        </Link>
      </div>

      <Search />
    </div>
  );
}
