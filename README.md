# AppImage Manager

AppImage Manager e um launcher desktop para organizar, visualizar e abrir aplicativos `.AppImage` no Linux a partir de uma biblioteca central.

A ideia do projeto e criar uma experiencia parecida com launchers como Lutris: o usuario adiciona seus AppImages, organiza por categorias, pesquisa rapidamente e abre o aplicativo com poucos cliques. No futuro, o app tambem pode ajudar com permissoes, icones, atalhos do sistema, metadados e ajustes mais avancados dos AppImages.

## Objetivo

- Cadastrar arquivos `.AppImage` em uma biblioteca local.
- Exibir os aplicativos em uma interface visual organizada.
- Abrir um AppImage com duplo clique ou botao de execucao.
- Detectar se o arquivo tem permissao de execucao.
- Organizar apps por categoria, favoritos e busca.
- Evoluir depois para edicao de nome, icone, `.desktop` e integracao com menu do Linux.

## Tecnologias

- Tauri: camada desktop nativa, leve e integrada ao sistema operacional.
- React: interface do usuario.
- TypeScript: tipagem do frontend e melhor manutencao.
- Rust: comandos nativos do Tauri, acesso ao sistema de arquivos e execucao dos AppImages.
- Vite: servidor de desenvolvimento e build do frontend.

## Requisitos

Para desenvolvimento completo no desktop:

- Node.js
- npm
- Rust
- Dependencias do Tauri para Linux

Se Rust ainda nao estiver instalado, instale pelo site oficial:

https://www.rust-lang.org/tools/install

Tambem confira os pre-requisitos do Tauri para Linux:

https://tauri.app/start/prerequisites/

## Como Rodar

Entre na pasta do projeto:

```bash
cd /Users/pedrolobato/Documents/PROJETOS/appimage-manager
```

Instale as dependencias:

```bash
npm install
```

Rodar apenas o frontend no navegador:

```bash
npm run dev
```

Rodar o app desktop com Tauri:

```bash
npm run tauri dev
```

Gerar build do frontend:

```bash
npm run build
```

Gerar build desktop:

```bash
npm run tauri build
```
