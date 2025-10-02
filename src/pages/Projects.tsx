import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, Plus, Calendar, DollarSign, Users, Clock, Filter, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MainLayout } from '@/components/layout/MainLayout';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: string;
  title: string;
  owner: string;
  status: 'PILOTO' | 'ATIVO' | 'CONCLUÍDO' | 'PAUSADO';
  economy: number;
  impacted: number;
  startedAt: string;
  finishedAt?: string;
  description?: string;
}

const statusColors = {
  'PILOTO': 'bg-blue-500/10 text-blue-700 border-blue-200',
  'ATIVO': 'bg-green-500/10 text-green-700 border-green-200',
  'CONCLUÍDO': 'bg-purple-500/10 text-purple-700 border-purple-200',
  'PAUSADO': 'bg-orange-500/10 text-orange-700 border-orange-200'
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os projetos',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = filter === 'ALL' 
    ? projects 
    : projects.filter(project => project.status === filter);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const getKPIs = () => {
    return {
      total: projects.length,
      active: projects.filter(p => p.status === 'ATIVO').length,
      totalEconomy: projects.reduce((acc, p) => acc + p.economy, 0),
      totalImpacted: projects.reduce((acc, p) => acc + p.impacted, 0)
    };
  };

  const kpis = getKPIs();

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
            <h1 className="text-3xl font-bold">Projetos</h1>
            <p className="text-muted-foreground">Acompanhe projetos em desenvolvimento</p>
          </div>
          
          <Link to="/idea/new">
            <Button variant="gradient">
              <Plus className="h-4 w-4 mr-2" />
              Novo Projeto
            </Button>
          </Link>
        </motion.div>

        {/* KPIs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Projetos</p>
                <p className="text-3xl font-bold">{kpis.total}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Projetos Ativos</p>
                <p className="text-3xl font-bold text-green-600">{kpis.active}</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Economia Total</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(kpis.totalEconomy)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pessoas Impactadas</p>
                <p className="text-3xl font-bold text-blue-600">{kpis.totalImpacted}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="ALL">Todos</TabsTrigger>
            <TabsTrigger value="PILOTO">Piloto</TabsTrigger>
            <TabsTrigger value="ATIVO">Ativo</TabsTrigger>
            <TabsTrigger value="CONCLUÍDO">Concluído</TabsTrigger>
            <TabsTrigger value="PAUSADO">Pausado</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="glass-effect">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-2 bg-muted rounded"></div>
                    <div className="h-2 bg-muted rounded w-5/6"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredProjects.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum projeto encontrado</h3>
            <p className="text-muted-foreground">
              {filter === 'ALL' 
                ? 'Você ainda não possui projetos cadastrados.' 
                : `Nenhum projeto com status "${filter}" encontrado.`}
            </p>
          </div>
        ) : (
          filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full glass-effect hover:shadow-elevation transition-all duration-300 cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {project.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Por {project.owner}
                      </p>
                    </div>
                    <Badge className={statusColors[project.status]}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 space-y-4">
                  {project.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/30 rounded-xl">
                      <p className="text-xs font-medium text-muted-foreground">Economia</p>
                      <p className="text-sm font-bold text-green-600">{formatCurrency(project.economy)}</p>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-xl">
                      <p className="text-xs font-medium text-muted-foreground">Impactados</p>
                      <p className="text-sm font-bold text-blue-600">{project.impacted}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border/30">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(project.startedAt)}
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      asChild
                    >
                      <Link to={`/projects/${project.id}`}>
                        Ver detalhes
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                  
                  {project.status === 'ATIVO' && (
                    <div className="text-xs text-muted-foreground mt-2 pt-2">
                      💡 Convertido de uma ideia aprovada
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </motion.div>
      </div>
    </MainLayout>
  );
}