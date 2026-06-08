import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, Shield, Cookie, UserCheck, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidade | Pimenta Estética",
  description: "A sua privacidade é importante para nós. Leia a Política de Privacidade e Cookies da Pimenta Estética Multimarcas.",
  openGraph: {
    title: "Política de Privacidade | Pimenta Estética",
    description: "Política de Privacidade e Cookies da Pimenta Estética. Conheça nossos termos, coleta de dados e conformidade com a LGPD.",
    images: ["/logo-pimenta.jpg"],
  }
};

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-title/80 font-sans">
      <Header />
      
      <main className="flex-grow pt-28 pb-20 relative overflow-hidden">
        {/* Glow effect backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-highlight/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-highlight/3 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Back button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-highlight hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Voltar para a Home
          </Link>

          {/* Hero Header */}
          <div className="mb-12 border-b border-shadow pb-8">
            <span className="text-highlight font-sans text-xs font-semibold uppercase tracking-widest block mb-3">
              Termos e Políticas
            </span>
            <h1 className="font-serif font-bold text-4xl md:text-5xl text-title mb-4">
              Política de Privacidade
            </h1>
            <p className="text-title/60 font-light text-base md:text-lg">
              Pimenta Estética Multimarcas
            </p>
          </div>

          {/* Privacy Content */}
          <div className="space-y-12">
            
            {/* 1. Privacy Section */}
            <section className="bg-card/50 border border-shadow p-8 rounded-2xl backdrop-blur-sm shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-highlight/10 flex items-center justify-center text-highlight">
                  <Shield size={20} />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-title font-semibold">
                  1. Privacidade e Coleta de Dados
                </h2>
              </div>
              
              <div className="space-y-4 text-title/70 leading-relaxed font-light">
                <p>
                  A sua privacidade é importante para nós. É política da <strong>Pimenta Estética</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site <a href="https://www.pimentaestetica.com.br/" target="_blank" rel="noopener noreferrer" className="text-highlight hover:underline">https://www.pimentaestetica.com.br/</a>, e outros sites que possuímos e operamos.
                </p>
                <p>
                  Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
                </p>
                <p>
                  Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, os protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
                </p>
                <p>
                  Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
                </p>
                <p>
                  O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
                </p>
                <p>
                  Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
                </p>
                <p>
                  O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto conosco.
                </p>
              </div>
            </section>

            {/* 2. Cookies Section */}
            <section className="bg-card/50 border border-shadow p-8 rounded-2xl backdrop-blur-sm shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-highlight/10 flex items-center justify-center text-highlight">
                  <Cookie size={20} />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-title font-semibold">
                  2. Política de Cookies Pimenta Estética
                </h2>
              </div>
              
              <div className="space-y-6 text-title/70 leading-relaxed font-light">
                <div>
                  <h3 className="font-sans font-semibold text-title mb-2 text-lg">O que são cookies?</h3>
                  <p>
                    Como é prática comum em quase todos os sites profissionais, este site usa cookies, que são pequenos arquivos baixados no seu computador, para melhorar sua experiência. Esta página descreve quais informações eles coletam, como as usamos e por que às vezes precisamos armazenar esses cookies. Também compartilharemos como você pode impedir que esses cookies sejam armazenados, no entanto, isso pode fazer o downgrade ou &apos;quebrar&apos; certos elementos da funcionalidade do site.
                  </p>
                </div>

                <div>
                  <h3 className="font-sans font-semibold text-title mb-2 text-lg">Como usamos os cookies?</h3>
                  <p>
                    Utilizamos cookies por vários motivos, detalhados abaixo. Infelizmente, na maioria dos casos, não existem opções padrão do setor para desativar os cookies sem desativar completamente a funcionalidade e os recursos que eles adicionam a este site. É recomendável que você deixe todos os cookies se não tiver certeza se precisa ou não deles, caso sejam usados para fornecer um serviço que você usa.
                  </p>
                </div>

                <div>
                  <h3 className="font-sans font-semibold text-title mb-2 text-lg">Desativar cookies</h3>
                  <p>
                    Você pode impedir a configuração de cookies ajustando as configurações do seu navegador (consulte a Ajuda do navegador para saber como fazer isso). Esteja ciente de que a desativação de cookies afetará a funcionalidade deste e de muitos outros sites que você visita. A desativação de cookies geralmente resultará na desativação de determinadas funcionalidades e recursos deste site. Portanto, é recomendável que você não desative os cookies.
                  </p>
                </div>

                <div>
                  <h3 className="font-sans font-semibold text-title mb-3 text-lg">Cookies que definimos</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-highlight shrink-0 mt-2.5" />
                      <div>
                        <strong>Cookies relacionados a formulários:</strong> Quando você envia dados por meio de um formulário como os encontrados nas páginas de contacto ou nos formulários de comentários, os cookies podem ser configurados para lembrar os detalhes do usuário para correspondência futura.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-highlight shrink-0 mt-2.5" />
                      <div>
                        <strong>Cookies de preferências do site:</strong> Para proporcionar uma ótima experiência neste site, fornecemos a funcionalidade para definir suas preferências de como esse site é executado quando você o usa. Para lembrar suas preferências, precisamos definir cookies para que essas informações possam ser chamadas sempre que você interagir com uma página for afetada por suas preferências.
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-sans font-semibold text-title mb-3 text-lg">Cookies de Terceiros</h3>
                  <p className="mb-3">
                    Em alguns casos especiais, também usamos cookies fornecidos por terceiros confiáveis. A seção a seguir detalha quais cookies de terceiros você pode encontrar através deste site.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-highlight shrink-0 mt-2.5" />
                      <div>
                        Este site usa o <strong>Google Analytics</strong>, que é uma das soluções de análise mais difundidas e confiáveis da Web, para nos ajudar a entender como você usa o site e como podemos melhorar sua experiência. Esses cookies podem rastrear itens como quanto tempo você gasta no site e as páginas visitadas, para que possamos continuar produzindo conteúdo atraente.
                      </div>
                    </li>
                  </ul>
                  <p className="text-xs text-title/40 mt-4 italic">
                    (Nota: Como o seu formulário indicou que o site não utiliza Google AdSense, as cláusulas referentes à publicidade e cookies do DoubleClick não foram incluídas neste documento).
                  </p>
                </div>
              </div>
            </section>

            {/* 3. LGPD Section */}
            <section className="bg-card/50 border border-shadow p-8 rounded-2xl backdrop-blur-sm shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-highlight/10 flex items-center justify-center text-highlight">
                  <UserCheck size={20} />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-title font-semibold">
                  3. Direitos do Usuário (LGPD)
                </h2>
              </div>
              
              <div className="space-y-4 text-title/70 leading-relaxed font-light">
                <p>
                  Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), o usuário tem o direito de solicitar à Pimenta Estética, a qualquer momento:
                </p>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-highlight shrink-0" />
                    <span>Confirmação da existência de tratamento de dados;</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-highlight shrink-0" />
                    <span>Acesso aos dados;</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-highlight shrink-0" />
                    <span>Correção de dados incompletos, inexatos ou desatualizados;</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-highlight shrink-0" />
                    <span>Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei;</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-highlight shrink-0" />
                    <span>Revogação do consentimento.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 4. More Information Section */}
            <section className="bg-card/50 border border-shadow p-8 rounded-2xl backdrop-blur-sm shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-highlight/10 flex items-center justify-center text-highlight">
                  <HelpCircle size={20} />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-title font-semibold">
                  4. Mais Informações
                </h2>
              </div>
              
              <div className="space-y-4 text-title/70 leading-relaxed font-light">
                <p>
                  Esperamos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
                </p>
                <p className="border-t border-shadow pt-4 mt-6 text-sm text-title/50">
                  Esta política é efetiva a partir de <strong>junho de 2026</strong>.
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
