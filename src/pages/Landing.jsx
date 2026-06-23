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
            <a href="#faq">Dúvidas</a>
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
                  <a href="/register" className="btn btn-primary">Começar agora</a>
                  <a href="/login" className="btn btn-ghost">Fazer login</a>
                </div>

                <div className="trust-row">
                  <div className="trust-item"><strong>50M+</strong><span>fotos no banco nacional</span></div>
                  <div className="trust-divider"></div>
                  <div className="trust-item"><strong>1200+</strong><span>usuários conectados por dia</span></div>
                  <div className="trust-divider"></div>
                  <div className="trust-item"><strong>24h</strong><span>buscas a qualquer hora</span></div>
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
                  <div className="row"><span>Busca por CPF completa</span><span>Busca por placa completa</span><span className="status">Completa</span></div>
                  <div className="row"><span>Busca por número completa</span><span>Busca por mãe completa</span><span className="status">Completa</span></div>
                  <div className="row"><span>Busca por interesses comerciais</span><span>Buscar processos</span><span className="status">Completa</span></div>
                  <div className="row"><span>Busca por proprietário</span><span>Busca por CNPJ</span><span className="status">Completa</span></div>
                  <div className="row"><span>Busca por vizinho</span><span>Busca por foto</span><span className="status">Completa</span></div>
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
              <p>Um passo a passo simples, de como adquirir acesso ao nosso painel!</p>
            </div>

            <div className="steps">
              <div className="step"><h3>Crie sua conta</h3><p>Se já criou sua conta, faça o login.</p></div>
              <div className="step"><h3>Escolha seu plano</h3><p>Dê uma olhada em nossos planos, escolha o plano que melhor te atende e clique em atualizar plano.</p></div>
              <div className="step"><h3>Finalize o pagamento</h3><p>Após escolher seu plano e finalizar o pagamento, os módulos de consulta bloqueados serão automaticamente liberados.</p></div>
              <div className="step"><h3>Use o painel</h3><p>Já pode utilizar o painel e fazer suas consultas. Qualquer dúvida, oferecemos suporte via Telegram/WhatsApp.</p></div>
            </div>

            <div className="steps-cta">
              <a href="/register" className="btn btn-primary">Criar minha conta agora</a>
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
                <div className="plan-badge">Mais escolhido</div>
                <div className="plan-label">Recomendado</div>
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
              <div className="cta-actions"><a href="/register" className="btn btn-primary">Criar minha conta</a><a href="/login" className="btn btn-ghost">Fazer login</a></div>
            </div>
          </div>
        </section>
      </main>

      <div className="social-float">
        <a className="social-btn social-instagram" href="https://www.instagram.com/mvsearchoficial/" target="_blank" rel="noreferrer" aria-label="Instagram">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
            <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.62c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.24-2.19.4-.55.22-.94.47-1.35.88-.41.41-.66.8-.88 1.35-.16.42-.35 1.04-.4 2.19-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.15.24 1.77.4 2.19.22.55.47.94.88 1.35.41.41.8.66 1.35.88.42.16 1.04.35 2.19.4 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.24 2.19-.4.55-.22.94-.47 1.35-.88.41-.41.66-.8.88-1.35.16-.42.35-1.04.4-2.19.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.24-1.77-.4-2.19a3.63 3.63 0 0 0-.88-1.35 3.63 3.63 0 0 0-1.35-.88c-.42-.16-1.04-.35-2.19-.4-1.24-.06-1.61-.07-4.76-.07zm0 2.76a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6zm0 1.62a3.68 3.68 0 1 0 0 7.36 3.68 3.68 0 0 0 0-7.36zm5.48-2.87a1.24 1.24 0 1 1 0 2.48 1.24 1.24 0 0 1 0-2.48z"/>
          </svg>
        </a>
        <a className="social-btn social-telegram" href="https://t.me/indisponivel" target="_blank" rel="noreferrer" aria-label="Telegram">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
            <path d="M21.94 4.66a1.36 1.36 0 0 0-1.39-.2L3.3 11.15c-.9.36-.88 1.65.03 1.97l4.3 1.5 1.66 5.34c.2.64 1 .85 1.48.38l2.4-2.34 4.2 3.1c.55.4 1.33.1 1.48-.56l3.1-14.4a1.36 1.36 0 0 0-.51-1.48zM9.7 14.13l8.04-5.02c.17-.1.35.13.2.27l-6.63 6.02c-.23.21-.38.5-.43.81l-.23 1.55a.18.18 0 0 1-.35.02l-.86-2.78a.9.9 0 0 1 .26-.87z"/>
          </svg>
        </a>
        <a className="social-btn social-whatsapp" href="https://wa.me/55000000000" target="_blank" rel="noreferrer" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" width="27" height="27" fill="currentColor" aria-hidden="true">
            <path d="M17.5 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.33A10 10 0 1 0 12 2zm0 18.18a8.16 8.16 0 0 1-4.16-1.14l-.3-.18-3.08.81.82-3-.19-.31A8.18 8.18 0 1 1 12 20.18z"/>
          </svg>
        </a>
      </div>

      <footer>
        <div className="container">© 2026 MV Search. Plataforma de apoio à verificação preventiva. Use com responsabilidade.</div>
      </footer>
    </div>
  );
}