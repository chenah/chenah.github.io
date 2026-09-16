"use client";

import { useId, useRef, useState } from "react";
import { useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useMotionPreferences } from "@/components/Providers";
import styles from "./CityAtlas.module.css";

const cities = [
  { name: "Hong Kong", chinese: "香港", code: "HKG", coordinates: "22.3° N / 114.2° E", years: "2022 — 2026", institution: "The Hong Kong Polytechnic University", short: "PolyU", water: "Victoria Harbour", caption: "A harbour, a skyline, a place to begin." },
  { name: "Guangzhou", chinese: "广州", code: "CAN", coordinates: "23.1° N / 113.3° E", years: "2026 —", institution: "South China University of Technology", short: "SCUT", water: "Pearl River", caption: "Along the Pearl River, the next chapter." },
] as const;

/** Original line illustrations: a small geographic thread through the research story. */
function CityLandscape({ city, id }: { city: number; id: string }) {
  return (
    <svg viewBox="0 0 800 365" className={styles.landscape} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#ff6b35" stopOpacity=".11" />
          <stop offset="1" stopColor="#ff6b35" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-water`} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#ff6b35" stopOpacity="0" />
          <stop offset=".5" stopColor="#ff6b35" stopOpacity=".55" />
          <stop offset="1" stopColor="#ff6b35" stopOpacity="0" />
        </linearGradient>
        <pattern id={`${id}-grid`} width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M50 0H0V50" stroke="#f2f0e9" strokeOpacity=".045" />
        </pattern>
      </defs>

      <rect width="800" height="365" fill={`url(#${id}-grid)`} />
      <circle cx={city === 0 ? 569 : 230} cy="129" r="87" className={styles.sun} fill={`url(#${id}-sky)`} stroke="#ff6b35" strokeOpacity=".2" />
      <circle cx={city === 0 ? 569 : 230} cy="129" r="103" className={styles.sun} stroke="#ff6b35" strokeOpacity=".08" strokeDasharray="2 7" />
      <path d="M18 30V18H30 M770 18H782V30 M18 335V347H30 M770 347H782V335" stroke="#f2f0e9" strokeOpacity=".3" />

      <g className={styles.city} data-active={city === 0}>
        <path d="M0 238L44 216L70 224L110 181L147 198L188 163L214 174L241 153L263 164L298 138L321 142L356 186L385 174L421 206L448 198L484 223L540 204L590 221L639 196L675 206L724 176L767 204L800 195V270H0Z" fill="#f2f0e9" fillOpacity=".018" />
        <path d="M0 238L44 216L70 224L110 181L147 198L188 163L214 174L241 153L263 164L298 138L321 142L356 186L385 174L421 206L448 198L484 223L540 204L590 221L639 196L675 206L724 176L767 204L800 195" stroke="#9b9d94" strokeOpacity=".23" />
        <path className={styles.outline} pathLength="1" d="M33 268V233H65V219H87V268H108V206H132V190H150V268H171V227H192V268H208V182L231 162V139L259 112V268H279V243H302V218H331V237H352V268H379V132L384 110H391V84H398V65H409V84H416V110H423L429 132V268H447V205H466V189H478V205H496V268H516V225H532V197H564V218H584V268H605V175H636V268H651V216H679V231H699V268H725V209H752V268H781" fill="#10110f" stroke="#d5d3ca" strokeOpacity=".65" strokeWidth="1.2" />
        <g stroke="#d5d3ca" strokeOpacity=".26" strokeWidth="1">
          <path d="M208 182L259 216L208 268L259 112M231 162V268M259 165L208 216M384 131H423M387 152H421M387 174H421M387 196H421M387 218H421M387 240H421M396 113V268M411 113V268M112 217H145M112 230H145M112 243H145M520 239H579M610 187H631M610 203H631M610 219H631M610 235H631M610 251H631" />
          <path d="M287 244V264M297 244V264M307 231V264M318 231V264M329 244V264M337 244V264M453 217V264M465 217V264M477 217V264M489 217V264M659 237V264M670 237V264M731 220V264M744 220V264" />
        </g>
        <g className={styles.landmark}>
          <path d="M259 112V91H313" stroke="#ff6b35" strokeOpacity=".5" />
          <circle cx="259" cy="112" r="2.5" fill="#ff6b35" />
          <text x="319" y="94">BANK OF CHINA</text>
        </g>
        <g className={styles.ferry}>
          <path d="M490 298H542L535 305H499Z" fill="#c5c5b9" fillOpacity=".4" stroke="#c5c5b9" strokeOpacity=".5" />
          <path d="M502 298V291H530V298M508 291V285H521V291" stroke="#c5c5b9" strokeOpacity=".6" />
          <path d="M473 308H512" stroke="#ff6b35" strokeOpacity=".4" />
        </g>
      </g>

      <g className={styles.city} data-active={city === 1}>
        <path d="M0 245L51 231L82 238L120 219L159 236L185 225L217 240L254 219L281 228L306 201L332 207L365 226L395 217L442 234L480 220L519 233L551 215L586 228L622 211L661 224L701 204L751 224L800 213" stroke="#9b9d94" strokeOpacity=".23" />
        <path className={styles.outline} pathLength="1" d="M28 268V240H47V228H69V268H88V203H112V192H131V268H151V221H176V239H195V268H216V167L226 151H243L253 167V268H276V211H301V191H325V211H343V268H378V237H406V250H431V268M559 268V225H584V184H604V156H621V268H643V110L650 79H678L685 110V268H708V208H736V231H755V268H781" fill="#10110f" stroke="#d5d3ca" strokeOpacity=".65" strokeWidth="1.2" />
        <g stroke="#d5d3ca" strokeOpacity=".25">
          <path d="M224 174V268M245 174V268M221 187H248M221 207H248M221 227H248M221 247H248M651 111V268M661 111V268M676 111V268M648 131H680M648 152H680M648 173H680M648 194H680M648 215H680M648 236H680M94 217H126M94 233H126M94 249H126M291 215V268M313 202V268M590 196V268M616 168V268" />
          <path d="M155 235H171M155 247H171M714 220H731M714 234H731M714 248H731" />
        </g>
        <g stroke="#ff9a73" strokeWidth="1.15" className={styles.tower}>
          <path className={styles.outline} pathLength="1" d="M458 268C478 219 498 161 469 87H526C500 159 518 220 541 268M498 86V32M504 86V49M469 87Q499 97 526 87M458 268H541" fill="#171612" />
          <g strokeOpacity=".55" strokeWidth=".8">
            <path d="M471 94C486 150 518 214 536 256M479 89C499 151 516 217 527 264M490 93C507 152 509 219 515 268M502 94C511 153 503 219 500 268M514 92C504 151 491 219 483 268M524 91C501 151 481 215 465 252M474 103L520 103M481 123L515 123M485 144L512 144M486 165L512 165M481 187L516 187M475 210L523 210M467 234L532 234M460 258L539 258" />
          </g>
        </g>
        <g className={styles.landmark}>
          <path d="M499 48H555V37H591" stroke="#ff6b35" strokeOpacity=".5" />
          <circle cx="499" cy="48" r="2.5" fill="#ff6b35" />
          <text x="597" y="40">CANTON TOWER</text>
        </g>
        <path d="M24 290Q186 280 326 296T773 289" stroke="#c5c5b9" strokeOpacity=".2" />
        <path d="M82 286Q125 246 169 286M90 283H163M102 281V267M125 282V259M148 284V269" stroke="#c5c5b9" strokeOpacity=".5" />
      </g>

      <path d="M0 270H800" stroke="#f2f0e9" strokeOpacity=".15" />
      <g stroke={`url(#${id}-water)`} strokeWidth="1">
        <path d="M20 287C110 278 197 300 291 289S470 279 579 291S690 297 792 285" />
        <path d="M0 307C123 292 158 322 284 309S449 300 554 312S700 318 800 304" />
        <path d="M50 328C168 316 215 336 320 325S494 319 587 330S710 334 760 328" />
      </g>
      <g className={styles.waterFlow} stroke="#ff9a73" strokeOpacity=".65" strokeDasharray="28 360">
        <path d="M20 287C110 278 197 300 291 289S470 279 579 291S690 297 792 285" />
        <path d="M0 307C123 292 158 322 284 309S449 300 554 312S700 318 800 304" />
        <path d="M50 328C168 316 215 336 320 325S494 319 587 330S710 334 760 328" />
      </g>
      <text x="30" y="49" className={styles.svgLabel}>A CITY STUDY / 0{city + 1}</text>
      <text x="773" y="250" textAnchor="end" className={styles.chinese}>{cities[city].chinese}</text>
    </svg>
  );
}

export function CityAtlas() {
  const [activeCity, setActiveCity] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "100px 0px" });
  const { motionPaused } = useMotionPreferences();
  const id = useId().replace(/:/g, "");
  const city = cities[activeCity];

  return (
    <section ref={ref} id="cities" className={styles.atlas} aria-labelledby={`${id}-title`} data-animate={inView && !motionPaused} data-reduced={motionPaused}>
      <div className={styles.inner}>
        <div className={styles.topline}><span><i /> PLACES THAT SHAPE THE WORK</span><span>HKG <b>↗</b> CAN</span></div>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <h2 id={`${id}-title`}>Two cities.<br /><em>One journey.</em></h2>
            <p className={styles.intro}>From Victoria Harbour<br />to the Pearl River.</p>
            <div className={styles.controls} role="group" aria-label="Choose a city">
              {cities.map((item, index) => (
                <button key={item.code} type="button" aria-pressed={activeCity === index} aria-controls={`${id}-details`} onClick={() => setActiveCity(index)}>
                  <span className={styles.cityIndex}>0{index + 1}</span>
                  <span className={styles.cityButtonName}>{item.name}<span lang="zh">{item.chinese}</span></span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
          <div className={styles.scene}>
            <div className={styles.sceneTop}><span>{city.code} / {city.water}</span><span>{city.coordinates}</span></div>
            <CityLandscape city={activeCity} id={id} />
            <div className={styles.sceneBottom} id={`${id}-details`} aria-live="polite" aria-atomic="true">
              <div className={styles.institution}><span>{city.short}</span><p>{city.institution}<small>{city.caption}</small></p></div>
              <span className={styles.years}>{city.years}</span>
            </div>
          </div>
        </div>
        <div className={styles.route} aria-hidden="true"><span>2022 / HONG KONG</span><div><i /></div><span>GUANGZHOU / 2026 →</span></div>
      </div>
    </section>
  );
}
