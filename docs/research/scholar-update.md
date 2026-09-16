# Publication and Scholar verification — 16 September 2026

## Source and scope

- Profile: [Guang CHEN — Google Scholar](https://scholar.google.com/citations?user=vT5MqNYAAAAJ&hl=en&sortby=pubdate&pagesize=100)
- Scholar ID: `vT5MqNYAAAAJ`.
- Checked on **2026-09-16**, using an ordinary HTTP GET of the public profile. The response was HTTP 200 and contained the complete six-row publication table. The web retrieval tool failed to open the page, but the direct public HTTP response succeeded; no authentication or challenge bypass was involved.
- The profile identifies The Hong Kong Polytechnic University and a verified `connect.polyu.hk` email domain.
- The full profile still lists **6 publications**. No additional publication was found in that list. Name-only search results were not imported because several researchers share the name Guang Chen.
- These are dated snapshots; the website does not claim live synchronization.

## Verified Scholar snapshot

| Metric | All time | Since 2021 |
| --- | ---: | ---: |
| Citations | 45 | 45 |
| h-index | 2 | 2 |
| i10-index | 1 | 1 |

| Paper (short title) | Scholar year | Scholar citations | Scholar record ID |
| --- | --- | ---: | --- |
| Agentic Audio Moderator vs Human Moderator | 2026 | 1 | `UeHWp8X0CEIC` |
| Theory-Informed vs. Example-Driven Prompting | 2025 | Not displayed | `IjCSPb-OGe4C` |
| Investigating Students' Preferences for AI Roles | 2025 | 2 | `2osOgNQ5qMEC` |
| Avatar-mediated communication | 2025 | 38 | `u-x6o8ySG0sC` |
| Towards Effective Collaborative Learning in Edu-Metaverse | 2024 | Not displayed | `u5HHmVD_uO8C` |
| Assessing the Effect of Arousal | Blank | 4 | `d1gkVwhDpl0C` |

The displayed article counts sum to 45. Undisplayed counts remain omitted, not asserted as zero. The previous local Frontiers citation value was 5; this update records the currently returned Scholar value of 4 without speculating about the reason for the change.

## Publication verification and normalization

### Agentic audio moderator

The [PolyU Scholars Hub record](https://research.polyu.edu.hk/en/publications/agentic-audio-moderator-vs-human-moderator-in-think-aloud-usabili/) confirms CHI 2026, publication on 13 April 2026, DOI [10.1145/3772318.3791653](https://doi.org/10.1145/3772318.3791653), and authors Wangda Zhu, Guang Chen, Yao Wang, Pengcheng An, Jiachun Du, and Chen Li. The Scholar listing repeats the subtitle; the website retains the subtitle only once.

### Theory-informed prompting

[Springer's chapter](https://link.springer.com/chapter/10.1007/978-981-95-7141-3_21) confirms authors Guang Chen, Wangda Zhu, Yin Nicole Yang, Daner Sun, and Zhiyuan Wen; BESC 2025; pages 324–337; and first online publication on **21 May 2026**. The [official BESC 2025 handbook](https://besc-conf.org/2025/files/program.pdf) also includes the presentation. `year` stays **2025** to match Scholar and the conference; `publicationYear: 2026` separately records the formal publication year. The DOI replaces the old Scholar-only article destination.

### AI roles in mathematical modelling

[arXiv 2510.06617](https://arxiv.org/abs/2510.06617) confirms the title, the five authors Wangda Zhu, Guang Chen, Yumeng Zhu, Lei Cai, and Xiangen Hu, and submission on 8 October 2025. It remains labeled as a preprint; no journal acceptance is inferred.

### Avatar-mediated communication

[ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0747563225000457) confirms Computers in Human Behavior, volume 167, article 108598, June 2025, DOI [10.1016/j.chb.2025.108598](https://doi.org/10.1016/j.chb.2025.108598), and the existing author order.

### Arousal in virtual reality

[Frontiers](https://www.frontiersin.org/journals/virtual-reality/articles/10.3389/frvir.2025.1458191/full) and the [publisher-version PDF in PolyU's repository](https://ira.lib.polyu.edu.hk/bitstream/10397/114063/1/frvir-1-1458191.pdf) confirm 20 June 2025, volume 6, article 1458191, DOI [10.3389/frvir.2025.1458191](https://doi.org/10.3389/frvir.2025.1458191), and authors Daniel Archer, Chen Li, Guang Chen, Yixin Dai, and Anthony Steed. Scholar leaves the year cell blank and its venue line ends in `0`; the website uses the verified publisher year **2025**. The author abbreviation is normalized from Scholar's `R. C. Li` to the publisher's `C. Li`.

### Edu-Metaverse collaborative learning

[Springer's chapter](https://link.springer.com/chapter/10.1007/978-981-96-4407-0_4) and the [PolyU record](https://research.polyu.edu.hk/en/publications/towards-effective-collaborative-learning-inedu-metaverse-a-study-/) confirm the author list, SETE 2024, pages 44–58, DOI [10.1007/978-981-96-4407-0_4](https://doi.org/10.1007/978-981-96-4407-0_4), and first online publication on **17 April 2025**. `year` stays **2024** to match Scholar and the conference; `publicationYear: 2025` records the publication year.

## Data implementation

`src/lib/content.ts` exports the dated `scholarProfile` snapshot. Each publication includes its display year, venue, original Scholar record link, and verification source. Main article and project links go to the publisher DOI or arXiv. Missing citation values remain optional. All six records are retained, with the newest Scholar year first.

Future updates should read the public profile again, check all rows, and refresh `checkedAt`, `displayDate`, aggregate statistics, and article citation badges together. Publisher dates and Scholar/conference dates must remain distinct where they differ.
