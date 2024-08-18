import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import greenDot from "../assets/green-dot.svg"

const CrossChainActivity = () => {
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-white heading">Cross-Chain Activity</h3>
        <div className="d-flex align-items-center connected-chains">
        <img src={greenDot} alt="dot" className='me-1' />
          <span className="text-white">Connected Chains: <strong>66</strong></span>
        </div>
      </div>
      <div className="table-container row text-white p-3 rounded pt-0 pb-0">
        <div className="col-md-3 border-last p-lg-4 p-md-2">
        <p className="mb-2 text">Transactions</p>
          <h4 className="mb-2 number">2,328,766</h4>
          <div className='mb-1 d-flex justify-content-between align-items-center'>
          <p className="text">GMP: 1.74M </p>
          <p className='text'>Transfer: 587.52K</p>
          </div>
        </div>
        <div className="col-md-3 border-last p-lg-4 p-md-2">
        <p className="mb-2 text">Volume</p>
          <h4 className="mb-2 number">$9,503,741,757</h4>
          <div className='mb-1 d-flex justify-content-between align-items-center'>
          <p className="text">GMP: $2.65B</p>
          <p className='text'>Transfer: $6.85B</p>
          </div>
        </div>
        <div className="col-md-3 border-last p-lg-4 p-md-2">
        <p className="mb-2 text">Average Volume / Transaction</p>
          <h4 className="mb-2 number">$4,081</h4>
          <div className='mb-1 d-flex justify-content-between align-items-center'>

          <p className="text">GMP: $1.52K</p>
          <p className='text'>Transfer: $11.66K</p>
          </div>
        </div>
        <div className="col-md-3 p-lg-4 p-md-2">
        <p className="mb-2 text">GMP Contracts</p>
          <h4 className="mb-2 number">798</h4>
          
          <p className="text">Number of chains: 66</p>
        </div>
      </div>
    </div>
  );
};

export default CrossChainActivity;
