// server.js (Na raiz do projeto)
import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(express.json());
app.use(cors());

// Rota da API do Mercado Pago (Protegida)
app.post('/api/checkout', async (req, res) => {
  try {
    const { product } = req.body;
    
    const mpResponse = await fetch('https://api.mercadopago.com/v1/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: [
          {
            id: product.id,
            title: product.title,
            quantity: 1,
            currency_id: 'BRL',
            unit_price: Number(product.price)
          }
        ]
      })
    });

    const data = await mpResponse.json();

    // TRAVA 1: Se o Mercado Pago recusar, cospe o erro no log do Railway e avisa o front
    if (!mpResponse.ok) {
      console.error(' [Mercado Pago Erro]:', data);
      return res.status(mpResponse.status).json({ error: 'Mercado Pago recusou a criação da preferência.' });
    }

    return res.json({ preferenceId: data.id });

  } catch (error) {
    // TRAVA 2: Se o servidor cair por erro de código/rede, printa o erro real no log
    console.error(' [Server Erro Crítico]:', error);
    return res.status(500).json({ error: 'Erro interno ao gerar pagamento' });
  }
});

// --- ENTREGA DO FRONTEND ---

// Serve os arquivos estáticos da build do Vite
app.use(express.static('dist'));

// Resguarda as rotas do React Router (F5 em qualquer página)
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(` Motor ligado na porta ${PORT}. Servindo API e Frontend juntos!`);
});