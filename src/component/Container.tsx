interface IContainer{
  children:React.ReactNode
}

function Container({children}:IContainer) {
  return (
    <div className="container mx-auto lg:mx-24  p-8 ">
      {children}
    </div>
  )
}

export default Container