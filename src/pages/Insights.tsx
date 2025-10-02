import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, BookOpen, Video, Users, TrendingUp, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { Insight } from '@/types';

const mockInsights: Insight[] = [
  {
    id: '1',
    title: 'Workshops Colaborativos',
    description: 'Organize sessões de brainstorming em grupo para estimular a criatividade e gerar ideias inovadoras em equipe.',
    icon: 'Users',
    category: 'Colaboração'
  },
  {
    id: '2',
    title: 'Boletim Mensal de Impacto',
    description: 'Crie relatórios mensais destacando as ideias implementadas e seus resultados para motivar a comunidade.',
    icon: 'TrendingUp',
    category: 'Comunicação'
  },
  {
    id: '3',
    title: 'Vídeos Curtos de Inovação',
    description: 'Produza conteúdo em vídeo de até 3 minutos explicando conceitos de inovação e casos de sucesso.',
    icon: 'Video',
    category: 'Conteúdo'
  },
  {
    id: '4',
    title: 'Biblioteca de Recursos',
    description: 'Monte uma coleção de artigos, livros e materiais sobre inovação corporativa e empreendedorismo.',
    icon: 'BookOpen',
    category: 'Conhecimento'
  },
  {
    id: '5',
    title: 'Gamificação de Ideias',
    description: 'Implemente um sistema de pontos e badges para engajar colaboradores na submissão de ideias.',
    icon: 'Sparkles',
    category: 'Engajamento'
  }
];

const iconMap = {
  Users,
  TrendingUp,
  Video,
  BookOpen,
  Sparkles
};

export default function Insights() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const response = await fetch('/aurora/insights');
      const data = await response.json();
      setInsights(data);
    } catch (error) {
      console.error('Error fetching insights:', error);
      setInsights(mockInsights);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Colaboração': 'bg-blue-500/10 text-blue-700 border-blue-200',
      'Comunicação': 'bg-green-500/10 text-green-700 border-green-200',
      'Conteúdo': 'bg-purple-500/10 text-purple-700 border-purple-200',
      'Conhecimento': 'bg-orange-500/10 text-orange-700 border-orange-200',
      'Engajamento': 'bg-pink-500/10 text-pink-700 border-pink-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/10 text-gray-700 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Brain className="h-8 w-8 text-primary" />
                Insights Aurora
              </h1>
              <p className="text-muted-foreground">
                Recomendações inteligentes para potencializar a inovação
              </p>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">
                IA Generativa
              </span>
            </div>
          </div>

          {/* Aurora Introduction */}
          <Card className="glass-effect border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Aurora IA</h3>
                  <p className="text-muted-foreground text-sm">
                    Nossa assistente de inovação analisa tendências, padrões de colaboração e melhores práticas 
                    para oferecer recomendações personalizadas que impulsionam a cultura de inovação na sua organização.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Insights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="glass-effect">
                  <CardContent className="p-6">
                    <LoadingSkeleton lines={4} />
                  </CardContent>
                </Card>
              ))
            ) : (
              insights.map((insight, index) => {
                const IconComponent = iconMap[insight.icon as keyof typeof iconMap] || Lightbulb;
                
                return (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <Card className="h-full glass-effect hover:shadow-elevation transition-all duration-300 cursor-pointer">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <Badge 
                            variant="outline" 
                            className={getCategoryColor(insight.category)}
                          >
                            {insight.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {insight.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {insight.description}
                        </p>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="w-full justify-start gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Sparkles className="h-4 w-4" />
                          Explorar Insight
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-effect">
            <CardContent className="p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-primary-foreground" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3">
                  Transforme Insights em Ação
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  Os insights da Aurora são baseados em análise de dados e melhores práticas. 
                  Implemente essas recomendações para criar um ambiente ainda mais inovador.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-gradient-primary hover:opacity-90"
                    onClick={fetchInsights}
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    Gerar Novas Recomendações
                  </Button>
                  
                  <Button variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Guia de Implementação
                  </Button>
                </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
      </div>
    </div>
  );
}