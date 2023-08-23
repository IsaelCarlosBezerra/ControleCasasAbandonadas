

const init = async () => {
  const casas = await buscarDados()
  montarTela(casas)
}

const buscarDados = async () => {
  let retorno
  await axios.get('http://localhost:5001/dados').then(res => {
    retorno = res.data.slice().sort((a, b) => a.qt - b.qt)
  })
  return retorno
}

const montarTela = (dados) => {
  if (dados) {
    //Limpa a lista preparando para receber dados da busca.
    const lista = document.querySelector('#lista')
    lista.innerHTML = ''

    //Montagem da lista a partir dos dados da busca
    dados.forEach(({ qt, rua, numero, img }, index) => {

      let pqt = document.createElement('p')
      pqt.innerHTML = `QT: ${qt}`

      let prua = document.createElement('p')
      prua.innerHTML = `RUA: ${rua}`

      let pn = document.createElement('p')
      pn.innerHTML = `Nº: ${numero}`

      let dividados = document.createElement('div')
      dividados.id = 'dados'

      dividados.appendChild(pqt)
      dividados.appendChild(prua)
      dividados.appendChild(pn)

      let imagem = document.createElement('img')
      imagem.src = `${img}`

      let divImagem = document.createElement('div')
      divImagem.id = 'imagem'

      divImagem.appendChild(imagem)

      let licasa = document.createElement('li')
      licasa.classList.add('itemLista')

      let btn = document.createElement('button')
      btn.textContent = 'Remover'
      btn.addEventListener('click', () => removerCasa(dados, index))

      licasa.appendChild(dividados)
      licasa.appendChild(divImagem)
      licasa.appendChild(btn)



      lista.appendChild(licasa)

    })
  } else return alert(`Sem dados para exibir!`)
}

const removerCasa = (dados, id) => {
  const dadosFiltrados = dados.filter((dado, index) => index !== id)
  montarTela(dadosFiltrados)
}

const filtrarCasa = async () => {
  const iptPesquisa = document.querySelector('#txtpesquisa')
  if (iptPesquisa.value.length > 0) {
    const casas = await buscarDados()
    const casasPorQuarteirao = casas.filter(({ qt }) => qt == iptPesquisa.value)

    montarTela(casasPorQuarteirao)
  } else {
    init()
  }
}

const btnFiltrar = document.querySelector('#btnfiltrar')

btnFiltrar.addEventListener('click', filtrarCasa)

init()
