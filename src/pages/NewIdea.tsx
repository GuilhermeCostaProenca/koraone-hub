import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, MapPin, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/auth';
import { useIdeaStore } from '@/stores/ideaStore';
import { useToast } from '@/hooks/use-toast';
import { IdeaCreateData } from '@/types';

export default function NewIdea() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createIdea, loading } = useIdeaStore();
  const { toast } = useToast();

  const [formData, setFormData] = useState<IdeaCreateData>({
    title: '',
    description: '',
    impact: '',
    location: undefined
  });

  const [locationInput, setLocationInput] = useState({
    lat: '',
    lng: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    try {
      const dataToSubmit: IdeaCreateData = {
        ...formData,
        location: locationInput.lat && locationInput.lng 
          ? { lat: parseFloat(locationInput.lat), lng: parseFloat(locationInput.lng) }
          : undefined
      };

      await createIdea(dataToSubmit, user);
      
      toast({
        title: "Ideia enviada com sucesso!",
        description: "Sua ideia está sendo avaliada pela equipe.",
      });
      
      navigate('/ideas');
    } catch (error) {
      toast({
        title: "Erro ao enviar ideia",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="rounded-xl"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Lightbulb className="h-8 w-8 text-primary" />
                Nova Ideia
              </h1>
              <p className="text-muted-foreground">
                Compartilhe sua próxima grande inovação
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Detalhes da Ideia</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Título da Ideia *
                    </label>
                    <Input
                      placeholder="Ex: Plataforma de Colaboração Digital"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="h-12"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Descrição *
                    </label>
                    <Textarea
                      placeholder="Descreva sua ideia em detalhes... Como funciona? Qual problema resolve?"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="min-h-32 resize-none"
                      required
                    />
                  </div>

                  {/* Impact */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Impacto Esperado *
                    </label>
                    <Textarea
                      placeholder="Qual o impacto positivo que esta ideia pode gerar? Ex: Reduzir custos em 30%, aumentar eficiência..."
                      value={formData.impact}
                      onChange={(e) => setFormData(prev => ({ ...prev, impact: e.target.value }))}
                      className="min-h-24 resize-none"
                      required
                    />
                  </div>

                  {/* Media Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Mídia (Opcional)
                    </label>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-border/60 transition-colors">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Arraste arquivos aqui ou clique para selecionar
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Imagens, vídeos ou documentos até 10MB
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-4">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Localização (Opcional)
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Latitude</label>
                        <Input
                          type="number"
                          step="any"
                          placeholder="-23.5505"
                          value={locationInput.lat}
                          onChange={(e) => setLocationInput(prev => ({ ...prev, lat: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Longitude</label>
                        <Input
                          type="number"
                          step="any"
                          placeholder="-46.6333"
                          value={locationInput.lng}
                          onChange={(e) => setLocationInput(prev => ({ ...prev, lng: e.target.value }))}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Adicione coordenadas se sua ideia tem relação com um local específico
                    </p>
                  </div>

                  {/* Submit */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate(-1)}
                      className="flex-1"
                      disabled={loading}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-primary hover:opacity-90"
                      disabled={loading || !formData.title || !formData.description || !formData.impact}
                    >
                      {loading ? "Enviando..." : "Enviar Ideia"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}