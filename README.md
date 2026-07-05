# A Song Creator 🎵

Uma aplicação moderna para criar, editar e gerenciar músicas com suporte a upload de áudio em diferentes formatos.

## 🚀 Características

- ✨ Upload de arquivos de áudio (MP3, WAV, FLAC, M4A)
- 📊 Sistema de planos (Free e Pro com limites diferentes)
- 🔐 Autenticação segura com Supabase
- 📈 Barra de progresso em tempo real
- 🌍 Suporte multilíngue com i18n
- 💾 Armazenamento em nuvem (Supabase Storage)
- 🎨 Interface moderna com componentes shadcn/ui

## 📋 Stack Tecnológico

- **Frontend**: React + TypeScript
- **UI**: shadcn/ui + Tailwind CSS
- **Backend**: Supabase (Auth + Storage + Database)
- **Ferramentas**: 
  - Vite (build tool)
  - React i18next (localização)
  - Sonner (notificações)
  - Lucide React (ícones)

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/melodiaviral-art/A-song-creator.git
cd A-song-creator

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
```

## ⚙️ Configuração

Crie um arquivo `.env.local` com:

```env
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica
```

## 🏃 Rodando o Projeto

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   └── UploadSongDialog.tsx    # Componente principal de upload
├── integrations/
│   └── supabase/
│       └── client.ts           # Cliente Supabase
├── App.tsx                     # Componente raiz
└── main.tsx                    # Ponto de entrada
```

## 🎯 Componentes Principais

### UploadSongDialog

Componente React para upload de arquivos de áudio com:
- Validação de tipo e tamanho
- Drag & drop
- Barra de progresso
- Suporte a diferentes planos (free/pro)

**Props:**
```typescript
{
  plan: "free" | "pro";      // Plano do usuário
  onUploaded: () => void;    // Callback após upload bem-sucedido
}
```

## 🔐 Segurança

- Validação de tipos de arquivo no cliente e servidor
- Limites de tamanho baseados em plano
- Autenticação obrigatória via Supabase
- UUIDs aleatórios para nomes de arquivos
- Tokens JWT para autorização

## 📦 Dependências Principais

```json
{
  "react": "^18.0.0",
  "typescript": "^5.0.0",
  "@supabase/supabase-js": "^2.0.0",
  "react-i18next": "^12.0.0",
  "sonner": "^1.0.0",
  "lucide-react": "^0.0.0",
  "tailwindcss": "^3.0.0"
}
```

## 🤝 Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Autor

**melodiaviral-art** - [GitHub](https://github.com/melodiaviral-art)

---

**Criado com ❤️ usando Lovable**
