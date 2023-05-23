import Image from 'next/image'

import nlwSpacetimeLogo from '@/common/assets/nlw-spacetime-logo.svg'

const Logo = () => {
  return <Image src={nlwSpacetimeLogo} alt="NLW Spacetime logo" />
}

export { Logo }
