import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Route, Plus, TrendingUp, Heart, CheckCircle2, Clock, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MainLayout } from '@/components/layout/MainLayout';
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
  }, [fetchIdeas, user]);

  const userIdeas = ideas.filter(idea => idea.author.id === user?.id) || [];
  const sentIdeas = userIdeas.filter(idea => idea.status === 'enviada').length;
  const approvedIdeas = userIdeas.filter(idea => idea.status === 'aprovada').length;
  const totalLikes = userIdeas.reduce((sum, idea) => sum + idea.likes, 0);

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

  return (
    <MainLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Route className="h-8 w-8 text-primary" />
              Minha Trilha
            </h1>
            <p className="text-muted-foreground">
              Acompanhe seu progresso e impacto na inovação
            </p>
          </div>
          
          <Link to="/idea/new">
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Nova Ideia
            </Button>
          </Link>
        </motion.div>

        {/* KPIs */}
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
                  <p className="text-sm text-muted-foreground">Ideias Enviadas</p>
                  <p className="text-2xl font-bold text-primary">{sentIdeas}</p>
                </div>
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aprovadas</p>
                  <p className="text-2xl font-bold text-success">{approvedIdeas}</p>
                </div>
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total de Likes</p>
                  <p className="text-2xl font-bold text-warning">{totalLikes}</p>
                </div>
                <Heart className="h-6 w-6 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Score de Impacto</p>
                  <p className="text-2xl font-bold text-primary">{(approvedIdeas * 10 + totalLikes * 2)}</p>
                </div>
                <Trophy className="h-6 w-6 text-primary" />
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
              <CardTitle className="text-xl">Minhas Ideias</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <CardSkeleton key={i} />)}
                </div>
              ) : userIdeas.length === 0 ? (
                <div className="text-center py-12">
                  <Route className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Sua trilha começa aqui</h3>
                  <p className="text-muted-foreground mb-4">
                    Compartilhe sua primeira ideia e comece a impactar!
                  </p>
                  <Link to="/idea/new">
                    <Button className="bg-gradient-primary hover:opacity-90">
                      <Plus className="h-4 w-4 mr-2" />
                      Primeira Ideia
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userIdeas.map((idea, index) => {
                    const StatusIcon = getStatusIcon(idea.status);
                    
                    return (
                      <motion.div
                        key={idea.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-xl border border-border/30 hover:border-border/60 transition-all bg-card/30 hover:bg-card/50"
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <StatusIcon className="h-6 w-6 text-primary" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-semibold text-lg">{idea.title}</h4>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(idea.status)}>
                                {idea.status}
                              </Badge>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Heart className="h-4 w-4" />
                                {idea.likes}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {idea.description}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                              Enviado em {new Date(idea.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                            {idea.location && (
                              <Badge variant="outline" className="text-xs">
                                📍 Localizado
                              </Badge>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}