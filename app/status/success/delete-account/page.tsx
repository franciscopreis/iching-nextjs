import Image from 'next/image'
import Link from 'next/link'

// Página de sucesso ao apagar a conta
export default function DeleteAccountSuccess() {
  return (
    <div className="text-center space-y-6 px-5">
      {/* Título */}
      <div className="flex justify-center gap-3">
        <h1 className="md:text-3xl text-2xl font-bold ">Conta eliminada</h1>
      </div>

      <div className="relative w-full max-w-md aspect-square overflow-hidden rounded-lg justify-center items-center mx-auto">
        <Image
          src="/images/used/angry-bird.svg"
          alt="Descrição da imagem"
          fill
          className="object-container transition duration-300 dark:invert"
          priority
        />
      </div>

      {/* Texto */}
      <p className="text-gray-600 text-lg leading-relaxed text-justify">
        A tua conta foi eliminada permanentemente da base de dados. Todos os
        teus dados pessoais e leituras efetuadas foram removidos. Esperamos
        ver-te novamente no futuro!
      </p>

      {/* Botão */}
      <div className="">
        <Link
          href="/"
          className="inline-block hover:text-amber-500 border font-medium py-3 px-6 rounded-lg transition duration-200"
        >
          Ir para a Página Inicial
        </Link>
      </div>
    </div>
  )
}
