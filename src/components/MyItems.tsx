import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Package, QrCode, Check, X } from 'lucide-react';
import type { User } from '../App';
import { mockItems, mockBorrowRequests } from './mockData';
import { toast } from 'sonner@2.0.3';

type MyItemsProps = {
  user: User;
  onBack: () => void;
  onViewItem: (itemId: string) => void;
};

export function MyItems({ user, onBack, onViewItem }: MyItemsProps) {
  const myItems = mockItems.filter(item => item.ownerId === user.id);
  const pendingRequests = mockBorrowRequests.filter(req => req.ownerId === user.id && req.status === 'pending');

  const handleAcceptRequest = (requestId: string) => {
    toast.success('Request accepted! The borrower has been notified.');
  };

  const handleRejectRequest = (requestId: string) => {
    toast.error('Request declined.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="size-4 mr-2" />
          Back to Dashboard
        </Button>

        <h1 className="text-2xl mb-6">My Items</h1>

        <Tabs defaultValue="items">
          <TabsList className="mb-6">
            <TabsTrigger value="items">
              My Listings ({myItems.length})
            </TabsTrigger>
            <TabsTrigger value="requests">
              Requests ({pendingRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="items">
            {myItems.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Package className="size-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">You haven't listed any items yet</p>
                  <Button onClick={onBack}>List Your First Item</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {myItems.map(item => (
                  <Card key={item.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg">{item.name}</h3>
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
                          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                          
                          {item.status === 'borrowed' && (
                            <div className="bg-orange-50 border border-orange-200 rounded p-3 text-sm">
                              <div className="text-gray-600">
                                Currently borrowed • Return by: {new Date(item.returnBy!).toLocaleDateString()}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                            <QrCode className="size-4" />
                            QR: {item.qrCode}
                          </div>
                        </div>

                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onViewItem(item.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="requests">
            {pendingRequests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  No pending requests at the moment
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map(request => {
                  const item = mockItems.find(i => i.id === request.itemId);
                  return (
                    <Card key={request.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{request.itemName}</CardTitle>
                        <CardDescription>
                          Request from {request.borrowerName}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="text-sm text-gray-600">
                            <div>Requested: {new Date(request.requestedAt).toLocaleDateString()}</div>
                            {request.returnBy && (
                              <div>Return by: {new Date(request.returnBy).toLocaleDateString()}</div>
                            )}
                          </div>

                          <div className="flex gap-3">
                            <Button 
                              variant="default"
                              className="flex-1"
                              onClick={() => handleAcceptRequest(request.id)}
                            >
                              <Check className="size-4 mr-2" />
                              Accept
                            </Button>
                            <Button 
                              variant="outline"
                              className="flex-1"
                              onClick={() => handleRejectRequest(request.id)}
                            >
                              <X className="size-4 mr-2" />
                              Decline
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
