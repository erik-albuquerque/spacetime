import { twMerge } from 'tailwind-merge'

import clsx, { ClassValue } from 'clsx'

const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}
export { cn }
