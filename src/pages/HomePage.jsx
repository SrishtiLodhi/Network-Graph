import React from 'react'
import CrossChainActivity from '../components/CrossChainActivity'
import NetworkGraph from '../components/NetworkGraph'

const HomePage = () => {
  return (
    <div className='container'>
        <CrossChainActivity/>
        <NetworkGraph/>
    </div>
  )
}

export default HomePage