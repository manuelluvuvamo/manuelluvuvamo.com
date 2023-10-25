export default function Footer(){
  return(
    <footer className="flex flex-col items-center justify-between pb-8">
        <div className="max-w-4xl w-full">
         
        <div className="mt-9 sm:mb-3 text-center border-t pt-8">
          <small className="text-sm font-normal leading-none">
            © 2023 Manuel Luvuvamo -{" "}
            <a
              className="border-b transition-all duration-500 hover:border-gray-400 px-2 py-1"
              data-cursor="block"
              href="https://github.com/manuelluvuvamo"
            >
              MIT License
            </a>
          </small>
        </div>
        </div>

      </footer>
    
  );
}