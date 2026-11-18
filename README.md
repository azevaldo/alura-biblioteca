# 📚 alura-biblioteca

> Ferramenta de linha de comando (CLI) em **Node.js** que lê um ficheiro de texto e identifica as **palavras repetidas em cada parágrafo**, gerando um relatório em `resultado.txt`.

Projeto desenvolvido durante o curso **"JavaScript com Node.js: criando sua primeira biblioteca"** da [Alura](https://www.alura.com.br/).

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/status-concluído-brightgreen?style=for-the-badge)

---

## 📌 Índice

- [Sobre o projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Como executar](#-como-executar)
- [Exemplo de saída](#-exemplo-de-saída)
- [Como funciona por dentro](#-como-funciona-por-dentro)
- [Tratamento de erros](#-tratamento-de-erros)
- [O que aprendi](#-o-que-aprendi)
- [Melhorias futuras](#-melhorias-futuras)

---

## 💡 Sobre o projeto

Ao escrever textos, é comum repetirmos a mesma palavra várias vezes dentro de um parágrafo sem perceber. Esta biblioteca resolve isso: basta indicar o ficheiro de texto e a pasta de destino, e a CLI devolve um relatório com as palavras duplicadas, parágrafo a parágrafo.

O objetivo principal do curso foi aprender os fundamentos do **Node.js** na prática: módulos, sistema de ficheiros, programação assíncrona, tratamento de erros e criação de uma interface de linha de comando.

---

## ✨ Funcionalidades

- 📄 Leitura de ficheiros `.txt` com o módulo nativo `fs`
- ✂️ Divisão do texto em parágrafos e em palavras
- 🧹 Limpeza de pontuação (`. , / # ! $ % ^ & * ; : { } = - _ \` ~ ( )`)
- 🔡 Normalização para minúsculas (ex.: `Web` e `web` contam como a mesma palavra)
- 🚫 Ignora palavras com menos de 3 letras (artigos, preposições curtas, etc.)
- 🔁 Contagem de ocorrências e filtragem das palavras que aparecem **mais de uma vez**
- 💾 Geração automática do ficheiro `resultado.txt` na pasta indicada
- 🎨 Mensagens coloridas no terminal com **chalk**
- ⚙️ Opções de linha de comando com **commander** (`--texto`, `--destino`, `--help`, `--version`)
- ⚠️ Tratamento de erros (ex.: ficheiro não encontrado)

---

## 🛠 Tecnologias

| Tecnologia | Uso |
|---|---|
| [Node.js](https://nodejs.org/) | Ambiente de execução |
| JavaScript (ES Modules) | Linguagem (`"type": "module"`) |
| [commander](https://www.npmjs.com/package/commander) | Criação da CLI e leitura das opções |
| [chalk](https://www.npmjs.com/package/chalk) | Cores nas mensagens do terminal |
| `fs` / `path` (nativos) | Leitura/escrita de ficheiros e resolução de caminhos |

---

## 📁 Estrutura de pastas

```
alura-biblioteca/
├── arquivos/                 # Textos de exemplo para testar
│   ├── texto-aprendizado.txt
│   ├── texto-kanban.txt
│   └── texto-web.txt
├── resultados/               # Pasta sugerida para guardar os relatórios
│   └── resultado.txt
├── src/
│   ├── cli.js                # Ponto de entrada: CLI, leitura e escrita de ficheiros
│   ├── index.js              # Lógica de contagem de palavras
│   ├── helper.js             # Formatação do texto de saída
│   └── erros/
│       └── funcoesErro.js    # Tratamento de erros
├── package.json
└── README.md
```

---

## 🚀 Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) **18 ou superior** (as versões atuais do `chalk` e do `commander` exigem Node moderno)
- npm (já vem com o Node)

### Passo a passo

```bash
# 1. Clonar o repositório
git clone https://github.com/azevaldo/alura-biblioteca.git

# 2. Entrar na pasta
cd alura-biblioteca

# 3. Instalar as dependências
npm install

# 4. Executar a CLI
node src/cli.js --texto ./arquivos/texto-web.txt --destino ./resultados
```

Também pode usar as formas abreviadas:

```bash
node src/cli.js -t ./arquivos/texto-kanban.txt -d ./resultados
```

### Opções disponíveis

| Opção | Atalho | Descrição |
|---|---|---|
| `--texto <caminho>` | `-t` | Caminho do ficheiro de texto a ser processado |
| `--destino <caminho>` | `-d` | Pasta onde será criado o `resultado.txt` |
| `--help` | `-h` | Mostra a ajuda |
| `--version` | `-V` | Mostra a versão da CLI |

> ⚠️ A pasta de destino tem de existir. O ficheiro gerado chama-se sempre `resultado.txt` e é **substituído** a cada execução.

---

## 🖥 Exemplo de saída

**No terminal:**

```
$ node src/cli.js -t ./arquivos/texto-web.txt -d ./resultados
Texto processado com sucesso
arquivo criado
```

**Conteúdo de `resultados/resultado.txt`:**

```
palavras duplicadas no paragrafo 3 :
        uma
palavras duplicadas no paragrafo 7 :
        dispositivos, web, seu, conectado
palavras duplicadas no paragrafo 8 :
        cliente, uma, para
```

*(Excerto — parágrafos sem palavras repetidas aparecem com a lista vazia.)*

---

## 🔍 Como funciona por dentro

```
 ficheiro .txt
      │
      ▼
 cli.js ── fs.readFile ──► index.js
                            ├─ extraiParagrafos()        → minúsculas + split('\n')
                            ├─ verificaPalavrasDuplicadas() → conta palavras (≥ 3 letras)
                            └─ limpaPalavras()           → remove pontuação (regex)
      │
      ▼
 helper.js
   ├─ filtraOcorrencias()  → mantém só as palavras com contagem > 1
   └─ montaSaidaArquivo()  → monta o texto final
      │
      ▼
 cli.js ── fs.promises.writeFile ──► resultado.txt
```

O coração da contagem é um objeto usado como "dicionário":

```js
resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1
```

Para cada parágrafo é gerado um objeto como `{ web: 2, computador: 1, ... }`, e depois apenas as chaves com valor maior que 1 vão para o relatório.

---

## ⚠️ Tratamento de erros

| Situação | Mensagem |
|---|---|
| Falta `--texto` ou `--destino` | Mensagem de erro + ajuda da CLI |
| Ficheiro de origem não existe (`ENOENT`) | `Arquivo não encontrado` |
| Qualquer outro erro | `Erro na aplicação` |

---

## 🎓 O que aprendi

- Criar e organizar um projeto Node.js com `npm init` e **ES Modules** (`import` / `export`)
- Ler e escrever ficheiros com `fs` (callbacks) e `fs.promises` (Promises)
- Diferença entre **callbacks**, **`.then()/.catch()`** e **`async/await`**
- Usar `try/catch` e criar funções dedicadas ao **tratamento de erros**
- Manipular strings e arrays: `split`, `replace` com **regex**, `forEach`, `filter`, `flatMap`, `Object.keys`
- Usar objetos como contadores (padrão "dicionário")
- Separar responsabilidades em módulos (`cli`, `index`, `helper`, `erros`)
- Instalar e usar **bibliotecas externas** do npm (`chalk`, `commander`)
- Construir uma **CLI** com opções e ajuda automática
- Usar `path.resolve` para lidar com caminhos relativos e absolutos

---

## 🔮 Melhorias futuras

- [ ] Adicionar um script `npm run cli` / campo `bin` no `package.json` para usar como comando global
- [ ] Mostrar a mensagem de sucesso apenas depois de o ficheiro ser realmente gravado
- [ ] Omitir do relatório os parágrafos sem palavras repetidas
- [ ] Mostrar quantas vezes cada palavra se repete (ex.: `web (3x)`)
- [ ] Criar a pasta de destino automaticamente se não existir
- [ ] Permitir escolher o nome do ficheiro de saída
- [ ] Adicionar testes automatizados (ex.: com Jest)

---

## 📄 Licença

Distribuído sob a licença **ISC**. Projeto de fins educativos, criado a partir do curso da Alura.

---

<p align="center">Feito com 💚 e Node.js durante os estudos na Alura</p>
