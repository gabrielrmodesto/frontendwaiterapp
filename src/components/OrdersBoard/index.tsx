import { useState } from 'react';
import { Order } from '../../types/Order';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';

interface OrdersBoard{
  icon: string;
  title: string;
  orders: Order[];
}

export function OrdersBoard(props: OrdersBoard) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleOpenModal(){
    setIsModalVisible(true);
  }

  return (
    <>
      <Board>
        <OrderModal visible={isModalVisible} />
        <header>
          <span>{props.icon}</span>
          <strong>{props.title}</strong>
          <span>({props.orders.length})</span>
        </header>

        {props.orders.length > 0 && (
          <OrdersContainer>
            {props.orders.map((order) => (
              <button type="button" key={order._id} onClick={handleOpenModal}>
                <strong>Mesa {order.table}</strong>
                <span>{order.products.length} items</span>
              </button>
            ))}
          </OrdersContainer>
        )}

      </Board>
    </>
  );
}
