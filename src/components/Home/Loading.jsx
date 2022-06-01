import React from 'react'
import { Image } from 'antd';
import ImageLoading from '../../images/loading.gif'

const Loading = () => {
  return (
    <div style={{display: 'flex', textAlign: 'center', margin: 'auto'}}>
        <Image width={50} src={ImageLoading}/>
    </div>
  )
}

export default Loading