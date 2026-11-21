# Git workflow

`master` is the only long-lived branch. Each task gets its own branch and pull request into `master`; there is no integration branch and no stacked PRs.

## Work on a task

1. Work in a worktree the host manages, based on current `origin/master`. A T3 Code thread on the main checkout moves itself with `t3_worktree_handoff` before editing; the project's worktree script runs `pnpm install --frozen-lockfile`. Without host worktree tools, use `git worktree add` and run `pnpm install --frozen-lockfile`.
2. Commit work in progress instead of using `git stash`: stashes are shared by every worktree.
3. Make the change and run `pnpm build`. There is no CI on pull requests, so report the build result in the PR.
4. End every code task with a commit and a pull request to `master`, without being asked. Opening a PR is safe; only a merge deploys alphabravomedia.co.
5. No checks run on the PR; run the build yourself before asking for a merge.
6. Merge only when the user asks, with a merge commit.

Fetch before choosing a base. Use `git pull --ff-only` to advance a local `master`; inspect divergent histories and merge deliberately. Never force-push `master`.

## What runs where

| Event | Effect |
| --- | --- |
| Pull request | Nothing runs |
| Push or merge to `master` | [Deploy workflow](../.github/workflows/deploy.yml) builds and deploys |
| Daily schedule, manual dispatch | Rebuilds and deploys `master` |
| Twice-weekly schedule | [YouTube portfolio check](../.github/workflows/check-youtube-portfolio-posts.yml) |

## Repository controls

`master` has no branch protection, because no check runs on pull requests. Merged branches are deleted automatically.

## Cleanup

GitHub deletes a merged PR's branch. Remove the task's worktree through the host (or `git worktree remove`) once it has no uncommitted or unmerged work.
