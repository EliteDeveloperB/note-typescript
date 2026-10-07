import type { Tag } from "../type/type"

interface ICartNoteProps{
    title:string
    tags:Tag[]
}

function CartNote({title,tags}:ICartNoteProps) {
  return (
    <div className="border border-slate-300 bg-white p-2 rounded-md 
    transiton-all hover:-translate-y-1 hover:shadow-md focus:-translate-y-1
    focus:shadow-md duration-200">
        <div className="flex flex-col justify-center items-center">
            <span className="text-xl font-medium text-slate-800">{title}</span>
            {tags.length > 0 && (
                <div className="flex flex-wrap justify-between items-center gap-2 mt-2">
            {tags.map(tag =>{
                return <span
                key={tag.id}
                className=" inline-block px-3 py-1 bg-blue-600 rounded-md text-white text-sm font-semibold max-w-24 translate"
                >{tag.label}</span>
            })}

            </div>
            )}

        </div>
        
        </div>
  )
}

export default CartNote