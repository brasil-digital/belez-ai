exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { photos } = JSON.parse(event.body);

    const imgContents = photos.flatMap((p, i) => [
      { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: p.split(',')[1] } },
      { type: 'text', text: `(Foto ângulo: ${['frente', 'esquerdo', 'direito'][i]})` }
    ]);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 1200,
        system: `Você é especialista em dermatologia estética, odontologia e cuidados faciais com 20 anos de experiência clínica no Brasil.
Analise as fotos do rosto do usuário e retorne APENAS JSON válido sem markdown nem texto extra:
{
  "score":<0-100>,
  "grade":"<Excelente|Muito Bom|Bom|Regular|Precisa Atenção>",
  "summary":"<frase motivadora e profissional>",
  "age_estimated":<número>,
  "skin_tone":"<tom de pele>",
  "skin":{"score":<0-100>,"hydration":<0-100>,"texture":<0-100>,"spots":<0-100>,"analysis":"<2-3 frases profissionais>"},
  "wrinkles":{"score":<0-100>,"forehead":<0-100>,"eyesContour":<0-100>,"nasolabial":<0-100>,"analysis":"<2-3 frases profissionais>"},
  "dental":{"score":<0-100>,"whitening":<0-100>,"alignment":<0-100>,"analysis":"<1-2 frases profissionais>"},
  "procedures":[{"name":"<nome>","feasible":<bool>,"reason":"<razão concisa>"}],
  "tips":["<dica 1>","<dica 2>","<dica 3>","<dica 4>","<dica 5>"]
}
procedures deve incluir: Botox, Preenchimento Labial, Peeling Químico, Microagulhamento, Harmonização Facial, Clareamento Dental, Lentes de Contato Dental — com feasible true ou false baseado na análise real.
Seja encorajador, realista e extremamente profissional.`,
        messages: [{ role: 'user', content: [...imgContents, { type: 'text', text: 'Realize a análise facial completa e retorne o JSON.' }] }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return { statusCode: response.status, body: JSON.stringify({ error: data }) };
    }

    const txt = data.content.map(b => b.text || '').join('').replace(/```json|```/g, '').trim();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: txt
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
