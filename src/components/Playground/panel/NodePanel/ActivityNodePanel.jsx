import React, { useEffect, useState } from 'react'
import { useReactFlow } from 'reactflow';
import { useFlowchart } from '../../../../context/FlowchartContext';


function ActivityNodePanel(node) {
    const [form, setForm] = useState({});
    const { getNode } = useReactFlow();
    const { nodes, SetNodes } = useFlowchart();


    useEffect(() => {
        if (node) {
            // const localForm = NodeAttributeExtractor(node);
            setForm(node);
        }
    }, [node.id,]);



    return (
        <div>
            <form className="max-w-sm mx-auto divide-y">
                <div className="mb-3">
                    <label htmlFor='label' className="block mb-1 text-sm font-medium text-gray-900">Lable</label>
                    <input type="text" id="label" name="label" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 py-1.5 pt-1 outline-none" placeholder="label.." value={form.label} />
                </div>
                <div className="mb-3">
                    <label htmlFor='type' className="block mb-1 text-sm font-medium text-gray-900">Type</label>
                    <select name="type" id="type" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 py-1.5 pt-1 outline-none'>
                        <option value="startActivityNode">Start Activity</option>
                        <option value="finalActivityNode">Final Activity Node</option>
                        <option value="activityNode">Activity Node</option>
                        <option value="finalFlowNode">Final Flow Node</option>
                        <option value="decisionNode">Decision Node</option>
                        <option value="noteNode">Note Node</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default ActivityNodePanel