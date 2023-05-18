import { FastifyReply, FastifyRequest } from 'fastify'
import axios from 'axios'

import {
  GET_GITHUB_ACCESS_TOKEN_LINK,
  API_GITHUB_LINK,
} from '../../../constants/github'

import { registerSchema, userSchema } from './schemas'
import { prisma } from '../../../lib'

const register = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { code } = registerSchema.parse(request.body)

    const accessTokenResponse = await axios.post(
      GET_GITHUB_ACCESS_TOKEN_LINK,
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    )

    const { access_token } = accessTokenResponse.data

    const userResponse = await axios.get(`${API_GITHUB_LINK}/user`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const userInfo = userSchema.parse(userResponse.data)

    let user = await prisma.user.findUnique({
      where: {
        githubId: userInfo.id,
      },
    })

    const userData = {
      githubId: userInfo.id,
      name: userInfo.name,
      login: userInfo.login,
      avatarUrl: userInfo.avatar_url,
    }

    if (!user) {
      user = await prisma.user.create({
        data: userData,
      })
    }

    return reply.status(201).send({ user })
  } catch (error) {
    console.log(error)

    throw new Error('Error on register a user.')
  }
}

export { register }
