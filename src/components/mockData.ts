import type { Item, BorrowRequest } from '../App';

export const mockItems: Item[] = [
  {
    id: '1',
    name: 'iPhone Charger',
    category: 'Electronics',
    description: 'Original Apple lightning cable and adapter. Works perfectly.',
    ownerId: '2',
    ownerName: 'Sarah Chen',
    ownerRoom: '405',
    status: 'available',
    qrCode: 'LENDIT-ITEM-001'
  },
  {
    id: '2',
    name: 'Data Structures Textbook',
    category: 'Books',
    description: 'Introduction to Algorithms by CLRS. Slight wear but all pages intact.',
    ownerId: '3',
    ownerName: 'Rahul Sharma',
    ownerRoom: '201',
    status: 'available',
    qrCode: 'LENDIT-ITEM-002'
  },
  {
    id: '3',
    name: 'Badminton Racket',
    category: 'Sports',
    description: 'Yonex racket with cover. Great condition.',
    ownerId: '4',
    ownerName: 'Priya Patel',
    ownerRoom: '308',
    status: 'borrowed',
    borrowedBy: '5',
    borrowedAt: '2025-10-28T10:00:00Z',
    returnBy: '2025-11-02T18:00:00Z',
    qrCode: 'LENDIT-ITEM-003'
  },
  {
    id: '4',
    name: 'USB-C Hub',
    category: 'Electronics',
    description: '7-in-1 hub with HDMI, USB 3.0, and card reader.',
    ownerId: '2',
    ownerName: 'Sarah Chen',
    ownerRoom: '405',
    status: 'available',
    qrCode: 'LENDIT-ITEM-004'
  },
  {
    id: '5',
    name: 'Electric Kettle',
    category: 'Kitchen',
    description: '1.5L capacity, barely used. Perfect for tea/coffee.',
    ownerId: '6',
    ownerName: 'Amit Kumar',
    ownerRoom: '156',
    status: 'available',
    qrCode: 'LENDIT-ITEM-005'
  },
  {
    id: '6',
    name: 'Guitar (Acoustic)',
    category: 'Musical Instruments',
    description: 'Yamaha F310. Great for beginners. Includes picks.',
    ownerId: '7',
    ownerName: 'David Lee',
    ownerRoom: '402',
    status: 'requested',
    qrCode: 'LENDIT-ITEM-006'
  },
  {
    id: '7',
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    description: 'JBL Flip 5. Waterproof, 12hr battery life.',
    ownerId: '3',
    ownerName: 'Rahul Sharma',
    ownerRoom: '201',
    status: 'available',
    qrCode: 'LENDIT-ITEM-007'
  },
  {
    id: '8',
    name: 'Iron Box',
    category: 'Appliances',
    description: 'Steam iron, works perfectly. Handle with care.',
    ownerId: '8',
    ownerName: 'Anjali Verma',
    ownerRoom: '510',
    status: 'available',
    qrCode: 'LENDIT-ITEM-008'
  }
];

export const mockBorrowRequests: BorrowRequest[] = [
  {
    id: '1',
    itemId: '6',
    itemName: 'Guitar (Acoustic)',
    borrowerId: '1',
    borrowerName: 'Demo User',
    ownerId: '7',
    status: 'pending',
    requestedAt: '2025-10-29T14:30:00Z'
  },
  {
    id: '2',
    itemId: '3',
    itemName: 'Badminton Racket',
    borrowerId: '5',
    borrowerName: 'John Smith',
    ownerId: '4',
    status: 'accepted',
    requestedAt: '2025-10-27T09:00:00Z',
    returnBy: '2025-11-02T18:00:00Z'
  }
];
