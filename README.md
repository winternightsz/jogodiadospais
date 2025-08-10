# 🎯 Caça-Palavras — Dia dos Pais

Um jogo de caça-palavras interativo e responsivo desenvolvido em React, Tailwind CSS e Parcel, com tema especial para o Dia dos Pais.

## ✨ Características

- **🎮 Jogabilidade Intuitiva**: Clique na primeira e última letra da palavra para encontrá-la
- **📱 Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **🌙 Modo Escuro**: Toggle automático com persistência em localStorage
- **🎯 Três Dificuldades**: Fácil (10×10), Normal (12×12), Difícil (14×14)
- **💾 Persistência**: Salva progresso, dificuldade e palavras personalizadas
- **♿ Acessibilidade**: Navegação por teclado, ARIA labels, foco visível
- **🎨 UI Moderna**: Design limpo com Tailwind CSS e animações suaves

## 🚀 Como Jogar

1. **Selecionar Dificuldade**: Escolha entre Fácil, Normal ou Difícil
2. **Encontrar Palavras**: Clique na primeira letra, depois na última letra da palavra
3. **Usar Dicas**: Clique no botão "💡 Dica" para destacar a primeira letra de uma palavra
4. **Personalizar**: Edite a lista de palavras no botão "Editar Palavras"
5. **Nova Partida**: Gere um novo tabuleiro mantendo a dificuldade escolhida

## 🛠️ Tecnologias

- **React 18** - Framework de interface
- **Tailwind CSS** - Framework de estilos utilitários
- **Parcel** - Bundler e servidor de desenvolvimento
- **LocalStorage** - Persistência de dados no navegador

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Passos
```bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd jogodiadospais

# 2. Instalar dependências
npm install

# 3. Executar em modo desenvolvimento
npm run start

# 4. Construir para produção
npm run build
```

## 🎯 Funcionalidades do Jogo

### Dificuldades
- **Fácil (10×10)**: Apenas horizontal e vertical, para frente
- **Normal (12×12)**: Horizontal, vertical e diagonal, frente e trás
- **Difícil (14×14)**: Todas as 8 direções, frente e trás

### Palavras Padrão
```
PAI, AMOR, FAMILIA, CARINHO, ABRACO
EXEMPLO, FORCA, CUIDADO, RISOS, RESPEITO
```

### Controles
- **Mouse/Touch**: Clique duplo para selecionar palavras
- **Teclado**: Setas para navegar, Enter para selecionar
- **Dica**: Destaca primeira letra por 3 segundos
- **Edição**: Modal para personalizar lista de palavras

## 🎨 Design System

### Paleta de Cores
- **Primária**: Indigo (600/700)
- **Sucesso**: Emerald (600/700) 
- **Texto**: Slate (900/100)
- **Fundo**: Slate (50/900)

### Componentes
- **Botões**: Variações primário, secundário e ghost
- **Cards**: Superfícies elevadas com sombras e bordas
- **Grid**: Células responsivas com estados visuais
- **Modal**: Overlay com backdrop blur e trap de foco

### Responsividade
- **Mobile**: Layout empilhado verticalmente
- **Desktop**: Grid 12 colunas (8 para tabuleiro, 4 para controles)
- **Breakpoint**: md+ (768px)

## 🔧 Estrutura do Projeto

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── Header.jsx      # Cabeçalho com título e gradiente
│   ├── Controls.jsx    # Controles de jogo e dificuldade
│   ├── WordList.jsx    # Lista de palavras com progresso
│   ├── WordSearchGrid.jsx # Grid interativo do jogo
│   └── WordsEditorModal.jsx # Modal para editar palavras
├── game/
│   └── Game.jsx        # Componente principal do jogo
├── lib/                # Utilitários e lógica de negócio
│   ├── grid.js         # Geração e validação do grid
│   ├── storage.js      # Operações de localStorage
│   └── utils.js        # Funções utilitárias gerais
├── App.jsx             # Componente raiz da aplicação
├── main.jsx            # Ponto de entrada
└── index.css           # Estilos globais e animações
```

## 🎮 Lógica do Jogo

### Geração do Grid
1. Criar matriz vazia do tamanho da dificuldade
2. Posicionar palavras aleatoriamente nas direções permitidas
3. Preencher espaços vazios com letras A-Z aleatórias
4. Validar posicionamento e colisões

### Validação de Palavras
1. Verificar se o caminho é uma linha reta
2. Extrair palavra do grid (frente e trás)
3. Comparar com lista de palavras válidas
4. Marcar como encontrada se válida

### Seleção de Palavras
1. Primeiro clique marca início da seleção
2. Segundo clique marca fim da seleção
3. Sistema gera caminho entre os pontos
4. Valida e marca palavra se encontrada

## ♿ Acessibilidade

- **ARIA Labels**: Descrições claras para leitores de tela
- **Navegação por Teclado**: Setas para mover foco, Enter para selecionar
- **Foco Visível**: Ring de foco em todos os elementos interativos
- **Contraste**: Cores com contraste adequado (modo claro/escuro)
- **Semântica**: HTML semântico com roles apropriados

## 🌙 Modo Escuro

- **Toggle Automático**: Botão para alternar entre temas
- **Persistência**: Preferência salva em localStorage
- **Transições Suaves**: Animações de 200ms para mudanças
- **Cores Adaptativas**: Paleta otimizada para cada tema

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px - Layout empilhado
- **Desktop**: ≥ 768px - Grid de 12 colunas

### Adaptações
- **Grid**: Centralizado com tamanho adaptativo
- **Controles**: Empilhados em mobile, lado a lado em desktop
- **Tipografia**: Tamanhos responsivos (text-4xl md:text-5xl)
- **Espaçamento**: Padding e gaps adaptativos

## 🚀 Deploy

### Build de Produção
```bash
npm run build
```

### Arquivos Gerados
- `dist/index.html` - HTML otimizado
- `dist/*.js` - JavaScript bundle
- `dist/*.css` - CSS otimizado

### Servidor Estático
Qualquer servidor web estático pode servir os arquivos da pasta `dist/`.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- **React Team** - Framework incrível
- **Tailwind CSS** - Sistema de design utilitário
- **Parcel** - Bundler rápido e simples
- **Comunidade** - Feedback e sugestões

---

**Desenvolvido com ❤️ para celebrar o Dia dos Pais!**
