import { FcGoogle } from 'react-icons/fc';

interface GoogleLoginButtonProps {
  onClick: () => void;
  className?: string;
}

export function GoogleLoginButton({
  onClick,
  className = '',
}: GoogleLoginButtonProps) {
  return (
    <button
      className={`flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-gray-50
                border border-gray-300 rounded-md shadow-sm transition-colors
                text-gray-700 font-medium text-base ${className}`}
      onClick={onClick}
    >
      <FcGoogle className="h-5 w-5" />
      Entrar com Google
    </button>
  );
}
