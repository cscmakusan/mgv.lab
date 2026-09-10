# MARK.GV // Network & Security Engineer

GitHub Pages portfolio based on the original V6 terminal/NOC design.

## Included
- Original V6 dark terminal / NOC portfolio design
- Professional enterprise project archive (10 case studies)
- Proxmox + OPNsense Home Lab / Network View
- Interactive FortiGate-style diagnostic terminal
- Technical Arsenal, Certifications, Timeline and Contact sections
- Mark Gil Velasco profile photo and social/contact links
- Tools I Work With strip
- Fixed `HOME LAB` navigation anchor

## GitHub Pages
Upload the contents of this folder to your repository. For a user site, the repository should be named `<username>.github.io`.


Updated in V9: the Tools I Work With strip now uses a continuous horizontal marquee, pauses on hover, and respects reduced-motion preferences.


## Visitor Counter (GoatCounter)
The V10 build includes a visitor counter styled into the terminal/NOC interface. It is intentionally disabled until the GoatCounter site code is configured.

1. Create a GoatCounter site for your GitHub Pages domain.
2. In GoatCounter, enable **Allow adding visitor counts on your website**.
3. Open `script.js` and change:
   `const GOATCOUNTER_CODE = "";`
   to your code, for example `const GOATCOUNTER_CODE = "myportfolio";`.
4. Commit/push the updated files to GitHub Pages.

The counter uses GoatCounter's `TOTAL` visitor count and displays it in the top status bar and the metrics strip. GoatCounter counts visits/sessions rather than every page reload, and visitor-count responses may be cached for up to four hours.

Documentation: https://www.goatcounter.com/help/visitor-counter
