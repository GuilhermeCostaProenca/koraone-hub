import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Map, 
  Heart, 
  Plus, 
  TrendingUp, 
  Users, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MainLayout } from '@/components/layout/main-layout';
import { LoadingSkeleton, CardSkeleton } from '@/components/ui/loading-skeleton';
import { useAuth } from '@/auth';
import { useIdeaStore } from '@/stores/ideaStore';

const ctaCards = [
  {
    title: "Por que eu colaboro?",
    description: "Descubra o impacto das suas ideias na transformação digital",
    icon: Heart,
    href: "/insights",
    gradient: "from-pink-500 to-rose-600"
  },
  {
    title: "Enviar Ideia",
    description: "Compartilhe sua próxima grande inovação",
    icon: Plus,
    href: "/idea/new",
    gradient: "from-blue-500 to-cyan-600"
  },
  {
    title: "Mapa de Ideias",
    description: "Explore projetos inovadores em todo o ecossistema",
    icon: Map,
    href: "/map",
    gradient: "from-green-500 to-emerald-600"
  }
];

export default function Dashboard() {
  const { user } = useAuth();
  const { ideas, loading, fetchIdeas } = useIdeaStore();

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  const featuredIdeas = ideas.slice(0, 3);
  const totalLikes = ideas.reduce((sum, idea) => sum + idea.likes, 0);
  const approvedIdeas = ideas.filter(idea => idea.status === 'aprovada').length;

  return (
    <MainLayout 
      title={`Olá, ${user?.name?.split(' ')[0] || 'Colaborador'}! 👋`}
      subtitle="Bem-vindo ao Hub de Inovação Corporativa"
    >
      <div className="space-y-8">
        {/* KPIs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="glass-effect">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total de Likes</p>
                  <p className="text-3xl font-bold text-primary">{totalLikes}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ideias Ativas</p>
                  <p className="text-3xl font-bold text-success">{ideas.length}</p>
                </div>
                <Lightbulb className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aprovadas</p>
                  <p className="text-3xl font-bold text-warning">{approvedIdeas}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {ctaCards.map((cta, index) => {
            const Icon = cta.icon;
            return (
              <Link key={cta.title} to={cta.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="group cursor-pointer transition-all duration-300 hover:shadow-elevation border-border/50 bg-card/50">
                    <CardContent className="p-8 text-center space-y-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${cta.gradient} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{cta.title}</h3>
                        <p className="text-muted-foreground">{cta.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>

        {/* Featured Ideas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-effect">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  Projetos em Destaque
                </CardTitle>
                <Link to="/ideas">
                  <Button variant="outline" size="sm">
                    Ver Todos
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <CardSkeleton key={i} />)}
                </div>
              ) : (
                <div className="space-y-4">
                  {featuredIdeas.map((idea, index) => (
                    <motion.div
                      key={idea.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-xl border border-border/30 hover:border-border/60 transition-colors bg-card/30"
                    >
                      <Avatar className="h-12 w-12 flex-shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                          {idea.author.avatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-semibold text-lg mb-1">{idea.title}</h4>
                            <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                              {idea.description}
                            </p>
                            <p className="text-xs text-muted-foreground mb-3">
                              por {idea.author.name}
                            </p>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2">
                            <Badge 
                              variant={
                                idea.status === 'aprovada' ? 'default' :
                                idea.status === 'em avaliação' ? 'secondary' : 'outline'
                              }
                              className={
                                idea.status === 'aprovada' ? 'bg-status-approved' :
                                idea.status === 'em avaliação' ? 'bg-status-review' : 'bg-status-sent'
                              }
                            >
                              {idea.status}
                            </Badge>
                            
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Heart className="h-4 w-4" />
                              {idea.likes}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}