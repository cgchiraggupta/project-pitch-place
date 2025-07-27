import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, MapPin, Phone, Mail, MessageCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuoteRequestFormProps {
  onSubmit?: (data: QuoteRequestData) => void;
}

export interface QuoteRequestData {
  projectType: string;
  description: string;
  dimensions: string;
  materials: string;
  timeline: string;
  budget: string;
  location: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactWhatsApp: string;
  images: File[];
}

const QuoteRequestForm: React.FC<QuoteRequestFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<QuoteRequestData>({
    projectType: '',
    description: '',
    dimensions: '',
    materials: '',
    timeline: '',
    budget: '',
    location: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    contactWhatsApp: '',
    images: []
  });

  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field: keyof QuoteRequestData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files).slice(0, 6 - formData.images.length);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...newFiles] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.projectType || !formData.description || !formData.contactEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onSubmit?.(formData);
    toast({
      title: "Quote Request Submitted!",
      description: "Your project has been posted. Contractors will contact you soon.",
    });
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-elegant">
      <CardHeader className="bg-gradient-hero text-white rounded-t-lg">
        <CardTitle className="text-2xl">Request a Quote</CardTitle>
        <CardDescription className="text-white/90">
          Describe your project and get quotes from qualified contractors
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Type */}
          <div className="space-y-2">
            <Label htmlFor="projectType">Project Type *</Label>
            <Select onValueChange={(value) => handleInputChange('projectType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conservatory">Conservatory</SelectItem>
                <SelectItem value="extension">Home Extension</SelectItem>
                <SelectItem value="renovation">Renovation</SelectItem>
                <SelectItem value="roofing">Roofing</SelectItem>
                <SelectItem value="flooring">Flooring</SelectItem>
                <SelectItem value="kitchen">Kitchen</SelectItem>
                <SelectItem value="bathroom">Bathroom</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Project Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your project in detail (e.g., 3x10 meter conservatory with stone floor, heating, sliding doors, etc.)"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input
                id="dimensions"
                placeholder="e.g., 3x10 meters"
                value={formData.dimensions}
                onChange={(e) => handleInputChange('dimensions', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="materials">Preferred Materials</Label>
              <Input
                id="materials"
                placeholder="e.g., stone, wood, glass"
                value={formData.materials}
                onChange={(e) => handleInputChange('materials', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Select onValueChange={(value) => handleInputChange('timeline', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">ASAP</SelectItem>
                  <SelectItem value="1-3months">1-3 months</SelectItem>
                  <SelectItem value="3-6months">3-6 months</SelectItem>
                  <SelectItem value="6-12months">6-12 months</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range</Label>
              <Select onValueChange={(value) => handleInputChange('budget', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-5k">Under €5,000</SelectItem>
                  <SelectItem value="5k-15k">€5,000 - €15,000</SelectItem>
                  <SelectItem value="15k-30k">€15,000 - €30,000</SelectItem>
                  <SelectItem value="30k-50k">€30,000 - €50,000</SelectItem>
                  <SelectItem value="over-50k">Over €50,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">
              <MapPin className="inline w-4 h-4 mr-1" />
              Project Location
            </Label>
            <Input
              id="location"
              placeholder="City, postal code or full address"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Project Images (up to 6)</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/30'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">
                Drag and drop images here, or click to select
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Select Images
              </Button>
            </div>
            
            {/* Image Preview */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {formData.images.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Name *</Label>
                <Input
                  id="contactName"
                  placeholder="Your name"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactEmail">
                  <Mail className="inline w-4 h-4 mr-1" />
                  Email *
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPhone">
                  <Phone className="inline w-4 h-4 mr-1" />
                  Phone
                </Label>
                <Input
                  id="contactPhone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactWhatsApp">
                  <MessageCircle className="inline w-4 h-4 mr-1" />
                  WhatsApp
                </Label>
                <Input
                  id="contactWhatsApp"
                  placeholder="+1 (555) 123-4567"
                  value={formData.contactWhatsApp}
                  onChange={(e) => handleInputChange('contactWhatsApp', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button type="submit" variant="hero" size="lg" className="w-full">
              Submit Quote Request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuoteRequestForm;