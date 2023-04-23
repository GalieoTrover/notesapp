import MDEditor, {commands} from "@uiw/react-md-editor";
import "../App.css";

function Editor({ currentNote, updateNote }) {

    return (
    <div className="container">
        <MDEditor value={currentNote.body} onChange={(value)=>updateNote(value)} tabSize={4} preview="edit" extraCommands={[commands.codeEdit]} />
        <div className="preview-window">
            <h5 className="preview-heading">Preview</h5>
            <MDEditor.Markdown source={currentNote.body} style={{ whiteSpace: 'pre-wrap' }}/>
        </div>
        </div>
    )
}

export default Editor;