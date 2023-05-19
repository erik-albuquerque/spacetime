import { NextRequest, NextResponse } from 'next/server'

const GET = async (request: NextRequest) => {
  const redirectURL = new URL('/', request.url)

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': 'token=; Path=/; max-age=0;',
    },
  })
}

export { GET }
