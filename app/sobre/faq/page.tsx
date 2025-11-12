import Faq from '@/components/sobre/Faq'
import Image from 'next/image'

const FaqPage = () => {
  return (
    <section className="flex flex-col lg:space-x-8 sm:space-x-0 lg:py-8">
      <h2 className="text-xl md:text-2xl font-bold text-center my-2  lg:mb-5 mx-auto">
        Perguntas e respostas
      </h2>

      <div className="flex flex-col gap-8 mx-auto">
        {/* Conteúdo principal */}
        <div className="flex-1">
          <div className="space-y-4">
            <Faq />
          </div>
        </div>

        {/* Imagem lateral */}
        <div className="lg:w-80 flex justify-center mx-auto">
          <div className="relative w-64 h-96 lg:w-80 lg:h-[500px]">
            <Image
              src="/images/used/lady-png.svg"
              alt="Ilustração de uma mulher chinesa a segurar um longo vestido e com o cabelo adornado de flores"
              priority
              fill
              className="object-contain hover:scale-105 transition-transform duration-300 dark:invert"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FaqPage
