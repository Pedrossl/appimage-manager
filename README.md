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
- Debian package: primeiro formato de distribuicao para Linux.
- Flatpak: formato planejado para Fedora, Arch, openSUSE e outras distribuicoes.

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
      i18n/                      traducoes da interface
      types/                     tipos compartilhados
  src-tauri/                     camada desktop em Rust/Tauri
  flatpak/                       manifesto e metadados para empacotamento Flatpak
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

Esse comando precisa ser executado em Linux ou em uma pipeline Linux. No macOS, o Tauri CLI gera apenas pacotes nativos de macOS, como `.app` e `.dmg`, entao o `.deb` deve ser validado em uma maquina Linux ou em CI.

## Gerar Flatpak

O projeto tambem possui um manifesto inicial em:

```txt
flatpak/com.pedrolobato.appimagelauncher.yml
```

No Debian, instale as ferramentas:

```bash
sudo apt install flatpak flatpak-builder
```

Adicione o Flathub, se ainda nao estiver configurado:

```bash
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

Gerar build Flatpak local:

```bash
npm run build:flatpak
```

Gerar e instalar localmente para teste:

```bash
npm run install:flatpak
```

Depois abra pelo menu de aplicativos ou pelo terminal:

```bash
flatpak run com.pedrolobato.appimagelauncher
```

Para distribuir fora de uma loja, o ideal e gerar um bundle `.flatpak` ou criar um repositorio Flatpak. Para publicacao mais profissional, o caminho natural e preparar o manifesto para o Flathub.

## Estado Atual

O projeto esta no inicio. A interface inicial ja tem:

- layout de launcher desktop;
- identidade visual puxada para verde;
- logo do app aplicado no favicon e nos icones Linux do Tauri;
- tema normal e dark mode;
- base de traducao para ingles, portugues e espanhol;
- sidebar;
- busca;
- estado vazio com acao de importacao;
- importacao real de `.AppImage` via seletor de arquivo do Tauri;
- biblioteca persistida localmente;
- preferencias de idioma e tema persistidas localmente;
- cards com abrir, corrigir permissao, abrir pasta e remover;
- feedback visual com notificacoes discretas;
- duplo clique no card para abrir;
- `Enter` na busca para abrir o primeiro resultado e `Esc` para limpar a busca;
- separacao inicial por componentes, usecases e tipos compartilhados.

A base Rust/Tauri inicial ja tem:

- `inspect_appimage`: valida um caminho `.AppImage` e retorna nome, caminho, versao inicial e permissao de execucao.
- `launch_appimage`: valida e executa um `.AppImage` quando ele possui permissao de execucao.
- `make_appimage_executable`: adiciona permissao de execucao a um `.AppImage` e retorna os metadados atualizados.
- `open_appimage_folder`: abre a pasta onde o `.AppImage` esta salvo.
- organizacao em `models`, `usecases` e `commands` dentro de `src-tauri/src/appimage`.
- configuracao de bundle inicial focada em `.deb`.
- manifesto inicial de Flatpak em `flatpak/`.

As proximas etapas sao evoluir a persistencia para SQLite ou arquivo de configuracao nativo, extrair icones/metadados dos AppImages e criar uma tela de detalhes.
