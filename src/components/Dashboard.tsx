import { useState } from "react";
import { Building2, Users, TrendingUp, Calendar } from "lucide-react";
import { ClientCard } from "./ClientCard";
import { ClientDetails } from "./ClientDetails";

// Mock data dos clientes
const mockClients = [
  {
    id: "1",
    name: "Empresa Tech Solutions",
    cnpj: "12.345.678/0001-90",
    status: "Ativo",
    monthlyRevenue: 150000,
    nextDeadline: "2024-01-15",
    pjSystem: "Lucro Real",
    accountingDates: [5, 10, 15, 20],
    color: "primary"
  },
  {
    id: "2", 
    name: "Construtora ABC",
    cnpj: "98.765.432/0001-10",
    status: "Pendente",
    monthlyRevenue: 280000,
    nextDeadline: "2024-01-20",
    pjSystem: "Lucro Presumido",
    accountingDates: [8, 12, 18, 25],
    color: "warning"
  },
  {
    id: "3",
    name: "Consultoria XYZ", 
    cnpj: "11.222.333/0001-44",
    status: "Ativo",
    monthlyRevenue: 85000,
    nextDeadline: "2024-01-10",
    pjSystem: "Simples Nacional",
    accountingDates: [3, 7, 14, 21],
    color: "success"
  },
  {
    id: "4",
    name: "Indústria Metal",
    cnpj: "55.666.777/0001-88", 
    status: "Ativo",
    monthlyRevenue: 420000,
    nextDeadline: "2024-01-25",
    pjSystem: "Lucro Real",
    accountingDates: [6, 11, 16, 26],
    color: "accent"
  },
  {
    id: "5",
    name: "E-commerce Plus",
    cnpj: "33.444.555/0001-22",
    status: "Ativo", 
    monthlyRevenue: 180000,
    nextDeadline: "2024-01-18",
    pjSystem: "Lucro Presumido",
    accountingDates: [4, 9, 19, 24],
    color: "primary"
  },
  {
    id: "6",
    name: "Serviços Gerais",
    cnpj: "77.888.999/0001-66",
    status: "Atrasado",
    monthlyRevenue: 95000,
    nextDeadline: "2024-01-05",
    pjSystem: "Simples Nacional", 
    accountingDates: [2, 12, 22, 30],
    color: "destructive"
  }
];

export function Dashboard() {
  const [selectedClient, setSelectedClient] = useState<typeof mockClients[0] | null>(null);
  
  const activeClients = mockClients.filter(client => client.status === "Ativo").length;
  const totalRevenue = mockClients.reduce((sum, client) => sum + client.monthlyRevenue, 0);
  const pendingTasks = mockClients.filter(client => client.status === "Pendente" || client.status === "Atrasado").length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard Javi</h1>
          <p className="text-muted-foreground text-lg">Gestão de Clientes - Contabilidade</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-primary p-6 rounded-lg shadow-card text-primary-foreground">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium">Clientes Ativos</p>
                <p className="text-3xl font-bold">{activeClients}</p>
              </div>
              <Users className="h-10 w-10 text-primary-foreground/80" />
            </div>
          </div>

          <div className="bg-gradient-accent p-6 rounded-lg shadow-card text-accent-foreground">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-accent-foreground/80 text-sm font-medium">Receita Total</p>
                <p className="text-3xl font-bold">
                  {totalRevenue.toLocaleString('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL',
                    minimumFractionDigits: 0
                  })}
                </p>
              </div>
              <TrendingUp className="h-10 w-10 text-accent-foreground/80" />
            </div>
          </div>

          <div className="bg-card border-l-4 border-warning p-6 rounded-lg shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Pendências</p>
                <p className="text-3xl font-bold text-warning">{pendingTasks}</p>
              </div>
              <Calendar className="h-10 w-10 text-warning" />
            </div>
          </div>

          <div className="bg-card border-l-4 border-primary p-6 rounded-lg shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Clientes</p>
                <p className="text-3xl font-bold text-primary">{mockClients.length}</p>
              </div>
              <Building2 className="h-10 w-10 text-primary" />
            </div>
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onClick={() => setSelectedClient(client)}
            />
          ))}
        </div>

        {/* Client Details Modal */}
        {selectedClient && (
          <ClientDetails
            client={selectedClient}
            isOpen={!!selectedClient}
            onClose={() => setSelectedClient(null)}
          />
        )}
      </div>
    </div>
  );
}