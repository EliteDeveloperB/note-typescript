import { Route, Routes } from "react-router-dom";
import ListNote from "./pages/ListNote";
import NewNote from "./pages/NewNote";
import Container from "./component/Container";
import {AppNoteProvider } from "./context/AppContext";
import Note from "./pages/Note";
import EditNote from "./pages/EditNote";

function App() {
  return (
    <>
    <AppNoteProvider>
      <Container>
        <Routes>
          <Route path="/" element={<ListNote />} />
          <Route path="/new" element={<NewNote />} />
          <Route path="/:id">
          <Route index element={<Note />}/>
          <Route path="edit" element={<EditNote />}/>
          </Route>
        </Routes>
      </Container>

    </AppNoteProvider>

   
    </>
  );
}

export default App;
