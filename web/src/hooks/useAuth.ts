import { cookies } from 'next/headers'
import decode from 'jwt-decode'

type UserProps = {
  sub: string
  name: string
  avatarUrl: string
}

type useAuthProps = {
  getUser: () => UserProps
  isAuthenticated: boolean
  token?: string
}

const useAuth = (): useAuthProps => {
  const isAuthenticated = cookies().has('token')

  const token = cookies().get('token')?.value

  const getUser = (): UserProps => {
    if (!token) {
      throw new Error('Unauthenticated.')
    }

    const user: UserProps = decode(token)

    return user
  }

  return {
    getUser,
    isAuthenticated,
    token,
  }
}

export { useAuth }
