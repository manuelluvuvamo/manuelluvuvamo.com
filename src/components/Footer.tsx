import Link from "next/link";

export default function Footer(){
  return(
    <footer className="flex flex-col items-center justify-between pb-8">
        <div className="max-w-4xl w-full">
         
        <div className="mt-9 sm:mb-3 text-center border-t pt-8">
          <small className="text-sm font-normal leading-none">
            © {new Date().getFullYear()} Manuel Luvuvamo -{" "}
            <Link
              className="border-b transition-all duration-500 hover:border-gray-400 px-2 py-1"
              data-cursor="block"
              href="https://github.com/manuelluvuvamo"
            >
              MIT License
            </Link>
          </small>
        </div>
        </div>

      </footer>
    
  );
}