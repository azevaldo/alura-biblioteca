function filtraOcorrencias(paragrafo){
  return  Object.keys(paragrafo).filter(chave=> paragrafo[chave]>1)
}

function montaSaidaArquivo(listaPalavras){
    let textoFinal=''
    listaPalavras.forEach((paragrafo,indice)=>{
        const duplicados=filtraOcorrencias(paragrafo).join(', ')
        textoFinal+=`palavras duplicadas no paragrafo ${indice +1} : 
        ${duplicados} \n`
    })
    return textoFinal
}

export {montaSaidaArquivo}