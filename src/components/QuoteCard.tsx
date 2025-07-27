import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, MessageCircle, Calendar, Euro, Image } from 'lucide-react';
import { QuoteRequestData } from './QuoteRequestForm';

interface QuoteCardProps {
  quoteRequest: QuoteRequestData & {
    id: string;
    createdAt: Date;
    status: 'open' | 'in-progress' | 'completed';
    quotesCount: number;
  };
  onSubmitQuote?: (id: string) => void;
  onContactCustomer?: (id: string, method: 'phone' | 'email' | 'whatsapp') => void;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ 
  quoteRequest, 
  onSubmitQuote, 
  onContactCustomer 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="shadow-card hover:shadow-hover transition-smooth">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-primary">
              {quoteRequest.projectType.charAt(0).toUpperCase() + 
               quoteRequest.projectType.slice(1)} Project
            </CardTitle>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(quoteRequest.createdAt)}
              </div>
              {quoteRequest.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {quoteRequest.location}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="secondary" 
              className={`text-white ${getStatusColor(quoteRequest.status)}`}
            >
              {quoteRequest.status}
            </Badge>
            <Badge variant="outline">
              {quoteRequest.quotesCount} quotes
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Project Description */}
        <div>
          <p className="text-foreground line-clamp-3">
            {quoteRequest.description}
          </p>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {quoteRequest.dimensions && (
            <div>
              <span className="font-medium text-muted-foreground">Size:</span>
              <p className="text-foreground">{quoteRequest.dimensions}</p>
            </div>
          )}
          {quoteRequest.materials && (
            <div>
              <span className="font-medium text-muted-foreground">Materials:</span>
              <p className="text-foreground">{quoteRequest.materials}</p>
            </div>
          )}
          {quoteRequest.timeline && (
            <div>
              <span className="font-medium text-muted-foreground">Timeline:</span>
              <p className="text-foreground">{quoteRequest.timeline}</p>
            </div>
          )}
          {quoteRequest.budget && (
            <div>
              <span className="font-medium text-muted-foreground">Budget:</span>
              <p className="text-foreground flex items-center gap-1">
                <Euro className="w-4 h-4" />
                {quoteRequest.budget}
              </p>
            </div>
          )}
        </div>

        {/* Images Preview */}
        {quoteRequest.images.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Image className="w-4 h-4" />
              <span className="text-sm font-medium">
                {quoteRequest.images.length} image{quoteRequest.images.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {quoteRequest.images.slice(0, 6).map((image, index) => (
                <div key={index} className="aspect-square">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Project image ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{quoteRequest.contactName}</p>
              <div className="flex gap-3 mt-1">
                {quoteRequest.contactPhone && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onContactCustomer?.(quoteRequest.id, 'phone')}
                    className="h-auto p-1"
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                )}
                {quoteRequest.contactEmail && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onContactCustomer?.(quoteRequest.id, 'email')}
                    className="h-auto p-1"
                  >
                    <Mail className="w-4 h-4" />
                  </Button>
                )}
                {quoteRequest.contactWhatsApp && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onContactCustomer?.(quoteRequest.id, 'whatsapp')}
                    className="h-auto p-1"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
            
            <Button 
              variant="default" 
              onClick={() => onSubmitQuote?.(quoteRequest.id)}
              className="ml-4"
            >
              Submit Quote
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;