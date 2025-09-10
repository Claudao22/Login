import { X, Building2, Calendar, FileText, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Client {
  id: string;
  name: string;
  cnpj: string;
  status: string;
  monthlyRevenue: number;
  nextDeadline: string;
  pjSystem: string;
  accountingDates: number[];
  color: string;
}

interface ClientDetailsProps {
  client: Client;
  isOpen: boolean;
  onClose: () => void;
}

const statusColors = {
  "Ativo": "success",
  "Pendente": "warning", 
  "Atrasado": "destructive"
} as const;

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export function ClientDetails({ client, isOpen, onClose }: ClientDetailsProps) {
  const getStatusVariant = (status: string) => {
    return statusColors[status as keyof typeof statusColors] || "secondary";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              {client.name}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Client Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Informações da Empresa
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">CNPJ:</p>
                  <p className="font-medium">{client.cnpj}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status:</p>
                  <Badge variant={getStatusVariant(client.status) as any}>
                    {client.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Receita Mensal:</p>
                  <p className="text-xl font-bold text-success">
                    {client.monthlyRevenue.toLocaleString('pt-BR', { 
                      style: 'currency', 
                      currency: 'BRL'
                    })}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Sistema PJ
              </h3>
              <div className="space-y-3">
                <div className="bg-gradient-primary p-4 rounded-lg">
                  <p className="text-primary-foreground font-semibold text-lg">
                    {client.pjSystem}
                  </p>
                  <p className="text-primary-foreground/80 text-sm mt-1">
                    Regime tributário atual
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Próximo Vencimento:</p>
                  <p className="font-medium text-destructive">
                    {new Date(client.nextDeadline).toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Accounting Calendar */}
          <Card className="p-4">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Calendário de Contas - 2024
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {months.map((month, monthIndex) => (
                <div key={month} className="bg-muted/50 p-3 rounded-lg">
                  <h4 className="font-medium text-center mb-2 text-primary">
                    {month}
                  </h4>
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    {/* Days of week header */}
                    {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
                      <div key={i} className="text-center font-medium text-muted-foreground p-1">
                        {day}
                      </div>
                    ))}
                    
                    {/* Calendar days */}
                    {Array.from({ length: 35 }, (_, i) => {
                      const dayNumber = i - new Date(2024, monthIndex, 1).getDay() + 1;
                      const isValidDay = dayNumber > 0 && dayNumber <= new Date(2024, monthIndex + 1, 0).getDate();
                      const isAccountingDay = isValidDay && client.accountingDates.includes(dayNumber);
                      
                      return (
                        <div 
                          key={i} 
                          className={`text-center p-1 rounded text-xs ${
                            !isValidDay 
                              ? 'text-muted-foreground/30' 
                              : isAccountingDay 
                                ? 'bg-accent text-accent-foreground font-bold' 
                                : 'text-card-foreground hover:bg-muted'
                          }`}
                        >
                          {isValidDay ? dayNumber : ''}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Accounting dates legend */}
                  <div className="mt-2 text-xs text-center">
                    <span className="text-muted-foreground">Dias de conta: </span>
                    <span className="font-semibold text-accent">
                      {client.accountingDates.join(', ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded"></div>
                  <span>Dias de vencimento das contas</span>
                </div>
                <div className="text-muted-foreground">
                  Total: {client.accountingDates.length} datas por mês
                </div>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}