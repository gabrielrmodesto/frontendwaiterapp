import { Board, OrdersContainer } from './styles';

interface OrdersBoard{
  icon: string;
  title: string;
}

export function OrdersBoard(props: OrdersBoard) {
  return (
    <>
      <Board>
        <header>
          <span>{props.icon}</span>
          <strong>{props.title}</strong>
          <span>(1)</span>
        </header>
        <OrdersContainer>
          <button type="button">
            <strong>Mesa 2</strong>
            <span>2 items</span>
          </button>
          <button type="button">
            <strong>Mesa 2</strong>
            <span>2 items</span>
          </button>
        </OrdersContainer>
      </Board>
    </>
  );
}
