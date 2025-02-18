# FormUbistart
Formulário para processo seletivo Ubistart
## Desafio

Criar um form do zero de acordo com as informações abaixo, utilizando Javascript ou Typescript e Node (puro ou com framework de sua preferência):

O formulário deve conter:
Nome;
Email;
CEP;
Botão de enviar (para realizar a request para o backend).

## Validações: 
- Entrada dos dados;
- Aceitar somente números no CEP; 
- Não aceitar números no Nome 
- se o email é válido 
- se o email já existe.

## Opcionais: 
- Listar dados abaixo do formulário de cadastro;
- Preencher formulário ao clicar em um item da listagem para realizar edição.

## Informações adicionais:
Na parte do CEP, deve ser validado se o CEP digitado já existe via integração com API externa no backend;

Docs: https://brasilapi.com.br/docs#tag/CEP; 
CEP Válido: https://brasilapi.com.br/api/cep/v1/88040600;
CEP Inváido: https://brasilapi.com.br/api/cep/v1/11111111;

O participante deve subir para o github em repositório aberto e compartilhar o link por e-mail