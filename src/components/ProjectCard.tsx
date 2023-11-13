import {Link as Linkk} from 'lucide-react';
import Link from 'next/link';

interface Projecto {
  titulo: string;
  url: string;
  desc: string;
}



export default function ProjectCard(props:Projecto){
  return (
    <div className="w-full lg:w-100 lg:max-w-[261px] bg-transparent border border-gray-200 rounded-lg shadow bg-transparent transition ease-in-out delay-150 hover:border-gray-700 duration-300 m-0 group cursor-pointer mb-2 m-2">
    <Link target="_blank" href= {props.url}>
   {/*  <Image
    src="/4.jpeg"
    alt="Manuel Logo"
    className="rounded-t-lg h-64 w-[100%]"
    width={500}
    height={300}
    priority
  /> */}

    </Link>
    <div className="px-5 pb-5">
      <Link target="_blank" href= {props.url} className=''>
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mt-6 ">
         {props.titulo}
        </h5>
      </Link>
      <div className=" mt-2.5 mb-5">
        
       <p className='text-gray-500 dark:text-gray-300'> {props.desc}</p>
      </div>
      <div className="flex items-center justify-end">
        
        <Link
          target="_blank" href= {props.url}
          className="rounded-full border-gray-500 group transition ease-in-out delay-150  hover:bg-gray-700 hover:text-white duration-300 p-2"
          >
            <Linkk className='transition ease-in-out delay-150 group-hover:text-white  hover:text-white duration-300 text-gray-500'/>
          </Link>
      </div>
    </div>
  </div>
  )
}