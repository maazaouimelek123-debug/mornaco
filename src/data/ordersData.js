// Sample initial orders for Mornaco Admin Dashboard
export const INITIAL_ORDERS = [
  {
    id: 101,
    ref: '#MNC-101',
    date: new Date().toLocaleDateString('fr-FR'),
    time: '14:25',
    status: 'en attente',
    verified: true,
    total: 24.500,
    items: [
      { name: 'Cappuccino MORNACO', qty: 1, price: 15.000 },
      { name: 'Express Spécial', qty: 1, price: 5.500 },
      { name: 'Capucin', qty: 1, price: 4.000 },
    ],
  },
  {
    id: 102,
    ref: '#MNC-102',
    date: new Date().toLocaleDateString('fr-FR'),
    time: '14:38',
    status: 'en preparation',
    verified: true,
    total: 18.000,
    items: [
      { name: 'Café Turc MORNACO', qty: 1, price: 10.000 },
      { name: 'Café Latte Caramel', qty: 1, price: 8.000 },
    ],
  },
  {
    id: 103,
    ref: '#MNC-103',
    date: new Date().toLocaleDateString('fr-FR'),
    time: '14:50',
    status: 'pret',
    verified: false,
    total: 32.000,
    items: [
      { name: 'Chocolat Chaud MORNACO', qty: 2, price: 15.000 },
      { name: 'Verre de Lait', qty: 1, price: 2.000 },
    ],
  },
  {
    id: 104,
    ref: '#MNC-104',
    date: new Date().toLocaleDateString('fr-FR'),
    time: '15:10',
    status: 'servi',
    verified: true,
    total: 15.500,
    items: [
      { name: 'Express', qty: 2, price: 4.000 },
      { name: 'Américain Spécial', qty: 1, price: 7.500 },
    ],
  },
]
