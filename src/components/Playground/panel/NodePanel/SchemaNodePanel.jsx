import React, { useEffect, useState } from 'react'
import { constraints, useFlowchart } from '../../../../context/FlowchartContext';
import { Listbox, Transition } from '@headlessui/react'
import { useReactFlow } from 'reactflow';
import toast from 'react-hot-toast';

const NodeAttributeExtractor = (node) => {
    const { id, data: { label, attributes, methods }, position: { x, y }, type, ...other } = node;
    return { id, label, attributes, methods, type, x, y, ...other };
}
const NodeAttributeConverter = (form) => {
    const { id, label, attributes, methods, x, y, type, ...other } = form;
    return { id, data: { label, attributes, methods }, type, ...other }
}

const initAttribute = {
    "id": "",
    'name': '',
    'constraint': ''
}

function SchemaNodePanel(node) {
    const [form, setForm] = useState(NodeAttributeExtractor(node));
    const [attributes, setAttributes] = useState([]);
    const { nodes, SetNodes } = useFlowchart();
    const { getNode } = useReactFlow();
    const [methods, setMethods] = useState([]);

    useEffect(() => {
        if (node) {
            const localForm = NodeAttributeExtractor(node);
            const { attributes: _attributes, methods: _methods } = localForm;
            setForm(localForm)
            setAttributes(_attributes);
            setMethods(_methods);
        }
    }, [node.id]);

    const HandleChange = (e) => setForm(previous => ({ ...previous, [e.target.name]: e.target.value }));

    const HandleAttributeNameChange = (AID, value) => {
        const clonedAttributes = [...attributes];
        const indexOf = clonedAttributes.findIndex((attribute) => attribute.id == AID)
        const element = clonedAttributes[indexOf];
        element.name = value;
        clonedAttributes[indexOf] = element;
        setAttributes(clonedAttributes);
    }
    const DeleteAttribute = (AID) => {
        const clonedAttributes = [...attributes];
        const indexOf = clonedAttributes.findIndex((attribute) => attribute.id == AID);
        clonedAttributes.splice(indexOf, 1);
        setAttributes(clonedAttributes);
    }
    const AddNewAttribute = () => {
        const clonedAttributes = [...attributes];
        const newElement = { ...initAttribute, id: `${node.id}A${attributes.length + 1}` };
        clonedAttributes.push(newElement);
        setAttributes(clonedAttributes);
    }
    const SetConstraints = (AID, value) => {
        const clonedAttributes = [...attributes];
        const indexOf = clonedAttributes.findIndex((attribute) => attribute.id == AID);
        const element = clonedAttributes[indexOf];
        element.constraint = value;
        setAttributes(clonedAttributes);
    }

    const HandleForm = (e) => {
        e.preventDefault();
        const cloneNodes = [...nodes];
        const indexOf = cloneNodes.findIndex((element) => element.id == form.id);
        const OldValues = getNode(node.id);
        if (indexOf != -1) {
            const newValue = NodeAttributeConverter({ ...form, attributes: [...attributes], methods: [...methods] });
            // console.log(newValue);
            cloneNodes[indexOf] = { ...OldValues, ...newValue };


            SetNodes(cloneNodes);
        } else {
            toast.error("Node not preosent")
        }
    }

    return (
        <div>
            <form className="max-w-sm mx-auto divide-y" onSubmit={HandleForm}>
                <div className="mb-3">
                    <label htmlFor='label' className="block mb-1 text-sm font-medium text-gray-900">Lable</label>
                    <input type="text" id="label" name="label" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 py-1.5 pt-1 outline-none" placeholder="label" value={form.label} onChange={HandleChange} />
                </div>
                <div className='mb-3'>
                    <div className="my-2 font-semibold flex">
                        <h4 className='flex-1'>Attributes</h4>
                        <button className='px-2 py-1 text-xs bg-blue-700 hover:bg-blue-800 focus:ring focus:ring-blue-300 font-medium rounded text-white' type="button" onClick={() => AddNewAttribute()}>
                            Add new
                        </button>
                    </div>
                    <div className=''>
                        {
                            attributes.map((attribute) => (
                                <div key={attribute.id} className='mb-1.5 flex gap-0.5'>
                                    <div className='bg-gray-50 border text-gray-900 text-xs rounded group border-gray-200 focus:border-blue-500 h-6 outline-none flex-1 flex items-center gap-1'>
                                        <Listbox as={"div"} className={"flex-0 relative"} value={attribute.constraint || "NULL"} onChange={(value) => SetConstraints(attribute.id, value)}>
                                            {({ open }) => (
                                                <>
                                                    <Listbox.Button className={`flex items-center ${open && 'bg-slate-300/50'}`}>
                                                        <span className='w-6 aspect-square grid place-content-center text-slate-600 rounded'>
                                                            {constraints[attribute.constraint || "NULL"].svg}
                                                            {/* {constraints[attribute.constraint || "NULL"].name} */}
                                                        </span>
                                                        <span className='h-4 border-l'></span>
                                                        {/* <span className='flex-1 text-left'>
                                                    {constraints[attribute.constraint || "NULL"].name}
                                                </span> */}
                                                        {/* <span className='text-slate-500 h-4 px-1 grid place-content-center border-l'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={8} height={8} viewBox="0 0 24 24"><path fill="currentColor" d="M5 7.75a.75.75 0 0 0-.53 1.28l7 7a.75.75 0 0 0 1.06 0l7-7A.75.75 0 0 0 19 7.75z"></path></svg>
                                                </span> */}
                                                    </Listbox.Button>
                                                    <Listbox.Options className={"absolute bottom-0 left-7 text-xs bg-slate-100 rounded border shadow-md z-20 w-full"}>
                                                        <Listbox.Option className={"text-slate-600 h-6 w-full grid place-content-center hover:bg-slate-200 cursor-pointer focus:border-blue-400"} key={"PK"} value="PK" title={"Primary Key"}>{constraints["PK"].svg}</Listbox.Option>
                                                        <Listbox.Option className={"text-slate-600 h-6 w-full grid place-content-center hover:bg-slate-200 cursor-pointer focus:border-blue-400"} key={"FK"} value="FK" title={"Foreign Key"}>{constraints["FK"].svg}</Listbox.Option>
                                                        <Listbox.Option className={"text-slate-600 h-6 w-full grid place-content-center hover:bg-slate-200 cursor-pointer focus:border-blue-400"} key={"UK"} value="UK" title={"Unique Key"}>{constraints["UK"].svg}</Listbox.Option>
                                                        <Listbox.Option className={"text-slate-600 h-6 w-full grid place-content-center hover:bg-slate-200 cursor-pointer focus:border-blue-400"} key={"NN"} value="NN" title={"Not Null"}>{constraints["NN"].svg}</Listbox.Option>
                                                        <Listbox.Option className={"text-slate-600 h-6 w-full grid place-content-center hover:bg-slate-200 cursor-pointer focus:border-blue-400"} key={"CK"} value="CK" title={"Check"}>{constraints["CK"].svg}</Listbox.Option>
                                                        <Listbox.Option className={"text-slate-600 h-6 w-full grid place-content-center hover:bg-slate-200 cursor-pointer focus:border-blue-400"} key={"NULL"} value="NULL" title={"No constraint"}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2M4 12c0-4.4 3.6-8 8-8c1.8 0 3.5.6 4.9 1.7L5.7 16.9C4.6 15.5 4 13.8 4 12m8 8c-1.8 0-3.5-.6-4.9-1.7L18.3 7.1C19.4 8.5 20 10.2 20 12c0 4.4-3.6 8-8 8"></path></svg>
                                                            {/* No constraint */}
                                                        </Listbox.Option>
                                                    </Listbox.Options>
                                                </>
                                            )}
                                        </Listbox>
                                        <input type="text" id="label" name="label" className="outline-none min-w-fit flex-1 h-5" placeholder="attribute" value={attribute.name} onChange={(e) => HandleAttributeNameChange(attribute.id, e.target.value)} />
                                    </div>
                                    <button className='rounded bg-white hover:bg-slate-100 active:bg-slate-100 text-red-500 aspect-square flex-0 grid place-content-center' type='button' onClick={() => DeleteAttribute(attribute.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24"><path fill="currentColor" d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8s8-3.582 8-8s-3.581-8-8-8m3.707 10.293a.999.999 0 1 1-1.414 1.414L12 13.414l-2.293 2.293a.997.997 0 0 1-1.414 0a.999.999 0 0 1 0-1.414L10.586 12L8.293 9.707a.999.999 0 1 1 1.414-1.414L12 10.586l2.293-2.293a.999.999 0 1 1 1.414 1.414L13.414 12z"></path></svg>
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {/* <div className="mb-5">
                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 py-1.5" required />
                </div>*/}
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs w-full px-3 py-1.5 text-center">Submit</button>
            </form>

        </div>
    )
}

export default SchemaNodePanel