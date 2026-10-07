import { useRef, useState, type FormEvent } from "react"
import CreatableSelect from "react-select/creatable"
import {v4 as uuidV4} from "uuid"
import type{ Tag } from "../type/type";
import { useAppNoteContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";


function FormNote({id}:{ id?:string}) {
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate()
    const [selectedTag,setSelectedTag] = useState<Tag[]>([])
    const {tags,AddTags,createNotes,notes,ubdateNote} = useAppNoteContext()
    
    const currentNote = id ? notes.find(note => note.id === id):null
  

    function handelSubmit(e:FormEvent){
        e.preventDefault()
        if(id){
            ubdateNote(id,{
                   title:titleRef.current!.value,
                markdown:markdownRef.current!.value,
                tags:selectedTag
            })
        

        }else{
            createNotes({
                title:titleRef.current!.value,
                markdown:markdownRef.current!.value,
                tags:selectedTag
            })

        }

        navigate("/")

    }
  return (
    <form onSubmit={handelSubmit}>
        <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            <div className="flex flex-col gap-2">
                <label
                className="text-md font-medium text-slate-800" htmlFor="">Title</label>
                <input 
                required
                ref={titleRef}
                defaultValue={currentNote?.title || ""}
                className="w-full border border-slate-300 bg-white px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 foucus:border-blue-600"
                type="text" />
            </div>
                <div className="flex flex-col gap-2">
                <label
                className="text-md font-medium text-slate-800" htmlFor="">Tags</label>
                <CreatableSelect
                onCreateOption={label =>{
                    const NewTag = {id:uuidV4(),label}
                    AddTags(NewTag)
                   setSelectedTag(prev =>[...prev,NewTag])
                }}
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
            <div className="flex flex-col gap-2">
                <label
                className="text-md font-medium text-slate-800" htmlFor="">Body</label>
                <textarea rows={10}
                ref={markdownRef}
                defaultValue={currentNote?.markdown || ""}
                required
                className="w-full border border-slate-300 bg-white px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 foucus:border-blue-600"
                />
            </div>
            <div className="flex flex-start gap-4">
                <button
                type="submit"
                className="px-4 py-2 text-md border-none bg-blue-600 font-medium hover:bg-blue-700 text-white rounded-md">Save
                </button>
               <Link to="/">
                <button
                className="px-4 py-2 text-md border border-slate-300 font-medium rounded-md bg-white hover:bg-slate-700 hover:text-white">Cancel
                </button>
               </Link>
                
            </div>


        </div>
    </form>
  )
}

export default FormNote