// src/lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

// Esta linha busca a URL do seu arquivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

// Esta linha busca a chave "anon" do seu arquivo .env
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Aqui, criamos a conexão com o Supabase usando as chaves
// e a exportamos para que outros arquivos possam usá-la.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);