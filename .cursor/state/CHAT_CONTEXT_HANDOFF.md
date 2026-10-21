# CHAT CONTEXT HANDOFF

## Objetivo

Consolidar o estado integral de `joao-main`, inclusive o working tree não commitado, como versão definitiva de `develop`; depois manter apenas `main` e `develop` localmente e no remoto próprio `origin`.

## Requisitos

- `develop` deve terminar com exatamente o mesmo snapshot de arquivos observado na branch atual após incluir os ajustes não commitados.
- `main` deve ser preservada.
- Excluir todas as outras branches locais e do `origin`.
- Não alterar branches do remoto upstream externo `joao`.

## Restrições

- Não executar testes sem solicitação explícita.
- Não descartar nenhuma alteração não commitada.
- Não usar `git reset --hard` nem `git clean`.
- Não expor credenciais durante a publicação.

## Decisões arquiteturais

- Criar um snapshot commitado de todo o working tree para que o estado não se perca durante a troca de branch.
- Mover `develop` para esse commit e publicar com `--force-with-lease`, pois a branch atual e a `develop` divergiram.
- Apagar somente branches locais e branches do `origin`; refs do remoto `joao` permanecem como upstream consultável.

## Contexto durável

- Estado inicial: `joao-main` em `d23797b814a401e0c02915da653051536acb0576`.
- Alterações não commitadas confirmadas: `run-local-production.cmd`, `package-lock.json`, `WORK_CHECKPOINT.md` e `CHAT_CONTEXT_HANDOFF.md`.
- Branches do `origin` antes da operação: `main`, `develop`, `fork`, `forkfork`.
- Branches locais antes da operação: `codex/web-image-handoff`, `develop`, `fork`, `forkfork`, `joao-main`, `main`.
- Snapshot inicial consolidado: `b6563591d25989287233aaade91bf180bf2abb4e`.
- Limpeza concluída: somente `main` e `develop` permanecem localmente e no `origin`.
- O remoto externo `joao` e suas refs de acompanhamento foram preservados; nenhuma branch foi apagada no repositório upstream de terceiro.
