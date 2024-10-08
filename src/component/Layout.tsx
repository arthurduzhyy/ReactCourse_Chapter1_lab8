import { FC, ReactNode } from 'react'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="container my-4">
    <div className="row justify-content-center">
      <div className="col-lg-6 col-md-8 col-12">
        {children}
      </div>
    </div>
  </div>
}

export default Layout