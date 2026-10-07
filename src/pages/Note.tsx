import { Link, Navigate, useParams } from "react-router-dom"
import { useAppNoteContext } from "../context/AppContext"


function Note() {
  const {id} = useParams()
  const {notes,deleteNote}=useAppNoteContext()
  const note = notes.find(n => n.id === id)
  if(note == null)return <Navigate to ="/" replace />
  return (
    <div className=" bg-slate-50 p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-medium">{note?.title}</h1>
          {note?.tags.length >0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {note.tags.map(tag => (
                <span className="px-3 py-1 bg-blue-600 rounded text-white text-sm ">
                  {tag.label}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 ">
          <Link to={`/${note.id}/edit`}>
          <button className="text-md font-medium shadow-md px-3 py-1 bg-blue-600 text-white rounded-md">Edit</button>
          </Link>
          <button onClick={()=>{deleteNote(note.id) ,<Navigate to="/" />}}
           className="text-md font-medium shadow-md px-3 py-1 border border-red-600 hover:bg-red-600 text-red-600 hover:text-white rounded-md transition-colors">Delete</button>
          <Link to="/">
          <button className="text-md font-medium shadow-md px-3 py-1 border border-slate-300 text-slate-800 hover:bg-slate-600 hover:text-white rounded-md transition-colors">Back</button>
          </Link>
        </div>
      </div>
        <div className="w-1/2 mt-4">
        {note.markdown}
        </div>
    </div>
  )
}

export default Note