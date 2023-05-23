import { Logo, NewMemoryButton } from '@/components'

const Hero = () => {
  return (
    <div className="space-y-5">
      <Logo />

      <div className="max-w-[420px] space-y-4">
        <h1 className="text-5xl font-bold leading-tight text-gray-50">
          Sua cápsula do tempo
        </h1>

        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>

      <NewMemoryButton />
    </div>
  )
}

export { Hero }
