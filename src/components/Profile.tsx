import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, User as UserIcon, MapPin, Award, TrendingUp, Package, CheckCircle, Clock } from 'lucide-react';
import type { User } from '../App';

type ProfileProps = {
  user: User;
  onBack: () => void;
};

export function Profile({ user, onBack }: ProfileProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="size-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="size-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl mb-1">{user.name}</h1>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="size-4" />
                  {user.hostel} • Room {user.room}
                </div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust Score */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="size-5 text-yellow-500" />
              <CardTitle>Trust Score</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-3xl">{user.trustScore}/100</span>
                  <Badge 
                    variant={user.trustScore >= 80 ? 'default' : 'secondary'}
                    className="self-start"
                  >
                    {user.trustScore >= 90 ? 'Excellent' : 
                     user.trustScore >= 80 ? 'Very Good' : 
                     user.trustScore >= 70 ? 'Good' : 'Fair'}
                  </Badge>
                </div>
                <Progress value={user.trustScore} className="h-3" />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                <h4 className="mb-2">How to improve your trust score:</h4>
                <ul className="space-y-1 text-gray-600 list-disc list-inside">
                  <li>Return items on time</li>
                  <li>Keep items in good condition</li>
                  <li>Be responsive to borrow requests</li>
                  <li>Build a positive borrowing history</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Stats */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Activity Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              <StatItem 
                icon={<Package className="size-8 text-blue-600" />}
                label="Items Listed"
                value={mockItemsCount(user.id)}
              />
              <StatItem 
                icon={<CheckCircle className="size-8 text-green-600" />}
                label="Items Lent"
                value={user.itemsLent}
              />
              <StatItem 
                icon={<Clock className="size-8 text-purple-600" />}
                label="Items Borrowed"
                value={user.itemsBorrowed}
              />
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <AchievementBadge 
                icon="🌟"
                title="First Lend"
                description="Listed your first item"
                unlocked={user.itemsLent > 0}
              />
              <AchievementBadge 
                icon="🤝"
                title="Community Helper"
                description="Lent 10+ items"
                unlocked={user.itemsLent >= 10}
              />
              <AchievementBadge 
                icon="⏰"
                title="On Time"
                description="Returned all items on time"
                unlocked={user.trustScore >= 85}
              />
              <AchievementBadge 
                icon="⭐"
                title="Trusted Member"
                description="Trust score above 80"
                unlocked={user.trustScore >= 80}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

type StatItemProps = {
  icon: React.ReactNode;
  label: string;
  value: number;
};

function StatItem({ icon, label, value }: StatItemProps) {
  return (
    <div className="text-center p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-center mb-2">{icon}</div>
      <div className="text-2xl mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

type AchievementBadgeProps = {
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
};

function AchievementBadge({ icon, title, description, unlocked }: AchievementBadgeProps) {
  return (
    <div className={`p-4 border rounded-lg ${unlocked ? 'bg-white' : 'bg-gray-50 opacity-50'}`}>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="mb-1">{title}</div>
      <div className="text-sm text-gray-600">{description}</div>
      {unlocked && (
        <Badge variant="default" className="mt-2">
          Unlocked
        </Badge>
      )}
    </div>
  );
}

function mockItemsCount(userId: string): number {
  // In real app, this would count from database
  return userId === '1' ? 3 : 0;
}
