// src/pages/Index.tsx

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import ClientCard from "@/components/ui/ClientCard";
import StatCard from "@/components/ui/StatCard";

// Função que busca os dados no Supabase
const fetchClientes = async () => {
    const { data, error } = await supabase.from('clientes').select('*');
    if (error) {
        throw new Error('Não foi possível buscar os clientes');
    }
    return data;
};

const Index = () => {
    // Adicione o tipo Cliente[] como generic para o useQuery
    const { data, isLoading, error } = useQuery<Cliente[]>({
        queryKey: ['clientes'],
        queryFn: fetchClientes,
    });

    if (isLoading) return <p>Carregando clientes...</p>;
    if (error) return <p>Erro ao carregar clientes: </p>;

    return (
        <div className="md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Exemplo de uso do StatCard */}
            <StatCard title="Total de Clientes" value={data?.length || 0} />

            {/* Exemplo de listagem dos clientes */}
            <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.map((cliente) => (
                    <ClientCard key={cliente.cnpj} cliente={cliente} />
                ))}
            </div>
        </div>
    );
};

export default Index;