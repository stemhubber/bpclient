import React from 'react'
import { Link } from 'react-router-dom'

const OrderManager = ({store, products}) => {
  return (
    <div><Link to={'/admin'}>Go order manager <i className='fa fa-arrow-right'></i></Link></div>
  )
}

export default OrderManager