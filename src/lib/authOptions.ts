import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { createClient } from "@supabase/supabase-js";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
  }
}

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

// 🔐 Supabase client com permissões elevadas
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const authOptions: NextAuthOptions = {
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (!session.user) return session;

      // Garante que a imagem de perfil do usuário seja propagada para session.user.image
      if (token?.picture) {
        session.user.image = token.picture as string;
      } else if (token?.image) {
        session.user.image = token.image as string;
      }

      // Se o token.sub estiver definido, usamos diretamente
      if (token?.sub) {
        session.user.id = token.sub;
      } else {
        // Fallback: busca o ID no Supabase com base no e-mail
        const { data: user } = await supabase
          .from("usuarios")
          .select("id")
          .eq("email", session.user.email)
          .single();

        if (user?.id) {
          session.user.id = user.id;
        } else {
          console.warn("⚠️ ID de usuário não encontrado no Supabase.");
        }
      }

      return session;
    },

    async jwt({ token, user, profile }) {
      // Se for login inicial, user e profile estarão presentes
      if (profile && profile.image) {
        token.image = profile.image;
      } else if (user && user.image) {
        token.image = user.image;
      }
      return token;
    },
  },
  events: {
    async signIn({ user }) {
      try {
        const { id, name, email, image } = user as User;

        console.log("➡️ Evento signIn disparado:", { id, name, email });

        const { data: existingUser, error: fetchError } = await supabase
          .from("usuarios")
          .select("id")
          .eq("id", id)
          .single();

        if (fetchError && fetchError.code !== "PGRST116") {
          console.error(
            "❌ Erro ao buscar usuário na tabela `usuarios`:",
            fetchError.message
          );
          return;
        }

        if (!existingUser) {
          const { error: insertError } = await supabase
            .from("usuarios")
            .insert([
              {
                id,
                nome: name,
                email,
                foto_url: image,
              },
            ]);

          if (insertError) {
            console.error(
              "❌ Erro ao inserir usuário na tabela `usuarios`:",
              insertError.message
            );
          } else {
            console.log(
              "✅ Usuário inserido com sucesso na tabela `usuarios`."
            );
          }
        }
      } catch (err) {
        console.error("❌ Erro inesperado no evento signIn:", err);
      }
    },
  },
};
