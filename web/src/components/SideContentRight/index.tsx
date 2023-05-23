import { ReactNode, FC } from 'react'

type SideContentRightProps = {
  children: ReactNode
}

const SideContentRight: FC<SideContentRightProps> = ({
  children,
}: SideContentRightProps) => {
  return (
    <section className="flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover">
      {children}
    </section>
  )
}

export { SideContentRight }
