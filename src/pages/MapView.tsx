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

// Mock data simples para o mapa
const MOCK_MAP_IDEAS: MapIdea[] = [
  {
    id: '1',
    title: 'Plataforma de IA para atendimento',
    status: 'aprovada',
    lat: -23.5505,
    lng: -46.6333,
    author: { name: 'Ana Silva', avatar: 'AS' }
  },
  {
    id: '2',
    title: 'App de sustentabilidade corporativa',
    status: 'em avaliação',
    lat: -23.5615,
    lng: -46.6565,
    author: { name: 'Carlos Mendes', avatar: 'CM' }
  },
  {
    id: '3',
    title: 'Sistema de gestão de inovação',
    status: 'enviada',
    lat: -23.5489,
    lng: -46.6388,
    author: { name: 'Beatriz Costa', avatar: 'BC' }
  }
];

// Mapa simplificado - dados mockados direto
export default function MapView() {
  const [mapIdeas] = useState<MapIdea[]>(MOCK_MAP_IDEAS);

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

  return (
    <div className="min-h-screen bg-background lg:ml-20">
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

        {/* Mapa simplificado com cards */}
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mapIdeas.map((idea) => (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 border border-border rounded-lg hover:border-primary transition-colors"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {idea.author.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{idea.author.name}</p>
                      <Badge className={`${getStatusColor(idea.status)} mt-1`}>
                        {idea.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold mb-2">{idea.title}</h4>
                  
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    São Paulo, SP
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full mt-3"
                    asChild
                  >
                    <Link to={`/ideas?highlight=${idea.id}`}>
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Ver no Feed
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}