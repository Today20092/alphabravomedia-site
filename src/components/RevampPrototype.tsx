// Throwaway homepage prototype: three layouts selected by ?prototype=revamp&variant=A|B|C.
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import "../styles/revamp-prototype.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const channel = "https://youtube.com/@alphabravomedia";
const names = { A: "Editorial field notes", B: "Creator workshop", C: "Cinematic journal" };
type Variant = keyof typeof names;
type Article = { title: string; description: string; href: string; date: string; video?: string };
type Props = { articles: Article[]; image: string; initialVariant: Variant };

function Actions() {
  return <div className="proto-actions"><Button asChild size="lg"><a href={channel}><Play data-icon="inline-start" />Watch on YouTube</a></Button><Button asChild variant="outline" size="lg"><a href="#notes">Explore the guides<ArrowUpRight data-icon="inline-end" /></a></Button></div>;
}

function Navigation() {
  return <header className="proto-nav"><a className="proto-brand" href="/?prototype=revamp">alpha bravo<span>media</span></a><nav aria-label="Main navigation"><a href="#notes">Journal</a><a href="#resources">Resources</a><a href="/gear">Gear</a><a href="/about">About</a></nav><Button asChild variant="outline"><a href={channel}>YouTube<ArrowUpRight data-icon="inline-end" /></a></Button></header>;
}

function Notes({ articles }: { articles: Article[] }) {
  return <section id="notes" className="proto-notes proto-section"><div className="proto-section-heading"><h2>Notes from<br />the edit.</h2><p>Workflows, experiments, and things worth sharing. Written by Ayoub Abedrabbo.</p><a href="/blog">All articles <ArrowUpRight /></a></div><div className="proto-article-list">{articles.map(article => <a className="proto-article" href={article.href} key={article.href}><span>{article.date}</span><div><h3>{article.title}</h3><p>{article.description}</p></div><ArrowUpRight aria-hidden="true" /></a>)}</div></section>;
}

function Resources({ image }: { image: string }) {
  return <section id="resources" className="proto-section"><div className="proto-resource-intro"><h2>Open the toolbox.</h2><p>Useful tools, practical guides, and the equipment behind the videos.</p></div><div className="proto-resource-grid">
    <a className="proto-resource proto-lut" href="/blog/false-color-lut-generator"><img src={image} alt="False color view used to evaluate image exposure" loading="lazy" /><div><span>Tools & downloads</span><h3>See your exposure<br />in a different light.</h3><p>The False Color LUT Builder</p><ArrowUpRight /></div></a>
    <a className="proto-resource proto-guide" href="/blog/davinci-resolve-media-management-archive-workflow"><span>DaVinci Resolve</span><h3>Keep the project.<br />Lose the clutter.</h3><p>A practical guide to archiving your finished edits.</p><ArrowUpRight /></a>
    <a className="proto-resource proto-gear" href="/gear"><span>Equipment notes</span><h3>What's in<br />the kit?</h3><p>Cameras, audio, and the small things that make a difference.</p><ArrowUpRight /></a>
    <a className="proto-resource proto-video" href={channel}><Play aria-hidden="true" /><span>Learn by watching</span><h3>Pull up a chair.<br />Let's make something.</h3><p>Explore Alpha Bravo Media on YouTube.</p><ArrowUpRight /></a>
  </div><p className="proto-disclosure">Some gear links are affiliate links. I may earn a commission from qualifying purchases.</p></section>;
}

function VariantA({ image }: Props) {
  return <section className="proto-hero proto-editorial"><div><p className="proto-byline">Video, editing & the creative process</p><h1>Make something<br /><em>worth watching.</em></h1><p className="proto-intro">A journal for curious creators. Practical video guides, useful downloads, and honest notes on the gear I use.</p><Actions /></div><a className="proto-hero-image" href="/blog/false-color-lut-generator"><img src={image} alt="An exposure study from the False Color LUT Builder guide" /><div><span>From the journal</span><h3>A better way to see exposure.</h3><ArrowUpRight /></div></a></section>;
}

function VariantB({ image }: Props) {
  return <section className="proto-hero proto-workshop"><div><p className="proto-byline">The creative process, out in the open</p><h1>Shoot. Edit.<br /><em>Figure it out.</em></h1><p className="proto-intro">Come behind the scenes. Learn the workflow, try the tools, and find your next idea.</p><Actions /></div><div className="proto-workbench"><a className="proto-swatch" href="/blog/false-color-lut-generator"><img src={image} alt="False color exposure experiment" /><span>EXPOSURE STUDY</span></a><a className="proto-sticker" href="/gear">Less guessing.<br />More making.<ArrowUpRight /></a><a className="proto-play" href={channel} aria-label="Explore the YouTube channel"><Play /></a></div></section>;
}

function VariantC({ image }: Props) {
  return <section className="proto-hero proto-cinema"><img src={image} alt="A frame from the False Color LUT Builder guide" /><div><p className="proto-byline">Alpha Bravo Media · A creator's journal</p><h1>Behind every frame,<br /><em>something to learn.</em></h1><p className="proto-intro">Stories from the creative process. Video guides, tools, and equipment notes from Ayoub.</p><Actions /></div><a className="proto-caption" href="/blog/false-color-lut-generator">Explore the exposure guide <ArrowUpRight /></a></section>;
}

function PrototypeSwitcher({ variant, change }: { variant: Variant; change: (step: number) => void }) {
  return <aside className="proto-switcher" aria-label="Prototype layout selection"><Button variant="ghost" size="icon" aria-label="Previous layout" onClick={() => change(-1)}><ArrowLeft /></Button><div aria-live="polite"><small>HOMEPAGE PROTOTYPE</small><span>{variant} / {names[variant]}</span></div><Button variant="ghost" size="icon" aria-label="Next layout" onClick={() => change(1)}><ArrowRight /></Button></aside>;
}

export default function RevampPrototype(props: Props) {
  const [variant, setVariant] = useState<Variant>(props.initialVariant);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("variant");
    if (requested === "A" || requested === "B" || requested === "C") setVariant(requested);
  }, []);
  function change(step: number) {
    const variants: Variant[] = ["A", "B", "C"];
    const next = variants[(variants.indexOf(variant) + step + 3) % 3];
    const url = new URL(window.location.href);
    url.searchParams.set("variant", next);
    window.history.replaceState(null, "", url);
    setVariant(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  useEffect(() => {
    function key(event: KeyboardEvent) {
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select, [contenteditable], button, a')) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); change(event.key === "ArrowLeft" ? -1 : 1); }
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [variant]);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".proto-hero h1", { y: 25, opacity: 0, duration: .7 });
      gsap.utils.toArray<HTMLElement>(".proto-resource").forEach(element => {
        gsap.fromTo(element, { scale: .94 }, { scale: 1, scrollTrigger: { trigger: element, start: "top bottom", end: "top 65%", scrub: true } });
        gsap.to(element, { opacity: .35, scrollTrigger: { trigger: element, start: "bottom 20%", end: "bottom top", scrub: true } });
      });
    });
    media.add("(min-width: 1000px) and (prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.create({ trigger: ".proto-section-heading", start: "top 100px", endTrigger: ".proto-article-list", end: "bottom 350px", pin: true, pinSpacing: false });
    });
    return () => media.revert();
  }, { scope: root, dependencies: [variant], revertOnUpdate: true });
  const Hero = { A: VariantA, B: VariantB, C: VariantC }[variant];
  return <div ref={root} className={`revamp-prototype variant-${variant}`}><a className="proto-skip" href="#notes">Skip to articles</a><Navigation /><main className="overflow-x-hidden w-full max-w-full"><Hero {...props} /><div className="proto-topic-strip" aria-hidden="true"><span>Video creation / DaVinci Resolve / Color / Tools / Gear /</span><span>Video creation / DaVinci Resolve / Color / Tools / Gear /</span></div><Notes articles={props.articles} /><Resources image={props.image} /><section className="proto-watch proto-section"><p>Keep exploring.</p><h2>See you in<br /><em>the next video.</em></h2><Button asChild size="lg"><a href={channel}>Watch Alpha Bravo Media<ArrowUpRight data-icon="inline-end" /></a></Button></section></main><footer className="proto-footer"><Separator /><div><a className="proto-brand" href="/?prototype=revamp">alpha bravo<span>media</span></a><p>Made & shared by Ayoub Abedrabbo.</p><a href="https://ayoubabed.xyz/">Meet Ayoub <ArrowUpRight /></a></div></footer>{import.meta.env.DEV && <PrototypeSwitcher variant={variant} change={change} />}</div>;
}
