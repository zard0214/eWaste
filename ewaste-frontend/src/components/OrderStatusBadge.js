import React from 'react';
import { Badge } from 'antd';

const OrderStatusBadge = ({ status }) => {
  let color = 'default';
  let text = 'unknown';
  switch (status) {
    case 'COMPLETED':
      color = 'success';
      text = 'COMPLETED';
      break;
    case 'WIPING':
      color = 'processing';
      text = 'WIPING';
      break;
    case 'DISPATCHING':
      color = 'processing';
      text = 'DISPATCHING';
      break;
    case 'RETRIEVING':
      color = 'processing';
      text = 'RETRIEVED';
      break;
    case 'RECEIVED':
      color = 'processing';
      text = 'RECEIVED';
      break;
    case 'INITIALISED':
      color = 'default';
      text = 'INITIALISED';
      break;
    case 'CANCEL':
      color = 'error';
      text = 'CANCEL';
      break;
    case 'PAY_SUCCESS':
      color = 'processing';
      text = 'PAY SUCCESS';
      break;
    default:
      break;
  }

  // success | processing | default | error | warning

  return <Badge status={color} text={text} statusSize={20}/>;
};

export default OrderStatusBadge;
