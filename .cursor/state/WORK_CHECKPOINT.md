# WORK CHECKPOINT

## Objetivo

Transformar o estado completo atual da branch `joao-main`, incluindo alterações não commitadas, no estado definitivo de `develop`, publicar no `origin` e manter somente `main` e `develop` localmente e no `origin`.

## Etapa atual

Inventário concluído; preparando o snapshot exato antes da substituição de `develop` e da exclusão das demais branches.

## Concluído

- Confirmada a branch atual `joao-main` no commit `d23797b814a401e0c02915da653051536acb0576`.
- Confirmadas alterações não commitadas em `run-local-production.cmd`, `package-lock.json` e `.cursor/state/*`.
- Atualizados e podados os refs dos remotos com `git fetch --all --prune`.
- Confirmado que o remoto de publicação é `origin` (`igorosilva/codex-chatgpt-web`) e que `joao` é upstream externo.
- Confirmadas as branches remotas atuais do `origin`: `main`, `develop`, `fork` e `forkfork`.

## Parcial

- O snapshot final ainda precisa ser commitado e publicado.

## Pendente

- Verificar o conteúdo que será versionado contra padrões de credenciais.
- Criar um commit único com todo o estado atual, incluindo os ajustes antes não commitados.
- Fazer `develop` apontar exatamente para esse snapshot.
- Publicar `develop` com proteção `--force-with-lease`.
- Excluir `origin/fork` e `origin/forkfork`.
- Excluir todas as branches locais exceto `main` e `develop`.
- Verificar refs locais e remotos após `fetch --prune`.

## Bloqueado

- Nenhum bloqueio atual.

## Arquivos alterados

- `run-local-production.cmd`
- `package-lock.json`
- `.cursor/state/WORK_CHECKPOINT.md`
- `.cursor/state/CHAT_CONTEXT_HANDOFF.md`

## Decisões

- Incluir todos os arquivos não commitados, conforme confirmação explícita do usuário.
- Limpar branches somente no `origin` e localmente; não alterar branches do remoto upstream externo `joao`.
- Preservar `main` sem reescrever seu conteúdo.
- Usar `--force-with-lease` ao substituir `origin/develop`, evitando sobrescrever uma atualização remota inesperada.
- Não executar testes, conforme restrição explícita do projeto; executar apenas validações Git e de conteúdo.

## Validações executadas

- `git status --short --branch --untracked-files=all`.
- `git diff` e inventário de arquivos não rastreados.
- `git log --graph --decorate --oneline --all`.
- Comparação de divergência entre `HEAD`, `develop` e `origin/develop`.
- `git ls-remote --heads origin`.

## Erros encontrados

- Nenhum erro operacional até o momento.

## Último comando relevante

`git fetch --all --prune` seguido do inventário completo de refs, diferenças e branches remotas.

## Próximo passo EXATO

Adicionar todo o estado atual ao índice, revisar o diff staged e procurar padrões de credenciais antes de criar o snapshot definitivo.
