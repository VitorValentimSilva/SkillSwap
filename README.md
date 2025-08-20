# SkillSwap

> **SkillSwap** é um aplicativo mobile (Expo + React Native) que conecta pessoas que querem **ensinar** e **aprender** habilidades localmente. O projeto utiliza Firebase (Auth + Firestore + Cloud) para autenticação e persistência e Pinata/IPFS para armazenamento de conteúdos (vídeos).

## Demonstração / Screenshots

```md
![Home](/assets/home.png)
![Listagem](/assets/listagem.png)
![Filtros](/assets/filtros.png)
![Perfil](/assets/perfil.png)
```
## Descrição do projeto

SkillSwap é um aplicativo mobile criado com Expo e React Native que permite usuários se conectarem para ensinar e aprender habilidades localmente (ex.: aulas de violão, programação, culinária). O app usa Firebase Auth para autenticação e Firestore/Cloud. Também integra Pinata/IPFS para hospedagem de vídeos enviados pelos instrutores.

## Motivação e diferencial

- Incentiva a economia colaborativa e o compartilhamento de habilidades dentro de comunidades locais.
- Foco em match local (mostrando habilidades por cidade do usuário) para fortalecer redes de vizinhança.
- Sistema de filtros avançados (categoria, dificuldade, formato) e agendamento direto pelas ofertas.
- Temas claro/escuro configuráveis pelo usuário.

## Funcionalidades principais

- Cadastro/login por e-mail e senha (Firebase Auth).
- Perfil do usuário com foto, cidade, telefone e bio.
- Criação de habilidades (workflow em 4 etapas) com título, descrição, categoria, preço, formato, dificuldade, vídeos (Pinata/IPFS) e disponibilidade.
- Listagem de habilidades por categoria e por cidade do usuário.
- Busca por texto e filtros (categoria, dificuldade, formato).
- Modal de agendamento (escolha de dia e horário) para marcar aulas.
- Dashboard pessoal para editar/excluir habilidades.
- Suporte a temas (claro/escuro).

## Tecnologias

- Frontend: Expo, React Native, NativeWind (Tailwind), React Navigation, React Hook Form, Zod
- BaaS: Firebase (Auth, Firestore)
- Armazenamento de mídia: Pinata (IPFS) para vídeos
- Outros libs: expo-image-picker, expo-location, expo-file-system, react-native-gesture-handler, react-native-reanimated

## Rodando no celular (Expo Go + QR)

Para testar no celular de outra pessoa ou para instruir alguém a testar:

1. Peça para instalar o Expo Go na App Store (iOS) ou Google Play (Android).
2. Inicie o projeto localmente com npm run start (abre o Expo Dev Tools).
3. No painel do Expo será exibido um QR code.
4. Abra o Expo Go no celular e use a opção de escanear QR code — o app será carregado diretamente no dispositivo.
