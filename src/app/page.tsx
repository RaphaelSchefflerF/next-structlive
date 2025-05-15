'use client';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md shadow-xl rounded-xl bg-white p-8 border border-gray-200">
        <div className="flex flex-col items-center gap-6">
          {/* Logo ou Título */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              StructLive
            </h1>
            <p className="text-gray-500 text-sm">Faça login para continuar</p>
          </div>

          {/* Imagem ilustrativa opcional */}
          <div className="relative w-16 h-16 mb-4">
            <Image
              src="/assets/Logo_colorida.png"
              alt="StructLive Logo"
              width={500}
              height={500}
            />
          </div>

          {/* Botão de Login Google */}
          <button
            type="button"
            className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-white hover:bg-gray-50
                      border border-gray-300 rounded-md shadow-sm transition-colors
                      text-gray-700 font-medium text-base"
            onClick={() => console.log('Login com Google')}
          >
            <FcGoogle className="h-5 w-5" />
            Entrar com Google
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} Estruturas de Dados. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  );
}
