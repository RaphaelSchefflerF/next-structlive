import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

type Atividade = {
  id?: number
  titulo: string
  descricao: string
  tipo: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('atividades').select('*')
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data as Atividade[])
  }

  if (req.method === 'POST') {
    const { titulo, descricao, tipo } = req.body as Atividade
    const { data, error } = await supabase.from('atividades').insert([{ titulo, descricao, tipo }])
    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json(data as Atividade[])
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
