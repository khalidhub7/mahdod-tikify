npx create-next-app@latest .

prettier --write --print-width 80 file # formatter
npm run lint -- --fix file # linter

# save project structure
tree ./ -I 'node_modules/' > docs/struct.txt

# chadcn setup
npx shadcn@latest init
npx shadcn@latest add avatar

# setup redis
sudo apt install redis-server
npm install ioredis
redis-server # run redis server
redis-cli ping  # should return PONG

# dump a dir
{
  find . \
    -path "*/node_modules/*" -prune -o \
    -name "package-lock.json" -prune -o \
    -name "DEV_CHEATSHEET.sh" -prune -o \
    -type f -print | while read file; do
      echo "FILE: $file"
      echo "----------------------------------------"
      cat "$file"
      echo
      echo "========================================"
      echo
    done
} > dump.txt