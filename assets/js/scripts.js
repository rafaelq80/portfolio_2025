
// Seleciona a seção "Sobre" onde vamos exibir os dados do GitHub
const sobre = document.querySelector('#about')

// Seleciona o formulário de contato para adicionar validação
const formulario = document.querySelector('#formulario')

// Expressão Regular (RegEx) para validar formato de e-mail
// Exemplo válido: usuario@email.com
// Exemplo inválido: usuario@email ou @email.com
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

// ========================================
// FUNÇÃO PARA BUSCAR DADOS DO GITHUB
// ========================================

async function getApiGithub() {
	try {
		// PASSO 1: Faz uma requisição para a API do GitHub
		// fetch() busca os dados do perfil na internet
		// await espera a resposta chegar antes de continuar
		const dadosPerfil = await fetch(
			`https://api.github.com/users/rafaelq80`
		)

		// PASSO 2: Converte a resposta da API de texto para JSON
		// JSON é um formato que o JavaScript entende facilmente
		const perfil = await dadosPerfil.json()

		// PASSO 3: Cria o HTML com os dados do perfil do GitHub
		// Usamos template strings (`) para inserir variáveis com ${}
		let conteudo = `
            <figure class="about_image">
                 <img src="${perfil.avatar_url}" alt="Foto do perfil do Github - ${perfil.name}" />
            </figure>
            <article class="about_content">
                <h2>Sobre mim</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, consectetur sint corporis voluptate nam laboriosam nostrum nihil, dicta voluptas minus consequatur? Nesciunt soluta similique voluptate repellat perferendis sit quod accusantium.</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus veniam ab ad at quod? Dolorem recusandae voluptates tenetur laboriosam cupiditate, libero ab ipsum, soluta veritatis beatae odit nostrum vel! Explicabo.</p>
                <div class="about_stats">
                    <a href="${perfil.html_url}" target="_blank" class="botao">Ver GitHub</a>
					<div class="stats-wrapper">
						<div class="stat-item">
							<p class="stat-number">${perfil.followers}</p>
							<p class="stat-label">Seguidores</p>
						</div>
						<div class="stat-item">
							<p class="stat-number">${perfil.public_repos}</p>
							<p class="stat-label">Repositórios</p>
						</div>
					</div>
                </div>
            </article>
    `
		// PASSO 4: Adiciona o HTML criado dentro da seção "sobre"
		// innerHTML += adiciona o conteúdo sem apagar o que já existe
		sobre.innerHTML += conteudo

	} catch (error) {
		// Se algo der errado (API fora do ar, internet caiu, etc)
		// Mostra o erro no console do navegador (F12)
		console.error(error)
	}
}

// ========================================
// VALIDAÇÃO DO FORMULÁRIO DE CONTATO
// ========================================

// Detecta quando o usuário clica no botão "Enviar Mensagem"
formulario.addEventListener('submit', function (event) {
	
    // Impede o envio automático do formulário
	// Precisamos fazer isso para validar os campos antes
    event.preventDefault()

    // ========================================
	// VALIDAÇÃO DO CAMPO NOME
	// ========================================

	// Seleciona o campo de input do nome
	const campoNome = document.querySelector('#nome')
	// Seleciona o span onde vamos mostrar mensagens de erro
	const txtNome = document.querySelector('#txtNome')

    // Verifica se o nome tem pelo menos 3 caracteres
	// .value.length pega o número de caracteres digitados
	if (campoNome.value.length < 3) {
		// Mostra mensagem de erro
		txtNome.innerHTML = 'O Nome deve ter no mínimo 3 caracteres'
		// Coloca o cursor de volta no campo do nome
		campoNome.focus()
		// Para a execução aqui (não continua validando os outros campos)
		return
	} else {
		// Se estiver tudo ok, limpa a mensagem de erro
		txtNome.innerHTML = ''
	}

    // ========================================
	// VALIDAÇÃO DO CAMPO E-MAIL
	// ========================================

	// Seleciona o campo de input do e-mail
	const campoEmail = document.querySelector('#email')
	// Seleciona o span onde vamos mostrar mensagens de erro
	const txtEmail = document.querySelector('#txtEmail')

    // Verifica se o e-mail está no formato correto usando RegEx
	// .match() compara o valor digitado com o padrão da RegEx
	// O ! (não) inverte a lógica: se NÃO der match, mostra erro
	if (!campoEmail.value.match(emailRegex)) {
		// Mostra mensagem de erro
		txtEmail.innerHTML = 'Digite um e-mail válido'
		// Coloca o cursor de volta no campo do e-mail
		campoEmail.focus()
		// Para a execução aqui
		return
	} else {
		// Se estiver tudo ok, limpa a mensagem de erro
		txtEmail.innerHTML = ''
	}

    // ========================================
	// VALIDAÇÃO DO CAMPO ASSUNTO
	// ========================================

	// Seleciona o campo de input do assunto
	const campoAssunto = document.querySelector('#assunto')
	// Seleciona o span onde vamos mostrar mensagens de erro
	const txtAssunto = document.querySelector('#txtAssunto')

    // Verifica se o assunto tem pelo menos 5 caracteres
	if (campoAssunto.value.length < 5) {
		// Mostra mensagem de erro
		txtAssunto.innerHTML = 'O Assunto deve ter no mínimo 5 caracteres'
		// Coloca o cursor de volta no campo do assunto
		campoAssunto.focus()
		// Para a execução aqui
		return
	} else {
		// Se estiver tudo ok, limpa a mensagem de erro
		txtAssunto.innerHTML = ''
	}

    // ========================================
	// ENVIO DO FORMULÁRIO
	// ========================================

	// Se passou por todas as validações, envia o formulário
	// O método POST vai enviar os dados para o FormSubmit.co
	formulario.submit()
})

// ========================================
// INICIALIZAÇÃO
// ========================================

// Chama a função para buscar e exibir os dados do GitHub
// Isso acontece assim que a página carrega
getApiGithub()