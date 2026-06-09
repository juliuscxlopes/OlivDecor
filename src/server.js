// server.js (Na raiz do projeto)
import express from 'express';
import cors from 'cors';
import path from 'path'; // <- Linha nova 1

const app = express();

app.use(express.json());
app.use(cors());

// Rota da API do Mercado Pago (Inalterada)
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
    return res.json({ preferenceId: data.id });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao gerar pagamento' });
  }
});

// --- AS LINHAS QUE FAZEM O VITE RODAR JUNTO NA PRODUÇÃO ---

// Entrega os arquivos de imagem, css e js da pasta dist do Vite
app.use(express.static('dist')); // <- Linha nova 2

// Garante que se o cliente der F5 em /catalogo ou /produto, o React não quebre
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html')); // <- Linha nova 3
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Motor ligado na porta ${PORT}. Servindo API e Frontend juntos!`);
});