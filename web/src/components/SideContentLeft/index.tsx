import {
  Blur,
  Copyright,
  EmptyProfile,
  Hero,
  Profile,
  Stripes,
} from '@/components'

import { useAuth } from '@/hooks'

const SideContentLeft = () => {
  const { isAuthenticated } = useAuth()

  return (
    <section className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
      <Blur />

      <Stripes />

      {isAuthenticated ? <Profile /> : <EmptyProfile />}

      <Hero />

      <Copyright />
    </section>
  )
}

export { SideContentLeft }
