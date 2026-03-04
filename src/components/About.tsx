"use client";

import { motion } from "framer-motion";
import { BrandSeal } from "./BrandSeal";

export function About() {
    return (
        <section id="quem-somos" className="py-24 relative overflow-hidden bg-white">
            {/* Background wabi-sabi element */}
            <div className="absolute top-0 right-[-10%] w-[40%] h-[120%] bg-stamp/5 -rotate-6 transform-origin-bottom-right mix-blend-multiply blur-2xl rounded-full" />
            <div className="absolute top-1/2 left-0 w-full h-full texture-seigaiha pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

                    {/* Main Content Column */}
                    <div className="lg:col-span-5 flex flex-col pt-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                        >
                            <h2 className="text-sm font-bold tracking-widest text-stamp uppercase mb-2">Quem Somos</h2>
                            <h3 className="font-heading text-4xl lg:text-5xl text-ink font-bold mb-8 leading-tight">
                                A voz dos estudantes, em ação real.
                            </h3>
                            <p className="text-stone text-lg leading-relaxed mb-6">
                                O Grêmio Estudantil Alvorada não é apenas um nome no papel. Nós nascemos da necessidade de criar um colégio mais vivo, inclusivo e transparente. Acreditamos que a escola é o nosso primeiro grande laboratório de cidadania.
                            </p>
                            <p className="text-stone text-lg leading-relaxed mb-10">
                                Lutamos para que cada aluno tenha espaço para se expressar, descobrir talentos e contribuir para melhorias reais nos espaços que ocupamos todos os dias.
                            </p>

                        </motion.div>
                    </div>

                    {/* Pillars Asymmetrical Layout Column */}
                    <div className="lg:col-span-7 lg:pl-12 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start mt-8 lg:mt-0">
                        {/* Pillar 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                            className="bg-paper p-8 border-l-4 border-ink shadow-sm relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-16 h-16 bg-ink/5 rounded-bl-full group-hover:scale-110 transition-transform duration-500" />
                            <h4 className="font-heading text-xl font-bold text-ink mb-3 relative z-10">Representação</h4>
                            <p className="text-stone text-sm leading-relaxed relative z-10">
                                Seu porta-voz nas reuniões pedagógicas e conselhos de classe. Defendemos seus direitos e garantimos que as demandas estudantis sejam ouvidas com respeito.
                            </p>
                        </motion.div>

                        {/* Pillar 2 & 3 wrapper for asymmetrical look */}
                        <div className="flex flex-col gap-6 sm:mt-12">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
                                className="bg-paper p-8 border-t-4 border-stamp shadow-sm relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-16 h-16 bg-stamp/5 rounded-bl-full group-hover:scale-110 transition-transform duration-500" />
                                <h4 className="font-heading text-xl font-bold text-ink mb-3 relative z-10">Projetos & Ação</h4>
                                <p className="text-stone text-sm leading-relaxed relative z-10">
                                    Do campeonato interclasse à feira de profissões. Criamos eventos que desenvolvem habilidades, promovem esporte, cultura e o bem-estar da comunidade.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
                                className="bg-ink p-8 text-paper shadow-md relative overflow-hidden group"
                            >
                                <div className="absolute -right-8 -bottom-8 opacity-10 blur-[1px]">
                                    <BrandSeal size={150} variant="watermark" />
                                </div>
                                <h4 className="font-heading text-xl font-bold mb-3 relative z-10">Transparência</h4>
                                <p className="text-paper/80 text-sm leading-relaxed relative z-10">
                                    Prestação de contas clara. Cada centavo arrecadado em eventos é reinvestido com responsabilidade em melhorias diretas para a vivência dos alunos.
                                </p>
                            </motion.div>
                        </div>

                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                    className="mt-20 pt-10 border-t border-ink/10 flex flex-col sm:flex-row gap-10"
                >
                    <div className="flex-1 lg:w-2/3 mx-auto text-center md:text-left">
                        <h5 className="font-bold text-ink mb-2">Nossa Missão</h5>
                        <p className="text-stone text-sm max-w-3xl">Integrar os estudantes da instituição, fomentando um ambiente escolar crítico, acolhedor e dinâmico, onde todo aluno tenha voz ativa no seu processo formativo.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
