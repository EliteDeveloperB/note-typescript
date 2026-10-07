import { useParams } from "react-router-dom"
import FormNote from "../component/FormNote"


function EditNote() {
  const {id} = useParams<{id:string}>()
    
  return (
      <div className=" flex flex-col  bg-slate-50 p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold py-8">Edit Note</h1>
    <FormNote id={id}/>

    </div>
  )
}

export default EditNote