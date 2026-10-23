# Brev.ly - specs extraidas do Figma (pagina Projeto e componentes)

## Card (New link / My links / Redirect)
- Fundo: #F9F9FB (gray-100) sobre pagina #E4E6EC (gray-200). Raio 8px (rounded-lg). Sem borda.
- Desktop: padding 32px (p-8); gap 24px no New link, 20px no My links. Larguras: New link 380px, My links 580px.
- Mobile (390px): largura 366px, padding 24px (p-6); gap 20px no New link, 16px no My links.
- Redirect desktop: 580px, padding 64px vertical / 48px horizontal, gap 24px.

## Input
- Label 10px/14px, gray-500 (#4D505C); ativo: blue-base #2C46B1 bold; erro: #B12C4D bold. Gap label-campo 8px.
- Campo: 48px de altura, borda 1px gray-300 (#CDCFD5), raio 8px, padding horizontal 16px, SEM fundo proprio (transparente, herda o gray-100 do card).
- Ativo/erro: borda 1.5px na cor do estado.
- Texto 14px/18px gray-600 (#1F2025); placeholder gray-400 (#74798B).

## Prefixo brev.ly/
- Nas telas reais, o campo "link encurtado" vazio mostra "brev.ly/" como PLACEHOLDER gray-400, 14px.
- Preenchido, "brev.ly/Linkedin-Profile" aparece inteiro em gray-600, mesmo campo sem fundo. Nao ha estado com fundo gray-200 (isso e efeito do mockup do Thumbnail).

## Button
- Primary: fundo #2C46B1, raio 8px, altura 48px, padding 0 20px, gap 12px, label 14px/18px semibold branco.
- Secondary: fundo gray-200, raio 4px, altura 32px, padding 0 8px, gap 6px, icone 16px, label 12px/16px semibold gray-500.
- Disabled (ambos): mesma aparencia com opacity 50%.
- Loading: NAO existe no Figma (variantes: default, hover, disabled).
