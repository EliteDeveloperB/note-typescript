export type NoteData = {
    title:string
    markdown:string
    tags:Tag[]
}
export type Tag = {
    id:string
    label:string
}
export type Note = {
    id:string
}&NoteData
export type RowNotesData ={
    title:string
    markdown:string
    tagIds:string[]
}
export type RowNotes ={
id:string
}&RowNotesData