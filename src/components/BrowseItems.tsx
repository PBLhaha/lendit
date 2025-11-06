import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, Search } from 'lucide-react';
import type { User } from '../App';
import { mockItems } from './mockData';

type BrowseItemsProps = {
  user: User;
  onBack: () => void;
  onViewItem: (itemId: string) => void;
};

const categories = ['All', 'Electronics', 'Books', 'Sports', 'Kitchen', 'Appliances', 'Musical Instruments'];

export function BrowseItems({ user, onBack, onViewItem }: BrowseItemsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const notMyItem = item.ownerId !== user.id;
    
    return matchesSearch && matchesCategory && notMyItem;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="size-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-2xl mb-4">Browse Items</h1>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input 
              placeholder="Search for items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </header>

      {/* Items Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 text-gray-600">
          {filteredItems.length} item(s) available
        </div>

        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              No items found. Try adjusting your search or filters.
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <Card 
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onViewItem(item.id)}
              >
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg">{item.name}</h3>
                    <Badge 
                      variant={item.status === 'available' ? 'default' : 'secondary'}
                    >
                      {item.status}
                    </Badge>
                  </div>

                  <Badge variant="outline" className="mb-3">
                    {item.category}
                  </Badge>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center pt-3 border-t">
                    <div>
                      <div className="text-sm">{item.ownerName}</div>
                      <div className="text-xs text-gray-500">Room {item.ownerRoom}</div>
                    </div>
                    <Button 
                      size="sm" 
                      disabled={item.status !== 'available'}
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewItem(item.id);
                      }}
                    >
                      {item.status === 'available' ? 'Borrow' : 'View'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
