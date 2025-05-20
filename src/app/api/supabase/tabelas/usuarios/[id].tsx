import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

type Usuario = {
  google_id: string
  nome: string
  email: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('usuarios').select('*').eq('id', id).single()
    if (error) return res.status(404).json({ error: 'Usuário não encontrado' })
    return res.status(200).json(data)
  }

  if (req.method === 'PUT') {
    const { google_id, nome, email } = req.body as Usuario
    const { data, error } = await supabase.from('usuarios')
      .update({ google_id, nome, email })
      .eq('id', id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
  }

  if (req.method === 'DELETE') {
    const { error } = await supabase.from('usuarios').delete().eq('id', id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(204).end()
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
