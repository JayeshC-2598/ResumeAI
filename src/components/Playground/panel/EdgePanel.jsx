import React, { useEffect, useState } from 'react';
import { useReactFlow } from 'reactflow';
import { useFlowchart } from '../../../context/FlowchartContext';
const EdgeAttributeExtractor = (edge) => {
    const { id, label, type, source, target, sourceHandle, targetHandle, ...other } = edge;
    return { id, label, type, source, target, sourceHandle, targetHandle, ...other };
}
const FormToAttributeExtractor = (form) => {
    const { id, label, type, source, target, sourceHandle, targetHandle, ...other } = form;
    return { id, label, type, source, target, sourceHandle, targetHandle, ...other };
}


function EdgePanel({edgeId}) {
    const { edges, SetEdges } = useFlowchart();
    const { getEdge } = useReactFlow();

    const [form, setForm] = useState(EdgeAttributeExtractor({ label: "" }));

    const edge = getEdge(edgeId);

    useEffect(() => {
        console.log("###Changess");
        if (edge != null)
            setForm(EdgeAttributeExtractor(edge));
    }, [edge.id])

    const HandleChange = (e) => {
        setForm(preForm => ({ ...preForm, [e.target.id]: e.target.value }))
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        const clonedEdges = [...edges];
        const indexOf = clonedEdges.findIndex((element) => element.id == edgeId);
        console.log(indexOf);
        if (indexOf != -1) {
            const thatEdge = clonedEdges[indexOf];
            const newData = FormToAttributeExtractor(form);
            console.log(newData);
            clonedEdges[indexOf] = {...thatEdge,...newData}
            SetEdges(clonedEdges)
        }
    }

    return (
        <div className='w-full bg-white px-4 py-2.5 rounded-md shadow-lg divide-y'>
            <h2 className='font-bold'>Edge</h2>
            <form className='text-xs' onSubmit={HandleSubmit}>
                <div className='mt-2'>
                    <label htmlFor="label" className="block mb-1 text-xs font-medium text-gray-900">Label</label>
                    <input type="text" id="label" className="block w-full p-1 px-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 outline-none" value={form.label||""} onChange={HandleChange} />
                </div>
                <div className='mt-2'>
                    <label htmlFor="label" className="block mb-1 text-xs font-medium text-gray-900">Type</label>
                    <select name="type" id="type" className='p-1 px-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 outline-none w-full' onChange={HandleChange} value={form.type}>
                        <option value="edge">Edge</option>
                        <option value="targetDirectedEdge">Target Directed Edge</option>
                        <option value="sourceDirectedEdge">Source Directed Edge</option>
                        <option value="biDirectionalEdge">BI Directed Edge</option>
                    </select>
                </div>
                <button className='bg-blue-500 px-2 py-1 text-white rounded-md mt-2 active:bg-blue-400 hover:bg-blue-600'>Submit</button>
            </form>
        </div>
    )
}

export default EdgePanel