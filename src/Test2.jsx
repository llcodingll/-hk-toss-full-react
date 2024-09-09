import { useState } from "react";

const Test2 = ()=>{
    const [txt, setTxt] = useState("")
    const [logs, setLogs] = useState([])
    const onChangeTxt = (e) => {
        setTxt(e.target.value)
        setLogs([...logs, e.target.value])
    }
    return <div>
        <input name="text" onChange={onChangeTxt} />
        {logs.map(str => <p>{str}</p>)}
    </div>
}

export default Test2;