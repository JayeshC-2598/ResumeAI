import React from 'react'
import { useDocumentsContext } from '../context/DocumentsContext'

function Editor() {
    const { tempDoc } = useDocumentsContext();
    console.log(tempDoc);
    return (
        <div className=''>
            <textarea name="embedd" id="2" cols="30" rows="10">{tempDoc.response}</textarea>
        </div>
    )
}

export default Editor