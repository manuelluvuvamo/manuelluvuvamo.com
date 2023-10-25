import {GiftIcon, Github, Link as Linkk} from 'lucide-react';
import Link from 'next/link';

interface Projecto {
  titulo: string;
  git: string;
  vercel: string;
  desc: string;
  tech: string;
}



export default function ProjectCard2(props:Projecto){
  return (
    <div className="w-full lg:w-100 lg:max-w-[280px] bg-white border border-gray-200 rounded-lg shadow bg-transparent transition ease-in-out delay-150 hover:border-gray-700 duration-300 m-0 group cursor-pointer mb-2 m-2">
    <Link target="_blank" href= {props.git}>
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
      <Link target="_blank" href= {props.git} className=''>
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 mt-6 ">
         {props.titulo}
        </h5>
      </Link>
      <div className=" mt-2.5 mb-5">
        
       <p className='text-gray-500'> {props.desc}</p>
       <p className='text-gray-500 mt-2'> Tech: <span className='text-gray-900'>{props.tech}</span></p>
      </div>
      <div className="flex items-center justify-end gap-3">
      <Link
          target="_blank" href= {props.git}
          className="rounded-full border-gray-500  transition ease-in-out delay-150  hover:bg-gray-700 hover:text-white duration-300 p-2"
        >
          <Github className='transition ease-in-out delay-150 hover:text-white duration-300 text-gray-500'/>
        </Link>

        <Link
          target="_blank" href= {props.vercel}
          className="rounded-full border-gray-500  transition ease-in-out delay-150  hover:bg-gray-700 hover:text-white duration-300 p-2"
        >
          <Linkk className='transition ease-in-out delay-150 hover:text-white duration-300 text-gray-500'/>
        </Link>
      </div>
    </div>
  </div>
  )
}