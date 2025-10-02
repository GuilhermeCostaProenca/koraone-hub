import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import { Map, MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

// Fix for default markers in react-leaflet
const customIcon = L.divIcon({
  html: `<div style="
    background: hsl(217 91% 60%);
    width: 25px;
    height: 25px;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  "></div>`,
  iconSize: [25, 25],
  iconAnchor: [12, 25],
});

interface MapIdea {
  id: string;
  title: string;
  status: string;
  lat: number;
  lng: number;
  author: {
    name: string;
    avatar: string;
  };
}

export default function MapView() {
  const [mapIdeas, setMapIdeas] = useState<MapIdea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMapIdeas = async () => {
      try {
        setLoading(true);
        const response = await fetch('/ideas/map');
        const data = await response.json();
        setMapIdeas(data);
      } catch (error) {
        console.error('Error fetching map ideas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMapIdeas();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovada':
        return 'bg-status-approved text-white';
      case 'em avaliação':
        return 'bg-status-review text-black';
      case 'enviada':
        return 'bg-status-sent text-white';
      default:
        return 'bg-muted';
    }
  };

  // Don't render anything on server side
  if (typeof window === 'undefined' || loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Map className="h-8 w-8 text-primary" />
                Mapa de Ideias
              </h1>
              <p className="text-muted-foreground">
                Explore projetos inovadores em todo o ecossistema
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">Carregando ideias no mapa...</span>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Map className="h-8 w-8 text-primary" />
              Mapa de Ideias
            </h1>
            <p className="text-muted-foreground">
              Explore projetos inovadores em todo o ecossistema
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {mapIdeas.length} ideias localizadas
          </div>
        </motion.div>
        {/* Map */}
        <Card className="glass-effect overflow-hidden">
          <CardContent className="p-0">
            <div className="h-[600px] relative">
              {typeof window !== 'undefined' && (
                <MapContainer
                  center={[-23.5505, -46.6333]}
                  zoom={12}
                  className="h-full w-full"
                  zoomControl={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {mapIdeas.map((idea) => {
                    if (!idea.lat || !idea.lng) return null;
                    
                    return (
                      <Marker 
                        key={idea.id} 
                        position={[idea.lat, idea.lng]}
                        icon={customIcon}
                      >
                        <Popup>
                          <div className="min-w-[250px] p-2">
                            <div className="flex items-start gap-3 mb-3">
                              <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                  {idea.author.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm">{idea.author.name}</p>
                                <Badge className={getStatusColor(idea.status)}>
                                  {idea.status}
                                </Badge>
                              </div>
                            </div>
                            
                            <h4 className="font-semibold text-base mb-2 line-clamp-2">
                              {idea.title}
                            </h4>
                            
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="w-full"
                              asChild
                            >
                              <Link to={`/ideas?highlight=${idea.id}`}>
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Ver no Feed
                              </Link>
                            </Button>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
            </MapContainer>
          )}
        </div>
      </CardContent>
    </Card>
      </div>
    </div>
  );
}