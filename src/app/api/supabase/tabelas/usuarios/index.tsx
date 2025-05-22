import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

type Usuario = {
  id?: number
  google_id: string
  nome: string
  email: string
  data_cadastro?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('usuarios').select('*')
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data as Usuario[])
  }

  if (req.method === 'POST') {
    const { google_id, nome, email } = req.body as Usuario
    const { data, error } = await supabase.from('usuarios').insert([
      {
        google_id,
        nome,
        email,
        data_cadastro: new Date().toISOString(),
      },
    ])
    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json(data as Usuario[])
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
