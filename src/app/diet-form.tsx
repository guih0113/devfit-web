import { zodResolver } from '@hookform/resolvers/zod'
import { Activity, LoaderCircle, Target, TrendingDown, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router'
import z from 'zod'
import { useCreateDietPlan } from '../http/use-create-diet-plan'

const dietPlanRequest = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  age: z
    .number({ message: 'Idade é obrigatória' })
    .positive('Idade deve ser um número positivo')
    .int('Idade deve ser um número inteiro'),
  height: z
    .number({ message: 'Altura é obrigatória' })
    .positive('Altura deve ser um número positivo')
    .min(50, 'Altura deve ser maior que 50cm')
    .max(250, 'Altura deve ser menor que 250cm'),
  weight: z
    .number({ message: 'Peso é obrigatório' })
    .positive('Peso deve ser um número positivo')
    .min(20, 'Peso deve ser maior que 20kg')
    .max(300, 'Peso deve ser menor que 300kg'),
  activityLevel: z.enum(['sedentary', '2/3x_week', '4x_week_or_+'], {
    message: 'Selecione um nível de atividade'
  }),
  gender: z.enum(['masculine', 'feminine'], { message: 'Selecione um gênero' }),
  objective: z.enum(['lose_weight', 'maintain_weight', 'gain_weight'], {
    message: 'Selecione um objetivo'
  })
})

type DietPlanRequestFormData = z.infer<typeof dietPlanRequest>

export function DietForm() {
  const [markdownContent, setMarkdownContent] = useState('')
  const [showForm, setShowForm] = useState(true)

  const { mutate, isPending } = useCreateDietPlan()

  function handleCreateDietPlan(data: DietPlanRequestFormData) {
    setMarkdownContent('')
    setShowForm(false)

    mutate(
      {
        data,
        onChunk: (chunk) => {
          setMarkdownContent((prev) => prev + chunk)
        }
      },
      {
        onSuccess: () => {
          console.log('Plano gerado com sucesso!')
        },
        onError: (error) => {
          console.error('Erro:', error)
          setShowForm(true)
        }
      }
    )
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<DietPlanRequestFormData>({
    resolver: zodResolver(dietPlanRequest)
  })

  return (
    <div className="flex min-h-screen w-full flex-col bg-neutral-900">
      <Link to="/" className="w-fit p-6 font-bold text-white text-xl sm:p-7 sm:text-2xl">
        DevFit<span className="ml-1 text-amber-300">.</span>
      </Link>

      <div className="flex justify-center px-4 pb-12 sm:pb-20">
        <div className="w-full max-w-2xl">
          <div className="mb-6 flex gap-2 sm:mb-8">
            <div className="h-1 flex-1 rounded bg-amber-300"></div>
            <div
              className={`h-1 flex-1 rounded ${showForm ? 'bg-neutral-700' : 'bg-amber-300'}`}
            ></div>
          </div>

          {showForm ? (
            <div className="rounded-lg bg-neutral-800 p-6 sm:p-8">
              <h1 className="mb-2 font-bold text-amber-300 text-xl sm:text-2xl">
                Questionário de Dieta
              </h1>
              <p className="mb-6 text-neutral-400 text-sm sm:mb-8">
                Personalize seu plano alimentar para alcançar seus objetivos de forma saudável.
              </p>

              <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
                <div className="col-span-2">
                  <label htmlFor="name" className="mb-2 block text-sm text-white">
                    Nome
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    placeholder="Seu Nome"
                    className={`w-full rounded bg-neutral-700 px-3 py-3 text-sm text-white outline-none focus:ring-2 sm:px-4 ${
                      errors.name ? 'ring-2 ring-red-500' : 'focus:ring-amber-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-500 text-xs">{errors.name.message}</p>
                  )}
                </div>
                <div className="col-span-1">
                  <label htmlFor="age" className="mb-2 block text-sm text-white">
                    Idade
                  </label>
                  <input
                    {...register('age', { valueAsNumber: true })}
                    type="number"
                    id="age"
                    placeholder="00"
                    className={`w-full rounded bg-neutral-700 px-3 py-3 text-sm text-white outline-none focus:ring-2 sm:px-4 ${
                      errors.age ? 'ring-2 ring-red-500' : 'focus:ring-amber-300'
                    }`}
                  />
                  {errors.age && <p className="mt-1 text-red-500 text-xs">{errors.age.message}</p>}
                </div>
                <div className="col-span-1">
                  <label htmlFor="weight" className="mb-2 block text-sm text-white">
                    Peso (kg)
                  </label>
                  <input
                    {...register('weight', { valueAsNumber: true })}
                    type="number"
                    id="weight"
                    placeholder="00"
                    className={`w-full rounded bg-neutral-700 px-3 py-3 text-sm text-white outline-none focus:ring-2 sm:px-4 ${
                      errors.weight ? 'ring-2 ring-red-500' : 'focus:ring-amber-300'
                    }`}
                  />
                  {errors.weight && (
                    <p className="mt-1 text-red-500 text-xs">{errors.weight.message}</p>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="height" className="mb-2 block text-sm text-white">
                    Altura (cm)
                  </label>
                  <input
                    {...register('height', { valueAsNumber: true })}
                    type="number"
                    id="height"
                    placeholder="000"
                    className={`w-full rounded bg-neutral-700 px-3 py-3 text-sm text-white outline-none focus:ring-2 sm:px-4 ${
                      errors.height ? 'ring-2 ring-red-500' : 'focus:ring-amber-300'
                    }`}
                  />
                  {errors.height && (
                    <p className="mt-1 text-red-500 text-xs">{errors.height.message}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <fieldset>
                  <legend className="mb-2 block text-sm text-white">Gênero</legend>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <label className="cursor-pointer">
                      <input
                        {...register('gender')}
                        type="radio"
                        value="masculine"
                        className="peer sr-only"
                      />
                      <div className="rounded bg-neutral-700 py-3 text-center text-sm text-white transition-colors hover:bg-amber-300 hover:text-neutral-950 peer-checked:bg-amber-300 peer-checked:text-neutral-900 peer-checked:ring-2 peer-checked:ring-amber-300">
                        Masculino
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        {...register('gender')}
                        type="radio"
                        value="feminine"
                        className="peer sr-only"
                      />
                      <div className="rounded bg-neutral-700 py-3 text-center text-sm text-white transition-colors hover:bg-amber-300 hover:text-neutral-950 peer-checked:bg-amber-300 peer-checked:text-neutral-900 peer-checked:ring-2 peer-checked:ring-amber-300">
                        Feminino
                      </div>
                    </label>
                  </div>
                  {errors.gender && (
                    <p className="mt-2 text-red-500 text-xs">{errors.gender.message}</p>
                  )}
                </fieldset>
              </div>

              <div className="mb-6">
                <fieldset>
                  <legend className="mb-2 block text-sm text-white">Objetivo</legend>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                    <label className="group cursor-pointer">
                      <input
                        {...register('objective')}
                        type="radio"
                        value="lose_weight"
                        className="peer sr-only"
                      />
                      <div className="flex flex-col items-center rounded border-2 border-transparent bg-neutral-700 p-4 text-center text-neutral-400 transition-colors group-hover:bg-amber-300 group-hover:text-neutral-900 peer-checked:bg-amber-300 peer-checked:text-neutral-900 peer-checked:ring-2 peer-checked:ring-amber-300">
                        <TrendingDown className="mb-2 h-7 w-7 sm:h-8 sm:w-8" />
                        <div className="mb-1 font-medium text-sm group-hover:text-neutral-900 peer-checked:text-neutral-900">
                          Perder Peso
                        </div>
                        <div className="text-xs opacity-70">Déficit calórico</div>
                      </div>
                    </label>

                    <label className="group cursor-pointer">
                      <input
                        {...register('objective')}
                        type="radio"
                        value="maintain_weight"
                        className="peer sr-only"
                      />
                      <div className="flex flex-col items-center rounded border-2 border-transparent bg-neutral-700 p-4 text-center text-neutral-400 transition-colors group-hover:bg-amber-300 group-hover:text-neutral-900 peer-checked:bg-amber-300 peer-checked:text-neutral-900 peer-checked:ring-2 peer-checked:ring-amber-300">
                        <Target className="mb-2 h-7 w-7 sm:h-8 sm:w-8" />
                        <div className="mb-1 font-medium text-sm group-hover:text-neutral-900 peer-checked:text-neutral-900">
                          Manter Peso
                        </div>
                        <div className="text-xs opacity-70">Equilíbrio calórico</div>
                      </div>
                    </label>

                    <label className="group cursor-pointer">
                      <input
                        {...register('objective')}
                        type="radio"
                        value="gain_weight"
                        className="peer sr-only"
                      />
                      <div className="flex flex-col items-center rounded border-2 border-transparent bg-neutral-700 p-4 text-center text-neutral-400 transition-colors group-hover:bg-amber-300 group-hover:text-neutral-900 peer-checked:bg-amber-300 peer-checked:text-neutral-900 peer-checked:ring-2 peer-checked:ring-amber-300">
                        <TrendingUp className="mb-2 h-7 w-7 sm:h-8 sm:w-8" />
                        <div className="mb-1 font-medium text-sm group-hover:text-neutral-900 peer-checked:text-neutral-900">
                          Ganhar Peso
                        </div>
                        <div className="text-xs opacity-70">Superávit calórico</div>
                      </div>
                    </label>
                  </div>
                  {errors.objective && (
                    <p className="mt-2 text-red-500 text-xs">{errors.objective.message}</p>
                  )}
                </fieldset>
              </div>

              <div className="mb-6 sm:mb-8">
                <fieldset>
                  <legend className="mb-2 block text-sm text-white">
                    Nível de Atividade Física
                  </legend>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                    <label className="group cursor-pointer">
                      <input
                        {...register('activityLevel')}
                        type="radio"
                        value="sedentary"
                        className="peer sr-only"
                      />
                      <div className="flex flex-col items-center rounded border-2 border-transparent bg-neutral-700 p-4 text-center text-neutral-400 transition-colors group-hover:bg-neutral-600 peer-checked:bg-neutral-600 peer-checked:ring-2 peer-checked:ring-amber-300">
                        <Activity className="mb-2 h-7 w-7 sm:h-8 sm:w-8" />
                        <div className="mb-1 font-medium text-sm text-white">Sedentário</div>
                        <div className="text-xs opacity-70">Pouca ou nenhuma atividade</div>
                      </div>
                    </label>

                    <label className="group cursor-pointer">
                      <input
                        {...register('activityLevel')}
                        type="radio"
                        value="2/3x_week"
                        className="peer sr-only"
                      />
                      <div className="flex flex-col items-center rounded border-2 border-transparent bg-neutral-700 p-4 text-center text-neutral-400 transition-colors group-hover:bg-neutral-600 peer-checked:bg-neutral-600 peer-checked:ring-2 peer-checked:ring-amber-300">
                        <Activity className="mb-2 h-7 w-7 sm:h-8 sm:w-8" />
                        <div className="mb-1 font-medium text-sm text-white">Moderado</div>
                        <div className="text-xs opacity-70">2-3x por semana</div>
                      </div>
                    </label>

                    <label className="group cursor-pointer">
                      <input
                        {...register('activityLevel')}
                        type="radio"
                        value="4x_week_or_+"
                        className="peer sr-only"
                      />
                      <div className="flex flex-col items-center rounded border-2 border-transparent bg-neutral-700 p-4 text-center text-neutral-400 transition-colors group-hover:bg-neutral-600 peer-checked:bg-neutral-600 peer-checked:ring-2 peer-checked:ring-amber-300">
                        <Activity className="mb-2 h-7 w-7 sm:h-8 sm:w-8" />
                        <div className="mb-1 font-medium text-sm text-white">Intenso</div>
                        <div className="text-xs opacity-70">4x ou mais por semana</div>
                      </div>
                    </label>
                  </div>
                  {errors.activityLevel && (
                    <p className="mt-2 text-red-500 text-xs">{errors.activityLevel.message}</p>
                  )}
                </fieldset>
              </div>

              <p className="mb-6 text-neutral-400 text-xs">
                Ao continuar, nosso algoritmo de IA processará seus dados para gerar um plano
                alimentar ideal.
              </p>

              <button
                onClick={handleSubmit(handleCreateDietPlan)}
                type="button"
                disabled={isPending}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-300 py-3 font-bold text-neutral-900 text-sm transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50 sm:py-4 sm:text-base"
              >
                {isPending ? 'Gerando...' : 'Gerar Meu Plano Alimentar'}
                <span>→</span>
              </button>
            </div>
          ) : (
            <div className="rounded-lg bg-neutral-800 p-6 sm:p-8">
              <h1 className="mb-6 font-bold text-amber-300 text-xl sm:text-2xl">
                Seu Plano Alimentar Personalizado
              </h1>

              <div className="prose prose-invert prose-amber max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="mt-6 mb-4 font-bold text-2xl text-amber-300" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="mt-5 mb-3 font-bold text-amber-300 text-xl" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="mt-4 mb-2 font-bold text-lg text-white" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="mb-4 text-neutral-300 leading-relaxed" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul
                        className="mb-4 list-inside list-disc space-y-2 text-neutral-300"
                        {...props}
                      />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol
                        className="mb-4 list-inside list-decimal space-y-2 text-neutral-300"
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }) => <li className="text-neutral-300" {...props} />,
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold text-amber-300" {...props} />
                    ),
                    em: ({ node, ...props }) => <em className="text-amber-200 italic" {...props} />,
                    code: ({ node, ...props }) => (
                      <code
                        className="rounded bg-neutral-700 px-2 py-1 text-amber-300 text-sm"
                        {...props}
                      />
                    )
                  }}
                >
                  {markdownContent}
                </ReactMarkdown>
              </div>

              <button
                onClick={() => setShowForm(true)}
                type="button"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-700 py-3 font-bold text-sm text-white transition-colors hover:bg-neutral-600 sm:py-4 sm:text-base"
              >
                {isPending ? (
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                ) : (
                  '← Criar Novo Plano'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
