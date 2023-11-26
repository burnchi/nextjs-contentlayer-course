import React from 'react'
import CopyButton from './CopyButton'

const Pre = ({ children,raw, ...props }) => {

    const lang = props['data-language']
    // console.log(raw);
    
    return (
        <pre {...props} className='flex flex-col'>
            {/* 标题 */}
            <div className='flex justify-between mb-2 px-2'>
                {lang}
                <CopyButton text={raw}></CopyButton>
            </div>
            {children}
        </pre>
    )
}

export default Pre