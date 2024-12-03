import React from 'react'

const PageHeader = ({title, image_url}) => {

  return (
    <div className='header-section' style={{ backgroundImage: `url(${image_url})`}}>
        <h1>{title}</h1>
    </div>
  )
}

export default PageHeader
 