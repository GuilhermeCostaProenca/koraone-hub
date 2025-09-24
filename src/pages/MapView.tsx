import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Map, Navigation, Lightbulb, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AppLayout } from '@/components/layout/app-layout';
import { useIdeaStore } from '@/stores/ideaStore';
import { Idea, IdeaStatus } from '@/types';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.divIcon({
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

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapView() {
  const { ideas, fetchIdeas } = useIdeaStore();
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [mapIdeas, setMapIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMapIdeas = async () => {
      try {
        setLoading(true);
        const response = await fetch('/ideas/map');
        const data = await response.json();
        setMapIdeas(data);
        await fetchIdeas(); // Also fetch all ideas for potential selection
      } catch (error) {
        console.error('Error fetching map ideas:', error);
      } finally {
        setLoading(false);
      }
    };

    // Only render map on client side
    if (typeof window !== 'undefined') {
      fetchMapIdeas();
    }
  }, [fetchIdeas]);

  const getStatusColor = (status: IdeaStatus) => {
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

  // São Paulo center coordinates
  const center: [number, number] = [-23.5505, -46.6333];

  // Don't render anything on server side
  if (typeof window === 'undefined' || loading) {
    return (
      <AppLayout
        title="Mapa de Ideias"
        subtitle="Carregando..."
      >
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title="Mapa de Ideias"
      subtitle="Explore projetos inovadores em todo o ecossistema"
      action={
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Navigation className="h-4 w-4" />
          {mapIdeas.length} ideias localizadas
        </div>
      }
    >

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="h-full glass-effect overflow-hidden">
              <CardContent className="p-0 h-full">
                <MapContainer
                  center={center}
                  zoom={12}
                  className="h-full w-full rounded-2xl"
                  style={{ minHeight: '400px' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {mapIdeas.filter(idea => idea.lat && idea.lng).map((idea) => (
                    <Marker
                      key={idea.id}
                      position={[idea.lat, idea.lng]}
                      eventHandlers={{
                        click: () => {
                          const fullIdea = ideas.find(i => i.id === idea.id) || idea;
                          setSelectedIdea(fullIdea);
                        },
                      }}
                    >
                      <Popup>
                        <div className="p-3 min-w-64">
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {idea.author?.avatar || 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-sm">{idea.title}</p>
                              <p className="text-xs text-gray-600">{idea.author?.name || 'Unknown'}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mb-3">
                            <Badge className={getStatusColor(idea.status)}>
                              {idea.status}
                            </Badge>
                            <Button 
                              variant="link" 
                              size="sm" 
                              asChild
                              className="p-0 h-auto text-xs"
                            >
                              <a href={`/ideas?highlight=${idea.id}`}>
                                Ver no feed
                              </a>
                            </Button>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Selected Idea Details */}
            {selectedIdea ? (
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="text-lg">Ideia Selecionada</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {selectedIdea.author.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{selectedIdea.author.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(selectedIdea.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{selectedIdea.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {selectedIdea.description}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-primary mb-1">Impacto Esperado:</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedIdea.impact}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <Badge className={getStatusColor(selectedIdea.status)}>
                      {selectedIdea.status}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      {selectedIdea.likes}
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedIdea(null)}
                    className="w-full"
                  >
                    Fechar Detalhes
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="glass-effect">
                <CardContent className="p-6 text-center">
                  <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Clique em um marcador no mapa para ver os detalhes da ideia
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Ideas List */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-lg">Ideias no Mapa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
                {mapIdeas.length === 0 ? (
                  <div className="text-center py-8">
                    <Map className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Nenhuma ideia com localização encontrada
                    </p>
                  </div>
                ) : (
                  mapIdeas.map((idea) => (
                    <div
                      key={idea.id}
                      onClick={() => setSelectedIdea(idea)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
                        selectedIdea?.id === idea.id
                          ? 'border-primary/50 bg-primary/5'
                          : 'border-border/30'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {idea.author.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-semibold text-sm truncate">{idea.title}</p>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {idea.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge className={`text-xs ${getStatusColor(idea.status)}`}>
                          {idea.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Heart className="h-3 w-3" />
                          {idea.likes}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
    </AppLayout>
  );
}