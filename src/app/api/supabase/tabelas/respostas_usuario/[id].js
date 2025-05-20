import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("respostas_usuario")
      .select("*")
      .eq("id", id)
      .single();
    if (error)
      return res.status(404).json({ error: "Resposta não encontrada" });
    return res.status(200).json(data);
  }

  if (req.method === "PUT") {
    const { resposta } = req.body;
    const { data, error } = await supabase
      .from("respostas_usuario")
      .update({ resposta, data_resposta: new Date().toISOString() })
      .eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === "DELETE") {
    const { error } = await supabase
      .from("respostas_usuario")
      .delete()
      .eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(204).end();
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
