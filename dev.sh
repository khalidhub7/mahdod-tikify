
npx create-next-app@latest .

tree . -a -I 'node_modules|.git' > struct.txt

tree ./ -I 'node_modules' > struct.txt