import { FormEvent } from "react";
import { discord } from "@/lib/discord";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
/* import { Button } from "./ui/button"; */
import toast from "react-hot-toast";

const contactFormSchema = z.object({
  nome: z.string().min(3).max(100),
  email: z.string().email(),
  mensagem: z.string().min(1).max(500),
});

type contactFormData = z.infer<typeof contactFormSchema>;

export default function GuestBookForm() {
  const { handleSubmit, register, reset, formState: {isSubmitting} } = useForm<contactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: contactFormData) => {
      try {
        await axios.post('/api/contact', data)
        toast.success('Mensagem enviada com sucesso!')
        reset()
      } catch (error) {
        toast.error('Ocorreu um erro ao enviar a mensagem. Tente novamente!')
        console.log(error);
 
      }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 flex-col gap-2 mt-10"
    >
      <div className="">
        <label htmlFor="nome" className="text-base font-semibold text-justify">
          Nome:
        </label>

        <input
          type="text"
          id="nome"
          {...register("nome")}
          className="w-full p-2 mt-4 mb-4  border-gray-300 border-[1px] rounded-lg  bg-transparent transition ease-in-out delay-150 hover:border-gray-700 duration-300 "
          placeholder="Jane Doe"
        />
      </div>

      <div className="">
        <label htmlFor="email" className="text-base font-semibold text-justify">
          Email:
        </label>

        <input
          type="email"
          id="email"
          {...register("email")} 
          className="w-full p-2 mt-4 mb-4  border-gray-300 border-[1px] rounded-lg  bg-transparent transition ease-in-out delay-150 hover:border-gray-700 duration-300 "
          placeholder="jane.doe@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="mensagem"
          className="text-base font-semibold text-justify"
        >
          Mensagem:
        </label>
        <textarea
          spellCheck={false}
          {...register("mensagem")} 
          className="w-full  leading-relaxed placeholder:text-gray-400 focus:ring-0 p-2 mt-4 mb-4  border-gray-300 border-[1px] rounded-lg  bg-transparent transition ease-in-out delay-150 hover:border-gray-700 duration-300"
          placeholder="Deixe sua mensagem aqui..."
        />
      </div>

      <button
        type="submit"
        className="inline-block self-end rounded-xl border px-8 py-4 transition-colors hover:border-gray-300 border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30  dark:border-neutral-700"
        disabled={isSubmitting}
      >
        Enviar
      </button>
    </form>
  );
}
