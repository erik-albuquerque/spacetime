import { cookies } from 'next/headers'
import decode from 'jwt-decode'

type UserProps = {
  sub: string
  name: string
  avatarUrl: string
}

type useUserProps = {
  getUser: () => UserProps
  isAuthenticated: boolean
}

const useUser = (): useUserProps => {
  const isAuthenticated = cookies().has('token')

  const getUser = (): UserProps => {
    const token = cookies().get('token')?.value

    if (!token) {
      throw new Error('Unauthenticated.')
    }

    const user: UserProps = decode(token)

    return user
  }

  return {
    getUser,
    isAuthenticated,
  }
}

export { useUser }
