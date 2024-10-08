import { FC, ReactNode } from 'react'

const Title: FC<{ children: ReactNode }> = ({ children }) => {
  return <h4 className="text-center my-4">{children}</h4>
}

export default Title