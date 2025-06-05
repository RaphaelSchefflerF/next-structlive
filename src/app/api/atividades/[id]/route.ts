// src/app/api/atividades/[id]/route.ts
import { type NextRequest, NextResponse } from 'next/server'
import supabase from '@/supabase/supabaseCliente'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }   // <- Promise aqui
) {
  // Desestrutura depois de aguardar
  const { id } = await params

  const { data, error } = await supabase
    .from('atividades')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return NextResponse.json(
      { error: 'Atividade não encontrada', details: error.message },
      { status: 404 }
    )
  }

  return NextResponse.json(data)
}
