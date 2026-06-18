import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing-page">
<header className="navbar">
    <div className="container nav-inner">
      <a className="brand" href="#">
        <span className="brand-logo-wrap"><img className="brand-logo" src="/icon.png" alt="Logo MV Search" /></span>
        <span><strong>MV</strong> Search</span>
      </a>

      <nav className="nav-links">
        <a href="#beneficios">Benefícios</a>
        <a href="#como-funciona">Como funciona</a>
        <a href="#planos">Planos</a>
      </nav>

      <div className="nav-actions">
        <a href="/login" className="btn btn-ghost">Fazer login</a>
        <a href="/register" className="btn btn-primary">Começar agora</a>
      </div>
    </div>
  </header>

  <main>
    <section className="hero">
      <div className="container">
        <div className="hero-shell">
          <div className="hero-copy">
            <div className="badge"><span className="pulse-dot"></span> Segurança digital para negociações online</div>
            <h1>Tenha mais segurança ao <span className="highlight">comprar, vender e atender</span>, seja pela internet ou fora dela.</h1>
            <p>
              A MV Search reúne informações públicas e autorizadas, de forma prática e rápida, para apoiar
              verificações preventivas antes de compras online, negociações dentro ou fora da internet,
              negociações de produtos usados, cadastros e atendimentos.
            </p>

            <div className="hero-actions">
              <a href="/login" className="btn btn-ghost">Fazer login</a>
              <a href="/register" className="btn btn-primary">Começar agora</a>
            </div>

            <p className="conversion-note">
              Ferramenta de busca criada com o intuito de proteger e facilitar transações online e presenciais,
              garantindo que você saiba todas as informações necessárias antes de vender ou comprar em qualquer lugar.
            </p>
          </div>

          <div className="hero-logo-card">
            <img className="hero-logo" src="/logo.png" alt="Logo MV Search" />
            <div className="hero-logo-text">Verificação preventiva • Segurança • Praticidade</div>
          </div>
        </div>
      </div>
    </section>

    <section className="mockup-section">
      <div className="container">
        <div className="mockup-title">
          <h2>Algumas informações sobre nosso painel e banco de dados</h2>
          <p>Conheça rapidamente alguns módulos disponíveis e o tipo de apoio que a plataforma oferece antes do cadastro.</p>
        </div>

        <div className="mockup">
          <div className="mockup-top">
            <div className="window-dots"><i></i><i></i><i></i></div>
            <div className="mockup-user">Painel MV Search</div>
          </div>

          <div className="mockup-body">
            <div className="search-card">
              <h3>Informações sobre o nosso banco de dados</h3>
              <p>Confira alguns destaques importantes sobre a estrutura e a confiabilidade das informações disponíveis no painel MV Search.</p>

              <div className="info-reserve">
                <ul>
                  <li>Banco de dados nacional de fotos com mais de 50 milhões de fotos.</li>
                  <li>Informações públicas sobre processos, devedores, empresas e sites.</li>
                  <li>Mais de 1200 usuários conectados simultaneamente todo dia.</li>
                  <li>Banco de dados confiável, com informações atualizadas e consultas precisas.</li>
                </ul>
              </div>
            </div>

            <div className="mock-table">
              <div className="row"><span>Busca por CPF completa</span><span>Busca por placa completa</span><span className="status">Confirmado</span></div>
              <div className="row"><span>Busca por número completa</span><span>Busca por mãe completa</span><span className="status">Confirmado</span></div>
              <div className="row"><span>Busca por interesses comerciais</span><span>Buscar processos</span><span className="status">Confirmado</span></div>
              <div className="row"><span>Busca por proprietário</span><span>Busca por CNPJ</span><span className="status">Confirmado</span></div>
              <div className="row"><span>Busca por vizinho</span><span>Busca por foto</span><span className="status">Confirmado</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="beneficios">
      <div className="container">
        <div className="section-head">
          <h2>Quais benefícios eu tenho utilizando o painel MV Search?</h2>
          <p>Entenda de forma clara como o painel pode ajudar nas suas compras, vendas, consultas e verificações do dia a dia.</p>
        </div>

        <div className="cards">
          <article className="card"><div className="icon">⌕</div><h3>Verificação preventiva para compras online e presenciais</h3><p>Conferência rápida de informações sobre seu cliente ou sobre a loja onde você vai comprar, para apoiar decisões antes de fechar um negócio.</p></article>
          <article className="card"><div className="icon">🛡</div><h3>Mais confiança ao comprar online</h3><p>Com a MV Search você busca e confere anunciantes suspeitos, evita fraudes e compra online em qualquer loja com muito mais confiança.</p></article>
          <article className="card"><div className="icon">⚡</div><h3>Buscas a qualquer hora</h3><p>Busque informações de qualquer vendedor, qualquer cliente e qualquer empresa, a qualquer hora.</p></article>
          <article className="card"><div className="icon">✓</div><h3>Uso responsável com termos de segurança e proteção de dados</h3><p>Garantindo a segurança de quem consulta e também de quem é consultado.</p></article>
        </div>
      </div>
    </section>

    <section id="como-funciona">
      <div className="container">
        <div className="section-head">
          <h2>Como funciona</h2>
          <p>Um caminho curto e objetivo para o cliente que chega do anúncio.</p>
        </div>

        <div className="steps">
          <div className="step"><h3>Crie sua conta</h3><p>Se já criou sua conta, faça o login.</p></div>
          <div className="step"><h3>Escolha seu plano</h3><p>Dê uma olhada em nossos planos, escolha o plano que melhor te atende e clique em atualizar plano.</p></div>
          <div className="step"><h3>Finalize o pagamento</h3><p>Após escolher seu plano e finalizar o pagamento, os módulos de consulta bloqueados serão automaticamente liberados.</p></div>
          <div className="step"><h3>Use o painel</h3><p>Já pode utilizar o painel e fazer suas consultas. Qualquer dúvida, oferecemos suporte via Telegram/WhatsApp.</p></div>
        </div>
      </div>
    </section>

    <section id="planos">
      <div className="container">
        <div className="section-head">
          <h2>Confira nossos planos básicos e avançados de consulta</h2>
          <p>Escolha o plano ideal para sua necessidade e libere os módulos de consulta após o pagamento.</p>
        </div>

        <div className="plans">
          <article className="plan">
            <div className="plan-label">Uso eventual</div>
            <h3>Plano Básico de Verificação</h3>
            <div className="price">R$ 39,99 <small>/ mês</small></div>
            <p>Para quem compra ou vende online e quer um plano básico pra ter mais segurança.</p>
            <ul><li>Limite diário de uso</li><li>Acesso ao painel</li><li>Suporte básico</li></ul>
            <a href="/register" className="btn btn-ghost">Assinar básico</a>
          </article>

          <article className="plan featured">
            <div className="plan-label">Mais escolhido</div>
            <h3>Plano Avançado de Verificação</h3>
            <div className="price">R$ 99,99 <small>/ mês</small></div>
            <p>Para compradores e vendedores que precisam de busca e suporte com mais frequência, pra compras online ou presenciais.</p>
            <ul><li>Mais limite diário</li><li>Recursos adicionais</li><li>Suporte prioritário</li></ul>
            <a href="/register" className="btn btn-primary">Assinar avançado</a>
          </article>

          <article className="plan">
            <div className="plan-label">Profissional</div>
            <h3>Plano Profissional de Verificação</h3>
            <div className="price">R$ 199,99 <small>/ mês</small></div>
            <p>Para lojas, prestadores de serviço, equipes e pessoas que precisam fazer um uso recorrente das buscas e consultas.</p>
            <ul><li>Maior limite diário</li><li>Recursos profissionais</li><li>Atendimento especializado</li></ul>
            <a href="/register" className="btn btn-ghost">Assinar profissional</a>
          </article>
        </div>
      </div>
    </section>

    <section id="faq">
      <div className="container">
        <div className="section-head">
          <h2>Dúvidas frequentes</h2>
          <p>Respostas curtas para reduzir insegurança antes do cadastro.</p>
        </div>

        <div className="faq">
          <details><summary>Para quem a MV Search é indicada?</summary><p>Para pessoas que negociam online, vendedores, autônomos, pequenos negócios e atendimentos que precisam de mais segurança antes de fechar negócio.</p></details>
          <details><summary>Preciso aceitar termos para usar?</summary><p>Sim, são termos de uso responsável e de segurança que qualquer um precisa aceitar antes de utilizar nossos serviços. São para proteger e garantir que nosso painel seja utilizado para fins profissionais.</p></details>
          <details><summary>O WhatsApp e Telegram são para compras ou suporte?</summary><p>Tanto o WhatsApp quanto o Telegram são apenas para suporte em relação às assinaturas, para reportar erros, dar sugestões e tirar dúvidas. As compras são feitas diretamente pelo site, na aba "planos", para quem já criou a conta.</p></details>
          <details><summary>Posso trocar de assinatura depois de já ter escolhido e pago algum dos planos?</summary><p>Caso já tenha pago algum plano e queira adquirir uma assinatura maior, chame a gente no WhatsApp ou Telegram para pagar a diferença. Nós alteraremos o seu plano para o plano que você desejar.</p></details>
        </div>
      </div>
    </section>

    <section>
      <div className="container">
        <div className="cta">
          <h2>Inicie agora mesmo seu plano básico, avançado ou profissional e garanta mais segurança em qualquer tipo de negociação, seja online ou presencial.</h2>
          <p>Crie sua conta e faça seu login, selecione o plano que você deseja e comece hoje mesmo a negociar de forma inteligente.</p>
          <div className="cta-actions"><a href="/login" className="btn btn-ghost">Fazer login</a><a href="/register" className="btn btn-primary">Criar minha conta</a></div>
        </div>
      </div>
    </section>
  </main>

  <div className="social-float">
    <a className="social-btn social-instagram" href="https://www.instagram.com/mvsearch" target="_blank" rel="noreferrer" aria-label="Instagram">◎</a>
    <a className="social-btn social-telegram" href="https://t.me/mvsearch" target="_blank" rel="noreferrer" aria-label="Telegram">✈</a>
    <a className="social-btn social-whatsapp" href="https://wa.me/5511978984287" target="_blank" rel="noreferrer" aria-label="WhatsApp">☎</a>
  </div>

  <footer>
    <div className="container">© 2026 MV Search. Plataforma de apoio à verificação preventiva. Use com responsabilidade.</div>
  </footer>
    </div>
  );
}
