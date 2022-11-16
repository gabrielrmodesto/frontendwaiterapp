import { Order } from '../../types/Order';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';

const orders: Order[] = [
  {
    '_id': '63731316fb70521b8f7f3de0',
    'table': '1',
    'status': 'WAITING',
    'products': [
      {
        'product': {
          'name': 'Pizza Quatro Queijos',
          'imagePath': '1668484175527-quatro-queijos.png',
          'price': 40,
        },
        'quantity': 3,
        '_id': '63731316fb70521b8f7f3de1'
      },
      {
        'product': {
          'name': 'Coca cola',
          'imagePath': '1668484972759-coca-cola.png',
          'price': 7,
        },
        'quantity': 3,
        '_id': '63731316fb70521b8f7f3de2'
      }
    ],
  }
];


export function Orders() {
  return(
    <Container>
      <OrdersBoard
        icon="⏰"
        title="Fila de Espera"
        orders={orders}
      />
      <OrdersBoard
        icon="👨🏻‍🍳"
        title="Em preparação"
        orders={[]}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={[]}
      />
    </Container>
  );
}
