
npx create-next-app@latest .
tree ./ -I 'node_modules' > struct.txt
prettier --write --print-width 80 file

npx shadcn@latest init
npx shadcn@latest add avatar