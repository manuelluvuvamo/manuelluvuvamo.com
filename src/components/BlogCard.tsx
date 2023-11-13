import { Eye } from "lucide-react";
import Link from "next/link";

interface Blog {
  titulo: string;
  views: string;
  data: string;
  desc: string;
  href: string;
  key: string;
}

export default function BlogCard(props:Blog){
  return (
    <Link href={props.href} passHref key={props.key}>
    <div className="w-full  group cursor-pointer mb-10 ">
    <div className="flex items-start justify-between">
   
      <h2 className={` mb-2 text-xl font-semibold text-left lg `}>
        {props.titulo}
      </h2>
    

      {/* <span className="flex justify-center items-center gap-2 text-gray-500 text-sm">
        {props.views} <Eye className=" text-gray-500 text-sm" size={18}/>
      </span> */}
    </div>
    <p className="text-gray-500 text-sm">
      {props.desc}{" "}
    </p>

    <p className="text-gray-500 text-xs mt-2 italic">
      {props.data}
    </p>

  </div>
  </Link>
  )
}