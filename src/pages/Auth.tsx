import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, Mail, Lock, UserPlus, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, signIn, user } = useAuth();

  // Redirect if already authenticated
  if (user) {
    navigate('/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    try {
      authSchema.parse({ email, password });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Erro de validação',
          description: error.issues[0].message,
          variant: 'destructive'
        });
        return;
      }
    }

    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: 'Email já cadastrado',
              description: 'Este email já está em uso. Tente fazer login.',
              variant: 'destructive'
            });
          } else {
            toast({
              title: 'Erro no cadastro',
              description: error.message,
              variant: 'destructive'
            });
          }
        } else {
          toast({
            title: 'Cadastro realizado!',
            description: 'Você já pode fazer login.',
          });
          setIsSignUp(false);
        }
      } else {
        const { error } = await signIn(email, password);
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: 'Credenciais inválidas',
              description: 'Email ou senha incorretos.',
              variant: 'destructive'
            });
          } else {
            toast({
              title: 'Erro no login',
              description: error.message,
              variant: 'destructive'
            });
          }
        } else {
          toast({
            title: 'Login realizado!',
            description: 'Bem-vindo de volta.',
          });
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro. Tente novamente.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <Lightbulb className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">KoraOne</h1>
          <p className="text-muted-foreground mt-2">
            Transforme ideias em inovação
          </p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isSignUp ? (
                  <>
                    <UserPlus className="h-5 w-5 text-primary" />
                    Criar Conta
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 text-primary" />
                    Entrar
                  </>
                )}
              </CardTitle>
              <CardDescription>
                {isSignUp
                  ? 'Preencha os dados para criar sua conta'
                  : 'Entre com suas credenciais'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      disabled={loading}
                      minLength={6}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processando...
                    </div>
                  ) : (
                    <>
                      {isSignUp ? (
                        <>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Criar Conta
                        </>
                      ) : (
                        <>
                          <LogIn className="h-4 w-4 mr-2" />
                          Entrar
                        </>
                      )}
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  disabled={loading}
                >
                  {isSignUp ? (
                    <>Já tem uma conta? <span className="font-semibold">Entrar</span></>
                  ) : (
                    <>Não tem uma conta? <span className="font-semibold">Criar conta</span></>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-sm text-muted-foreground"
        >
          Plataforma de Inovação Corporativa
        </motion.p>
      </div>
    </div>
  );
}
