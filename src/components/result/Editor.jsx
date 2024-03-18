// import { useMarkdownContext } from '../../context/MarkdownContext';

function Editor() {
    // const { markdown, setStateMarkdown } = useMarkdownContext();

    const HandleChange = (e) => {
        // console.log(setStateMarkdown);
        // setStateMarkdown(e.target.value);
    }
    return (
        <div className='flex-1'>
            {/* <textarea onChange={HandleChange} value={markdown} className='block w-full h-full bg-transparent outline-none border-none p-2 text-sm'></textarea> */}
        </div>
    )
}

export default Editor