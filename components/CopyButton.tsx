"use client";
import React, { useState } from 'react'
import { MdContentCopy } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";

const CopyButton = ({ text }) => {
    const [isCopied, setIsCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);

        // 3秒后按钮内容复原
        setTimeout(() => {
            setIsCopied(false);
        }, 3000);
    };
    return (
        <button disabled={isCopied} onClick={copy} className="inline-block">
            {isCopied ?
                <CiCircleCheck size={24}/> :
                <MdContentCopy size={24}/>

            }

        </button>
    );
}

export default CopyButton