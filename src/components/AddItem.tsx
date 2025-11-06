import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft } from 'lucide-react';
import type { User } from '../App';
import { toast } from 'sonner@2.0.3';

type AddItemProps = {
  user: User;
  onBack: () => void;
  onSuccess: () => void;
};

const categories = ['Electronics', 'Books', 'Sports', 'Kitchen', 'Appliances', 'Musical Instruments', 'Other'];

export function AddItem({ user, onBack, onSuccess }: AddItemProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.description) {
      toast.error('Please fill in all fields');
      return;
    }

    // In a real app, this would save to a database
    toast.success('Item listed successfully! Others can now borrow it.');
    setTimeout(() => onSuccess(), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="size-4 mr-2" />
          Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>List an Item</CardTitle>
            <CardDescription>
              Share something you own with the community. You'll be notified when someone wants to borrow it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Item Name *</Label>
                <Input 
                  id="name"
                  placeholder="e.g., iPhone Charger, Badminton Racket"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={formData.category}
                  onValueChange={(value) => setFormData({...formData, category: value})}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description"
                  placeholder="Describe the item's condition, any special notes, or usage instructions..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  required
                />
                <div className="text-sm text-gray-500 mt-1">
                  Be honest about the condition to build trust in the community
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="mb-2">How it works:</h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Your item will be visible to other students in your hostel</li>
                  <li>You'll receive notifications when someone requests to borrow it</li>
                  <li>You can accept or decline requests</li>
                  <li>A unique QR code will be generated for tracking</li>
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  List Item
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
