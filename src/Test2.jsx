import { useState } from "react";

const Test2 = ()=>{
    const [txt, setTxt] = useState("")
    return <div>
        <input name="text" onChange={(e)=> setTxt(e.target.value)} />
    </div>
}

export default Test2;