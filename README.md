# Requisitos

## Requisitos funcionais

- [x] Deve ser possível cadastrar um novo carro.
- [x] Deve ser possível listar todas as categorias.
- [x] Deve ser possível listar todos os carros disponíveis.
- [x] Deve ser possível listar todos os carros disponíveis pela categoria.
- [x] Deve ser possível listar todos os carros disponíveis pela marca.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome.
- [x] Deve ser possível cadastrar uma especificação para um carro.
- [ ] Deve ser possível listar todas as especificações de um carro.
- [x] Deve ser possível cadastrar imagens do carro.
- [x] Deve ser possível alugar um carro.
- [x] Deve ser possível realizar a devolução de um carro.
- [x] Deve ser possível listar todos os alugueis do usuário.

## Requisitos não funcionais

- [x] Utilizar a lib multer para upload dos arquivos.

## Regras de negócio

- [x] Não deve ser possível cadastrar um carro com uma placa já cadastrada.
- [ ] Não deve ser possível alterar a placa de uma carro já cadastrado.
- [x] O carro deve ser cadastrado, por padrão, como disponível.
- [x] O registro de carros deve ser realizado por um usuário administrador.
- [x] Deve ser possível listar apenas carros disponíveis.
- [x] O usuário não deve estar logado para listar os carros disponíveis.
- [x] Não deve ser possível cadastrar uma especificação para um carro não registrado.
- [x] Não deve ser possível cadastrar uma especificação já existente para um carro.
- [x] O registro de especificações deve ser realizado por um usuário administrador.
- [x] Deve ser possível cadastrar mais de uma imagem para o mesmo carro.
- [x] O registro de imagens deve ser realizado por um usuário administrador.
- [x] Não deve ser possível alugar um carro que não está disponível.
- [x] O aluguel deve ter duração mínima de 24 horas.
- [x] Não deve ser possível ter mais de um aluguel em aberto para o mesmo usuário.
- [x] Se o carro for devolvido com menos de 24 horas, deverá ser cobrada a diária completa.
- [x] Ao realizar a devolução, o carro deve ser ficar disponível.
- [x] Ao realizar a devolução, o usuário deverá ficar disponível para realizar outro aluguel.
- [x] Ao realizar a devolução, deverá ser calculado o valor do aluguel.
- [x] Caso a devolução ocorra após a data prevista de entrega, deverá ser cobrada multa proporcional aos dias em atraso.
