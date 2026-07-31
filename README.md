# Desapego Universitário | VortexApp

O Desapego Universitário é uma plataforma Full Stack focada na economia circular dentro do campus universitário da UNIFOR. O objetivo principal é conectar estudantes que precisam comprar materiais acadêmicos acessíveis ou doar itens que não utilizam mais (como livros, jalecos, calculadoras e periféricos), promovendo o consumo consciente e a colaboração na comunidade acadêmica.

---

## Demonstração em Produção

O projeto está 100% implantado e funcional na nuvem:
* **Frontend (Aplicação Web):** [https://desapego-universitario.vercel.app/]
* **Backend (API REST):** [https://desapego-universitario-poy6.onrender.com]

---

## Tecnologias Utilizadas

### Frontend
* **React + Vite** (Interface rápida, moderna e componentizada)
* **CSS3** (Estilização autoral com tema Dark/Purple, layout responsivo com CSS Grid/Flexbox)
* **Componentes customizados:** Navbar, HeroSection, AdsGrid, AdForm e Toast (substituindo alertas nativos do navegador)

### Backend
* **Node.js + Express** (API RESTful para rotas de leitura e cadastro)
* **SQLite** (Banco de dados relacional leve e embutido)
* **CORS & JSON Parsing** (Comunicação segura entre cliente e servidor)

---

## Funcionalidades Principais

1. **Catálogo Dinâmico:** Visualização de anúncios em formato de grid cards com indicação visual de categoria, tipo (Venda/Doação) e preço.
2. **Filtros por Categoria:** Filtragem em tempo real entre *Todos*, *Livros*, *Eletrônicos* e *Vestuário*.
3. **Publicação de Anúncios:** Formulário intuitivo para cadastrar novos itens (POST na API), com feedback visual instantâneo via Toast flutuante.
4. **Interatividade Rápida:** Botão de interesse no card, simulando o fluxo de contato presencial no campus.
5. **Responsividade Total:** Interface adaptada para Desktop, Tablets e Dispositivos Móveis (Mobile-First).

---

## Uso de Inteligência Artificial no Desenvolvimento

A Inteligência Artificial (Gemini) foi utilizada durante o desenvolvimento do projeto como uma ferramenta de **Pair Programming** e aceleração de entrega, aplicando técnicas de Engenharia de Prompt para estruturação de arquitetura, criação de endpoints RESTful e componentização em React.

### Prompts Utilizados no Fluxo de Desenvolvimento

* **Prompt 1 (Setup do Backend e Banco de Dados):**  
  > *"Atue como um desenvolvedor Node.js Sênior. Estou construindo uma API RESTful com Express e SQLite para um marketplace universitário. Escreva o código inicial de um arquivo server.js que configure o Express, habilite o CORS e crie uma tabela no SQLite chamada 'ads' (com id, title, description, category, price, type, e imageUrl). Não precisa fazer o CRUD ainda, apenas a inicialização do servidor."*  
  **Objetivo:** Estruturar a base do backend rapidamente e configurar o banco de dados local.

* **Prompt 2 (CRUD de Anúncios):**  
  > *"Atue como desenvolvedor Node.js Sênior. Agora que o server.js está rodando com o SQLite, adicione os endpoints básicos no mesmo arquivo para gerenciar os anúncios, retornando os dados em JSON: 1) Um POST /ads para criar um anúncio. 2) Um GET /ads para listar todos os anúncios, permitindo filtrar por categoria usando query params (?category=...). 3) Um DELETE /ads/:id para deletar um anúncio pelo ID. Trate os erros básicos com try/catch ou callbacks."*  
  **Objetivo:** Implementar os requisitos mínimos do backend exigidos no processo seletivo do Laboratório Vortex.

* **Prompt 3 (Landing Page UI e Filtros):**  
  > *"Atue como um Desenvolvedor React Sênior. Crie a estrutura de uma Landing Page em um único arquivo (App.jsx) para um marketplace de economia circular universitário. A página deve ter um Hero Section com CTA, uma seção de estatísticas simuladas e uma vitrine de anúncios (mockados por enquanto) com botões para filtrar por categorias (Todos, Livros, Eletrônicos, Vestuário). Use um design limpo e moderno, garantindo que seja responsivo para mobile."*  
  **Objetivo:** Acelerar a criação da interface pública e garantir os requisitos visuais e de filtragem exigidos no edital.

* **Prompt 4 (Integração Frontend-Backend):**  
  > *"Atue como Desenvolvedor React e Node.js Sênior. Preciso integrar minha Landing Page (que usa useState com dados mockados) com minha API RESTful que roda em http://localhost:3000/ads. Refatore o componente principal App.jsx para: 1) Usar useEffect e fetch para buscar os anúncios reais do GET /ads ao carregar a página. 2) Conectar o formulário ao POST /ads, enviando os dados em JSON e atualizando a lista de anúncios automaticamente após o cadastro com sucesso."*  
  **Objetivo:** Conectar o estado da interface em React com a persistência de dados real do servidor Node.js.

---

### Relato de Alucinação / Erro da IA e Solução

Durante o processo de configuração dos ícones e assets, a IA apresentou uma falha conceitual de resolução de imagens que exigiu análise crítica e correção manual:

* **O Problema (Alucinação em Metadados de Imagens para PWA):**  
  Ao gerar instruções para a configuração dos ícones do PWA (Progressive Web App), o Gemini afirmou de forma incorreta que bastava fazer o download de qualquer ícone em qualquer proporção da biblioteca de ícones do Google e simplesmente **renomear o arquivo** para `pwa-512x512.png` ou `pwa-192x192.png`. A IA assumiu erroneamente que o navegador e o manifesto PWA validam o tamanho da imagem apenas pelo nome do arquivo, ignorando a resolução real em pixels.
* **A Solução:**  
  Como a renomeação não altera as dimensões reais do bitmap (gerando avisos de manifesto inválido e ícones distorcidos ou rejeitados pelo navegador), foi necessário intervir manualmente: baixar os ícones vetoriais originais e redimensioná-los com as proporções exatas de 192x192 e 512x512 pixels antes de exportá-los para a pasta `public`.
---

## Como Executar o Projeto Localmente

### 1. Clonar o repositório
```bash
git clone [https://github.com/JatanaelDantas/Desapego_Universitario.git]
cd Desapego_Universitario
