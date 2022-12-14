import { Actions, ModalBody, OrderDetails, Overlay } from './styles';
import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';
interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
  onCancelOrder: () => Promise<void>;
  isLoading: boolean;
  onChangeStatusOrder: () => Promise<void>;
}

export function OrderModal({
  visible,
  order,
  onClose,
  onCancelOrder,
  isLoading,
  onChangeStatusOrder}: OrderModalProps) {
  if (!visible || !order) {
    return null;
  }

  const total = order.products.reduce((total, {product, quantity}) =>  {
    return total + (product.price * quantity);
  }, 0);

  return (
    <>
      <Overlay>
        <ModalBody>
          <header>
            <strong>Mesa 2</strong>
            <button type='button' onClick={onClose}>
              <img src={closeIcon} alt="Icone para fechar modal" />
            </button>
          </header>
          <div className="status-container">
            <small>Status do Pedido</small>
            <div>
              <span>
                {order.status === 'WAITING' && '⏰'}
                {order.status === 'IN_PRODUCTION' && '👨🏻‍🍳'}
                {order.status === 'DONE' && '✅'}
              </span>
              <strong>{order.status === 'WAITING' && 'File de Espera'}
                {order.status === 'IN_PRODUCTION' && 'Em andamento'}
                {order.status === 'DONE' && 'File de Espera'}</strong>
            </div>
          </div>
          <OrderDetails>
            <strong>Itens</strong>
            <div className="order-items">
              {order.products.map(({ _id, product, quantity }) => (
                <div className='item' key={_id}>
                  <img
                    src={`http://localhost:3001/uploads/${product.imagePath}`}
                    alt={product.name}
                    width="48"
                    height="40"
                  />
                  <span className="quantity">{quantity}x</span>
                  <div className="product-details">
                    <strong>{product.name}</strong>
                    <span>{formatCurrency(product.price)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className='total'>
              <span>Total</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
          </OrderDetails>

          <Actions>
            {order.status !== 'DONE' && (
              <button
                type='button'
                className='primary'
                disabled={isLoading}
                onClick={onChangeStatusOrder}
              >
                <span>
                  {order.status === 'WAITING' && '👨🏻‍🍳'}
                  {order.status === 'IN_PRODUCTION' && '✅'}
                </span>
                <strong>
                  {order.status === 'WAITING' && 'Iniciar Produção'}
                  {order.status === 'IN_PRODUCTION' && 'Concluir Pedido'}
                </strong>
              </button>
            )}
            <button
              type='button'
              className='secondary'
              onClick={onCancelOrder}
              disabled={isLoading}
            >
              Cancelar Pedido
            </button>
          </Actions>
        </ModalBody>
      </Overlay>
    </>
  );
}
