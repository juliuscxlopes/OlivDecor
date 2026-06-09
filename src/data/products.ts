// src/data/products.ts

export interface Product {
  id: string;
  code: string;
  name: string;
  tag: string;
  desc: string;
  price: string;
  mainImage: string;  
  images: string[];    
  specs: { label: string; value: string }[];
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: '1',
    code: 'URB-YEL-01',
    name: 'Speedway Yellow Custom',
    tag: 'SÉRIE ARTESANAL',
    desc: 'Pintura sólida amarelo clássico brilhante com grafismo em linhas pretas. Destaque absoluto para a forração interna premium respirável em padrão diamante na cor terracota e friso externo cromado de alto brilho. Acompanha viseira bolha (bubble visor) transparente.'/*  paragrafo especifico ' personalisações disponiveis a consultar com o vendedor */,
    price: '550',
    mainImage: '/images/produtos/urb-yel-01/LEFT.jpeg',
    images: [
      '/images/produtos/urb-yel-01/FRONT.jpeg',
      '/images/produtos/urb-yel-01/LEFT.jpeg',
      '/images/produtos/urb-yel-01/RIGTH.jpeg',
      '/images/produtos/urb-yel-01/BACK.jpeg',
      '/images/produtos/urb-yel-01/INSIDE.jpeg'
    ],
    specs: [
      { label: 'Casco', value: 'Fibra de vidro leve com alta absorção de impacto' },
      { label: 'Interior', value: 'Acolchoado premium respirável formato diamante terracota' },
      { label: 'Acabamento', value: 'Friso lateral cromado automotivo e botões de pressão' },
      { label: 'Viseira', value: 'Bubble visor transparente de policarbonato articulável' },
      { label: 'Segurança', value: 'Cinta jugular com engate rápido e ajuste micrométrico' }
    ]
  },
  {
    id: '2',
    code: 'URB-SIL-02',
    name: 'Silver Ghost Heritage',
    tag: 'EDIÇÃO LIMITADA',
    desc: 'Visual industrial minimalista em tom cinza claro/off-white brilhante de acabamento impecável. Desenvolvido para engolir quilômetros com estilo clássico, traz interior acolchoado anatômico marrom escuro costurado à mão e friso de contorno cromado premium.',
    price: '555',
    mainImage: '/images/produtos/urb-sil-02/LEFT.jpeg',
    images: [
      '/images/produtos/urb-sil-02/FRONT.jpeg',
      '/images/produtos/urb-sil-02/LEFT.jpeg',
      '/images/produtos/urb-sil-02/RIGTH.jpeg',
      '/images/produtos/urb-sil-02/BACK.jpeg'
    ],
    specs: [
      { label: 'Casco', value: 'Tri-composto de alta densidade e leveza' }, /* TODO: especificar que é fibra de virdro composta */
      { label: 'Interior', value: 'Camurça soft marrom acolchoada antialérgica' }, /* melhorar aqui um pouco tambem linhas pretas enfuim nao sei */
      { label: 'Grafismo', value: 'Linhas limpas com aplicação customizada em vinil' },
      { label: 'Viseira', value: 'Bubble removível com proteção contra poeira e insetos' }
    ]
  },
  {
    id: '3',
    code: 'URB-BLK-03',
    name: 'Midnight Jet Black',
    tag: 'SÉRIE CORE',
    desc: 'Preto brilhante profundo clássico com um contraste agressivo e refinado: forração interna soft em vermelho vivo acolchoada em padrão diamante. Acabamento lateral com friso cromado espelhado e fixação de viseira bolha para proteção total com estética old-school pura.',
    price: '550',
    mainImage: '/images/produtos/urb-blk-03/BACK.jpeg',
    images: [
      '/images/produtos/urb-blk-03/FRONT.jpeg',
      '/images/produtos/urb-blk-03/SIDE-LEFT.jpeg',
      '/images/produtos/urb-blk-03/RIGTH.jpeg',
      '/images/produtos/urb-blk-03/BACK.jpeg'
    ],
    specs: [
      { label: 'Casco', value: 'Resina termoplástica ABS injetada de alta resistência' },
      { label: 'Interior', value: 'Tecido naval vermelho com costuras reforçadas' },
      { label: 'Acabamento', value: 'Borda emborrachada com alma de aço cromada' },
      { label: 'Fixação', value: 'Fivela de engate rápido prático para o dia a dia' }
    ]
  },
  {
    id: '4',
    code: 'URB-BLKLIST-04',
    name: 'Black List Racing',
    tag: 'SÉRIE EXCLUSIVA',
    desc: 'Inspirado nas pistas de flat-track e na cultura custom de corrida. Base em preto brilhante absoluto com grafismo de faixas esportivas clássicas no topo. Interior em tecido escuro premium de alta densidade para máximo conforto e isolamento acústico sutil na estrada.',
    price: '550',
    mainImage: '/images/produtos/urb-blkList-04/BACK.jpeg',
    images: [
      '/images/produtos/urb-blkList-04/FRONT.jpeg',
      '/images/produtos/urb-blkList-04/LEFT.jpeg',
      '/images/produtos/urb-blkList-04/RIGTH.jpeg',
      '/images/produtos/urb-blkList-04/BACK.jpeg',
    ],
    specs: [
      { label: 'Casco', value: 'Fibra de carbono e vidro estruturada' }, /* nada de fibra de carbono tudo fibra de vidro..  */
      { label: 'Design', value: 'Racing Stripes clássicas de alta durabilidade sob o verniz' },
      { label: 'Interior', value: 'Forro preto premium microperfurado removível' },
      { label: 'Diferencial', value: 'Ajuste de encaixe firme perfeito para alta velocidade' }
    ]
  }
];