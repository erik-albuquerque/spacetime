import { User } from 'lucide-react'
import { GITHUB_SIGN_IN_URL } from '@/common/constants'

const EmptyProfile = () => {
  return (
    <a href={GITHUB_SIGN_IN_URL} className="flex items-center gap-3 text-left">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
        <User className="h-5 w-5 text-gray-500" />
      </div>

      <p className="max-w-[140px] text-sm leading-snug transition-colors hover:text-gray-50">
        <span className="underline ">Crie sua conta</span> e salve suas
        memórias!
      </p>
    </a>
  )
}

export { EmptyProfile }
