import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Package, Plus, Search, History, User, LogOut, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import type { User as UserType } from '../App';
import { mockItems, mockBorrowRequests } from './mockData';

type DashboardProps = {
  user: UserType;
  onNavigate: (view: 'browse' | 'addItem' | 'profile' | 'myItems' | 'history') => void;
  onViewItem: (itemId: string) => void;
  onLogout: () => void;
};

export function Dashboard({ user, onNavigate, onViewItem, onLogout }: DashboardProps) {
  const myItems = mockItems.filter(item => item.ownerId === user.id);
  const myBorrowedItems = mockItems.filter(item => item.borrowedBy === user.id);
  const pendingRequests = mockBorrowRequests.filter(req => req.ownerId === user.id && req.status === 'pending');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Package className="size-8 text-blue-600" />
            <span className="text-2xl">Lendit</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => onNavigate('profile')}>
              <User className="size-4 mr-2" />
              {user.name}
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="size-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-gray-600">{user.hostel} • Room {user.room}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={<TrendingUp className="size-6 text-green-600" />}
            label="Trust Score"
            value={user.trustScore}
            suffix="/100"
          />
          <StatCard 
            icon={<Package className="size-6 text-blue-600" />}
            label="Items Listed"
            value={myItems.length}
          />
          <StatCard 
            icon={<CheckCircle className="size-6 text-purple-600" />}
            label="Items Lent"
            value={user.itemsLent}
          />
          <StatCard 
            icon={<Clock className="size-6 text-orange-600" />}
            label="Items Borrowed"
            value={user.itemsBorrowed}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <ActionCard 
            icon={<Search className="size-6" />}
            title="Browse Items"
            description="Find items to borrow"
            onClick={() => onNavigate('browse')}
          />
          <ActionCard 
            icon={<Plus className="size-6" />}
            title="List an Item"
            description="Share something you own"
            onClick={() => onNavigate('addItem')}
          />
          <ActionCard 
            icon={<Package className="size-6" />}
            title="My Items"
            description="Manage your listings"
            onClick={() => onNavigate('myItems')}
          />
          <ActionCard 
            icon={<History className="size-6" />}
            title="History"
            description="View all transactions"
            onClick={() => onNavigate('history')}
          />
        </div>

        {/* Pending Requests Alert */}
        {pendingRequests.length > 0 && (
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
              <CardDescription>You have {pendingRequests.length} pending borrow request(s)</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => onNavigate('myItems')}>
                Review Requests
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Currently Borrowed Items */}
        {myBorrowedItems.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Currently Borrowed</CardTitle>
              <CardDescription>Items you need to return</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {myBorrowedItems.map(item => (
                  <div 
                    key={item.id} 
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={() => onViewItem(item.id)}
                  >
                    <div>
                      <div>{item.name}</div>
                      <div className="text-sm text-gray-600">Owner: {item.ownerName} • Room {item.ownerRoom}</div>
                    </div>
                    <div className="text-sm text-red-600">
                      Due: {new Date(item.returnBy!).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Items Available */}
        <Card>
          <CardHeader>
            <CardTitle>Recently Listed Items</CardTitle>
            <CardDescription>Fresh items available to borrow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockItems.filter(item => item.status === 'available').slice(0, 6).map(item => (
                <div 
                  key={item.id}
                  className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onViewItem(item.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3>{item.name}</h3>
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <div className="text-sm text-gray-500">
                    {item.ownerName} • Room {item.ownerRoom}
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => onNavigate('browse')}
            >
              View All Items
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
};

function StatCard({ icon, label, value, suffix = '' }: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <div className="text-2xl">{value}{suffix}</div>
            <div className="text-sm text-gray-600">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type ActionCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
};

function ActionCard({ icon, title, description, onClick }: ActionCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardContent className="pt-6">
        <div className="mb-3 text-blue-600">{icon}</div>
        <h3 className="mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
