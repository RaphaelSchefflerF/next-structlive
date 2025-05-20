import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

type Progresso = {
  id?: number
  usuario_id: number
  atividade_id: number
  status: string
  ultima_atualizacao?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('progresso_usuario').select('*')
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data as Progresso[])
  }

  if (req.method === 'POST') {
    const { usuario_id, atividade_id, status } = req.body as Progresso
    const { data, error } = await supabase.from('progresso_usuario').insert([
      {
        usuario_id,
        atividade_id,
        status,
        ultima_atualizacao: new Date().toISOString(),
      },
    ])
    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json(data as Progresso[])
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
