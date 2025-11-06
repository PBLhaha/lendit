import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Package, Calendar, User as UserIcon } from 'lucide-react';
import type { User } from '../App';

type HistoryItem = {
  id: string;
  itemName: string;
  category: string;
  otherPerson: string;
  otherPersonRoom: string;
  borrowedAt: string;
  returnedAt: string;
  status: 'completed' | 'returned-late' | 'active';
  type: 'borrowed' | 'lent';
};

type BorrowingHistoryProps = {
  user: User;
  onBack: () => void;
};

const mockHistory: HistoryItem[] = [
  {
    id: '1',
    itemName: 'Badminton Racket',
    category: 'Sports',
    otherPerson: 'Priya Patel',
    otherPersonRoom: '308',
    borrowedAt: '2025-10-20T10:00:00Z',
    returnedAt: '2025-10-25T15:30:00Z',
    status: 'completed',
    type: 'borrowed'
  },
  {
    id: '2',
    itemName: 'Data Structures Textbook',
    category: 'Books',
    otherPerson: 'John Smith',
    otherPersonRoom: '215',
    borrowedAt: '2025-10-15T09:00:00Z',
    returnedAt: '2025-10-22T18:00:00Z',
    status: 'completed',
    type: 'lent'
  },
  {
    id: '3',
    itemName: 'HDMI Cable',
    category: 'Electronics',
    otherPerson: 'Sarah Chen',
    otherPersonRoom: '405',
    borrowedAt: '2025-10-10T14:00:00Z',
    returnedAt: '2025-10-13T10:00:00Z',
    status: 'returned-late',
    type: 'borrowed'
  },
  {
    id: '4',
    itemName: 'Bluetooth Speaker',
    category: 'Electronics',
    otherPerson: 'Mike Johnson',
    otherPersonRoom: '102',
    borrowedAt: '2025-10-05T16:00:00Z',
    returnedAt: '2025-10-08T14:00:00Z',
    status: 'completed',
    type: 'lent'
  },
  {
    id: '5',
    itemName: 'Yoga Mat',
    category: 'Sports',
    otherPerson: 'Lisa Wang',
    otherPersonRoom: '512',
    borrowedAt: '2025-09-28T08:00:00Z',
    returnedAt: '2025-10-01T19:00:00Z',
    status: 'completed',
    type: 'borrowed'
  }
];

export function BorrowingHistory({ user, onBack }: BorrowingHistoryProps) {
  const [filter, setFilter] = useState<'all' | 'borrowed' | 'lent'>('all');

  const filteredHistory = mockHistory.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="size-4 mr-2" />
          Back to Dashboard
        </Button>

        <h1 className="text-2xl mb-6">Borrowing History</h1>

        <Tabs defaultValue="all" onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All ({mockHistory.length})</TabsTrigger>
            <TabsTrigger value="borrowed">
              I Borrowed ({mockHistory.filter(i => i.type === 'borrowed').length})
            </TabsTrigger>
            <TabsTrigger value="lent">
              I Lent ({mockHistory.filter(i => i.type === 'lent').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={filter}>
            {filteredHistory.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  No history yet. Start borrowing or lending to build your history!
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredHistory.map(item => (
                  <Card key={item.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg">{item.itemName}</h3>
                            <Badge variant="outline">{item.category}</Badge>
                            <Badge 
                              variant={
                                item.type === 'borrowed' ? 'default' : 'secondary'
                              }
                            >
                              {item.type === 'borrowed' ? 'Borrowed' : 'Lent'}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <UserIcon className="size-4" />
                              {item.type === 'borrowed' ? 'From' : 'To'}: {item.otherPerson} (Room {item.otherPersonRoom})
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="size-4" />
                              <div>
                                <div className="text-xs text-gray-500">Borrowed</div>
                                <div>{new Date(item.borrowedAt).toLocaleDateString()}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Package className="size-4" />
                              <div>
                                <div className="text-xs text-gray-500">Returned</div>
                                <div>{new Date(item.returnedAt).toLocaleDateString()}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          {item.status === 'completed' && (
                            <Badge variant="default" className="bg-green-600">
                              ✓ Completed
                            </Badge>
                          )}
                          {item.status === 'returned-late' && (
                            <Badge variant="destructive">
                              Returned Late
                            </Badge>
                          )}
                        </div>
                      </div>

                      {item.status === 'returned-late' && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                          This item was returned after the due date. Remember to return on time to maintain your trust score!
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Summary Stats */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-1">{mockHistory.length}</div>
                <div className="text-sm text-gray-600">Total Transactions</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl mb-1">
                  {mockHistory.filter(i => i.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600">On Time Returns</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl mb-1">
                  {Math.round((mockHistory.filter(i => i.status === 'completed').length / mockHistory.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
