import {Link as Linkk} from 'lucide-react';
import Link from 'next/link';

interface Projecto {
  titulo: string;
  url: string;
  desc: string;
  tech: string;
}



export default function ProjectCard(props:Projecto){
  return (
    <Link target="_blank" href= {props.url}  className="w-full bg-transparent bg-transparent transition ease-in-out delay-150 duration-300 m-0 group cursor-pointer mb-2 m-2  border-b transition-all duration-500 hover:border-gray-500">
    <div className=" pb-5">
        <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white mt-6 ">
         {props.titulo}
        </h5>
      <div className=" mt-2.5 ">
        
       <p className='text-gray-500 dark:text-gray-300'> {props.desc}</p>
      </div>
      {/* <div className="flex items-center justify-end">
        
        <Link
          target="_blank" href= {props.url}
          className="rounded-full border-gray-500 group transition ease-in-out delay-150  hover:bg-gray-700 hover:text-white duration-300 p-2"
          >
            <Linkk className='transition ease-in-out delay-150 group-hover:text-white  hover:text-white duration-300 text-gray-500'/>
          </Link>
      </div> */}
    </div>
  </Link>
  )
}