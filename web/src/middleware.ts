import { NextRequest, NextResponse } from 'next/server'
import { GITHUB_SIGN_IN_URL } from '@/common/constants'

const middleware = (request: NextRequest) => {
  const token = request.cookies.get('token')?.value

  const urlUserTriedAccess = request.url

  if (!token) {
    return NextResponse.redirect(GITHUB_SIGN_IN_URL, {
      headers: {
        'Set-Cookie': `redirectTo=${urlUserTriedAccess}; Path=/; HttpOnly; max-age=20;`,
      },
    })
  }

  return NextResponse.next()
}

const config = {
  matcher: '/memories/:path*',
}

export { middleware, config }
