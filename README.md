# Bozz

[WIP] Bozz helps you by managing `npm` `git` and `docker` projects LIKE A BOSS!!!

- Never need to type `npm start` again
- Never need to type `git fetch` again
- Never need to type `docker-compose up` again
- Automatically Runs `npm install` when needed (e.g. branch switch)
- Keep track of your entier workspace

## Warning

**Please use Bozz at your own risk.**

- Bozz is **potentially vulnerable**.
  - Bozz exposes a API to run (limited) commands on your local machine.
  - Bozz is designed not to allow arbitrary commands to be executed, though there is no guarantee.
- **NEVER** run Bozz on root account. (running Bozz on port 80 is not a good idea)
- **NEVER** bind Bozz to a remotly accessable IP adress.

### Caveats

Bozz requires a `origin/HEAD` symbolic ref pointing to the right remote branch.

```sh
git remote set-head origin -a
```

### Links

- http://localhost:1080/
- https://developer.github.com/v4/explorer/
- https://primer.style/components/
- https://primer.style/octicons/
