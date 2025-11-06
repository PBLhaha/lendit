import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Package } from 'lucide-react';
import type { User } from '../App';

type AuthProps = {
  mode: 'login' | 'signup';
  onToggleMode: () => void;
  onLogin: (user: User) => void;
  onBack: () => void;
};

export function Auth({ mode, onToggleMode, onLogin, onBack }: AuthProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    hostel: '',
    room: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login/signup - in real app this would call an API
    const mockUser: User = {
      id: '1',
      name: mode === 'signup' ? formData.name : 'Demo User',
      email: formData.email,
      hostel: mode === 'signup' ? formData.hostel : 'North Wing',
      room: mode === 'signup' ? formData.room : '302',
      trustScore: 85,
      itemsLent: 12,
      itemsBorrowed: 8
    };

    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back
        </Button>

        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Package className="size-12 text-blue-600" />
            </div>
            <CardTitle>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</CardTitle>
            <CardDescription>
              {mode === 'login' 
                ? 'Login to continue sharing and borrowing' 
                : 'Join the Lendit community today'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="john@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>

              {mode === 'signup' && (
                <>
                  <div>
                    <Label htmlFor="hostel">Hostel</Label>
                    <Input 
                      id="hostel"
                      type="text"
                      placeholder="North Wing"
                      value={formData.hostel}
                      onChange={(e) => setFormData({...formData, hostel: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="room">Room Number</Label>
                    <Input 
                      id="room"
                      type="text"
                      placeholder="302"
                      value={formData.room}
                      onChange={(e) => setFormData({...formData, room: e.target.value})}
                      required
                    />
                  </div>
                </>
              )}

              <Button type="submit" className="w-full">
                {mode === 'login' ? 'Login' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={onToggleMode}
                className="text-blue-600 hover:underline"
              >
                {mode === 'login' ? 'Sign up' : 'Login'}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
