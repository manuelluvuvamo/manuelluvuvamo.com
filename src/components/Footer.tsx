import Link from "@/components/links"

export default function Footer() {
  return (
    <footer className="max-w-4xl w-full container flex flex-col md:flex-row sm:flex-col items-center justify-start my-8 md:my-14">
      <div className="mt-9 sm:mb-3">
        <small className="text-sm font-normal leading-none">
        {new Date().getFullYear()} &copy;{" "}
          <Link olink="https://www.linkedin.com/in/manuel-luvuvamo-912907218/">manuelluvuvamo</Link> .
          Hosted on <Link olink="/"> ▲ </Link>{" "}
        </small>
      </div>
    </footer>

  );
}