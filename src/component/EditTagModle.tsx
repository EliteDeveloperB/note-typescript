import { X } from "lucide-react"
import { useAppNoteContext } from "../context/AppContext"
interface IEditTagModleProps{
    onClose:()=> void
}

function EditTagModle({onClose}:IEditTagModleProps) {
    const {tags,deleteTag, updateTag}= useAppNoteContext()
  return (
    <div className="absolute top-12 right-0  w-56 border border-slate-300 rounded-md z-50  shadow-md  bg-white p-2">
        <div className="flex justify-between items-center pb-2 border-b-2 border-slate-500">
            <h2 className="text-xl font-medium text-slate-700">EditTagModle</h2>
            <button onClick={onClose}><X className="text-slate-600"/></button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
            {tags.map(tag =>(
        <div key={tag.id} className=" flex justify-between items-center p-2 border border-slate-300 rounded-md shadow-sm ">
            <input onChange={(e)=> updateTag(tag.id, e.target.value)}
             className=" flex-1 text-sm text-slate-600 focus:outline-none font-medium" type="text " value={tag.label} />
            <button onClick={()=> deleteTag(tag.id)}
            className="w-5 h-5 bg-red-600 hover:bg-red-800 flex justify-center items-center text-xl text-white font-bold  rounded-md">
                <X />
                </button> 
        </div>

            ))}
        </div>
        <div className="flex justify-end mt-2 ">
        <button onClick={onClose} className="px-4 py-1 bg-green-700 hover:bg-green-800 text-white font-medium rounded-md">Close</button>
        </div>
    </div>
  )
}

export default EditTagModle