import foodImage from '../assets/food.webp'
import gymImage from '../assets/gym.webp'
import { Card } from '../components/card'

export function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-neutral-900">
      <div className="mt-10 space-y-7">
        <p className="text-center font-bold text-2xl text-white">
          DevFit<span className="ml-1 text-amber-300">.</span>
        </p>
        <div className="space-y-3">
          <h1 className="text-center font-bold text-2xl text-white tracking-wide md:text-4xl">
            Seu objetivo, <span className="text-amber-300 underline">nossa tecnologia.</span>
          </h1>
          <p className="text-center text-neutral-400 md:w-lg">
            Escolha por onde deseja começar sua transformação hoje. Geramos planos 100%
            personalizados com base no seu perfil
          </p>
        </div>
      </div>
      <main className="my-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card
          imageSrc={foodImage}
          title="Plano de Dieta"
          description="Receba um guia alimentar completo com macros calculados, receitas e substituições inteligentes para seu estilo de vida."
          url="/diet-form"
        />
        <Card
          imageSrc={gymImage}
          title="Plano de Treino"
          description="Treinos otimizados para seu nível de experiência e equipamentos disponíveis, focado em hipertrofia ou queima de gordura."
          url="/training-form"
        />
      </main>
    </div>
  )
}
