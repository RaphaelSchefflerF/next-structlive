"use client";

import Image from "next/image";
import { GoogleLoginButton } from "@/components/google-login-button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status, router]);

  return (
    <div className='bg-gradient-to-br from-blue-50 to-indigo-100 flex min-h-svh flex-col items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-md shadow-xl rounded-xl bg-white p-8 border border-gray-200'>
        <div className='flex flex-col items-center gap-6'>
          {/* Logo ou Título */}
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-gray-800 mb-2'>
              StructLive
            </h1>
            <p className='text-gray-500 text-sm'>Faça login para continuar</p>
          </div>

          {/* Imagem ilustrativa opcional */}
          <div className='relative w-24 h-24 mb-4'>
            <Image
              src='/assets/Logo.png'
              alt='StructLive Logo'
              width={500}
              height={500}
            />
          </div>

          {/* Botão Google */}
          <GoogleLoginButton />
        </div>
      </div>

      <div className='mt-8 text-center text-sm text-gray-500'>
        <p>
          © {new Date().getFullYear()} Estruturas de Dados. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  );
}
