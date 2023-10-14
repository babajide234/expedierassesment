import { ButtonLink } from "./ButtonLink"

const Hero = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative overflow-hidden ">
      <div className="absolute -z-10 top-0 -left-4 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -z-10 bottom-0 -left-10 w-72 h-72 bg-[#FFFD8C] rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob "></div>
      <div className="absolute -z-10 bottom-0 -right-10 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <h1 className="text-[5rem] font-bold text-neutral mb-2">Welcome to FakeAPIStore</h1>
        <p className="text-neutral text-2xl mb-5 ">Your one-stop shop for all things APIs!</p>
        <ButtonLink url="/products">Explore Products</ButtonLink>
    </div>
  )
}

export default Hero