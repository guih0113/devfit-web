import { zodResolver } from '@hookform/resolvers/zod'
import { Award, Dumbbell, LoaderCircle, Scale } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import z from 'zod'
import { FormResponse } from '../components/form-response'
import { useCreateTrainingPlan } from '../http/use-create-training-plan'

const trainingPlanRequest = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  age: z
    .number({ message: 'Idade é obrigatória' })
    .positive('Idade deve ser um número positivo')
    .int('Idade deve ser um número inteiro'),
  gender: z.enum(['masculine', 'feminine', 'other'], { message: 'Selecione um gênero' }),
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
  trainingGoal: z.enum(['muscle_gain', 'fat_loss', 'maintenance'], {
    message: 'Selecione um objetivo de treino'
  }),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced'], {
    message: 'Selecione um nível de experiência'
  }),
  trainingFrequency: z.enum(['3x_week', '4x_week', '5x_week'], {
    message: 'Selecione uma frequência semanal'
  }),
  availableEquipment: z.enum(['none', 'basic', 'full_gym'], {
    message: 'Selecione os equipamentos disponíveis'
  })
})

type TrainingPlanRequestFormData = z.infer<typeof trainingPlanRequest>

export function TrainingForm() {
  const [markdownContent, setMarkdownContent] = useState('')
  const [showForm, setShowForm] = useState(true)

  const { mutate, isPending } = useCreateTrainingPlan()

  function handleCreateTrainingPlan(data: TrainingPlanRequestFormData) {
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
  } = useForm<TrainingPlanRequestFormData>({
    resolver: zodResolver(trainingPlanRequest)
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
                Questionário de Treino
              </h1>
              <p className="mb-6 text-neutral-400 text-sm sm:mb-8">
                Personalize seu plano de exercícios para atingir seus objetivos mais rápido.
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
                  <legend className="mb-2 block text-sm text-white">Objetivo de Treino</legend>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                    <label className="group cursor-pointer">
                      <input
                        {...register('trainingGoal')}
                        type="radio"
                        value="muscle_gain"
                        className="peer sr-only"
                      />
                      <div className="flex flex-col items-center rounded border-2 border-transparent bg-neutral-700 p-4 text-center text-neutral-400 transition-colors group-hover:bg-amber-300 group-hover:text-neutral-900 peer-checked:bg-amber-300 peer-checked:text-neutral-900 peer-checked:ring-2 peer-checked:ring-amber-300">
                        <Dumbbell className="mb-2 h-7 w-7 sm:h-8 sm:w-8" />
                        <div className="mb-1 font-medium text-sm group-hover:text-neutral-900 peer-checked:text-neutral-900">
                          Ganho de Massa
                        </div>
                        <div className="text-xs opacity-70">Foco em hipertrofia muscular</div>
                      </div>
                    </label>

                    <label className="group cursor-pointer">
                      <input
                        {...register('trainingGoal')}
                        type="radio"
                        value="fat_loss"
                        className="peer sr-only"
                      />
                      <div className="flex flex-col items-center rounded border-2 border-transparent bg-neutral-700 p-4 text-center text-neutral-400 transition-colors group-hover:bg-amber-300 group-hover:text-neutral-900 peer-checked:bg-amber-300 peer-checked:text-neutral-900 peer-checked:ring-2 peer-checked:ring-amber-300">
                        <Scale className="mb-2 h-7 w-7 sm:h-8 sm:w-8" />
                        <div className="mb-1 font-medium text-sm group-hover:text-neutral-900 peer-checked:text-neutral-900">
                          Perda de Gordura
                        </div>
                        <div className="text-xs opacity-70">Foco em definição corporal</div>
                      </div>
                    </label>

                    <label className="group cursor-pointer">
                      <input
                        {...register('trainingGoal')}
                        type="radio"
                        value="maintenance"
                        className="peer sr-only"
                      />
                      <div className="flex flex-col items-center rounded border-2 border-transparent bg-neutral-700 p-4 text-center text-neutral-400 transition-colors group-hover:bg-amber-300 group-hover:text-neutral-900 peer-checked:bg-amber-300 peer-checked:text-neutral-900 peer-checked:ring-2 peer-checked:ring-amber-300">
                        <Award className="mb-2 h-7 w-7 sm:h-8 sm:w-8" />
                        <div className="mb-1 font-medium text-sm group-hover:text-neutral-900 peer-checked:text-neutral-900">
                          Manutenção
                        </div>
                        <div className="text-xs opacity-70">Saúde e qualidade de vida</div>
                      </div>
                    </label>
                  </div>
                  {errors.trainingGoal && (
                    <p className="mt-2 text-red-500 text-xs">{errors.trainingGoal.message}</p>
                  )}
                </fieldset>
              </div>

              <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="experience-level" className="mb-2 block text-sm text-white">
                    Nível de Experiência
                  </label>
                  <select
                    {...register('experienceLevel')}
                    id="experience-level"
                    className="w-full rounded bg-neutral-700 px-3 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-amber-300 sm:px-4"
                  >
                    <option value="beginner">Iniciante (Nunca treinei)</option>
                    <option value="intermediate">Intermediário</option>
                    <option value="advanced">Avançado</option>
                  </select>
                  {errors.experienceLevel && (
                    <p className="mt-1 text-red-500 text-xs">{errors.experienceLevel.message}</p>
                  )}
                </div>
                <div>
                  <fieldset>
                    <legend className="mb-2 block text-sm text-white">Frequência Semanal</legend>
                    <div className="grid grid-cols-3 gap-2">
                      <label className="group cursor-pointer">
                        <input
                          {...register('trainingFrequency')}
                          type="radio"
                          value="3x_week"
                          className="peer sr-only"
                        />
                        <div className="rounded bg-neutral-700 py-3 text-center text-sm text-white transition-colors group-hover:bg-amber-300 group-hover:text-neutral-900 peer-checked:bg-amber-300 peer-checked:text-neutral-900 peer-checked:ring-2 peer-checked:ring-amber-300">
                          3x
                        </div>
                      </label>
                      <label className="group cursor-pointer">
                        <input
                          {...register('trainingFrequency')}
                          type="radio"
                          value="4x_week"
                          className="peer sr-only"
                        />
                        <div className="rounded bg-neutral-700 py-3 text-center text-sm text-white transition-colors group-hover:bg-amber-300 group-hover:text-neutral-900 peer-checked:bg-amber-300 peer-checked:text-neutral-900 peer-checked:ring-2 peer-checked:ring-amber-300">
                          4x
                        </div>
                      </label>
                      <label className="group cursor-pointer">
                        <input
                          {...register('trainingFrequency')}
                          type="radio"
                          value="5x_week"
                          className="peer sr-only"
                        />
                        <div className="rounded bg-neutral-700 py-3 text-center text-sm text-white transition-colors group-hover:bg-amber-300 group-hover:text-neutral-900 peer-checked:bg-amber-300 peer-checked:text-neutral-900 peer-checked:ring-2 peer-checked:ring-amber-300">
                          5x
                        </div>
                      </label>
                    </div>
                    {errors.trainingFrequency && (
                      <p className="mt-2 text-red-500 text-xs">
                        {errors.trainingFrequency.message}
                      </p>
                    )}
                  </fieldset>
                </div>
              </div>

              <div className="mb-6 sm:mb-8">
                <fieldset>
                  <legend className="mb-2 block text-sm text-white">
                    Equipamentos Disponíveis
                  </legend>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                    <label className="group cursor-pointer">
                      <input
                        {...register('availableEquipment')}
                        type="radio"
                        value="none"
                        className="peer sr-only"
                      />
                      <div className="flex flex-col items-center rounded border-2 border-transparent bg-neutral-700 p-4 text-center text-neutral-400 transition-colors group-hover:bg-neutral-600 peer-checked:bg-neutral-600 peer-checked:ring-2 peer-checked:ring-amber-300">
                        <div className="mb-2 text-2xl sm:text-3xl">🚫</div>
                        <div className="mb-1 font-medium text-sm text-white">Nenhum</div>
                        <div className="text-xs opacity-70">Treino com peso corporal</div>
                      </div>
                    </label>

                    <label className="group cursor-pointer">
                      <input
                        {...register('availableEquipment')}
                        type="radio"
                        value="basic"
                        className="peer sr-only"
                      />
                      <div className="flex flex-col items-center rounded border-2 border-transparent bg-neutral-700 p-4 text-center text-neutral-400 transition-colors group-hover:bg-neutral-600 peer-checked:bg-neutral-600 peer-checked:ring-2 peer-checked:ring-amber-300">
                        <div className="mb-2 text-2xl sm:text-3xl">🏋️</div>
                        <div className="mb-1 font-medium text-sm text-white">Básico</div>
                        <div className="text-xs opacity-70">Halteres e elásticos</div>
                      </div>
                    </label>

                    <label className="group cursor-pointer">
                      <input
                        {...register('availableEquipment')}
                        type="radio"
                        value="full_gym"
                        className="peer sr-only"
                      />
                      <div className="flex flex-col items-center rounded border-2 border-transparent bg-neutral-700 p-4 text-center text-neutral-400 transition-colors group-hover:bg-neutral-600 peer-checked:bg-neutral-600 peer-checked:ring-2 peer-checked:ring-amber-300">
                        <div className="mb-2 text-2xl sm:text-3xl">💪</div>
                        <div className="mb-1 font-medium text-sm text-white">Academia Completa</div>
                        <div className="text-xs opacity-70">Acesso a todas máquinas</div>
                      </div>
                    </label>
                  </div>
                  {errors.availableEquipment && (
                    <p className="mt-2 text-red-500 text-xs">{errors.availableEquipment.message}</p>
                  )}
                </fieldset>
              </div>

              <p className="mb-6 text-neutral-400 text-xs">
                Ao continuar, nosso algoritmo de IA processará seus dados para gerar um treino
                ideal.
              </p>

              <button
                onClick={handleSubmit(handleCreateTrainingPlan)}
                type="button"
                disabled={isPending}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-300 py-3 font-bold text-neutral-900 text-sm transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50 sm:py-4 sm:text-base"
              >
                {isPending ? 'Gerando...' : 'Gerar Meu Treino'}
                <span>→</span>
              </button>
            </div>
          ) : (
            <div className="rounded-lg bg-neutral-800 p-6 sm:p-8">
              <h1 className="mb-6 font-bold text-amber-300 text-xl sm:text-2xl">
                Seu Plano de Treino Personalizado
              </h1>

              <div className="prose prose-invert prose-amber max-w-none">
                <FormResponse content={markdownContent} />
              </div>

              <Link
                to="/"
                type="button"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-700 py-3 font-bold text-sm text-white transition-colors hover:bg-neutral-600 sm:py-4 sm:text-base"
              >
                {isPending ? (
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                ) : (
                  '← Criar Novo Plano'
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
