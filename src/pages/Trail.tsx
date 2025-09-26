import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Route, Plus, TrendingUp, Heart, CheckCircle2, Clock, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MainLayout } from '@/components/layout/main-layout';
import { LoadingSkeleton, CardSkeleton } from '@/components/ui/loading-skeleton';
import { useAuth } from '@/auth';
import { useIdeaStore } from '@/stores/ideaStore';
import { IdeaStatus } from '@/types';

export default function Trail() {
  const { user } = useAuth();
  const { ideas, myIdeas, loading, fetchIdeas } = useIdeaStore();

  useEffect(() => {
    if (user) {
      fetchIdeas(true); // Fetch only my ideas
    }
  }, [user, fetchIdeas]);

  const getStatusStats = () => {
    return {
      sent: myIdeas.filter(idea => idea.status === 'enviada').length,
      review: myIdeas.filter(idea => idea.status === 'em avaliação').length,
      approved: myIdeas.filter(idea => idea.status === 'aprovada').length,
      totalLikes: myIdeas.reduce((sum, idea) => sum + idea.likes, 0)
    };
  };

  const getStatusColor = (status: IdeaStatus) => {
    switch (status) {
      case 'aprovada':
        return 'bg-status-approved text-white';
      case 'em avaliação':
        return 'bg-status-review text-white';
      case 'enviada':
        return 'bg-status-sent text-white';
      default:
        return 'bg-muted';
    }
  };

  const getStatusIcon = (status: IdeaStatus) => {
    switch (status) {
      case 'aprovada':
        return CheckCircle2;
      case 'em avaliação':
        return Clock;
      case 'enviada':
        return TrendingUp;
      default:
        return Clock;
    }
  };

  const stats = getStatusStats();

  return (
    <MainLayout
      title="Minha Trilha"
      subtitle="Acompanhe o progresso das suas ideias e conquistas"
      action={
        <Link to="/idea/new">
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            Nova Ideia
          </Button>
        </Link>
      }
    >
      <div className="space-y-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <Card className="glass-effect">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Enviadas</p>
                  <p className="text-3xl font-bold text-primary">{stats.sent}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Em Avaliação</p>
                  <p className="text-3xl font-bold text-warning">{stats.review}</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aprovadas</p>
                  <p className="text-3xl font-bold text-success">{stats.approved}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Likes</p>
                  <p className="text-3xl font-bold text-red-500">{stats.totalLikes}</p>
                </div>
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* My Ideas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-effect">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Trophy className="h-6 w-6" />
                  Minhas Ideias
                </CardTitle>
                <Badge variant="outline" className="text-primary border-primary">
                  {myIdeas.length} {myIdeas.length === 1 ? 'ideia' : 'ideias'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <CardSkeleton key={i} />)}
                </div>
              ) : myIdeas.length > 0 ? (
                <div className="space-y-4">
                  {myIdeas.map((idea, index) => {
                    const StatusIcon = getStatusIcon(idea.status);
                    
                    return (
                      <motion.div
                        key={idea.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-xl border border-border/30 hover:border-border/60 transition-colors bg-card/30"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <StatusIcon className="h-6 w-6 text-primary" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h4 className="font-semibold text-lg mb-1">{idea.title}</h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                Criada em {new Date(idea.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            
                            <div className="flex flex-col items-end gap-2">
                              <Badge className={getStatusColor(idea.status)}>
                                {idea.status}
                              </Badge>
                              
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Heart className="h-4 w-4" />
                                {idea.likes}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                            {idea.description}
                          </p>
                          
                          <div className="text-xs text-muted-foreground">
                            <strong>Impacto esperado:</strong> {idea.impact}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Route className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Sua trilha está vazia</h3>
                  <p className="text-muted-foreground mb-4">
                    Compartilhe sua primeira ideia e comece sua jornada de inovação!
                  </p>
                  <Link to="/idea/new">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Enviar Primeira Ideia
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}