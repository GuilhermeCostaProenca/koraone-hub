import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Heart, Filter, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MainLayout } from '@/components/layout/main-layout';
import { LoadingSkeleton, CardSkeleton } from '@/components/ui/loading-skeleton';
import { useIdeaStore } from '@/stores/ideaStore';
import { Idea, IdeaStatus } from '@/types';

export default function Ideas() {
  const { ideas, loading, fetchIdeas, likeIdea } = useIdeaStore();
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  useEffect(() => {
    const status = searchParams.get('status');
    if (status && ['enviada', 'em avaliação', 'aprovada'].includes(status)) {
      setStatusFilter(status);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = ideas;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(idea => idea.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(idea => 
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredIdeas(filtered);
  }, [ideas, statusFilter, searchQuery]);

  const handleLike = async (ideaId: string) => {
    try {
      await likeIdea(ideaId);
    } catch (error) {
      console.error('Error liking idea:', error);
    }
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

  return (
    <MainLayout 
      title="Vitrine de Ideias"
      subtitle="Explore e interaja com ideias inovadoras da comunidade"
      action={
        <Link to="/idea/new">
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            Nova Ideia
          </Button>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar ideias, autores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="enviada">Enviada</SelectItem>
              <SelectItem value="em avaliação">Em Avaliação</SelectItem>
              <SelectItem value="aprovada">Aprovada</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Ideas Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {loading ? (
            <div className="grid gap-6">
              {[1, 2, 3].map(i => <CardSkeleton key={i} />)}
            </div>
          ) : filteredIdeas.length > 0 ? (
            <div className="grid gap-6">
              {filteredIdeas.map((idea, index) => (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group cursor-pointer transition-all duration-300 hover:shadow-elevation border-border/50 bg-card/50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 flex-shrink-0">
                          <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                            {idea.author.avatar}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <h3 className="text-xl font-semibold mb-1">{idea.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                por {idea.author.name} • {new Date(idea.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            
                            <Badge className={getStatusColor(idea.status)}>
                              {idea.status}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {idea.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                Impacto: {idea.impact.split(' ').slice(0, 6).join(' ')}...
                              </span>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLike(idea.id)}
                              className={`flex items-center gap-2 ${idea.isLiked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}
                            >
                              <Heart className={`h-4 w-4 ${idea.isLiked ? 'fill-current' : ''}`} />
                              {idea.likes}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Nenhuma ideia encontrada</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Tente ajustar os filtros de busca'
                  : 'Seja o primeiro a compartilhar uma ideia inovadora!'
                }
              </p>
              <Link to="/idea/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Ideia
                </Button>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
}