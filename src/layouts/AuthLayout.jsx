import { Outlet } from "react-router"

const AuthLayout = () => {
  return (
    <section className="h-screen">
        <div className="h-full">

            <div className="flex h-full">
                <div className="h-screen w-1/2 bg-accent ">
                    
                </div>

                <div className="mb-12 w-1/2 flex items-center justify-center">
                    <Outlet/>
                </div>
            </div>
        </div>
    </section>

  )
}

export default AuthLayout