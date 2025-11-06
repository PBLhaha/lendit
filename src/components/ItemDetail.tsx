import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { ArrowLeft, QrCode, MapPin, User as UserIcon, Calendar, Package } from 'lucide-react';
import type { User } from '../App';
import { mockItems } from './mockData';
import { toast } from 'sonner@2.0.3';

type ItemDetailProps = {
  user: User;
  itemId: string;
  onBack: () => void;
};

export function ItemDetail({ user, itemId, onBack }: ItemDetailProps) {
  const [returnDate, setReturnDate] = useState('');
  const [showQR, setShowQR] = useState(false);
  
  const item = mockItems.find(i => i.id === itemId);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="size-4 mr-2" />
          Back
        </Button>
        <div className="text-center mt-8">Item not found</div>
      </div>
    );
  }

  const isOwner = item.ownerId === user.id;
  const isBorrower = item.borrowedBy === user.id;

  const handleBorrowRequest = () => {
    if (!returnDate) {
      toast.error('Please select a return date');
      return;
    }
    toast.success('Borrow request sent! The owner will be notified.');
    setTimeout(() => onBack(), 1500);
  };

  const handleReturn = () => {
    toast.success('Item marked as returned. Thank you for being responsible!');
    setTimeout(() => onBack(), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="size-4 mr-2" />
          Back
        </Button>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">{item.name}</CardTitle>
                <div className="flex gap-2">
                  <Badge>{item.category}</Badge>
                  <Badge 
                    variant={
                      item.status === 'available' ? 'default' : 
                      item.status === 'borrowed' ? 'secondary' : 
                      'outline'
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
              {isOwner && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowQR(!showQR)}
                >
                  <QrCode className="size-4 mr-2" />
                  {showQR ? 'Hide' : 'Show'} QR
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* QR Code Display */}
            {showQR && isOwner && (
              <div className="bg-white border rounded-lg p-6 text-center">
                <div className="inline-block p-4 bg-gray-100 rounded-lg">
                  <QrCode className="size-32 mx-auto text-gray-400" />
                  <div className="mt-2 text-sm text-gray-600">{item.qrCode}</div>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Scan this QR code to track borrowing
                </p>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="mb-2">Description</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>

            {/* Owner Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <UserIcon className="size-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">Owner</div>
                  <div>{item.ownerName}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="size-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">Location</div>
                  <div>Room {item.ownerRoom}</div>
                </div>
              </div>
            </div>

            {/* Borrowed Info */}
            {item.status === 'borrowed' && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="size-5 text-orange-600" />
                  <span>Currently Borrowed</span>
                </div>
                <div className="text-sm text-gray-600">
                  <div>Borrowed on: {new Date(item.borrowedAt!).toLocaleDateString()}</div>
                  <div>Return by: {new Date(item.returnBy!).toLocaleDateString()}</div>
                </div>
              </div>
            )}

            {/* Actions */}
            {!isOwner && item.status === 'available' && (
              <div className="border-t pt-6">
                <h3 className="mb-4">Request to Borrow</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="returnDate">When will you return it?</Label>
                    <Input 
                      id="returnDate"
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <Button onClick={handleBorrowRequest} className="w-full">
                    Send Borrow Request
                  </Button>
                </div>
              </div>
            )}

            {isBorrower && item.status === 'borrowed' && (
              <div className="border-t pt-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="size-5 text-blue-600 mt-0.5" />
                    <div>
                      <div>You borrowed this item</div>
                      <div className="text-sm text-gray-600">
                        Please return by {new Date(item.returnBy!).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <Button onClick={handleReturn} className="w-full">
                  Mark as Returned
                </Button>
              </div>
            )}

            {isOwner && (
              <div className="border-t pt-6 text-center text-gray-500">
                This is your item. Manage it from "My Items" section.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
