import { Button } from './ui/button';
import { Package, Users, Shield, QrCode, TrendingUp, Heart } from 'lucide-react';

type LandingProps = {
  onGetStarted: () => void;
  onLogin: () => void;
};

export function Landing({ onGetStarted, onLogin }: LandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Package className="size-8 text-blue-600" />
          <span className="text-2xl">Lendit</span>
        </div>
        <Button variant="outline" onClick={onLogin}>
          Login
        </Button>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Share, Borrow, Build Community
        </h1>
        <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
          The peer-to-peer lending platform that makes student life more affordable and connected. 
          Borrow what you need, lend what you don't.
        </p>
        <Button size="lg" onClick={onGetStarted} className="text-lg px-8 py-6">
          Get Started Free
        </Button>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl text-center mb-12">Why Choose Lendit?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Users className="size-10 text-blue-600" />}
            title="Promote Sharing Culture"
            description="Foster community and cooperation by enabling students to share everyday items instead of buying new ones."
          />
          <FeatureCard 
            icon={<TrendingUp className="size-10 text-green-600" />}
            title="Make Life Affordable"
            description="Reduce unnecessary expenses by borrowing books, chargers, utensils, or sports equipment occasionally."
          />
          <FeatureCard 
            icon={<Shield className="size-10 text-purple-600" />}
            title="Trustworthy Lending"
            description="Built-in trust scores, borrowing history, and QR tracking ensure accountability and build trust."
          />
          <FeatureCard 
            icon={<QrCode className="size-10 text-orange-600" />}
            title="QR Code Tracking"
            description="Scan QR codes for seamless item tracking. Know who borrowed what and when it's due back."
          />
          <FeatureCard 
            icon={<Heart className="size-10 text-red-600" />}
            title="Responsible Borrowing"
            description="Return reminders, borrower ratings, and trust scores encourage responsible habits."
          />
          <FeatureCard 
            icon={<Package className="size-10 text-indigo-600" />}
            title="Digital & Simple"
            description="Replace informal borrowing with a systematic app. List, request, lend, and return — all in one place."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl mb-4">Ready to Start Sharing?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of students already using Lendit in hostels across campus.
          </p>
          <Button size="lg" variant="secondary" onClick={onGetStarted} className="text-lg px-8 py-6">
            Create Your Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>© 2025 Lendit. Building trust, one item at a time.</p>
      </footer>
    </div>
  );
}

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
