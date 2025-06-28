// Função helper para registrar logs de IA usando a nova rota de logs
export interface LogIAData {
  usuarioId: string;
  tipoRequisicao: string;
}

export async function registrarLogIA(data: LogIAData): Promise<boolean> {
  try {
    const logData = {
      user_id: data.usuarioId,
      tipo_requisicao: data.tipoRequisicao,
    };

    const response = await fetch('/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logData),
    });

    if (!response.ok) {
      console.error('Erro ao registrar log de IA:', await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao registrar log de IA:', error);
    return false;
  }
}

// Função específica para logs de IA no worker (sem fetch, usa Supabase diretamente)
import { SupabaseClient } from '@supabase/supabase-js';

export async function registrarLogIAWorker(data: LogIAData, supabaseClient: SupabaseClient): Promise<boolean> {
  try {
    const logData = {
      user_id: data.usuarioId,
      tipo_requisicao: data.tipoRequisicao,
      data_uso: new Date().toISOString(),
    };

    const { error } = await supabaseClient
      .from('log_uso_ia')
      .insert([logData]);

    if (error) {
      console.error('Erro ao registrar log de IA no worker:', error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao registrar log de IA no worker:', error);
    return false;
  }
}
