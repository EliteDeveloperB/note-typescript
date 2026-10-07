import FormNote from "../component/FormNote"



function NewNote() {
  return (
   
    <div className=" flex flex-col  bg-slate-50 p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold py-8">Create Note</h1>
    <FormNote />

    </div>
  )
}

export default NewNote