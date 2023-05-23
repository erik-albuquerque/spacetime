import Link from 'next/link'

const NewMemoryButton = () => {
  return (
    <Link
      href="/memories/new"
      className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
    >
      CADASTRAR LEMBRANÇA
    </Link>
  )
}

export { NewMemoryButton }
