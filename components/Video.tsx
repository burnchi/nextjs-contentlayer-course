import React from 'react'

const Video = ({url}) => {
  return (
    <div className='aspect-w-16 aspect-h-9'>
    <iframe
        src={`${url}&high_quality=1&as_wide=1&autoplay=1`}
        title='video player'
        className=''
        allowFullScreen={true}
        allow='autoplay;'
        sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups"
    ></iframe>
</div >
  )
}

export default Video