// src/components/ui/ClientCard.tsx
import { Building2 } from 'lucide-react';

// O tipo Cliente precisa ser exportado para que outros arquivos possam usá-lo.
export type Cliente = {
  nome_empresa: string;
  cnpj: string;
  status: string;
  receita_mensal: number;
  proximo_vencimento: string;
  sistema_pj: string;
};

// O componente ClientCard. Certifique-se de que ele também é exportado.
export const ClientCard = ({ cliente }: { cliente: Cliente }) => {
  return (
    <div className="bg-card p-4 rounded-lg border shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">{cliente.nome_empresa}</h3>
        <Building2 className="text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground">{cliente.cnpj}</p>
      <p className="text-sm my-2">Status: {cliente.status}</p>
      {/* Adicione o resto da estrutura do card aqui */}
      <p>Receita Mensal: R$ {cliente.receita_mensal.toLocaleString()}</p>
      <p>Próximo Vencimento: {cliente.proximo_vencimento}</p>
      <p>Sistema PJ: {cliente.sistema_pj}</p>
    </div>
  );
};