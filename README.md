# BELEZ-AI 💛

> **Inteligência que Realça o que é Único**  
> *By Brasil Digital*

![BELEZ-AI](logo.png)

---

## O que é

**BELEZ-AI** é um app de diagnóstico facial com Inteligência Artificial — uma experiência premium de beleza que analisa pele, rugas, estrutura facial e saúde dental através da câmera do celular, gerando um relatório completo e personalizado.

🌐 **Live:** [belez-ai.com](https://belez-ai.com)

---

## Funcionalidades

### 🔬 Scanner Facial — estilo iOS Face ID
- Anel circular com 52 traços verdes animados (igual ao Face ID do iPhone)
- Captura 3 ângulos: frente, esquerda, direita
- Fundo preto com câmera visível apenas dentro do círculo

### 🧬 Mapeamento Facial 3D
- 33 pontos de referência anatômicos mapeados na foto capturada
- Labels profissionais: `NoseBridge`, `REyelidUpper`, `LipUpper`, `Chin`, etc.
- Linha de varredura cyan animada com contador de pontos em tempo real

### 🤖 Análise com IA (Claude API)
- Análise de **pele**: hidratação, textura, manchas
- Análise de **rugas**: testa, contorno dos olhos, sulcos nasolabiais
- Análise **dental**: clareamento, alinhamento, gengiva
- **Procedimentos estéticos** recomendados personalizados
- **Rotina de cuidados** customizada

### 📄 Relatório PDF
- Gerado direto no navegador com `jsPDF`
- Design premium com logo, scores, barras de progresso e recomendações

### 💳 Pagamento
- **PIX** 🇧🇷 — R$ 25,00
- **Venmo** 🇺🇸 — $5.00 USD
- Sistema de **código de acesso** enviado via WhatsApp após confirmação

---

## Stack

| Camada | Tecnologia |
|--------|------------|
| Frontend | HTML + CSS + JavaScript (SPA puro) |
| IA | Claude API (Anthropic) via Netlify Functions |
| Deploy | Netlify (CI/CD automático via GitHub) |
| Domínio | belez-ai.com (GoDaddy → Netlify DNS) |
| PDF | jsPDF 2.5 |
| Audio | MP3 nativo |
| PWA | manifest.json + apple-touch-icon |

---

## Estrutura

```
belez-ai/
├── index.html          # App completo (SPA)
├── logo.png            # Logo principal
├── logo-sound.mp3      # Áudio de entrada
├── apple-touch-icon.png
├── icon-192.png
├── icon-512.png
├── favicon-32.png
├── favicon-16.png
├── manifest.json       # PWA config
├── netlify.toml        # Config deploy
└── netlify/
    └── functions/
        └── analyze.js  # Claude API serverless function
```

---

## Fluxo do App

```
Hero → Detalhes → Pagamento (PIX ou Venmo)
  → Código de acesso → Seleção de scan
    → Scanner iOS Face ID (3 fotos)
      → Mapeamento Facial 3D (33 landmarks)
        → Análise IA → Resultado + PDF
```

---

## Instalar como App (PWA)

**iPhone:** Safari → Compartilhar → "Adicionar à Tela de Início"  
**Android:** Chrome → Menu → "Adicionar à tela inicial"

---

## Deploy

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Deploy produção
netlify deploy --prod
```

O CI/CD é automático — qualquer push para `master` pode ser deployado via CLI.

---

## Acesso Admin

Painel administrativo disponível dentro do app para demonstração sem pagamento.

---

## Licença

Projeto proprietário — **© Brasil Digital**. Todos os direitos reservados.
