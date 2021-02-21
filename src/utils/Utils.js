import Vue from 'vue';

export default {
  validaCpf(strCPF) {
    if (strCPF) strCPF = strCPF.replaceAll('.', '').replaceAll('-', '');
    var soma;
    var resto;
    soma = 0;
    if (strCPF == "00000000000") return false;

    for (var i=1; i<=9; i++) soma = soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(strCPF.substring(9, 10)) ) return false;

    soma = 0;
    for (i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
  },
  validaTelefone(telefone) {
    if (!telefone) return false;
    telefone = telefone.replaceAll('(', '').replaceAll(')', '').replaceAll('-', '').replaceAll(' ', '');
    if (telefone.length < 10) return false;
    return true;
  },
  validaDataNascimento(dataNascimento) {
    if (!dataNascimento) return false;
    var data = this.retornaData(dataNascimento).addDays(1);
    if (!data) return false;
    var dataAtual = new Date();

    var diferencaAnos = dataAtual.getFullYear() - data.getFullYear();
    if ( new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate()) < 
         new Date(dataAtual.getFullYear(), data.getMonth(), data.getDate()) )
        diferencaAnos--;
    return diferencaAnos >= 18;
  },
  retornaData(stringData) {
    stringData = stringData.split('/').reverse().join('-');
    var data = new Date(stringData);
    return data;
  },
  mensagemSucesso(mensagem) {
    Vue.swal({
      title: 'Sucesso!',
      text: mensagem,
      icon: 'success'
    });
  },
  mensagemErro(mensagem) {
    Vue.swal({
      title: 'Atenção!',
      text: mensagem,
      icon: 'warning'
    });
  }
}