import Image from 'next/image'
import { User } from 'lucide-react'
import { GET_GITHUB_CODE_LINK } from '@/common/constants'

import nlwSpacetimeLogo from '@/common/assets/nlw-spacetime-logo.svg'
import { useUser } from '@/hooks'

const Profile = () => {
  const { getUser } = useUser()

  const { name, avatarUrl } = getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      {/* Section Avatar */}
      <Image
        src={avatarUrl}
        width={40}
        height={40}
        alt=""
        className="h-10 w-10 rounded-full"
      />

      <p className="max-w-[140px] text-sm leading-snug">
        {name}
        <a href="" className="block text-red-400 hover:text-red-300">
          Quero sair
        </a>
      </p>
    </div>
  )
}

const Home = () => {
  const { isAuthenticated } = useUser()

  return (
    <main className="grid min-h-screen grid-cols-2">
      {/* Section left */}
      <section className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
        {/* Section blur */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

        {/* Section Stripes */}
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

        {/* Section Profile - Sign in */}
        {isAuthenticated ? (
          <Profile />
        ) : (
          <a
            href={GET_GITHUB_CODE_LINK}
            className="flex items-center gap-3 text-left"
          >
            {/* Section Avatar */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
              <User className="h-5 w-5 text-gray-500" />
            </div>

            <p className="max-w-[140px] text-sm leading-snug transition-colors hover:text-gray-50">
              <span className="underline ">Crie sua conta</span> e salve suas
              memórias!
            </p>
          </a>
        )}

        {/* Section Hero */}
        <div className="space-y-5">
          {/* Section Logo */}
          <Image src={nlwSpacetimeLogo} alt="NLW Spacetime" />

          {/* Section Content */}
          <div className="max-w-[420px] space-y-4">
            <h1 className="text-5xl font-bold leading-tight text-gray-50">
              Sua cápsula do tempo
            </h1>

            <p className="text-lg leading-relaxed">
              Colecione momentos marcantes da sua jornada e compartilhe (se
              quiser) com o mundo!
            </p>
          </div>

          {/* Section Button */}
          <a
            href=""
            className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
          >
            CADASTRAR LEMBRANÇA
          </a>
        </div>

        {/* Section Copyright */}

        <div className="text-sm leading-relaxed text-gray-200 ">
          Feito com 💜 no NLW da{' '}
          <a
            href="https://rocketseat.com.br"
            target="_blank"
            className="underline transition-colors hover:text-gray-100"
            rel="noreferrer"
          >
            Rocketseat
          </a>
        </div>
      </section>

      {/* Section right */}
      <section className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
        <div className="flex flex-1 items-center justify-center">
          <p className="w-[360px] text-center leading-relaxed">
            Você ainda não registrou nenhuma lembrança, comece a{' '}
            <a
              href=""
              className="underline transition-colors hover:text-gray-50"
            >
              criar agora
            </a>
            !
          </p>
        </div>
      </section>
    </main>
  )
}

export default Home
