/* ==========================================================================
   MÉTHODES · Maths S1 BTS SIO
   Une recette mécanique par type de question.
   Quand l'utiliser → étapes numérotées → déroulé intégral → contrôle → blocage.
   ========================================================================== */

const METHODES = {};

/* ==========================================================================
   01 · ARITHMÉTIQUE
   ========================================================================== */
METHODES.arith = `
<p class="methode-intro">Six recettes couvrent tout le chapitre. Choisis la recette d'après ce que l'énoncé <strong>demande</strong>, pas d'après les nombres qu'il donne.</p>

<div class="recette">
  <span class="recette__tag">Recette 1 · Division euclidienne</span>
  <h3>Poser une division euclidienne, même avec un nombre négatif</h3>
  <p class="recette__when"><strong>Quand :</strong> l'énoncé dit « quotient », « reste », « a ≡ r [b] », ou demande de montrer une divisibilité. C'est toujours la première ligne à écrire.</p>
  <ol class="steps">
    <li><strong>Cherche le plus grand multiple de <span class="m">b</span> inférieur ou égal à <span class="m">a</span>.</strong> Autrement dit le plus grand <span class="m">q</span> tel que <span class="m">b·q ≤ a</span>. Ce <span class="m">q</span> est le quotient.</li>
    <li><strong>Calcule le reste par soustraction :</strong> <span class="m">r = a − b·q</span>. Ne devine jamais le reste, déduis-le.</li>
    <li><strong>Vérifie les deux conditions :</strong> <span class="m">0 ≤ r &lt; b</span>. Si <span class="m">r</span> est négatif, ton quotient est trop grand d'une unité.</li>
    <li><strong>Écris la conclusion sous la forme imposée :</strong> <span class="m">a = b·q + r</span>, puis « le quotient est …, le reste est … ».</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · 487 par 13</span>
    <span class="formula">13 × 37 = 481 &nbsp;et&nbsp; 13 × 38 = 494<br>481 ≤ 487 &lt; 494 &nbsp;⇒&nbsp; q = 37</span>
    <p><span class="m">r = 487 − 481 = 6</span>. Contrôle : <span class="m">0 ≤ 6 &lt; 13</span> ✔</p>
    <span class="formula">487 = 13 × 37 + 6</span>
  </div>
  <div class="ex">
    <span class="ex__tag">Déroulé · −17 par 5 (le cas qui piège)</span>
    <p>Les multiples de 5 autour de −17 : <span class="m">5 × (−4) = −20</span> et <span class="m">5 × (−3) = −15</span>.</p>
    <span class="formula">−20 ≤ −17 &lt; −15 &nbsp;⇒&nbsp; q = −4<br>r = −17 − 5×(−4) = −17 + 20 = 3</span>
    <p>Conclusion : <span class="m">−17 = 5 × (−4) + 3</span>, reste <span class="m">3</span> et non <span class="m">−2</span>.</p>
    <p><strong>Raccourci à retenir :</strong> pour <span class="m">a &lt; 0</span>, pose d'abord la division de <span class="m">|a|</span>. Si le reste est non nul, alors <span class="m">q' = −q − 1</span> et <span class="m">r' = b − r</span>. Ici <span class="m">17 = 5×3 + 2</span> donne <span class="m">q' = −4</span> et <span class="m">r' = 5 − 2 = 3</span>.</p>
  </div>
  <p class="ctrl"><strong>Contrôle en 5 secondes :</strong> recalcule <span class="m">b·q + r</span> et vérifie que tu retombes sur <span class="m">a</span>, puis que <span class="m">r</span> est positif et strictement inférieur à <span class="m">b</span>.</p>
  <p class="blocage"><strong>Si ça bloque :</strong> tu as un reste négatif. Décrémente le quotient de 1 et ajoute <span class="m">b</span> au reste. Le couple est alors correct.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 2 · PGCD</span>
  <h3>Choisir la bonne méthode de PGCD et l'exécuter</h3>
  <p class="recette__when"><strong>Quand :</strong> « pgcd », « rendre irréductible », « simplifier », « plus grand diviseur commun ». La taille des nombres décide de la méthode, pas ton inspiration.</p>
  <ol class="steps">
    <li><strong>Test de taille :</strong> les deux nombres sont inférieurs à 200 → décomposition en facteurs premiers. Sinon → algorithme d'Euclide.</li>
    <li><strong>Interdit :</strong> lister les diviseurs dès que les nombres dépassent deux chiffres. C'est long, illisible, et ça ne rapporte aucun point de méthode.</li>
    <li><strong>Méthode décomposition :</strong> facteurs communs, chacun pris avec le <em>plus petit</em> exposant.</li>
    <li><strong>Méthode Euclide :</strong> divisions successives jusqu'au reste nul. Le PGCD est le <em>dernier reste non nul</em>.</li>
    <li><strong>Conclus par une phrase :</strong> « donc pgcd(a, b) = d », puis vérifie que <span class="m">d</span> divise bien les deux nombres de départ.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · Euclide sur 1071 et 1029</span>
    <span class="formula">1071 = 1029 × 1 + 42<br>1029 = 42 × 24 + 21<br>42 = 21 × 2 + 0 &nbsp;→ arrêt</span>
    <p>Dernier reste non nul : <span class="m">21</span>. Contrôle : <span class="m">1071 = 21 × 51</span> et <span class="m">1029 = 21 × 49</span> ✔</p>
  </div>
  <div class="ex">
    <span class="ex__tag">Déroulé · décomposition sur 84 et 36</span>
    <span class="formula">84 = 2² × 3 × 7<br>36 = 2² × 3²<br>pgcd = 2² × 3 = 12</span>
    <p>Le <span class="m">7</span> n'est pas commun : exclu. Pour <span class="m">2</span> on prend l'exposant <span class="m">2</span> (le plus petit), pour <span class="m">3</span> l'exposant <span class="m">1</span> (le plus petit).</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> le PGCD doit diviser les deux nombres. S'il n'en divise qu'un seul, tu as pris un facteur non commun ou le mauvais exposant.</p>
  <p class="blocage"><strong>Si ça bloque :</strong> utilise Euclide, il ne demande aucune intuition. Une division par ligne, tu recopies, tu continues.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 3 · Bézout</span>
  <h3>Trouver u et v tels que au + bv = pgcd(a, b), sans remontée fragile</h3>
  <p class="recette__when"><strong>Quand :</strong> « justifier que a et b sont premiers entre eux », « déterminer un couple (u, v) », « inverse modulaire ». Le mot « Bézout » n'est pas toujours écrit.</p>
  <ol class="steps">
    <li><strong>Pose un tableau à trois colonnes :</strong> <span class="m">r</span>, <span class="m">u</span>, <span class="m">v</span>, avec la lecture <span class="m">r = a·u + b·v</span>.</li>
    <li><strong>Initialise deux lignes :</strong> <span class="m">(a, 1, 0)</span> puis <span class="m">(b, 0, 1)</span>. Ces deux lignes sont triviales mais indispensables.</li>
    <li><strong>Chaque nouvelle ligne utilise le quotient précédent :</strong> <span class="m">r₂ = r₀ − q₁·r₁</span>, et <strong>exactement la même opération</strong> sur <span class="m">u</span> et <span class="m">v</span>.</li>
    <li><strong>Arrête-toi sur la ligne où <span class="m">r = 0</span>.</strong> La ligne juste au-dessus donne le PGCD et les coefficients.</li>
    <li><strong>Vérifie numériquement</strong> <span class="m">a·u + b·v</span>. Si tu n'obtiens pas le PGCD, l'erreur est dans une colonne <span class="m">u</span> ou <span class="m">v</span>, pas dans les restes.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · 1071 et 1029</span>
    <div class="tw"><table class="basetbl">
      <caption>r = 1071·u + 1029·v</caption>
      <thead><tr><th>r</th><th>u</th><th>v</th><th>opération</th></tr></thead>
      <tbody>
        <tr><td>1071</td><td>1</td><td>0</td><td>départ</td></tr>
        <tr><td>1029</td><td>0</td><td>1</td><td>départ</td></tr>
        <tr><td>42</td><td>1</td><td>−1</td><td>ligne 1 − 1 × ligne 2</td></tr>
        <tr><td>21</td><td>−24</td><td>25</td><td>ligne 2 − 24 × ligne 3</td></tr>
        <tr><td>0</td><td>49</td><td>−51</td><td>ligne 3 − 2 × ligne 4</td></tr>
      </tbody>
    </table></div>
    <span class="formula">21 = 1071 × (−24) + 1029 × 25</span>
    <p>Vérification : <span class="m">1071 × 24 = 25704</span> et <span class="m">1029 × 25 = 25725</span>. La différence vaut <span class="m">21</span> ✔</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> le membre de droite doit valoir exactement le PGCD, pas un multiple. Si tu trouves <span class="m">42</span> au lieu de <span class="m">21</span>, tu t'es arrêté une ligne trop tôt.</p>
  <p class="blocage"><strong>Si ça bloque :</strong> reprends les colonnes <span class="m">u</span> et <span class="m">v</span> en appliquant <em>littéralement</em> l'opération de la colonne <span class="m">r</span>. Les trois colonnes avancent toujours ensemble.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 4 · PPCM</span>
  <h3>Calculer un PPCM sans se tromper d'exposant</h3>
  <p class="recette__when"><strong>Quand :</strong> « ppcm », « plus petit multiple commun », « au bout de combien de temps les deux cycles se rejoignent », « dénominateur commun ».</p>
  <ol class="steps">
    <li><strong>Calcule d'abord le PGCD.</strong> C'est presque toujours le chemin le plus court, et il sert au contrôle.</li>
    <li><strong>Applique la formule :</strong> <span class="m">ppcm(a, b) = a × b / pgcd(a, b)</span>, valable pour <span class="m">a, b &gt; 0</span>.</li>
    <li><strong>Sinon par décomposition :</strong> <em>tous</em> les facteurs présents, chacun au <em>plus grand</em> exposant.</li>
    <li><strong>Vérifie la double divisibilité :</strong> le PPCM doit être un multiple des deux nombres.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · 12 et 18</span>
    <span class="formula">pgcd(12, 18) = 6<br>ppcm = 12 × 18 / 6 = 216 / 6 = 36</span>
    <p>Par décomposition : <span class="m">12 = 2²×3</span> et <span class="m">18 = 2×3²</span>, donc <span class="m">2² × 3² = 36</span>. Contrôle : <span class="m">36 = 12×3 = 18×2</span> ✔</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> <span class="m">pgcd × ppcm = a × b</span>. Si le produit ne colle pas, l'une des deux valeurs est fausse.</p>
  <p class="blocage"><strong>Si ça bloque :</strong> prends les plus grands exposants de <em>chaque</em> facteur apparaissant dans l'une ou l'autre décomposition. Aucun facteur ne doit être oublié.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 5 · Congruences</span>
  <h3>Calculer une puissance énorme modulo n</h3>
  <p class="recette__when"><strong>Quand :</strong> « reste de 2¹⁰⁰ dans la division par 7 », « montrer que 3²⁰²⁶ ≡ … [11] », « clé de contrôle », « chiffrement ». On ne calcule jamais la puissance en entier.</p>
  <ol class="steps">
    <li><strong>Réduis la base modulo <span class="m">n</span></strong> dès la première ligne.</li>
    <li><strong>Cherche un petit exposant qui donne 1.</strong> Calcule <span class="m">a²</span>, <span class="m">a³</span>, <span class="m">a⁴</span> modulo <span class="m">n</span> jusqu'à tomber sur <span class="m">1</span> (ou sur <span class="m">−1</span>, encore plus commode).</li>
    <li><strong>Décompose l'exposant</strong> avec cette période : <span class="m">N = k·p + r</span>, où <span class="m">p</span> est la période trouvée.</li>
    <li><strong>Remplace la puissance de la période par 1</strong> et conclus sur <span class="m">a^r</span>.</li>
    <li><strong>N'écris jamais « = » entre deux nombres non congrus :</strong> utilise <span class="m">≡</span> à chaque ligne, sinon la copie perd la moitié des points.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · 2¹⁰⁰ modulo 7</span>
    <span class="formula">2³ = 8 ≡ 1 [7] &nbsp;(période 3)<br>100 = 3 × 33 + 1<br>2¹⁰⁰ = (2³)³³ × 2¹ ≡ 1³³ × 2 = 2 [7]</span>
    <p>Conclusion : le reste de <span class="m">2¹⁰⁰</span> par <span class="m">7</span> vaut <span class="m">2</span>. Contrôle rapide : <span class="m">2¹⁰ = 1024 = 7×146 + 2</span>, donc <span class="m">2¹⁰⁰ = (2¹⁰)¹⁰ ≡ 2¹⁰ ≡ 2</span> ✔</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> l'exposant restant doit être strictement inférieur à la période. S'il est plus grand, la division euclidienne de l'exposant est fausse.</p>
  <p class="blocage"><strong>Si tu ne trouves pas de période courte :</strong> utilise l'exponentiation binaire (carrés successifs) : tu doubles l'exposant à chaque ligne en réduisant modulo <span class="m">n</span>.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 6 · Clé de contrôle</span>
  <h3>Vérifier ou produire une clé (EAN-13, NIR, ISBN)</h3>
  <p class="recette__when"><strong>Quand :</strong> un énoncé parle de code-barres, de numéro de sécurité sociale, de numéro de compte, ou donne une suite de chiffres avec un dernier chiffre à valider.</p>
  <ol class="steps">
    <li><strong>Repère les poids :</strong> les chiffres sont multipliés par une suite de coefficients (souvent 1 et 3 en alternance).</li>
    <li><strong>Écris la somme pondérée en entier</strong>, chiffre par chiffre, sans regrouper mentalement.</li>
    <li><strong>Réduis modulo 10</strong> (ou modulo 97 pour le NIR) : c'est le reste de la division euclidienne.</li>
    <li><strong>Applique la formule de clé</strong> : <span class="m">(10 − S mod 10) mod 10</span> pour EAN, <span class="m">97 − (S mod 97)</span> pour le NIR.</li>
    <li><strong>Compare au chiffre fourni</strong> et conclus explicitement : clé correcte ou erreur de saisie.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · EAN-13 : 5449000000996</span>
    <p>Les 12 premiers chiffres, pondérés 1, 3, 1, 3… en partant de la gauche :</p>
    <span class="formula">5×1 + 4×3 + 4×1 + 9×3 + 0 + 0 + 0 + 0 + 0 + 0 + 9×1 + 9×3<br>= 5 + 12 + 4 + 27 + 0 + 0 + 0 + 0 + 0 + 0 + 9 + 27 = 84</span>
    <span class="formula">S mod 10 = 4 &nbsp;⇒&nbsp; clé = (10 − 4) mod 10 = 6</span>
    <p>Le dernier chiffre du code est bien <span class="m">6</span> : code valide.</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> <span class="m">S + clé</span> doit être un multiple de 10 (EAN). Pour le NIR, la clé doit ramener le total à un multiple de 97.</p>
  <p class="blocage"><strong>Si la clé ne correspond pas :</strong> tu as décalé les poids. Recompte les chiffres en partant de la gauche et vérifie que le 13ᵉ chiffre n'est pas inclus dans la somme.</p>
</div>

<div class="card copie">
  <h3>Copie modèle · exercice type d'arithmétique</h3>
  <p class="copie__q"><strong>Énoncé.</strong> Calculer pgcd(455, 273), puis simplifier 273/455. Trouver ensuite un couple (u, v) tel que 455u + 273v = pgcd.</p>
  <pre class="copy">Division euclidienne :
455 = 273 × 1 + 182
273 = 182 × 1 + 91
182 = 91 × 2 + 0
Le dernier reste non nul est 91, donc pgcd(455, 273) = 91.

Simplification :
273 / 455 = (273 ÷ 91) / (455 ÷ 91) = 3 / 5.

Bézout :
91 = 273 − 182 × 1
   = 273 − (455 − 273) × 1
   = 455 × (−1) + 273 × 2.</pre>
  <p class="ctrl"><strong>Ce qui rapporte les points :</strong> chaque division écrite, le mot « dernier reste non nul », et la vérification <span class="m">455 × (−1) + 273 × 2 = 91</span>.</p>
</div>
`;

/* ==========================================================================
   02 · NUMÉRATION
   ========================================================================== */
METHODES.num = `
<p class="methode-intro">En numération, une seule question à te poser avant de calculer : <strong>je vais vers le décimal, ou je pars du décimal ?</strong> Le reste est mécanique.</p>

<div class="recette">
  <span class="recette__tag">Recette 1 · Base quelconque → décimal</span>
  <h3>Convertir (chiffres)ᵦ en base 10</h3>
  <p class="recette__when"><strong>Quand :</strong> l'énoncé donne un nombre avec un indice de base (<span class="m">(1021)₃</span>, <span class="m">(1101)₂</span>) et demande sa valeur, une comparaison, ou un calcul.</p>
  <ol class="steps">
    <li><strong>Numérote les positions de droite à gauche en partant de 0.</strong> Le chiffre le plus à droite porte l'exposant 0, jamais celui de gauche.</li>
    <li><strong>Écris la décomposition en puissances :</strong> chaque chiffre multiplié par <span class="m">b^position</span>.</li>
    <li><strong>Établis d'abord la liste des puissances</strong> de <span class="m">b</span> : <span class="m">1, b, b², b³…</span> Tu évites ainsi toute erreur de calcul mental.</li>
    <li><strong>Additionne les produits.</strong> Le résultat est un nombre décimal ordinaire.</li>
    <li><strong>Contrôle de vraisemblance :</strong> avec <span class="m">n</span> chiffres en base <span class="m">b</span>, le résultat est toujours inférieur à <span class="m">bⁿ</span>.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · (1021)₃</span>
    <p>Positions : le <span class="m">1</span> de droite est en position 0, le <span class="m">2</span> en position 1, le <span class="m">0</span> en position 2, le <span class="m">1</span> de gauche en position 3.</p>
    <span class="formula">3⁰ = 1 &nbsp; 3¹ = 3 &nbsp; 3² = 9 &nbsp; 3³ = 27</span>
    <span class="formula">(1021)₃ = 1×3³ + 0×3² + 2×3¹ + 1×3⁰<br>= 27 + 0 + 6 + 1 = 34</span>
    <p>Le <span class="m">0</span> en position 2 ne contribue pas : c'est une position vide, pas un chiffre oublié.</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> <span class="m">(1021)₃</span> a 4 chiffres, donc la valeur doit être inférieure à <span class="m">3⁴ = 81</span>. 34 ✔</p>
  <p class="blocage"><strong>Si tu obtiens un résultat énorme :</strong> tu as numéroté les positions de gauche à droite. L'exposant 0 est toujours à l'extrême droite.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 2 · Décimal → base b</span>
  <h3>Convertir 34 en base 3 par divisions successives</h3>
  <p class="recette__when"><strong>Quand :</strong> l'énoncé donne un nombre entier ordinaire et demande son écriture dans une base (binaire, octal, hexadécimal, base 3…).</p>
  <ol class="steps">
    <li><strong>Divise le nombre par <span class="m">b</span></strong> et note le quotient <em>et</em> le reste.</li>
    <li><strong>Recommence avec le quotient</strong> jusqu'à obtenir un quotient nul.</li>
    <li><strong>Lis les restes de bas en haut.</strong> Le dernier reste calculé est le chiffre le plus à gauche.</li>
    <li><strong>Vérifie que chaque reste est bien dans <span class="m">{0, …, b−1}</span>.</strong> Un reste hors bornes signale une erreur de division.</li>
    <li><strong>Reconvertis pour contrôler</strong> avec la recette 1.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · 34 en base 3</span>
    <span class="formula">34 = 3 × 11 + 1<br>11 = 3 × 3 + 2<br>3 = 3 × 1 + 0<br>1 = 3 × 0 + 1 &nbsp;→ arrêt</span>
    <p>Restes dans l'ordre de calcul : <span class="m">1, 2, 0, 1</span>. Lecture de bas en haut : <span class="m">1 0 2 1</span>.</p>
    <span class="formula">34 = (1021)₃</span>
    <p>Cohérent avec l'exemple précédent : les deux recettes se vérifient l'une l'autre.</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> reconvertis. Si tu retrouves le nombre de départ, la conversion est juste. C'est le seul contrôle fiable et il prend dix secondes.</p>
  <p class="blocage"><strong>Si le résultat est inversé :</strong> tu as lu les restes de haut en bas. Le premier reste obtenu est le chiffre des unités, donc il s'écrit à droite.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 3 · Binaire ↔ octal ↔ hexadécimal</span>
  <h3>Passer d'une base à l'autre sans repasser par le décimal</h3>
  <p class="recette__when"><strong>Quand :</strong> les deux bases sont des puissances de 2 (2, 4, 8, 16). Cas classique : un octet en hexadécimal.</p>
  <ol class="steps">
    <li><strong>Regroupe les bits par paquets</strong> de <span class="m">log₂(base cible)</span> chiffres binaires : 3 bits pour l'octal, 4 bits pour l'hexadécimal.</li>
    <li><strong>Commence le découpage par la droite</strong> (poids faible).</li>
    <li><strong>Complète à gauche avec des zéros</strong> si le dernier paquet est incomplet.</li>
    <li><strong>Convertis chaque paquet</strong> avec la table : <span class="m">1010 = A</span>, <span class="m">1111 = F</span>, etc.</li>
    <li><strong>Recolle les chiffres dans l'ordre</strong>, sans séparateur.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · (11011010)₂ en hexadécimal</span>
    <span class="formula">1101 1010 &nbsp;(paquets de 4, découpage à droite)<br>1101 = 13 = D &nbsp;·&nbsp; 1010 = 10 = A</span>
    <span class="formula">(11011010)₂ = (DA)₁₆</span>
    <p>Pour l'octal, mêmes paquets mais de 3 bits : <span class="m">011 011 010</span> donne <span class="m">3 3 2</span>, soit <span class="m">(332)₈</span>.</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> un octet complet donne toujours 2 chiffres hexadécimaux (de 00 à FF). Si tu obtiens 3 chiffres, tu as oublié un bit.</p>
  <p class="blocage"><strong>Si les paquets ne tombent pas juste :</strong> ajoute des zéros à gauche, jamais à droite. Un zéro à droite multiplie la valeur par la base.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 4 · Addition en base b</span>
  <h3>Additionner deux nombres écrits en base b</h3>
  <p class="recette__when"><strong>Quand :</strong> l'énoncé demande une somme, une différence ou une multiplication dans une base non décimale.</p>
  <ol class="steps">
    <li><strong>Aligne les nombres à droite</strong>, comme en primaire.</li>
    <li><strong>Additionne colonne par colonne</strong> en partant des unités.</li>
    <li><strong>Dès que la somme atteint <span class="m">b</span>, écris <span class="m">somme − b</span></strong> et retiens 1 pour la colonne suivante. En base 3 : 2 + 2 = 4 → écris 1, retiens 1.</li>
    <li><strong>N'oublie pas la retenue</strong> dans la colonne suivante : c'est l'erreur numéro un.</li>
    <li><strong>Contrôle en décimal :</strong> convertis les deux opérandes et le résultat, puis vérifie l'égalité.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · (1021)₃ + (212)₃</span>
    <span class="formula">  1 0 2 1<br>+   2 1 2<br>---------</span>
    <p>Unités : <span class="m">1+2 = 3 = 3×1 + 0</span> → écris 0, retiens 1.<br>
    Troisièmes : <span class="m">2+1+1 = 4 = 3×1 + 1</span> → écris 1, retiens 1.<br>
    Neuvièmes : <span class="m">0+2+1 = 3</span> → écris 0, retiens 1.<br>
    Vingt-septièmes : <span class="m">1+0+1 = 2</span> → écris 2.</p>
    <span class="formula">(1021)₃ + (212)₃ = (2010)₃</span>
    <p>Contrôle décimal : <span class="m">34 + 23 = 57</span> et <span class="m">(2010)₃ = 2×27 + 0 + 3 + 0 = 57</span> ✔</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> la conversion en décimal des deux côtés. Si les totaux diffèrent, la retenue est l'accusé.</p>
  <p class="blocage"><strong>Si tu écris un chiffre ≥ b :</strong> c'est la retenue oubliée. Reprends la colonne en ajoutant 1.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 5 · Validité et lecture</span>
  <h3>Vérifier qu'une écriture en base b est légitime</h3>
  <p class="recette__when"><strong>Quand :</strong> un QCM propose des écritures et demande laquelle est un nombre valide en base b, ou quand tu doutes de ta propre réponse.</p>
  <ol class="steps">
    <li><strong>Applique la règle des chiffres :</strong> en base <span class="m">b</span>, seuls les chiffres de <span class="m">0</span> à <span class="m">b−1</span> existent.</li>
    <li><strong>Cherche le plus grand chiffre de l'écriture.</strong> S'il est ≥ <span class="m">b</span>, l'écriture est invalide.</li>
    <li><strong>Vérifie le zéro initial :</strong> un nombre ne commence pas par 0, sauf le nombre nul lui-même.</li>
    <li><strong>Attention aux lettres :</strong> en base 16, <span class="m">A = 10</span> jusqu'à <span class="m">F = 15</span>. La lettre <span class="m">G</span> n'existe pas.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · trois écritures en base 3</span>
    <p><span class="m">(1021)₃</span> : chiffres 0, 1, 2 → valide.<br>
    <span class="m">(1031)₃</span> : contient un 3 → invalide, le 3 n'existe pas en base 3.<br>
    <span class="m">(0 12)₃</span> : zéro initial inutile → écriture non normalisée.</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> le plus grand chiffre de l'écriture doit être strictement inférieur à la base.</p>
  <p class="blocage"><strong>Si un QCM propose deux réponses valides :</strong> relis la question, elle demande souvent la valeur la plus grande ou la seule écriture normalisée.</p>
</div>

<div class="card copie">
  <h3>Copie modèle · exercice type de numération</h3>
  <p class="copie__q"><strong>Énoncé.</strong> Écrire 2026 en base 8, puis calculer <span class="m">(2026)₈ + (77)₈</span>.</p>
  <pre class="copy">Conversion de 2026 en base 8 :
2026 = 8 × 253 + 2
 253 = 8 × 31 + 5
  31 = 8 × 3 + 7
   3 = 8 × 0 + 3
Lecture des restes de bas en haut : 2026 = (3752)₈.

Vérification : 3×512 + 7×64 + 5×8 + 2 = 1536 + 448 + 40 + 2 = 2026.

Addition :
(3752)₈ + (77)₈
unités : 2 + 7 = 9 = 8 + 1 → écris 1, retiens 1
huitièmes : 5 + 7 + 1 = 13 = 8 + 5 → écris 5, retiens 1
soixante-quatrièmes : 7 + 0 + 1 = 8 → écris 0, retiens 1
cinq-cent-douzièmes : 3 + 0 + 1 = 4
Résultat : (4051)₈, et 4×512 + 0 + 5×8 + 1 = 2089 = 2026 + 63 ✔</pre>
</div>
`;

/* ==========================================================================
   03 · MATRICES
   ========================================================================== */
METHODES.mat = `
<p class="methode-intro">Toute erreur de matrices vient de trois choses : dimensions non vérifiées, ligne et colonne mélangées, ordre du produit inversé. Les recettes ci-dessous suppriment les trois.</p>

<div class="recette">
  <span class="recette__tag">Recette 1 · Dimensions</span>
  <h3>Savoir avant de calculer si l'opération est possible</h3>
  <p class="recette__when"><strong>Quand :</strong> systématiquement, dès la première ligne de toute question sur les matrices.</p>
  <ol class="steps">
    <li><strong>Écris la taille de chaque matrice</strong> sous la forme <span class="m">lignes × colonnes</span>. Exemple : 2 lignes et 3 colonnes → <span class="m">2×3</span>.</li>
    <li><strong>Addition :</strong> possible seulement si les tailles sont identiques.</li>
    <li><strong>Produit <span class="m">A × B</span> :</strong> possible seulement si le nombre de colonnes de <span class="m">A</span> égale le nombre de lignes de <span class="m">B</span>.</li>
    <li><strong>La taille du résultat est <span class="m">(lignes de A) × (colonnes de B)</span>.</strong> Écris-la avant de calculer, ça évite les cases manquantes.</li>
    <li><strong>Conclus :</strong> si les conditions ne sont pas remplies, l'opération n'existe pas. C'est une réponse complète, ça rapporte les points.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé</span>
    <p><span class="m">A</span> est <span class="m">2×3</span>, <span class="m">B</span> est <span class="m">3×2</span> : <span class="m">A×B</span> existe et donne une matrice <span class="m">2×2</span>. <span class="m">B×A</span> existe aussi et donne une <span class="m">3×3</span>.</p>
    <p>En revanche, si <span class="m">A</span> est <span class="m">2×3</span> et <span class="m">C</span> est <span class="m">2×3</span>, alors <span class="m">A×C</span> n'existe pas : 3 ≠ 2.</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> la dimension intérieure doit disparaître : <span class="m">(2×3)(3×2)</span> donne <span class="m">2×2</span>. Si elle ne disparaît pas, tu t'es trompé de sens.</p>
  <p class="blocage"><strong>Si l'énoncé demande <span class="m">AB</span> et que ça n'existe pas :</strong> écris-le. C'est parfois la réponse attendue, notamment pour montrer qu'un produit n'est pas commutatif.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 2 · Produit matriciel</span>
  <h3>Calculer un coefficient sans jamais se tromper de ligne</h3>
  <p class="recette__when"><strong>Quand :</strong> tout produit de matrices, tout <span class="m">A²</span>, tout système mis sous forme matricielle.</p>
  <ol class="steps">
    <li><strong>Pour chaque coefficient, fixe deux indices :</strong> <span class="m">i</span> = ligne de <span class="m">A</span>, <span class="m">j</span> = colonne de <span class="m">B</span>.</li>
    <li><strong>Pointe la ligne <span class="m">i</span> de <span class="m">A</span> avec le doigt</strong>, puis la colonne <span class="m">j</span> de <span class="m">B</span>. Ne bouge plus.</li>
    <li><strong>Multiplie terme à terme :</strong> premier avec premier, deuxième avec deuxième, etc.</li>
    <li><strong>Additionne ces produits :</strong> c'est la valeur du coefficient <span class="m">(i, j)</span>.</li>
    <li><strong>Écris le détail une fois</strong> pour chaque coefficient. Les correcteurs comptent le détail, pas seulement le résultat.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · A (2×3) × B (3×2)</span>
    <pre class="copy">A (2×3)              B (3×2)
[ 1  2  3 ]          [  7   8 ]
[ 4  5  6 ]          [  9  10 ]
                     [ 11  12 ]</pre>
    <p>Coefficient <span class="m">(1,1)</span> : ligne 1 de A, colonne 1 de B → <span class="m">1×7 + 2×9 + 3×11 = 7 + 18 + 33 = 58</span>.<br>
    Coefficient <span class="m">(1,2)</span> : ligne 1, colonne 2 → <span class="m">1×8 + 2×10 + 3×12 = 8 + 20 + 36 = 64</span>.<br>
    Coefficient <span class="m">(2,1)</span> : ligne 2, colonne 1 → <span class="m">4×7 + 5×9 + 6×11 = 28 + 45 + 66 = 139</span>.<br>
    Coefficient <span class="m">(2,2)</span> : <span class="m">4×8 + 5×10 + 6×12 = 32 + 50 + 72 = 154</span>.</p>
    <pre class="copy">A × B = [  58   64 ]
        [ 139  154 ]</pre>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> compte les coefficients. Une <span class="m">2×2</span> en exige exactement 4. S'il t'en manque un, tu as confondu une ligne et une colonne.</p>
  <p class="blocage"><strong>Si les valeurs te semblent incohérentes :</strong> refais un seul coefficient en écrivant chaque multiplication séparément. L'erreur est presque toujours un décalage d'indice dans la colonne de <span class="m">B</span>.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 3 · Transposée</span>
  <h3>Transposer sans perdre l'ordre</h3>
  <p class="recette__when"><strong>Quand :</strong> « transposée », notation <span class="m">Aᵗ</span>, ou calcul d'un produit <span class="m">AᵗA</span>.</p>
  <ol class="steps">
    <li><strong>Les lignes deviennent des colonnes.</strong> La première ligne de <span class="m">A</span> est la première colonne de <span class="m">Aᵗ</span>.</li>
    <li><strong>La taille s'inverse :</strong> une <span class="m">m×n</span> devient <span class="m">n×m</span>.</li>
    <li><strong>Pour un produit, inverse aussi l'ordre :</strong> <span class="m">(AB)ᵗ = BᵗAᵗ</span>.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé</span>
    <pre class="copy">A (2×3)          Aᵗ (3×2)
[ 1  2  3 ]      [ 1  4 ]
[ 4  5  6 ]      [ 2  5 ]
                 [ 3  6 ]</pre>
    <p>Le 1 reste en haut à gauche, le 2 passe en deuxième ligne première colonne.</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> le coefficient situé ligne <span class="m">i</span> colonne <span class="m">j</span> de <span class="m">A</span> doit être en ligne <span class="m">j</span> colonne <span class="m">i</span> de <span class="m">Aᵗ</span>.</p>
  <p class="blocage"><strong>Si tu écris <span class="m">AᵗBᵗ</span> :</strong> l'ordre est faux. Retiens la phrase : « je retourne le produit, donc je retourne l'ordre ».</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 4 · Puissances et graphes</span>
  <h3>Interpréter A², A³ sur une matrice d'adjacence</h3>
  <p class="recette__when"><strong>Quand :</strong> l'énoncé parle de graphe, de sommets, de chemins, de nombre de trajets possibles.</p>
  <ol class="steps">
    <li><strong>Construis la matrice d'adjacence :</strong> <span class="m">1</span> s'il existe une arête directe du sommet <span class="m">i</span> vers <span class="m">j</span>, <span class="m">0</span> sinon.</li>
    <li><strong>Le coefficient <span class="m">(i, j)</span> de <span class="m">Aⁿ</span> compte les chemins de longueur exactement <span class="m">n</span></strong> allant de <span class="m">i</span> à <span class="m">j</span>.</li>
    <li><strong>Calcule <span class="m">A²</span> avec la recette 2</strong>, en te souvenant que les coefficients sont des <em>nombres de chemins</em>, jamais des distances.</li>
    <li><strong>Réponds à la question posée</strong> en lisant le bon coefficient, pas la somme de la matrice.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · graphe en ligne 1–2–3</span>
    <pre class="copy">A           A²
[ 0 1 0 ]   [ 1 0 1 ]
[ 1 0 1 ]   [ 0 2 0 ]
[ 0 1 0 ]   [ 1 0 1 ]</pre>
    <p>De 1 à 1 en deux étapes : un seul chemin, <span class="m">1→2→1</span>. De 2 à 2 : deux chemins, <span class="m">2→1→2</span> et <span class="m">2→3→2</span>. Les coefficients diagonaux comptent les allers-retours.</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> la somme des coefficients d'une ligne de <span class="m">A²</span> donne le nombre total de chemins de longueur 2 partant de ce sommet.</p>
  <p class="blocage"><strong>Si le coefficient diagonal te surprend :</strong> il compte les retours au point de départ, pas les chemins nuls. Recompte les allers-retours.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 5 · Déterminant et inverse</span>
  <h3>Inverser une matrice 2×2, et savoir quand c'est impossible</h3>
  <p class="recette__when"><strong>Quand :</strong> « déterminant », « matrice inversible », « résoudre un système », « A⁻¹ ».</p>
  <ol class="steps">
    <li><strong>Calcule le déterminant :</strong> pour <span class="m">A = [a b ; c d]</span>, <span class="m">det = ad − bc</span>. Produit de la diagonale descendante moins produit de l'autre.</li>
    <li><strong>Teste <span class="m">det = 0</span>.</strong> Si c'est le cas, la matrice n'est pas inversible : écris-le, ne cherche pas plus loin.</li>
    <li><strong>Échange a et d, change les signes de b et c.</strong> La matrice devient <span class="m">[d −b ; −c a]</span>.</li>
    <li><strong>Divise par le déterminant :</strong> <span class="m">A⁻¹ = (1/det) × [d −b ; −c a]</span>.</li>
    <li><strong>Vérifie par <span class="m">A × A⁻¹ = I</span>.</strong> Un seul calcul de coefficient suffit à détecter une erreur de signe.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · A = [3 1 ; 2 4]</span>
    <pre class="copy">det = 3×4 − 1×2 = 12 − 2 = 10 ≠ 0
A⁻¹ = (1/10) × [  4  −1 ]
                [ −2   3 ]</pre>
    <p>Contrôle du coefficient <span class="m">(1,1)</span> : <span class="m">3×0,4 + 1×(−0,2) = 1,2 − 0,2 = 1</span> ✔<br>
    Contrôle du coefficient <span class="m">(1,2)</span> : <span class="m">3×(−0,1) + 1×0,3 = 0</span> ✔</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> <span class="m">A·A⁻¹</span> doit donner la matrice identité. Si un coefficient hors diagonale vaut autre chose que 0, tu as oublié un signe moins.</p>
  <p class="blocage"><strong>Si det = 0 :</strong> la matrice est singulière, l'inverse n'existe pas, et le système associé n'a soit aucune solution, soit une infinité. C'est une conclusion recevable.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 6 · Système linéaire</span>
  <h3>Résoudre un système en passant par les matrices</h3>
  <p class="recette__when"><strong>Quand :</strong> deux équations à deux inconnues avec des coefficients peu sympathiques, ou un énoncé qui parle de système et de matrices.</p>
  <ol class="steps">
    <li><strong>Mets le système sous la forme <span class="m">A·X = B</span> :</strong> <span class="m">A</span> contient les coefficients, <span class="m">X</span> les inconnues, <span class="m">B</span> les seconds membres.</li>
    <li><strong>Calcule le déterminant de <span class="m">A</span>.</strong> S'il est nul, arrête-toi et discute.</li>
    <li><strong>Calcule <span class="m">A⁻¹</span></strong> avec la recette 5.</li>
    <li><strong>Multiplie <span class="m">X = A⁻¹·B</span>.</strong> Ici aussi, une ligne de calcul par inconnue.</li>
    <li><strong>Réinjecte les valeurs dans les deux équations de départ.</strong> C'est le contrôle le plus rentable du chapitre.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · 3x + y = 5 et 2x + 4y = 6</span>
    <pre class="copy">A = [ 3  1 ]   X = [ x ]   B = [ 5 ]
    [ 2  4 ]       [ y ]       [ 6 ]

det = 10        A⁻¹ = (1/10) × [  4  −1 ]
                              [ −2   3 ]

X = (1/10) × [ 4×5 + (−1)×6 ] = (1/10) × [ 14 ] = [ 1,4 ]
             [ −2×5 + 3×6 ]             [  8 ]   [ 0,8 ]</pre>
    <p>Contrôle : <span class="m">3×1,4 + 0,8 = 5</span> ✔ et <span class="m">2×1,4 + 4×0,8 = 2,8 + 3,2 = 6</span> ✔</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> les deux équations doivent être satisfaites simultanément. Une seule ne suffit pas.</p>
  <p class="blocage"><strong>Si le système vient d'un énoncé concret :</strong> vérifie que les valeurs ont un sens (un prix négatif, une quantité fractionnaire de personnes signale une erreur de mise en équation).</p>
</div>

<div class="card copie">
  <h3>Copie modèle · exercice type de matrices</h3>
  <p class="copie__q"><strong>Énoncé.</strong> <span class="m">A = [2 1 ; 5 3]</span>. Calculer <span class="m">A²</span>, puis <span class="m">A⁻¹</span>.</p>
  <pre class="copy">A est une matrice 2×2, donc A² est 2×2.

A² = [2 1 ; 5 3] × [2 1 ; 5 3]
coefficient (1,1) : 2×2 + 1×5 = 4 + 5 = 9
coefficient (1,2) : 2×1 + 1×3 = 2 + 3 = 5
coefficient (2,1) : 5×2 + 3×5 = 10 + 15 = 25
coefficient (2,2) : 5×1 + 3×3 = 5 + 9 = 14
A² = [9 5 ; 25 14].

det(A) = 2×3 − 1×5 = 6 − 5 = 1, donc A est inversible.
A⁻¹ = (1/1) × [3 −1 ; −5 2] = [3 −1 ; −5 2].

Vérification : A × A⁻¹ = [2×3 + 1×(−5), 2×(−1) + 1×2 ; 5×3 + 3×(−5), 5×(−1) + 3×2]
= [1 0 ; 0 1] ✔</pre>
</div>
`;

/* ==========================================================================
   04 · PROPOSITIONS ET LOGIQUE
   ========================================================================== */
METHODES.log = `
<p class="methode-intro">La logique ne se comprend pas « au feeling ». On traduit, on décompose, on remplit un tableau. Trois gestes, toujours les mêmes.</p>

<div class="recette">
  <span class="recette__tag">Recette 1 · Traduction</span>
  <h3>Transformer une phrase française en formule</h3>
  <p class="recette__when"><strong>Quand :</strong> l'énoncé donne une phrase et demande de la formaliser, ou l'inverse.</p>
  <ol class="steps">
    <li><strong>Repère les propositions atomiques</strong> et donne-leur un nom : <span class="m">p</span>, <span class="m">q</span>, <span class="m">r</span>. Ce sont les phrases qu'on ne peut pas couper sans perdre le sens.</li>
    <li><strong>Entoure les mots de liaison</strong> et applique la table : « et » → <span class="m">∧</span>, « ou » → <span class="m">∨</span> (inclusif par défaut), « si … alors » → <span class="m">→</span>, « si et seulement si » → <span class="m">↔</span>, « ne … pas » → <span class="m">¬</span>.</li>
    <li><strong>Respecte la priorité :</strong> <span class="m">¬</span> d'abord, puis <span class="m">∧</span>, puis <span class="m">∨</span>, puis <span class="m">→</span>, puis <span class="m">↔</span>. En cas de doute, mets des parenthèses.</li>
    <li><strong>Relis la formule à voix haute</strong> en français et vérifie qu'elle dit la même chose que la phrase de départ.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé</span>
    <p>« Le serveur répond et la base n'est pas saturée » : <span class="m">p</span> = le serveur répond, <span class="m">q</span> = la base est saturée, formule <span class="m">p ∧ ¬q</span>.</p>
    <p>« S'il pleut, je prends le bus » : <span class="m">p → q</span>, et surtout pas <span class="m">q → p</span>. L'implication ne se lit que dans un sens.</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> traduis la formule en français dans l'autre sens. Si tu obtiens une phrase plus forte ou plus faible que l'originale, la traduction est fausse.</p>
  <p class="blocage"><strong>Si la phrase contient « sauf si » :</strong> « q sauf si p » se traduit <span class="m">¬p → q</span>, ce qui équivaut à <span class="m">p ∨ q</span>. Écris les deux formes, c'est souvent accepté et vérifiable.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 2 · Table de vérité</span>
  <h3>Construire une table complète sans rater de ligne</h3>
  <p class="recette__when"><strong>Quand :</strong> « dresser la table de vérité », « cette proposition est-elle une tautologie », « les deux formules sont-elles équivalentes ».</p>
  <ol class="steps">
    <li><strong>Compte les variables :</strong> <span class="m">n</span> variables donnent exactement <span class="m">2ⁿ</span> lignes. Deux variables : 4 lignes. Trois : 8 lignes.</li>
    <li><strong>Remplis les colonnes de variables en binaire :</strong> la première variable change toutes les <span class="m">2^(n−1)</span> lignes, la dernière alterne à chaque ligne. V V F F pour deux variables.</li>
    <li><strong>Liste les sous-formules de la plus petite à la plus grande</strong> et crée une colonne pour chacune. Ne saute aucune étape intermédiaire.</li>
    <li><strong>Remplis colonne par colonne</strong> en appliquant la table du connecteur, pas de mémoire globale.</li>
    <li><strong>Conclus selon la dernière colonne :</strong> que des V → tautologie ; que des F → contradiction ; au moins un V → satisfaisable.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · (p → q) ↔ (¬p ∨ q)</span>
    <div class="tw"><table class="basetbl">
      <caption>Les deux membres sont toujours égaux</caption>
      <thead><tr><th>p</th><th>q</th><th>p → q</th><th>¬p</th><th>¬p ∨ q</th><th>↔</th></tr></thead>
      <tbody>
        <tr><td>V</td><td>V</td><td>V</td><td>F</td><td>V</td><td>V</td></tr>
        <tr><td>V</td><td>F</td><td>F</td><td>F</td><td>F</td><td>V</td></tr>
        <tr><td>F</td><td>V</td><td>V</td><td>V</td><td>V</td><td>V</td></tr>
        <tr><td>F</td><td>F</td><td>V</td><td>V</td><td>V</td><td>V</td></tr>
      </tbody>
    </table></div>
    <p>La colonne finale ne contient que des V : la formule est une <strong>tautologie</strong>. C'est aussi la preuve que <span class="m">p → q</span> équivaut à <span class="m">¬p ∨ q</span>.</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> compte tes lignes. Une ligne manquante ou dupliquée invalide toute la démonstration.</p>
  <p class="blocage"><strong>Si une implication te paraît fausse quand <span class="m">p</span> est faux :</strong> relis la définition. Une implication avec un antécédent faux est vraie, quelle que soit la conclusion. C'est le cas « vide ».</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 3 · Négation</span>
  <h3>Nier une formule sans se tromper</h3>
  <p class="recette__when"><strong>Quand :</strong> « nier la proposition », « contraire », « donner un contre-exemple », « montrer que c'est faux ».</p>
  <ol class="steps">
    <li><strong>Remplace chaque connecteur par son dual :</strong> <span class="m">∧</span> devient <span class="m">∨</span>, <span class="m">∨</span> devient <span class="m">∧</span>.</li>
    <li><strong>Nie chaque proposition atomique</strong> en la gardant au même niveau.</li>
    <li><strong>Utilise les règles exactes :</strong> <span class="m">¬(p ∧ q) = ¬p ∨ ¬q</span> ; <span class="m">¬(p ∨ q) = ¬p ∧ ¬q</span> ; <span class="m">¬(p → q) = p ∧ ¬q</span>.</li>
    <li><strong>Retire les doubles négations :</strong> <span class="m">¬¬p = p</span>.</li>
    <li><strong>Pour les quantificateurs, inverse le quantificateur :</strong> <span class="m">¬∀x P(x) = ∃x ¬P(x)</span> et <span class="m">¬∃x P(x) = ∀x ¬P(x)</span>.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé</span>
    <p>Nier « tous les étudiants ont validé et rendu le dossier » :<br>
    <span class="m">¬(∀x (V(x) ∧ D(x))) = ∃x ¬(V(x) ∧ D(x)) = ∃x (¬V(x) ∨ ¬D(x))</span>.</p>
    <p>En français : « il existe un étudiant qui n'a pas validé <em>ou</em> qui n'a pas rendu le dossier ». Le « et » devient « ou », et c'est le cœur du piège.</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> la négation doit être fausse exactement quand l'original est vraie. Prends un exemple concret et teste les deux.</p>
  <p class="blocage"><strong>Si tu obtiens « non (A et B) » sans développer :</strong> ce n'est pas une réponse, c'est une reformulation. Développe jusqu'à ce que le <span class="m">¬</span> ne porte plus que sur des propositions atomiques.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 4 · Implication</span>
  <h3>Distinguer implication, réciproque et contraposée</h3>
  <p class="recette__when"><strong>Quand :</strong> « réciproque », « contraposée », « cette implication est-elle vraie », ou un raisonnement par l'absurde.</p>
  <ol class="steps">
    <li><strong>Écris l'implication de départ :</strong> <span class="m">p → q</span>.</li>
    <li><strong>Réciproque :</strong> <span class="m">q → p</span>. Elle n'a aucune raison d'être vraie en même temps.</li>
    <li><strong>Contraposée :</strong> <span class="m">¬q → ¬p</span>. Elle est <strong>toujours</strong> équivalente à l'implication.</li>
    <li><strong>Contraire :</strong> <span class="m">¬p → ¬q</span>. Ce n'est ni la réciproque ni la contraposée, et ce n'est pas équivalent.</li>
    <li><strong>Pour prouver une implication fausse,</strong> donne un seul contre-exemple : un cas où <span class="m">p</span> est vraie et <span class="m">q</span> fausse.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · « si n est divisible par 4 alors n est pair »</span>
    <p>Implication : <span class="m">p → q</span> — vraie.<br>
    Réciproque <span class="m">q → p</span> — fausse, contre-exemple <span class="m">n = 6</span>.<br>
    Contraposée <span class="m">¬q → ¬p</span> — vraie : si <span class="m">n</span> est impair, il n'est pas divisible par 4.</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> la contraposée doit avoir la même valeur de vérité que l'implication sur toutes les lignes. Une seule ligne différente signale une erreur de négation.</p>
  <p class="blocage"><strong>Si on te demande de prouver <span class="m">p → q</span> et que le calcul direct bloque :</strong> prouve <span class="m">¬q → ¬p</span>. C'est la même chose, parfois beaucoup plus simple.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 5 · Quantificateurs</span>
  <h3>Lire une formule quantifiée dans le bon ordre</h3>
  <p class="recette__when"><strong>Quand :</strong> « pour tout », « il existe », et surtout quand les deux apparaissent dans la même phrase.</p>
  <ol class="steps">
    <li><strong>Lis de gauche à droite.</strong> Le premier quantificateur fixe qui choisit en premier.</li>
    <li><strong><span class="m">∀x ∃y</span> :</strong> pour chaque <span class="m">x</span>, on peut trouver un <span class="m">y</span>, éventuellement différent à chaque fois.</li>
    <li><strong><span class="m">∃y ∀x</span> :</strong> un même <span class="m">y</span> doit convenir à tous les <span class="m">x</span>. C'est beaucoup plus fort.</li>
    <li><strong>Traduis par un jeu :</strong> l'adversaire choisit <span class="m">x</span>, toi tu réponds par <span class="m">y</span>. L'ordre des quantificateurs dit qui joue en premier.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · sur les réels</span>
    <p><span class="m">∀x ∃y, y &gt; x</span> : vrai. Pour n'importe quel <span class="m">x</span>, je réponds <span class="m">y = x + 1</span>.<br>
    <span class="m">∃y ∀x, y &gt; x</span> : faux. Il faudrait un réel plus grand que tous les autres.</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> si la formule affirme l'existence d'un objet unique valable partout, cherche un contre-exemple en prenant un <span class="m">x</span> très grand.</p>
  <p class="blocage"><strong>Si la phrase est ambiguë :</strong> réécris-la avec « quel que soit » et « on peut trouver » avant de choisir l'ordre des quantificateurs.</p>
</div>

<div class="card copie">
  <h3>Copie modèle · exercice type de logique</h3>
  <p class="copie__q"><strong>Énoncé.</strong> Montrer que <span class="m">¬(p ∧ q) ↔ (¬p ∨ ¬q)</span> est une tautologie.</p>
  <pre class="copy">Table de vérité (2 variables, donc 4 lignes) :

p  q  |  p∧q  |  ¬(p∧q)  |  ¬p  |  ¬q  |  ¬p∨¬q  |  ↔
V  V  |   V   |    F     |  F   |  F   |    F    |  V
V  F  |   F   |    V     |  F   |  V   |    V    |  V
F  V  |   F   |    V     |  V   |  F   |    V    |  V
F  F  |   F   |    V     |  V   |  V   |    V    |  V

La dernière colonne ne contient que des V : la formule est vraie
quelles que soient les valeurs de p et q, c'est donc une tautologie.
On en déduit l'équivalence ¬(p∧q) ≡ ¬p∨¬q (loi de De Morgan).</pre>
  <p class="ctrl"><strong>Ce qui rapporte les points :</strong> les 4 lignes complètes, les colonnes intermédiaires, et la phrase de conclusion qui nomme la loi utilisée.</p>
</div>
`;

/* ==========================================================================
   05 · ENSEMBLES
   ========================================================================== */
METHODES.ens = `
<p class="methode-intro">Un exercice d'ensembles se résout avec deux outils seulement : le <strong>test d'appartenance</strong> (« soit x ∈ … ») et le <strong>comptage</strong>. Tout le reste en découle.</p>

<div class="recette">
  <span class="recette__tag">Recette 1 · Écritures</span>
  <h3>Passer de l'extension à la compréhension, et inversement</h3>
  <p class="recette__when"><strong>Quand :</strong> « décrire l'ensemble », « écrire en extension », « donner les éléments ».</p>
  <ol class="steps">
    <li><strong>Extension :</strong> tu listes les éléments entre accolades, séparés par des virgules. Un élément n'apparaît qu'une fois, l'ordre n'a aucune importance.</li>
    <li><strong>Compréhension :</strong> tu écris <span class="m">{x ∈ E | condition}</span> — l'ensemble de référence d'abord, la condition ensuite.</li>
    <li><strong>Vérifie que la condition est vérifiable :</strong> « x est grand » n'est pas une condition mathématique, « x &gt; 10 » oui.</li>
    <li><strong>Pour un ensemble fini, compte les éléments</strong> et écris le cardinal à part.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé</span>
    <p><span class="m">A = {x ∈ ℕ | x &lt; 5}</span> s'écrit en extension <span class="m">{0, 1, 2, 3, 4}</span>, donc <span class="m">|A| = 5</span>.</p>
    <p><span class="m">B = {2, 4, 6}</span> s'écrit <span class="m">{x ∈ ℕ | x pair et 0 &lt; x ≤ 6}</span>.</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> chaque élément listé doit satisfaire la condition, et chaque élément satisfaisant la condition doit être listé. Les deux sens.</p>
  <p class="blocage"><strong>Si l'ensemble semble infini :</strong> tu ne peux pas l'écrire en extension. Donne le cardinal comme infini et reste en compréhension.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 2 · Appartenance vs inclusion</span>
  <h3>Ne jamais confondre ∈ et ⊂</h3>
  <p class="recette__when"><strong>Quand :</strong> « compléter avec ∈ ou ⊂ », ou une question vrai/faux sur les ensembles.</p>
  <ol class="steps">
    <li><strong>Regarde la nature des deux objets.</strong> À gauche un <em>élément</em>, à droite un <em>ensemble</em> → <span class="m">∈</span>. À gauche un ensemble, à droite un ensemble → <span class="m">⊂</span>.</li>
    <li><strong>Test d'inclusion :</strong> <span class="m">A ⊂ B</span> signifie que tout élément de <span class="m">A</span> est dans <span class="m">B</span>.</li>
    <li><strong>Piège classique :</strong> <span class="m">∅</span> est un ensemble, <span class="m">{∅}</span> est un ensemble qui contient un élément. Donc <span class="m">∅ ∈ {∅}</span> mais <span class="m">∅ ⊂ {∅}</span> est aussi vrai.</li>
    <li><strong>Pour réfuter une inclusion,</strong> exhibe un élément de <span class="m">A</span> absent de <span class="m">B</span>. Un seul suffit.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé</span>
    <p><span class="m">2 ∈ {1, 2, 3}</span> : vrai, 2 est un élément.<br>
    <span class="m">{2} ⊂ {1, 2, 3}</span> : vrai, le singleton est inclus.<br>
    <span class="m">{2} ∈ {1, 2, 3}</span> : faux, <span class="m">{2}</span> n'est pas un élément de la liste.</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> remplace mentalement <span class="m">A ⊂ B</span> par « tout élément de A est dans B ». Si la phrase obtenue est absurde, le symbole est faux.</p>
  <p class="blocage"><strong>Si tu hésites :</strong> écris les éléments de chaque côté. Un singleton entre accolades se comporte comme un objet, pas comme une liste.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 3 · Opérations</span>
  <h3>Réunion, intersection, différence, complémentaire</h3>
  <p class="recette__when"><strong>Quand :</strong> « A ∪ B », « A ∩ B », « A \ B », « le complémentaire de A dans E », ou un diagramme de Venn.</p>
  <ol class="steps">
    <li><strong>Réunion <span class="m">A ∪ B</span> :</strong> les éléments qui sont dans <span class="m">A</span> <em>ou</em> dans <span class="m">B</span>, ou les deux. Aucun doublon.</li>
    <li><strong>Intersection <span class="m">A ∩ B</span> :</strong> les éléments présents dans les deux <em>à la fois</em>.</li>
    <li><strong>Différence <span class="m">A \ B</span> :</strong> les éléments de <span class="m">A</span> qui ne sont pas dans <span class="m">B</span>.</li>
    <li><strong>Complémentaire <span class="m">C_E(A)</span> :</strong> les éléments de <span class="m">E</span> qui ne sont pas dans <span class="m">A</span>. Il dépend de l'ensemble de référence, toujours précisé.</li>
    <li><strong>Vérifie avec les cardinaux :</strong> <span class="m">|A ∪ B| = |A| + |B| − |A ∩ B|</span>. Si ça ne colle pas, une opération est fausse.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · E = {1…5}, A = {1,2,3}, B = {3,4}</span>
    <p><span class="m">A ∪ B = {1,2,3,4}</span><br>
    <span class="m">A ∩ B = {3}</span><br>
    <span class="m">A \ B = {1,2}</span><br>
    <span class="m">C_E(A) = {4,5}</span></p>
    <p>Contrôle : <span class="m">|A| + |B| − |A∩B| = 3 + 2 − 1 = 4 = |A∪B|</span> ✔</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> <span class="m">A ∩ B</span> est toujours inclus dans <span class="m">A</span> et dans <span class="m">B</span>. Si tu trouves un élément de l'intersection absent de <span class="m">A</span>, c'est faux.</p>
  <p class="blocage"><strong>Si tu oublies le 3 dans l'union :</strong> c'est un doublon, il ne compte qu'une fois. Mais sa présence est obligatoire.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 4 · Ensemble des parties</span>
  <h3>Lister P(E) et compter ses éléments</h3>
  <p class="recette__when"><strong>Quand :</strong> « ensemble des parties », « combien de sous-ensembles », « P(E) ».</p>
  <ol class="steps">
    <li><strong>Compte <span class="m">n = |E|</span>.</strong></li>
    <li><strong>Le cardinal est <span class="m">2ⁿ</span>.</strong> Retiens la raison : chaque élément est soit pris, soit laissé, donc deux choix par élément.</li>
    <li><strong>Pour lister, procède par taille croissante :</strong> l'ensemble vide, puis les singletons, puis les paires, etc.</li>
    <li><strong>Termine par <span class="m">E</span> lui-même</strong>, qui est toujours un élément de <span class="m">P(E)</span>.</li>
    <li><strong>Vérifie le total</strong> avec la somme des coefficients binomiaux.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · E = {a, b}</span>
    <span class="formula">P(E) = { ∅, {a}, {b}, {a,b} } &nbsp;→&nbsp; 2² = 4 éléments</span>
    <p>Pour <span class="m">E = {a,b,c}</span> : <span class="m">2³ = 8</span> sous-ensembles, dont 1 vide, 3 singletons, 3 paires et 1 ensemble complet.</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> compte tes accolades. Le nombre d'éléments de <span class="m">P(E)</span> doit valoir exactement <span class="m">2ⁿ</span>, et <span class="m">E</span> doit y figurer.</p>
  <p class="blocage"><strong>Si tu obtiens <span class="m">n²</span> éléments :</strong> c'est faux, la croissance est exponentielle. Vérifie sur un exemple à deux éléments.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 5 · Double inclusion</span>
  <h3>Démontrer une égalité d'ensembles proprement</h3>
  <p class="recette__when"><strong>Quand :</strong> « montrer que A ∩ B = … », « démontrer l'égalité de deux ensembles ». C'est la seule méthode acceptée.</p>
  <ol class="steps">
    <li><strong>Annonce les deux sens :</strong> on montre d'abord <span class="m">A ⊂ B</span>, puis <span class="m">B ⊂ A</span>.</li>
    <li><strong>Pour chaque sens, commence par « soit <span class="m">x ∈ A</span> ».</strong> Tu ne supposes rien d'autre que l'appartenance.</li>
    <li><strong>Traduis l'appartenance en conditions</strong> avec les définitions : <span class="m">x ∈ A ∩ B</span> signifie <span class="m">x ∈ A</span> et <span class="m">x ∈ B</span>.</li>
    <li><strong>Déduis pas à pas</strong> l'appartenance voulue, en justifiant chaque étape.</li>
    <li><strong>Conclus par « donc <span class="m">A ⊂ B</span> », puis refais l'autre sens.</strong></li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · A ∩ B ⊂ A</span>
    <p>Soit <span class="m">x ∈ A ∩ B</span>. Par définition de l'intersection, <span class="m">x ∈ A</span> et <span class="m">x ∈ B</span>. En particulier <span class="m">x ∈ A</span>. Donc <span class="m">A ∩ B ⊂ A</span>.</p>
    <p>L'autre sens est faux en général : <span class="m">A ⊂ A ∩ B</span> exigerait <span class="m">A ⊂ B</span>. C'est pourquoi on distingue toujours les deux inclusions.</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> chaque ligne doit être une déduction, pas une affirmation. Si tu écris « donc » sans avoir utilisé une définition, la preuve est incomplète.</p>
  <p class="blocage"><strong>Si tu bloques sur un sens :</strong> prends un élément concret. Si tu trouves un contre-exemple, l'égalité est fausse et il faut le dire.</p>
</div>

<div class="recette">
  <span class="recette__tag">Recette 6 · Dénombrement</span>
  <h3>Compter une union, un produit cartésien, une partition</h3>
  <p class="recette__when"><strong>Quand :</strong> « combien de », une enquête avec deux critères, ou un ensemble découpé en sous-ensembles.</p>
  <ol class="steps">
    <li><strong>Deux ensembles :</strong> <span class="m">|A ∪ B| = |A| + |B| − |A ∩ B|</span>. La soustraction corrige le double comptage.</li>
    <li><strong>Trois ensembles :</strong> ajoute les trois, retire les trois intersections deux à deux, rajoute l'intersection triple.</li>
    <li><strong>Produit cartésien :</strong> <span class="m">|A × B| = |A| × |B|</span>. Chaque couple est un choix indépendant.</li>
    <li><strong>Partition :</strong> vérifie les trois conditions — aucun bloc vide, blocs deux à deux disjoints, union égale à l'ensemble de départ.</li>
    <li><strong>Vérifie le total</strong> en recomptant à partir des effectifs de chaque bloc.</li>
  </ol>
  <div class="ex">
    <span class="ex__tag">Déroulé · enquête sur 30 étudiants</span>
    <p>18 font du PHP, 12 font du Python, 5 font les deux.<br>
    <span class="m">|A ∪ B| = 18 + 12 − 5 = 25</span> font au moins l'un des deux.<br>
    Donc <span class="m">30 − 25 = 5</span> n'en font aucun.</p>
  </div>
  <p class="ctrl"><strong>Contrôle :</strong> le résultat d'une union ne peut jamais dépasser la somme des cardinaux, ni être inférieur au plus grand des deux.</p>
  <p class="blocage"><strong>Si tu obtiens un effectif négatif :</strong> tu as soustrait une intersection déjà comptée deux fois. Reprends le schéma et place les effectifs du centre vers l'extérieur.</p>
</div>

<div class="card copie">
  <h3>Copie modèle · exercice type d'ensembles</h3>
  <p class="copie__q"><strong>Énoncé.</strong> <span class="m">E = {1,…,8}</span>, <span class="m">A = {1,2,3,4}</span>, <span class="m">B = {3,4,5}</span>. Donner <span class="m">A ∪ B</span>, <span class="m">A ∩ B</span>, <span class="m">C_E(A)</span>, puis <span class="m">|P(B)|</span>.</p>
  <pre class="copy">A ∪ B = {1,2,3,4,5}   (5 éléments)
A ∩ B = {3,4}         (2 éléments)
C_E(A) = {5,6,7,8}    (4 éléments, car E \ A)

Contrôle du cardinal de l'union :
|A| + |B| − |A∩B| = 4 + 3 − 2 = 5 = |A∪B| ✔

B a 3 éléments, donc P(B) possède 2³ = 8 sous-ensembles :
∅, {3}, {4}, {5}, {3,4}, {3,5}, {4,5}, {3,4,5}.</pre>
</div>
`;
