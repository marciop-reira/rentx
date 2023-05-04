# Requisitos

## Requisitos funcionais

- [x] Deve ser possível cadastrar um novo carro.
- [x] Deve ser possível listar todas as categorias.
- [x] Deve ser possível listar todos os carros disponíveis.
- [x] Deve ser possível listar todos os carros disponíveis pela categoria.
- [x] Deve ser possível listar todos os carros disponíveis pela marca.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome.
- [ ] Deve ser possível cadastrar uma especificação para um carro.
- [ ] Deve ser possível listar todas as especificações de um carro.
- [ ] Deve ser possível cadastrar imagens do carro.
- [ ] Deve ser possível alugar um carro.

## Requisitos não funcionais

- [ ] Utilizar a lib multer para upload dos arquivos.

## Regras de negócio

- [x] Não deve ser possível cadastrar um carro com uma placa já cadastrada.
- [ ] Não deve ser possível alterar a placa de uma carro já cadastrado.
- [x] O carro deve ser cadastrado, por padrão, como disponível.
- [x] O registro de carros deve ser realizado por um usuário administrador.
- [x] Deve ser possível listar apenas carros disponíveis.
- [ ] O usuário não deve estar logado para listar os carros disponíveis.
- [ ] Não deve ser possível cadastrar uma especificação para um carro não registrado.
- [ ] Não deve ser possível cadastrar uma especificação já existente para um carro.
- [ ] O registro de especificações deve ser realizado por um usuário administrador.
- [ ] Deve ser possível cadastrar mais de uma imagem para o mesmo carro.
- [ ] O registro de imagens deve ser realizado por um usuário administrador.
- [ ] Não deve ser possível alugar um carro que não está disponível.
- [ ] O aluguel deve ter duração mínima de 24 horas.
- [ ] Não deve ser possível ter mais de um aluguel em aberto para o mesmo usuário.
