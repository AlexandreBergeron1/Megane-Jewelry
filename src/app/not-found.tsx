import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-6 text-center px-4 py-32 md:px-8 lg:px-16"
      style={{ maxWidth: "1700px", margin: "0 auto" }}
    >
      <h1 className="text-sm text-black-400">Error 404</h1>
      <p className="text-3xl font-bold">Page not found</p>
      <p className="text-black-600 max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        href="/"
        className="ring-1 ring-black rounded-2xl px-8 py-2 font-semibold hover:bg-black hover:text-white transition-all"
      >
        Back to home
      </Link>
    </div>
  );
}