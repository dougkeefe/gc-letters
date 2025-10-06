import { useState } from 'react';
import { GcLetter, LetterBlock, SeparatorLine } from 'gc-letters';

type ExampleTab = 'basic' | 'french' | 'custom' | 'table';

function App() {
  const [activeTab, setActiveTab] = useState<ExampleTab>('basic');
  const [basicDownload, setBasicDownload] = useState<(() => void) | null>(null);
  const [frenchDownload, setFrenchDownload] = useState<(() => void) | null>(null);
  const [customDownload, setCustomDownload] = useState<(() => void) | null>(null);
  const [tableDownload, setTableDownload] = useState<(() => void) | null>(null);

  return (
    <div>
      <h1>GC Letters Test App</h1>
      <p>Test the gc-letters package locally before publishing to npm.</p>

      <div className="info-box">
        <h3>Testing Mode</h3>
        <p>
          <strong>Currently testing:</strong> Source code (via vite alias)
        </p>
        <p>
          To test the built package, run: <code>npm run test:package</code>
        </p>
      </div>

      <div className="tab-container">
        <div className="tab-buttons">
          <button
            className={activeTab === 'basic' ? 'active' : ''}
            onClick={() => setActiveTab('basic')}
          >
            FIP-Compliant Letter
          </button>
          <button
            className={activeTab === 'french' ? 'active' : ''}
            onClick={() => setActiveTab('french')}
          >
            Lettre en Français
          </button>
          <button
            className={activeTab === 'custom' ? 'active' : ''}
            onClick={() => setActiveTab('custom')}
          >
            Custom Formatting
          </button>
          <button
            className={activeTab === 'table' ? 'active' : ''}
            onClick={() => setActiveTab('table')}
          >
            Markdown Table
          </button>
        </div>

        <div className="example-container">
          {activeTab === 'basic' && <BasicExample onReady={setBasicDownload} download={basicDownload} />}
          {activeTab === 'french' && <FrenchExample onReady={setFrenchDownload} download={frenchDownload} />}
          {activeTab === 'custom' && <CustomFormattingExample onReady={setCustomDownload} download={customDownload} />}
          {activeTab === 'table' && <TableExample onReady={setTableDownload} download={tableDownload} />}
        </div>
      </div>
    </div>
  );
}

// Basic Example Component
function BasicExample({
  onReady,
  download
}: {
  onReady: (fn: (() => void) | null) => void;
  download: (() => void) | null;
}) {
  return (
    <div>
      <h2>FIP-Compliant Letter Example</h2>
      <p>A complete example demonstrating Federal Identity Program (FIP) standards with realistic government correspondence about open source software adoption.</p>

      <div className="info-box">
        <h3>FIP Elements Demonstrated:</h3>
        <ul>
          <li>✅ Department signature (Veterans Affairs Canada)</li>
          <li>✅ Canada wordmark (bottom left, first page only)</li>
          <li>✅ Letter tracking number (VAC-DPI-2024-003)</li>
          <li>✅ Proper margins and typography (Helvetica font)</li>
          <li>✅ Professional government letter format</li>
        </ul>
      </div>

      <button
        className="download-button"
        onClick={() => download?.()}
        disabled={!download}
      >
        Download FIP-Compliant Letter PDF
      </button>

      <GcLetter
        fileName="open-source-initiative"
        deptSignature="/veterans-affairs-signature.png"
        showLetterNumber={false}
        letterNumber="VAC-DPI-2024-003"
        letterNumberLocation="footer"
        letterNumberAlignment="left"
        showPageNumbers={'skip-first'}
        showNextPage={true}
        onReady={(downloadFn: () => void) => onReady(() => downloadFn)}
      >
        {/* Test: Content as children instead of prop */}
        <LetterBlock>{`**Veterans Affairs Canada**

**Digital Policy and Innovation**

${new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}

Dr. Sarah Chen
Director, Technology Modernization
Veterans Affairs Canada
66 Slater Street
Ottawa, ON K1A 0P4`}</LetterBlock>

        <LetterBlock>
{`Dear Dr. Chen,

**Re: Approval of Open Source Software Initiative**

*Note: This is an example letter demonstrating the gc-letters package capabilities.*

I am pleased to inform you that the Digital Policy and Innovation team has approved your proposal to adopt open source software practices within Veterans Affairs Canada's digital services.`}
        </LetterBlock>

        <LetterBlock>
{`## Initiative Overview

Your initiative demonstrates exceptional alignment with the Government of Canada's Digital Standards and the Treasury Board Directive on Service and Digital. By embracing open source principles, we will:

- **Increase transparency** in how we deliver digital services to veterans
- **Reduce costs** through shared development and reusable code
- **Improve security** through community peer review and faster vulnerability patching
- **Foster innovation** by enabling collaboration across departments`}
        </LetterBlock>

        <LetterBlock>
{`## Approved Activities

The following activities have been approved for immediate implementation:

1. **Open Source Licensing**: All new software projects will use approved open source licenses (MIT, Apache 2.0, or GPL v3)
2. **Public Code Repositories**: Non-sensitive code will be published on GitHub under the @veterans-affairs-canada organization
3. **Community Engagement**: Developers are authorized to participate in relevant open source communities during work hours
4. **Documentation Standards**: All projects will maintain comprehensive README files and contribution guidelines`}
        </LetterBlock>

        <SeparatorLine />

        <LetterBlock>
{`## Budget Allocation

An annual budget of **$250,000** has been allocated to support:

- Open source tool licensing and hosting
- Developer training and certification programs
- Community event participation
- External contributor recognition and rewards`}
        </LetterBlock>

        <LetterBlock>
{`## Next Steps

Please proceed with the following:

1. Establish the Open Source Program Office by March 31, 2025
2. Develop internal contribution guidelines aligned with TBS policies
3. Provide quarterly reports on adoption metrics and community engagement
4. Schedule a department-wide information session on open source best practices`}
        </LetterBlock>

        <LetterBlock>
{`This initiative represents a significant step forward in modernizing our digital infrastructure while maintaining the highest standards of security and privacy for veterans' information.

Congratulations to you and your team on this important achievement. I look forward to seeing the positive impact of this work on veterans and their families.`}
        </LetterBlock>

        <LetterBlock textAlign="left" allowPagebreak={false}>
{`Sincerely,

**Jean-Marc Dubois**
*Assistant Deputy Minister*
Digital Policy and Innovation
Veterans Affairs Canada

**cc:**
Chief Information Officer
Director General, Service Delivery
Privacy Commissioner`}
        </LetterBlock>
      </GcLetter>
    </div>
  );
}

// French Example Component
function FrenchExample({
  onReady,
  download
}: {
  onReady: (fn: (() => void) | null) => void;
  download: (() => void) | null;
}) {
  return (
    <div>
      <h2>Exemple de Lettre en Français</h2>
      <p>Une lettre complète conforme aux normes du Programme de coordination de l'image de marque (PCIM) avec correspondance gouvernementale réaliste en français.</p>

      <div className="info-box">
        <h3>Éléments PCIM démontrés :</h3>
        <ul>
          <li>✅ Signature ministérielle (Anciens Combattants Canada)</li>
          <li>✅ Mot-symbole « Canada » (en bas à gauche, première page seulement)</li>
          <li>✅ Numéro de suivi de la lettre (ACC-DPI-2024-003)</li>
          <li>✅ Marges et typographie appropriées (police Helvetica)</li>
          <li>✅ Format de lettre gouvernementale professionnelle</li>
        </ul>
      </div>

      <button
        className="download-button"
        onClick={() => download?.()}
        disabled={!download}
      >
        Télécharger la lettre PDF en français
      </button>

      <GcLetter
        fileName="initiative-logiciel-libre"
        deptSignature="/veterans-affairs-signature.png"
        showLetterNumber={false}
        letterNumber="ACC-DPI-2024-003"
        letterNumberLocation="footer"
        letterNumberAlignment="left"
        showPageNumbers={'skip-first'}
        onReady={(downloadFn: () => void) => onReady(() => downloadFn)}
      >
        <LetterBlock>{`**Anciens Combattants Canada**

**Politique numérique et innovation**

${new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })}

Dre Sarah Chen
Directrice, Modernisation technologique
Anciens Combattants Canada
66, rue Slater
Ottawa (Ontario) K1A 0P4`}</LetterBlock>

        <LetterBlock>
{`Chère Dre Chen,

**Objet : Approbation de l'initiative de logiciels libres**

*Remarque : Il s'agit d'un exemple de lettre démontrant les capacités du module gc-letters.*

J'ai le plaisir de vous informer que l'équipe de la politique numérique et de l'innovation a approuvé votre proposition d'adopter des pratiques de logiciels libres dans les services numériques d'Anciens Combattants Canada.`}
        </LetterBlock>

        <LetterBlock>
{`## Aperçu de l'initiative

Votre initiative démontre un alignement exceptionnel avec les Normes numériques du gouvernement du Canada et la Directive sur les services et le numérique du Conseil du Trésor. En adoptant les principes des logiciels libres, nous pourrons :

- **Accroître la transparence** dans la prestation de services numériques aux anciens combattants
- **Réduire les coûts** grâce au développement partagé et au code réutilisable
- **Améliorer la sécurité** grâce à l'examen par les pairs de la communauté et à la correction plus rapide des vulnérabilités
- **Favoriser l'innovation** en permettant la collaboration entre les ministères`}
        </LetterBlock>

        <LetterBlock>
{`## Activités approuvées

Les activités suivantes ont été approuvées pour une mise en œuvre immédiate :

1. **Licences de logiciels libres** : Tous les nouveaux projets logiciels utiliseront des licences de logiciels libres approuvées (MIT, Apache 2.0 ou GPL v3)
2. **Dépôts de code publics** : Le code non sensible sera publié sur GitHub sous l'organisation @anciens-combattants-canada
3. **Engagement communautaire** : Les développeurs sont autorisés à participer aux communautés de logiciels libres pertinentes pendant les heures de travail
4. **Normes de documentation** : Tous les projets maintiendront des fichiers README complets et des lignes directrices de contribution`}
        </LetterBlock>

        <SeparatorLine />

        <LetterBlock>
{`## Attribution budgétaire

Un budget annuel de **250 000 $** a été alloué pour soutenir :

- Les licences et l'hébergement d'outils de logiciels libres
- Les programmes de formation et de certification des développeurs
- La participation à des événements communautaires
- La reconnaissance et les récompenses des contributeurs externes`}
        </LetterBlock>

        <LetterBlock>
{`## Prochaines étapes

Veuillez procéder comme suit :

1. Établir le Bureau du programme de logiciels libres d'ici le 31 mars 2025
2. Élaborer des lignes directrices de contribution internes conformes aux politiques du SCT
3. Fournir des rapports trimestriels sur les mesures d'adoption et l'engagement communautaire
4. Organiser une séance d'information à l'échelle du ministère sur les meilleures pratiques en matière de logiciels libres`}
        </LetterBlock>

        <LetterBlock>
{`Cette initiative représente un pas important dans la modernisation de notre infrastructure numérique tout en maintenant les normes les plus élevées en matière de sécurité et de protection de la vie privée pour les renseignements des anciens combattants.

Félicitations à vous et à votre équipe pour cette réalisation importante. J'ai hâte de voir l'impact positif de ce travail sur les anciens combattants et leurs familles.`}
        </LetterBlock>

        <LetterBlock textAlign="left" allowPagebreak={false}>
{`Je vous prie d'agréer, Dre Chen, l'expression de mes sentiments les meilleurs.

**Jean-Marc Dubois**
*Sous-ministre adjoint*
Politique numérique et innovation
Anciens Combattants Canada

**c.c. :**
Dirigeant principal de l'information
Directeur général, Prestation de services
Commissaire à la protection de la vie privée`}
        </LetterBlock>
      </GcLetter>
    </div>
  );
}

// Custom Formatting Example Component
function CustomFormattingExample({
  onReady,
  download
}: {
  onReady: (fn: (() => void) | null) => void;
  download: (() => void) | null;
}) {
  return (
    <div>
      <h2>Custom Formatting Example</h2>
      <p>Demonstrates typography customization, alignment options, and block-level overrides.</p>

      <button
        className="download-button"
        onClick={() => download?.()}
        disabled={!download}
      >
        Download Custom Formatted PDF
      </button>

      <GcLetter
        fileName="custom-formatted-letter"
        deptSignature="/veterans-affairs-signature.png"
        fontFace="Helvetica"
        textSizeNormal="12pt"
        textSizeHeading1="18pt"
        textSizeHeading2="16pt"
        textSizeHeading3="14pt"
        lineSpacing="8mm"
        paragraphSpacing="12mm"
        onReady={(downloadFn: () => void) => onReady(() => downloadFn)}
      >
        <LetterBlock textAlign="center">
          {`# Custom Typography Letter`}
        </LetterBlock>

        <LetterBlock textAlign="right">
          {`[Date: ${new Date().toLocaleDateString()}]`}
        </LetterBlock>

        <LetterBlock>
{`## Left Aligned Section

This section uses the default left alignment. It demonstrates standard paragraph formatting with custom line and paragraph spacing.

This is how most body text will appear in your letters.`}
        </LetterBlock>

        <SeparatorLine />

        <LetterBlock textAlign="center">
{`## Center Aligned Section

This section is centered for emphasis.

Perfect for titles or important announcements.`}
        </LetterBlock>

        <SeparatorLine />

        <LetterBlock textAlign="right">
{`## Right Aligned Section

This section is right-aligned.

Often used for dates or signatures.`}
        </LetterBlock>

        <SeparatorLine />

        <LetterBlock textAlign="full">
{`## Fully Justified Section

This section uses full justification, which means text is aligned to both the left and right margins. This creates a clean, professional appearance and is commonly used in formal government documents. The spacing between words is adjusted to ensure both edges are flush.`}
        </LetterBlock>

        <LetterBlock textSizeNormal="14pt">
{`**Custom Font Example**

This block uses a larger font size to demonstrate block-level typography overrides.`}
        </LetterBlock>

        <LetterBlock>
{`Thank you for reviewing these formatting options.

Sincerely,

Design Team`}
        </LetterBlock>
      </GcLetter>
    </div>
  );
}

// Table Example Component
function TableExample({
  onReady,
  download
}: {
  onReady: (fn: (() => void) | null) => void;
  download: (() => void) | null;
}) {
  return (
    <div>
      <h2>Markdown Table Example</h2>
      <p>Demonstrates markdown table rendering within a GcLetter component.</p>

      <button
        className="download-button"
        onClick={() => download?.()}
        disabled={!download}
      >
        Download Table Example PDF
      </button>

      <GcLetter
        fileName="table-example"
        deptSignature="/veterans-affairs-signature.png"
        showPageNumbers="skip-first"
        pageNumberFormat="Page #"
        pageNumberLocation="footer"
        pageNumberAlignment="center"
        onReady={(downloadFn: () => void) => onReady(() => downloadFn)}
      >
        <LetterBlock>
{`# Budget Report FY 2024-2025

**Veterans Affairs Canada**
**Financial Planning Division**

${new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}`}
        </LetterBlock>

        <SeparatorLine />

        <LetterBlock allowPagebreak={false}>
{`## Quarterly Budget Allocation

The following table outlines the approved budget allocation across our key program areas for the current fiscal year:`}
        </LetterBlock>

        <LetterBlock allowPagebreak={false}>
{`| Program Area | Q1 Budget | Q2 Budget | Q3 Budget | Q4 Budget | Total |
|--------------|-----------|-----------|-----------|-----------|-------|
| Veterans Services | $2.5M | $2.8M | $3.1M | $2.6M | $11.0M |
| Healthcare Support | $4.2M | $4.5M | $4.8M | $4.3M | $17.8M |
| Digital Transformation | $1.8M | $2.1M | $2.3M | $1.9M | $8.1M |
| Research & Development | $0.9M | $1.2M | $1.4M | $1.0M | $4.5M |
| Administrative | $1.1M | $1.0M | $1.2M | $1.1M | $4.4M |
| **Total** | **$10.5M** | **$11.6M** | **$12.8M** | **$10.9M** | **$45.8M** |`}
        </LetterBlock>

        <LetterBlock allowPagebreak={false}>
{`## Regional Distribution

Budget allocation by regional office:

| Region | Allocation | Percentage |
|--------|------------|------------|
| Atlantic | $8.2M | 18% |
| Quebec | $12.4M | 27% |
| Ontario | $15.6M | 34% |
| Prairies | $5.8M | 13% |
| Pacific | $3.8M | 8% |
| **Total** | **$45.8M** | **100%** |`}
        </LetterBlock>

        <SeparatorLine topMargin="8mm" bottomMargin="8mm" />

        <LetterBlock>
{`## Key Performance Indicators

Current quarter performance metrics:`}
        </LetterBlock>

        <LetterBlock>
{`| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Service Response Time | < 48hrs | 36hrs | ✅ Met |
| Client Satisfaction | > 85% | 89% | ✅ Exceeded |
| Budget Utilization | 90-95% | 93% | ✅ On Track |
| Digital Adoption | > 70% | 68% | ⚠️ Below Target |`}
        </LetterBlock>

        <LetterBlock textAlign="left">
{`## Summary

The budget allocation for FY 2024-2025 reflects our commitment to delivering exceptional services to Canadian veterans while investing in digital transformation and innovation.

For questions regarding this report, please contact the Financial Planning Division.

**Approved by:**

**Michelle Tremblay**
*Director, Financial Planning*
Veterans Affairs Canada`}
        </LetterBlock>
      </GcLetter>
    </div>
  );
}

export default App;
