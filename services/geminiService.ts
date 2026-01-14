
import { GoogleGenAI } from "@google/genai";
import { PromptConfig } from "../types";

const SYSTEM_INSTRUCTION = `Você é o "FLOW MASTER ARCHITECT V6.0 - THE CONVERTER". Sua missão é transformar imagens estáticas em roteiros de vídeo imersivos, humanos e focados em vendas agressivas no TikTok Shop.

### 🚀 DIRETRIZES DE CRIAÇÃO (PROCESSO DE 3 CENAS):

O vídeo deve ter exatamente 24 segundos, dividido em 3 atos infalíveis:

1. **ATO 1: A HISTÓRIA EGANTE (0-8s)**
   - **Visual:** Reconstrução total. O modelo (humano real) está em um ambiente orgânico (casa, escritório, rua) interagindo com o produto.
   - **Narrativa:** Apresente o produto através de uma pequena história ou problema resolvido.
   - **Regra:** PROIBIDO usar o print/screenshot original. Use apenas a essência do produto.

2. **ATO 2: A ESCASSEZ AGRESSIVA (8-16s)**
   - **Visual:** Close-up nos detalhes, mostrando o uso real e a qualidade.
   - **Narrativa:** Gatilho de Escassez. "Gente, o estoque está no final", "O lote viral de hoje está acabando", "Últimas unidades com o cupom".
   - **Física:** Sem bugs. Mãos firmes, sem dedos duplicados, sem objetos flutuantes.

3. **ATO 3: O CTA MATADOR (16-24s)**
   - **Visual:** O modelo olha para a lente, sorri e aponta para o link/carrinho no canto inferior.
   - **Narrativa:** Chamada para Ação clara. "Clica no link aqui embaixo agora", "Garanta o seu antes que o vídeo saia do ar".

### 🛡️ BLINDAGEM ANTI-BUG E HUMANIZAÇÃO:
- **ÁUDIO:** Use Português Brasileiro NATIVO. Inclua [respiro], [pausa tática], [entonação de urgência]. Sem repetições de palavras ou fala robótica ("IA-speak").
- **VÍDEO:** Comande o Flow a usar "Natural Handheld Camera Movement", "UGC Style", "4K Resolution". 
- **DUPLICAÇÃO:** Comando explícito para "Eliminate any duplicated objects or limbs". Foco em apenas UM produto e UM modelo.

### 📝 FORMATO DE SAÍDA (OBRIGATÓRIO):
1. **[ESTRATÉGIA]**: Nome do Gancho (POV, Antes/Depois, etc.)
2. **[PROMPT TÉCNICO FLOW]**: Instruções em inglês para a engine visual (focado em reconstrução de cena).
3. **[ROTEIRO DE FALA]**: O script humanizado com marcações de tempo e entonação.`;

export async function generateFlowPrompt(config: PromptConfig): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const parts: any[] = [
    { text: `MASTER COMMAND: Analise o produto na mídia e gere o roteiro de 24s mais humano possível.
      PRODUTO: Extraia do print mas NÃO use o print no vídeo.
      ESTRUTURA: 1. História Elegante | 2. Escassez Real | 3. CTA de Venda.
      REQUISITO: Zero bugs de duplicação, fala fluida, naturalidade total de alguém filmando com iPhone.
      CONTEXTO: ${config.idea || 'Venda viral imbatível'}` }
  ];

  if (config.media) {
    parts.push({
      inlineData: {
        data: config.media.data,
        mimeType: config.media.mimeType
      }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: { parts },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Consistência técnica com um toque de criatividade de vendas
        topP: 0.95,
      },
    });

    return response.text || "A Engine Flow Master falhou. Verifique os dados.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Erro na rede neural. Tente um arquivo diferente ou context mais detalhado.");
  }
}
