import { useState } from 'react';
import { Order } from '../../types/Order';
import { api } from '../../utils/api';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';
import { toast } from 'react-toastify';

interface OrdersBoard{
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
}

export function OrdersBoard(props: OrdersBoard) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order){
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal(){
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleCancelOrder(){
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 3000));
    await api.delete(`/orders/${selectedOrder?._id}`);

    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado`);
    props.onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  return (
    <>
      <Board>
        <OrderModal
          visible={isModalVisible}
          order={selectedOrder}
          onClose={handleCloseModal}
          onCancelOrder={handleCancelOrder}
          isLoading={isLoading}
        />
        <header>
          <span>{props.icon}</span>
          <strong>{props.title}</strong>
          <span>({props.orders.length})</span>
        </header>

        {props.orders.length > 0 && (
          <OrdersContainer>
            {props.orders.map((order) => (
              <button type="button" key={order._id} onClick={() => handleOpenModal(order)}>
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
