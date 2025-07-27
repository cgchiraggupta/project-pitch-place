import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Euro, Calendar, FileText, User, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuoteSubmissionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  projectTitle: string;
  onSubmit?: (quoteData: QuoteSubmissionData) => void;
}

export interface QuoteSubmissionData {
  projectId: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  quotedAmount: string;
  timeline: string;
  description: string;
  warranty: string;
  experience: string;
}

const QuoteSubmissionModal: React.FC<QuoteSubmissionModalProps> = ({
  open,
  onOpenChange,
  projectId,
  projectTitle,
  onSubmit
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<QuoteSubmissionData>({
    projectId,
    companyName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    quotedAmount: '',
    timeline: '',
    description: '',
    warranty: '',
    experience: ''
  });

  const handleInputChange = (field: keyof QuoteSubmissionData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.contactEmail || !formData.quotedAmount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onSubmit?.(formData);
    toast({
      title: "Quote Submitted!",
      description: "Your quote has been sent to the customer.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Submit Quote</DialogTitle>
          <DialogDescription>
            Submit your quote for: <span className="font-medium">{projectTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <Card className="bg-gradient-card">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Building className="w-5 h-5" />
                Company Information
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    placeholder="Your company name"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select onValueChange={(value) => handleInputChange('experience', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="11-20">11-20 years</SelectItem>
                      <SelectItem value="20+">20+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-card">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <User className="w-5 h-5" />
                Contact Information
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input
                    id="contactName"
                    placeholder="Your name"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="contactPhone">Phone Number</Label>
                  <Input
                    id="contactPhone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quote Details */}
          <Card className="bg-gradient-card">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <FileText className="w-5 h-5" />
                Quote Details
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quotedAmount">
                    <Euro className="inline w-4 h-4 mr-1" />
                    Quoted Amount *
                  </Label>
                  <Input
                    id="quotedAmount"
                    placeholder="e.g., €25,000"
                    value={formData.quotedAmount}
                    onChange={(e) => handleInputChange('quotedAmount', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeline">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Estimated Timeline
                  </Label>
                  <Select onValueChange={(value) => handleInputChange('timeline', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                      <SelectItem value="3-4weeks">3-4 weeks</SelectItem>
                      <SelectItem value="1-2months">1-2 months</SelectItem>
                      <SelectItem value="3-4months">3-4 months</SelectItem>
                      <SelectItem value="6months+">6+ months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Quote Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what's included in your quote, materials, approach, etc."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="warranty">Warranty Information</Label>
                <Input
                  id="warranty"
                  placeholder="e.g., 2 years on workmanship, 10 years on materials"
                  value={formData.warranty}
                  onChange={(e) => handleInputChange('warranty', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="hero" 
              className="flex-1"
            >
              Submit Quote
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteSubmissionModal;