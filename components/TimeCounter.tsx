"use client"
import React, { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns';


const getTimeRun = () => {
    const timeDifferenceInSeconds = differenceInSeconds(new Date(),new Date('2023-11-04') )
    const days = Math.floor(timeDifferenceInSeconds / (24 * 60 * 60));
    const hours = Math.floor((timeDifferenceInSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeDifferenceInSeconds % (60 * 60)) / 60);
    const seconds = timeDifferenceInSeconds % 60;
    return {days,hours,minutes,seconds}
}

const TimeCounter = () => {
    const [timeRunObj, settimeRunObj] = useState(() => getTimeRun())

    useEffect(() => {
        const intervalId = setInterval(() => {
            settimeRunObj(getTimeRun());
        }, 1000);

        // 在组件卸载时清除定时器
        return () => clearInterval(intervalId);
    }, [])


    return (
        <div className='flex flex-col items-center justify-center text-sm font-semibold'>
            <h1>网站已经运行了</h1>
            <div className='flex' >
                <div className='mr-1'><span className='bg-green-300 dark:bg-dark' >{timeRunObj.days}</span>天 </div>
                <div className='mr-1'><span className='bg-green-300 dark:bg-dark' >{timeRunObj.hours}</span>小时 </div>
                <div className='mr-1'><span className='bg-green-300 dark:bg-dark' >{timeRunObj.minutes}</span>分钟 </div>
                <div className='mr-1'><span className='bg-green-300 dark:bg-dark' >{timeRunObj.seconds}</span>秒 </div>
            </div>
        </div>
    )
}

export default TimeCounter