import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';

interface MapDisplayProps {
  location: string;
  className?: string;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ location, className = "" }) => {
  // This is a placeholder for Google Maps integration
  // In a real implementation, you would use Google Maps API
  const handleOpenInMaps = () => {
    const encodedLocation = encodeURIComponent(location);
    window.open(`https://www.google.com/maps/search/${encodedLocation}`, '_blank');
  };

  return (
    <Card className={`shadow-card ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="w-5 h-5 text-primary" />
          Project Location
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-muted/30 rounded-lg p-8 text-center border-2 border-dashed border-muted-foreground/30">
          <MapPin className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium mb-2">{location}</p>
          <p className="text-muted-foreground text-sm mb-4">
            Interactive map integration coming soon
          </p>
          <button
            onClick={handleOpenInMaps}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-hover transition-colors"
          >
            <Navigation className="w-4 h-4" />
            Open in Google Maps
          </button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p className="mb-1">📍 Click "Open in Google Maps" to:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>View exact location</li>
            <li>Get directions</li>
            <li>Check distance from your location</li>
            <li>Explore nearby area</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapDisplay;