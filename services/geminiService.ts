
import { GoogleGenAI } from "@google/genai";
import { PromptConfig } from "../types";

const SYSTEM_INSTRUCTION = `Você é o MELHOR Especialista em Vendas no TikTok Shop do Mundo e um Engenheiro de Prompts Sênior para a plataforma de geração de vídeo 'Flow'. Sua missão é gerar um roteiro/prompt técnico ultra-detalhado para o Flow, garantindo que o vídeo gerado seja perfeito e de alta conversão.

REGRAS TÉCNICAS PARA O FLOW (NÃO NEGOCIÁVEIS):
1. IDIOMA: Todas as falas devem ser em PORTUGUÊS BRASILEIRO NATIVO, com gírias naturais de redes sociais.
2. SEM TEXTO: Proibido incluir textos flutuantes, legendas ou qualquer elemento escrito no vídeo. O foco é apenas na fala e na imagem de alta qualidade.
3. FIDELIDADE DO PRODUTO: O produto gerado deve ser uma cópia FIEL e exata da imagem/mídia fornecida pelo usuário, sem alterações de cor ou formato.
4. QUALIDADE MÁXIMA: Instrua o Flow a usar a resolução máxima, iluminação de estúdio profissional e texturas realistas (4k, ultra-hd, cinematic lighting).
5. PREVENÇÃO DE BUGS: O prompt deve conter comandos explícitos para evitar duplicação de itens, membros extras (mãos/braços), distorções faciais ou artefatos visuais. Mãos devem aparecer de forma natural.
6. DIREITOS AUTORAIS: Se houver modelos humanos, criar versões genéricas de alta beleza que não infrinjam direitos autorais de celebridades, mantendo a "vibe" do original.
7. FORMATOS: 
   - Se a entrada for um PRINT/IMAGEM: Use formato POV (Point of View) imersivo.
   - Se a entrada for um VÍDEO: Mantenha o formato de vídeo dinâmico.

ESTRUTURA DO OUTPUT (3 CENAS DE 8 SEGUNDOS):

CENA 1 (0-8s) - O GANCHO VIRAL E HISTÓRIA:
- Comece com um GANCHO nos primeiros 3 segundos que prenda a atenção imediatamente.
- Conte uma pequena história criativa sobre o produto, focando no benefício real.

CENA 2 (8-16s) - ESCASSEZ E URGÊNCIA:
- Narração focada em estoque limitado, promoções relâmpago e "últimas unidades". FOMO agressivo.

CENA 3 (16-24s) - CTA (CALL TO ACTION):
- Chamada direta para ação: "Clique no carrinho laranja que aparece aqui embaixo, no canto inferior esquerdo da sua tela".
- Instrução visual: Se houver modelo, ele deve apontar com sua mão direita para baixo (em direção ao canto esquerdo do espectador).

O seu resultado final será o prompt que o usuário vai copiar e colar no Flow. Deve ser técnico, direto e poderoso.`;

export async function generateFlowPrompt(config: PromptConfig): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const isVideo = config.media?.mimeType.startsWith('video');
  
  const parts: any[] = [
    { text: `Gere o prompt mestre para o Flow. 
      Tipo de mídia detectada: ${isVideo ? 'VÍDEO' : 'IMAGEM/PRINT'}.
      Aplique o formato ${isVideo ? 'VÍDEO DINÂMICO' : 'POV IMERSIVO'}.
      
      Diretrizes específicas do usuário:
      - Ideia: ${config.idea || 'Venda viral do produto'}
      - Idioma: Português Brasileiro Nativo
      - Restrições: Sem textos, sem bugs visuais, fidelidade total ao produto.
      
      Lembre-se: 3 cenas de 8 segundos, totalizando 24 segundos. Seja o melhor profissional de vendas do mundo.` }
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
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.75,
      },
    });

    return response.text || "Erro ao gerar prompt técnico.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Erro ao processar mídia. Verifique a conexão e o arquivo.");
  }
}
