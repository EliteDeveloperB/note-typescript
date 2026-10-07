import { createContext, useContext, useMemo } from "react";
import type { Note, NoteData, RowNotes, Tag } from "../type/type";
import { useLocalStorage } from "../localStorage/useLocalStorage";
import {v4 as uuidV4} from "uuid"
interface IAppNoteProvider{
  children:React.ReactNode
}
interface IAppNoteContext{
  notes:Note[]
  tags:Tag[]
  createNotes:(data:NoteData)=>void;
  AddTags:(tag:Tag) => void;
  ubdateNote:(id:string,data:NoteData) =>void
  deleteNote:(id:string)=>void
  deleteTag:(id:string)=>void
   updateTag:(id:string,label:string)=>void
}

export const AppNoteContext = createContext({}as IAppNoteContext);
export const useAppNoteContext = ()=>{
 return useContext(AppNoteContext);
}

export function AppNoteProvider({children}:IAppNoteProvider){
  const [notes,setNotes]= useLocalStorage<RowNotes[]>("Notes",[]);
  const [tags,setTags]= useLocalStorage<Tag[]>("Tags",[]);

const NoteWithTag = useMemo(()=>{
  return notes.map(note =>{
    return {...note,tags:tags.filter(tag => note.tagIds.includes(tag.id))}
  })
},[notes,tags])
  function createNotes({tags,...data}:NoteData){
    setNotes(prev =>{
      return [...prev,{
        ...data,id:uuidV4(),tagIds:tags.map(tag => tag.id)
      }]
    })

  }
  function AddTags(tag:Tag){
    setTags(prev =>{
      return [...prev,tag]
    })

  }
  function ubdateNote(id:string,{tags,...data}:NoteData){
setNotes(prev =>{
  return prev.map(note =>{
    if(note.id === id){
      return {...note,...data,tagIds:tags.map(tag => tag.id )}
    }else{
      return note
    }
  })
})
  }
  function deleteNote(id:string){
    setNotes(prevNote =>{
      return prevNote.filter(note=> note.id !== id)
    })
  }
  function deleteTag(id:string){
    setTags(prev =>{
      return prev.filter(tag => tag.id !== id)
    })
  }
  function updateTag(id:string,label:string){
    setTags(prev =>{
      return prev.map(tag=>{
        if(tag.id === id){
          return {...tag,label}
        }else{
          return tag
        }
      })
    })

  }
  return(
    <AppNoteContext.Provider value={{notes:NoteWithTag,tags,
      createNotes,AddTags,ubdateNote,deleteNote,deleteTag, updateTag
    }}>
      {children}
    </AppNoteContext.Provider>
  )

}