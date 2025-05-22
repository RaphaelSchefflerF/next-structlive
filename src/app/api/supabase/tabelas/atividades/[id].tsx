import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

type Atividade = {
  titulo: string
  descricao: string
  tipo: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('atividades').select('*').eq('id', id).single()
    if (error) return res.status(404).json({ error: 'Atividade não encontrada' })
    return res.status(200).json(data)
  }

  if (req.method === 'PUT') {
    const { titulo, descricao, tipo } = req.body as Atividade
    const { data, error } = await supabase.from('atividades').update({ titulo, descricao, tipo }).eq('id', id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
  }

  if (req.method === 'DELETE') {
    const { error } = await supabase.from('atividades').delete().eq('id', id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(204).end()
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
