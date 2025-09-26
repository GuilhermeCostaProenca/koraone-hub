import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, BookOpen, Video, Users, TrendingUp, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout/main-layout';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { Insight } from '@/types';

const mockInsights: Insight[] = [
  {
    id: '1',
    title: 'Workshops Colaborativos',
    description: 'Organize sessões de brainstorming em grupo para estimular a criatividade e gerar ideias inovadoras em equipe.',
    icon: 'Users',
    category: 'Metodologia'
  },
  {
    id: '2',
    title: 'Design Thinking na Prática',
    description: 'Aprenda a aplicar as 5 etapas do Design Thinking para resolver problemas complexos de forma centrada no usuário.',
    icon: 'Lightbulb',
    category: 'Metodologia'
  },
  {
    id: '3',
    title: 'Tendências de Inovação 2024',
    description: 'Conheça as principais tendências tecnológicas e de mercado que estão moldando o futuro dos negócios.',
    icon: 'TrendingUp',
    category: 'Tendências'
  },
  {
    id: '4',
    title: 'Prototipagem Rápida',
    description: 'Técnicas para criar protótipos funcionais rapidamente e validar suas ideias com menor investimento.',
    icon: 'BookOpen',
    category: 'Metodologia'
  },
  {
    id: '5',
    title: 'Cultura de Inovação',
    description: 'Como cultivar um ambiente organizacional que estimule a criatividade e a inovação contínua.',
    icon: 'Sparkles',
    category: 'Cultura'
  },
  {
    id: '6',
    title: 'Ferramentas de Colaboração',
    description: 'Descubra as melhores ferramentas digitais para facilitar a colaboração e o compartilhamento de ideias.',
    icon: 'Video',
    category: 'Ferramentas'
  }
];

export default function Insights() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setInsights(mockInsights);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Users,
      Lightbulb,
      TrendingUp,
      BookOpen,
      Sparkles,
      Video
    };
    return icons[iconName] || Brain;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Metodologia': 'bg-blue-500/10 text-blue-700 border-blue-200',
      'Tendências': 'bg-green-500/10 text-green-700 border-green-200',
      'Cultura': 'bg-yellow-500/10 text-yellow-700 border-yellow-200',
      'Ferramentas': 'bg-indigo-500/10 text-indigo-700 border-indigo-200',
      'Conteúdo': 'bg-purple-500/10 text-purple-700 border-purple-200',
      'Conhecimento': 'bg-orange-500/10 text-orange-700 border-orange-200',
      'Engajamento': 'bg-pink-500/10 text-pink-700 border-pink-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/10 text-gray-700 border-gray-200';
  };

  return (
    <MainLayout
      title="Insights de Inovação"
      subtitle="Descubra recursos e estratégias para potencializar sua criatividade"
    >
      <div className="space-y-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="glass-effect">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total de Insights</p>
                  <p className="text-3xl font-bold text-primary">{insights.length}</p>
                </div>
                <Brain className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Categorias</p>
                  <p className="text-3xl font-bold text-success">
                    {Array.from(new Set(insights.map(i => i.category))).length}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Recursos</p>
                  <p className="text-3xl font-bold text-warning">12+</p>
                </div>
                <Sparkles className="h-8 w-8 text-warning" />
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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => <LoadingSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insights.map((insight, index) => {
                const IconComponent = getIconComponent(insight.icon);
                
                return (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-elevation border-border/50 bg-card/50 h-full">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
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
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {insight.description}
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="w-full group-hover:bg-primary/10"
                        >
                          Explorar
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
}