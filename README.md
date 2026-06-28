# AppImage Manager

AppImage Manager e um launcher desktop para organizar, visualizar e abrir aplicativos `.AppImage` no Linux a partir de uma biblioteca central.

A ideia do projeto e criar uma experiencia parecida com launchers como Lutris: o usuario adiciona seus AppImages, pesquisa rapidamente e abre o aplicativo com poucos cliques. No futuro, o app tambem pode ajudar com permissoes, icones, atalhos do sistema, metadados e ajustes mais avancados dos AppImages.

## Objetivo

- Cadastrar arquivos `.AppImage` em uma biblioteca local.
- Exibir os aplicativos em uma interface visual organizada.
- Abrir um AppImage com duplo clique ou botao de execucao.
- Detectar se o arquivo tem permissao de execucao.
- Organizar apps por favoritos e busca.
- Evoluir depois para edicao de nome, icone, `.desktop` e integracao com menu do Linux.

## Tecnologias

- Tauri: camada desktop nativa, leve e integrada ao sistema operacional.
- React: interface do usuario.
- TypeScript: tipagem do frontend e melhor manutencao.
- Rust: comandos nativos do Tauri, acesso ao sistema de arquivos e execucao dos AppImages.
- Vite: servidor de desenvolvimento e build do frontend.
- Debian package: primeiro formato de distribuicao planejado para Linux.

## Estrutura

```txt
appimage-manager/
  src/
    app/                         composicao principal da aplicacao
    components/                  componentes visuais compartilhados
    features/
      app-library/
        components/              telas e componentes da biblioteca
        usecases/                regras de aplicacao da biblioteca
    shared/
      data/                      dados temporarios ou mockados
      i18n/                      traducoes da interface
      types/                     tipos compartilhados
  src-tauri/                     camada desktop em Rust/Tauri
  package.json                   scripts e dependencias do frontend
  vite.config.ts                 configuracao do Vite
```

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

Gerar pacote `.deb`:

```bash
npm run build:deb
```

O pacote `.deb` sera gerado pela pipeline do Tauri dentro de `src-tauri/target/release/bundle/deb`.

## Estado Atual

O projeto esta no inicio. A interface inicial ja tem:

- layout de launcher desktop;
- identidade visual puxada para azul escuro;
- logo do app aplicado no favicon e nos icones Linux do Tauri;
- tema normal e dark mode;
- base de traducao para ingles, portugues e espanhol;
- sidebar;
- busca;
- cards de AppImages com dados mockados;
- separacao inicial por componentes, usecases e tipos compartilhados.

A base Rust/Tauri inicial ja tem:

- `inspect_appimage`: valida um caminho `.AppImage` e retorna nome, caminho, versao inicial e permissao de execucao.
- `launch_appimage`: valida e executa um `.AppImage` quando ele possui permissao de execucao.
- `make_appimage_executable`: adiciona permissao de execucao a um `.AppImage` e retorna os metadados atualizados.
- organizacao em `models`, `usecases` e `commands` dentro de `src-tauri/src/appimage`.
- configuracao de bundle inicial focada em `.deb`.

As proximas etapas sao conectar o frontend com esses comandos Rust/Tauri para selecionar arquivos `.AppImage`, salvar a biblioteca local e executar os aplicativos.
