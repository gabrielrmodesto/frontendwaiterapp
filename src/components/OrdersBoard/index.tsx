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
  onChangeOrderStatus: (orderId: string, status: string) => void;
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

  async function handleChangeOrderStatus(){
    setIsLoading(true);

    const status = selectedOrder?.status === 'WAITING'
      ? 'IN_PRODUCTION'
      : 'DONE';

    await api.patch(`/orders/${selectedOrder?._id}`, {status});

    toast.success(`O pedido da mesa ${selectedOrder?.table} teve o status alterado`);
    props.onChangeOrderStatus(selectedOrder!._id, status);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  async function handleCancelOrder(){
    setIsLoading(true);
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
          onChangeStatusOrder={handleChangeOrderStatus}
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
