/* eslint-disable react/prop-types */

const Container = ({children}) => {
  return (
    <div className=" w-[90%] md:w-[80%] mx-auto">
        {children}
    </div>
  )
}

export default Container