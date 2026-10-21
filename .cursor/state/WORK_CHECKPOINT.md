# WORK CHECKPOINT

## Objetivo

Tornar `C:\Users\igors\OneDrive\Documentos\frontend-visual-qa` a versão definitiva da skill, tanto na instalação ativa quanto no pacote usado por reinstalações, impedindo sua remoção por seleção opcional.

## Etapa atual

Concluída localmente: fonte autoritativa, pacote de reinstalação e instalação ativa estão idênticos; a skill passou a ser obrigatória no launcher.

## Concluído

- Confirmada a branch atual `joao-main` no commit `d23797b814a401e0c02915da653051536acb0576`.
- Confirmadas alterações não commitadas em `run-local-production.cmd`, `package-lock.json` e `.cursor/state/*`.
- Atualizados e podados os refs dos remotos com `git fetch --all --prune`.
- Confirmado que o remoto de publicação é `origin` (`igorosilva/codex-chatgpt-web`) e que `joao` é upstream externo.
- Confirmadas as branches remotas atuais do `origin`: `main`, `develop`, `fork` e `forkfork`.
- Criado o snapshot `b6563591d25989287233aaade91bf180bf2abb4e` com todos os ajustes antes não commitados.
- `origin/develop` foi substituída por esse snapshot com `--force-with-lease`.
- `origin/fork` e `origin/forkfork` foram excluídas.
- As branches locais `codex/web-image-handoff`, `fork`, `forkfork` e `joao-main` foram excluídas.
- Confirmado que somente `main` e `develop` permanecem localmente e no `origin`.
- Sincronizados `.managed-by-codex-web-gpt`, `SKILL.md` e `agents/openai.yaml` da pasta fornecida para o pacote e a instalação ativa.
- Confirmada igualdade SHA-256 dos três arquivos nas três localizações.
- Adicionada `frontend-visual-qa` a `REQUIRED_SKILLS` para impedir remoção por seleção salva antiga ou vazia.
- Confirmado que não existe `src/skills`, portanto `launcher/assets/skills` é a fonte local de reinstalação com precedência efetiva.

## Parcial

- Nenhum item parcial.

## Pendente

- Commit e push não foram feitos porque esta solicitação não concedeu autorização Git explícita para publicação.

## Bloqueado

- Nenhum bloqueio atual.

## Arquivos alterados

- `launcher/assets/skills/frontend-visual-qa/SKILL.md`
- `launcher/assets/skills/frontend-visual-qa/agents/openai.yaml`
- `launcher/electron/bundled-skills.cjs`
- `.cursor/state/WORK_CHECKPOINT.md`
- `.cursor/state/CHAT_CONTEXT_HANDOFF.md`

## Decisões

- A pasta fornecida pelo usuário é a fonte autoritativa; não reinterpretar nem reescrever suas instruções.
- Sincronizar todo o pacote da skill, incluindo `.managed-by-codex-web-gpt` e `agents/openai.yaml`.
- Tornar `frontend-visual-qa` obrigatória na seleção do launcher para que reinstalações não a removam.
- Não executar nem alterar testes, conforme restrição explícita do projeto; executar validações estruturais e de hash.

## Validações executadas

- `git status --short --branch --untracked-files=all`.
- `git diff` e inventário de arquivos não rastreados.
- `git log --graph --decorate --oneline --all`.
- Comparação de divergência entre `HEAD`, `develop` e `origin/develop`.
- `git ls-remote --heads origin`.
- `git diff --cached --check` sem erros.
- Varredura do conteúdo staged sem credenciais; ocorrências encontradas eram apenas o nome da dependência `tiktoken`.
- `git diff --exit-code develop origin/develop` sem diferenças após a publicação principal.
- `git diff --exit-code main origin/main` sem diferenças.
- `git fsck --no-dangling --no-progress` concluído sem erro.
- `node --check launcher/electron/bundled-skills.cjs` concluído sem erro.
- Validação direta de seleção vazia retornou `frontend-visual-qa` entre as skills obrigatórias.
- Frontmatter de `SKILL.md` reconhecido com `name` e `description`.
- Hashes SHA-256 idênticos entre fonte, pacote e instalação ativa.
- `git diff --check` sem erros.

## Erros encontrados

- Nenhum erro operacional até o momento.

## Último comando relevante

Validação de sintaxe e contrato de seleção do instalador, frontmatter, precedência da fonte e hashes dos três pacotes.

## Próximo passo EXATO

Quando houver autorização explícita, criar commit e publicar as alterações da skill na `develop`; até lá, preservar o working tree atual.
