import { useMemo, useState,} from "react"
import CreatableSelect from "react-select/creatable"
import type{ Tag } from "../type/type";
import { useAppNoteContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import CartNote from "../component/CartNote";
import EditTagModle from "../component/EditTagModle";

function ListNote() {
       const [selectedTag,setSelectedTag] = useState<Tag[]>([])
    const {tags,notes} = useAppNoteContext()
    const [title,setTitle]= useState("")
    const filterNotes = useMemo(()=>{
        return notes.filter(note =>{
           return (
               (title === "" || note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()))&&
               (selectedTag.length === 0 || selectedTag.every(tag => note.tags.some((noteTags)=> noteTags.id == tag.id)))

           )
        })
    },[title,selectedTag,tags])
    const [isOpen,setIsOpen]=useState<boolean>(false)
  return (
    <div className="spyce-y-6 bg-slate-50 p-8 rounded-lg shadow-md">
    <div className="flex justify-between items-center">
       <h1 className="text-3xl font-bold py-8">Notes</h1>
       <div className=" relative flex gap-4">
        <Link to="/new">
        <button className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium shadow-md">Create</button>
        </Link>
        <button onClick={()=> setIsOpen(true)}
        className="px-4 py-2 bg-white rounded-md border border-slate-300 font-medium text-slate-800 shadow-md">Edit tags</button>
        {isOpen && (
            <EditTagModle onClose={()=> setIsOpen(false)} />
        )}
       </div>
    </div>
         <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
           
            <div className="flex flex-col gap-2">
                <label
                className="text-md font-medium text-slate-800" htmlFor="">Title</label>
                <input 
                value={title}
                required
               onChange={(e)=> setTitle(e.target.value) }
                className="w-full border border-slate-300 bg-white px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 foucus:border-blue-600"
                type="text" />
            </div>
                <div className="flex flex-col gap-2">
                <label
                className="text-md font-medium text-slate-800" htmlFor="">Tags</label>
                <CreatableSelect
                value={selectedTag.map(tag =>{
                    return {label:tag.label,value:tag.id}
                })}
                options={tags.map(tag =>{
                    return {label:tag.label,value:tag.id}
                })}
               onChange={tags =>{
                setSelectedTag(tags.map(tag =>
                    {
                    return {label:tag.label,id:tag.value}
                }))
               }}
                required
                isMulti 
               />
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
        {filterNotes.map(note => (
            <Link to={`/${note.id}`} key={note.id}>
            <CartNote title={note.title} tags={note.tags}/>
            </Link>

        ))}
</div>

    </div>
  )
}

export default ListNote