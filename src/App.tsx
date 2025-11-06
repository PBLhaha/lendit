import { useState } from 'react';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import { BrowseItems } from './components/BrowseItems';
import { AddItem } from './components/AddItem';
import { ItemDetail } from './components/ItemDetail';
import { Profile } from './components/Profile';
import { MyItems } from './components/MyItems';
import { BorrowingHistory } from './components/BorrowingHistory';
import { Auth } from './components/Auth';
import { Toaster } from 'sonner@2.0.3';

export type User = {
  id: string;
  name: string;
  email: string;
  hostel: string;
  room: string;
  trustScore: number;
  itemsLent: number;
  itemsBorrowed: number;
  avatar?: string;
};

export type Item = {
  id: string;
  name: string;
  category: string;
  description: string;
  ownerId: string;
  ownerName: string;
  ownerRoom: string;
  status: 'available' | 'borrowed' | 'requested';
  imageUrl?: string;
  qrCode?: string;
  borrowedBy?: string;
  borrowedAt?: string;
  returnBy?: string;
};

export type BorrowRequest = {
  id: string;
  itemId: string;
  itemName: string;
  borrowerId: string;
  borrowerName: string;
  ownerId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'returned';
  requestedAt: string;
  returnBy?: string;
};

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'dashboard' | 'browse' | 'addItem' | 'itemDetail' | 'profile' | 'myItems' | 'history'>('landing');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
  };

  const handleViewItem = (itemId: string) => {
    setSelectedItemId(itemId);
    setCurrentView('itemDetail');
  };

  const navigateTo = (view: typeof currentView) => {
    setCurrentView(view);
  };

  if (currentView === 'landing') {
    return (
      <Landing 
        onGetStarted={() => {
          setAuthMode('signup');
          setCurrentView('auth');
        }}
        onLogin={() => {
          setAuthMode('login');
          setCurrentView('auth');
        }}
      />
    );
  }

  if (currentView === 'auth') {
    return (
      <Auth 
        mode={authMode}
        onToggleMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
        onLogin={handleLogin}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Toaster />
      {currentView === 'dashboard' && (
        <Dashboard 
          user={currentUser}
          onNavigate={navigateTo}
          onViewItem={handleViewItem}
          onLogout={handleLogout}
        />
      )}
      {currentView === 'browse' && (
        <BrowseItems 
          user={currentUser}
          onBack={() => navigateTo('dashboard')}
          onViewItem={handleViewItem}
        />
      )}
      {currentView === 'addItem' && (
        <AddItem 
          user={currentUser}
          onBack={() => navigateTo('dashboard')}
          onSuccess={() => navigateTo('myItems')}
        />
      )}
      {currentView === 'itemDetail' && selectedItemId && (
        <ItemDetail 
          user={currentUser}
          itemId={selectedItemId}
          onBack={() => navigateTo('browse')}
        />
      )}
      {currentView === 'profile' && (
        <Profile 
          user={currentUser}
          onBack={() => navigateTo('dashboard')}
        />
      )}
      {currentView === 'myItems' && (
        <MyItems 
          user={currentUser}
          onBack={() => navigateTo('dashboard')}
          onViewItem={handleViewItem}
        />
      )}
      {currentView === 'history' && (
        <BorrowingHistory 
          user={currentUser}
          onBack={() => navigateTo('dashboard')}
        />
      )}
    </>
  );
}