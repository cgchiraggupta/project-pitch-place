import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter, TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';
import QuoteRequestForm, { QuoteRequestData } from '@/components/QuoteRequestForm';
import QuoteCard from '@/components/QuoteCard';
import QuoteSubmissionModal from '@/components/QuoteSubmissionModal';
import MapDisplay from '@/components/MapDisplay';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'request'>('browse');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string>('');

  // Mock data for demonstration
  const [quoteRequests] = useState([
    {
      id: '1',
      projectType: 'conservatory',
      description: 'I want to build a 3x10 meter conservatory with a stone floor and heating, with sliding doors and wooden slats. Looking for high-quality materials and professional installation.',
      dimensions: '3x10 meters',
      materials: 'stone floor, wood, glass',
      timeline: '3-6months',
      budget: '30k-50k',
      location: 'Amsterdam, Netherlands',
      contactName: 'Sarah Johnson',
      contactPhone: '+31 6 1234 5678',
      contactEmail: 'sarah.johnson@email.com',
      contactWhatsApp: '+31 6 1234 5678',
      images: [],
      createdAt: new Date(2024, 0, 15),
      status: 'open' as const,
      quotesCount: 3
    },
    {
      id: '2',
      projectType: 'renovation',
      description: 'Complete kitchen renovation including new cabinets, countertops, flooring, and appliances. Modern design with island and breakfast bar.',
      dimensions: '4x5 meters',
      materials: 'quartz, oak, stainless steel',
      timeline: '1-3months',
      budget: '15k-30k',
      location: 'Utrecht, Netherlands',
      contactName: 'Mike Chen',
      contactPhone: '+31 6 9876 5432',
      contactEmail: 'mike.chen@email.com',
      contactWhatsApp: '+31 6 9876 5432',
      images: [],
      createdAt: new Date(2024, 0, 12),
      status: 'in-progress' as const,
      quotesCount: 7
    }
  ]);

  const handleQuoteRequest = (data: QuoteRequestData) => {
    console.log('New quote request:', data);
    // Here you would typically send the data to your backend
    setActiveTab('browse');
  };

  const handleSubmitQuote = (projectId: string) => {
    const project = quoteRequests.find(q => q.id === projectId);
    if (project) {
      setSelectedProjectId(projectId);
      setSelectedProjectTitle(`${project.projectType} Project - ${project.contactName}`);
      setShowQuoteModal(true);
    }
  };

  const handleContactCustomer = (projectId: string, method: 'phone' | 'email' | 'whatsapp') => {
    const project = quoteRequests.find(q => q.id === projectId);
    if (!project) return;

    switch (method) {
      case 'phone':
        window.open(`tel:${project.contactPhone}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:${project.contactEmail}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/${project.contactWhatsApp?.replace(/[^0-9]/g, '')}`, '_blank');
        break;
    }
  };

  const stats = [
    { icon: TrendingUp, label: 'Active Projects', value: '24', change: '+12%' },
    { icon: Users, label: 'Total Contractors', value: '156', change: '+8%' },
    { icon: Clock, label: 'Avg Response Time', value: '2.4h', change: '-15%' },
    { icon: CheckCircle, label: 'Completed Projects', value: '89', change: '+23%' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Connect with Professional Contractors
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Post your project and receive quotes from qualified contractors in your area. 
              From conservatories to complete renovations, find the right professional for your needs.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => setActiveTab('request')}
                className="shadow-elegant"
              >
                <Plus className="w-5 h-5 mr-2" />
                Request Quote
              </Button>
              <Button 
                variant="professional" 
                size="lg"
                onClick={() => setActiveTab('browse')}
              >
                <Search className="w-5 h-5 mr-2" />
                Browse Projects
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center shadow-card">
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-muted rounded-lg p-1 flex">
            <Button
              variant={activeTab === 'browse' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('browse')}
              className="rounded-md"
            >
              <Search className="w-4 h-4 mr-2" />
              Browse Projects
            </Button>
            <Button
              variant={activeTab === 'request' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('request')}
              className="rounded-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Request Quote
            </Button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'browse' && (
          <div>
            {/* Filters */}
            <Card className="mb-6 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Project Filters
                </CardTitle>
                <CardDescription>
                  Find projects that match your expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    All Projects
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    Conservatory
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    Renovation
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    Extension
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    €15k - €30k
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    €30k+
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Projects Grid */}
            <div className="grid gap-6">
              {quoteRequests.map((request) => (
                <div key={request.id} className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <QuoteCard
                      quoteRequest={request}
                      onSubmitQuote={handleSubmitQuote}
                      onContactCustomer={handleContactCustomer}
                    />
                  </div>
                  <div>
                    <MapDisplay location={request.location} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'request' && (
          <div className="max-w-4xl mx-auto">
            <QuoteRequestForm onSubmit={handleQuoteRequest} />
          </div>
        )}
      </div>

      {/* Quote Submission Modal */}
      <QuoteSubmissionModal
        open={showQuoteModal}
        onOpenChange={setShowQuoteModal}
        projectId={selectedProjectId}
        projectTitle={selectedProjectTitle}
        onSubmit={(data) => {
          console.log('Quote submitted:', data);
        }}
      />
    </div>
  );
};

export default Index;
