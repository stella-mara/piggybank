//let = contas = [];
let contas = [
  {
    nome: '',
    cpf: '',
    celular: '',
    senha: '',
    conta: 0,
    saldo: 0,
  },
];

// FORMULÁRIO CONTA
const formulario = document.getElementById('form-cadastro');
const enviarFormulario = (event) => {
  event.preventDefault();

  // OBTER OS CAMPOS DE SENHA
  const senha = event.target.senha.value;
  const confirmacaoSenha = event.target.confirmacaoSenha.value;

  if (senha !== confirmacaoSenha) {
    alert('As senhas são divergentes. Tente novamente.');
    return;
  }

  //ADICIONAR A CONTA NO ARRAY
  const nome = event.target.nome.value;
  const cpf = event.target.cpf.value;
  const celular = event.target.celular.value;
  const conta = new Date().getTime();
  const saldo = 0;

  const contaCriada = {
    conta,
    nome,
    cpf,
    celular,
    senha,
    saldo,
  };
  contas.push(contaCriada);
  alert(`Conta criada com sucesso. Número: ${conta}`);
};

formulario.addEventListener('submit', enviarFormulario);

//OPERAÇÕES
//OBTER FORMULÁRIO DE OPERAÇÕES

const formOperacao = document.getElementById('form-operacao');

//FUNÇÃO DE SAQUE

const sacar = (conta, valor) => {
  //Verifica se o valor é maior que 0
  if (valor > 0) {
    //Verifica se tem saldo disponível
    if (conta.saldo >= valor) {
      const novoSaldo = conta.saldo - valor;
      conta.saldo = novoSaldo;

      alert(`Saque efetuado com sucesso! Novo saldo: R$ ${novoSaldo}`);
      return;
    }

    alert('Saldo insuficiente.');
    return;
  }
  alert('Não foi possível efetuar o saque.');
};

//FUNÇÃO DE DEPÓSITO

const depositar = (conta, valor) => {
  if (valor > 0) {
    const novoSaldo = conta.saldo + valor;
    conta.saldo = novoSaldo;

    alert(`Depósito efetuado com sucesso! Novo saldo: R$ ${novoSaldo}`);
    return;
  }
  alert('Não foi possível efeutar o depósito.');
};

//FUNÇÃO DE CONSULTAR O VALOR

const consultarSaldo = (conta) => {
  alert(`Saldo atual: ${conta.saldo}`);
};

//ENVIAR FORMULARIO DE OPERAÇÃO
const enviarFormularioOperacao = (event) => {
  event.preventDefault();

  //Obter valores digitados no formulário
  const conta = parseInt(event.target.conta.value);
  const operacao = event.target.operacao.value;
  const valor = parseFloat(event.target.valor.value);
  const senha = event.target.senhaOperacao.value;

  //Validar conta e senha
  const contaAtual = contas.find((c) => c.conta === conta);
  if (!contaAtual) {
    alert('Conta inválida!');
    return;
  }

  //Validar senha
  if (contaAtual.senha !== senha) {
    alert('Senha inválida');
    return;
  }

  //Chamar a função correta de acordo com a Operação

  switch (operacao) {
    case 'saque':
      sacar(contaAtual, valor);
      break;
    case 'deposito':
      depositar(contaAtual, valor);
      break;
    case 'saldo':
      consultarSaldo(contaAtual);
      break;

    default:
      'Operação Inválida';
      break;
  }
};
//Vinculando função ao evento de submit do form operação
formOperacao.addEventListener('submit', enviarFormularioOperacao);

//Desabilitar/Habilitar campo de valor

//Obter select para adicionar evento de onchange

const operacao = document.getElementById('operacao');
operacao.addEventListener('change', (event) => {
  //Obter o campo de valor do HTML
  const inputValor = document.getElementById('valor');
  //Veriica se o valor selecionado é saldo
  if (event.target.value === 'saldo') {
    //Desabilitar o campo
    inputValor.disabled = true;
    //Limpa o valor digitado
    inputValor.value = '';
    return;
  }
  inputValor.disabled = false;
});

//FINALIZADO
