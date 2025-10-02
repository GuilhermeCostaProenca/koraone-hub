import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  Users, 
  Clock,
  CheckCircle,
  Circle,
  AlertCircle,
  PlayCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

const timelineSteps = [
  { id: 1, name: 'Proposto', status: 'completed' },
  { id: 2, name: 'Em Avaliação', status: 'completed' },
  { id: 3, name: 'Aprovado', status: 'completed' },
  { id: 4, name: 'Piloto', status: 'current' },
  { id: 5, name: 'Ativo', status: 'upcoming' },
  { id: 6, name: 'Concluído', status: 'upcoming' }
];

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/projects/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProject(data);
      } else {
        throw new Error('Project not found');
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar o projeto',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'current':
        return <PlayCircle className="h-4 w-4 text-blue-600" />;
      case 'upcoming':
        return <Circle className="h-4 w-4 text-gray-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background lg:ml-20">
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-2">Carregando...</h1>
          <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background lg:ml-20">
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-2">Projeto não encontrado</h1>
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Projeto não encontrado</h3>
            <p className="text-muted-foreground mb-4">
              O projeto solicitado não foi encontrado ou você não tem permissão para visualizá-lo.
            </p>
            <Button asChild>
              <Link to="/projects">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para projetos
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background lg:ml-20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="text-muted-foreground">Por {project.owner}</p>
          </div>
          
          <Button variant="outline" asChild>
            <Link to="/projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
        </motion.div>

        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="glass-effect">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Status do Projeto</h3>
                <Badge className={statusColors[project.status]}>
                  {project.status}
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Iniciado em {formatDate(project.startedAt)}
                </div>
                {project.finishedAt && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Finalizado em {formatDate(project.finishedAt)}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Economia Gerada</h3>
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(project.economy)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Valor economizado até o momento
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Pessoas Impactadas</h3>
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {project.impacted}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Colaboradores beneficiados
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Project Description */}
        {project.description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Descrição do Projeto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Timeline do Projeto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timelineSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-4">
                    {getStatusIcon(step.status)}
                    <div className="flex-1">
                      <p className={`font-medium ${
                        step.status === 'current' 
                          ? 'text-blue-600' 
                          : step.status === 'completed' 
                            ? 'text-foreground' 
                            : 'text-muted-foreground'
                      }`}>
                        {step.name}
                      </p>
                    </div>
                    {index < timelineSteps.length - 1 && (
                      <div className="w-px h-8 bg-border ml-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-xl">
                  <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Projeto iniciado</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(project.startedAt)} - O projeto foi oficialmente iniciado
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-xl">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Aprovado para implementação</p>
                    <p className="text-xs text-muted-foreground">
                      Projeto aprovado pela equipe de inovação
                    </p>
                  </div>
                </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
      </div>
    </div>
  );
}