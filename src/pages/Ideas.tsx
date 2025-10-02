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
import { LoadingSkeleton, CardSkeleton } from '@/components/ui/loading-skeleton';
import { useIdeaStore } from '@/stores/ideaStore';
import { Idea, IdeaStatus } from '@/types';

export default function Ideas() {
  const { ideas, loading, fetchIdeas, likeIdea } = useIdeaStore();
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  // Scroll to highlighted idea
  useEffect(() => {
    if (highlightId) {
      setTimeout(() => {
        const element = document.getElementById(`idea-${highlightId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [highlightId, ideas]);

  useEffect(() => {
    let filtered = ideas;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(idea =>
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(idea => idea.status === statusFilter);
    }

    setFilteredIdeas(filtered);
  }, [ideas, searchQuery, statusFilter]);

  const handleLike = async (ideaId: string) => {
    await likeIdea(ideaId);
  };

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
              <Users className="h-8 w-8 text-primary" />
              Vitrine de Ideias
            </h1>
            <p className="text-muted-foreground">
              Explore e colabore com inovações da comunidade
            </p>
          </div>
          
            <Link to="/idea/new">
              <Button variant="gradient">
                <Plus className="h-4 w-4 mr-2" />
                Nova Ideia
              </Button>
            </Link>
        </motion.div>

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
              className="pl-10 h-12"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 h-12">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
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
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {loading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))
          ) : filteredIdeas.length === 0 ? (
            // Empty state
            <div className="col-span-full">
              <Card className="glass-effect text-center py-12">
                <CardContent>
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Nenhuma ideia encontrada</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || statusFilter !== 'all' 
                      ? "Tente ajustar seus filtros de busca"
                      : "Seja o primeiro a compartilhar uma ideia inovadora!"
                    }
                  </p>
                  <Link to="/idea/new">
                    <Button variant="gradient">
                      <Plus className="h-4 w-4 mr-2" />
                      Nova Ideia
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Ideas cards
            filteredIdeas.map((idea, index) => (
              <motion.div
                key={idea.id}
                id={`idea-${idea.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className={`group ${highlightId === idea.id ? 'animate-pulse' : ''}`}
              >
                <Card className={`h-full glass-effect hover:shadow-elevation transition-all duration-300 ${highlightId === idea.id ? 'ring-2 ring-primary bg-primary/5' : ''}`}>
                  <CardContent className="p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary text-primary-foreground font-medium text-sm">
                            {idea.author.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{idea.author.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(idea.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      
                      <Badge className={getStatusColor(idea.status)}>
                        {idea.status}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {idea.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {idea.description}
                      </p>
                      
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-primary">Impacto Esperado:</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {idea.impact}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(idea.id)}
                        disabled={idea.isLiked}
                        className={`gap-2 ${idea.isLiked ? 'text-red-500' : 'hover:text-red-500'}`}
                      >
                        <Heart className={`h-4 w-4 ${idea.isLiked ? 'fill-current' : ''}`} />
                        {idea.likes}
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        {idea.location && (
                          <Badge variant="outline" className="text-xs">
                            📍 Localizado
                          </Badge>
                        )}
                        
                        {idea.status === 'aprovada' && (
                          <Link to="/projects">
                            <Button size="sm" variant="outline" className="text-xs">
                              💡 Criar Projeto
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
          </CardContent>
        </Card>
      </motion.div>
    ))
  )}
</motion.div>
      </div>
    </div>
  );
}