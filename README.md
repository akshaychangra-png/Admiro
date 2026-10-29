# Admiro homepage concept

Open index.html in a modern browser. No build tools or installation required. All styles, scripts, fonts and imagery are local.

## Structure
- index.html — semantic homepage
- css/style.css — responsive layouts, light/dark theme tokens
- js/main.js — persistent theme, mobile navigation, placement toggle, accessible process tabs, concept dialogs, email draft
- images/ — local photo, video posters and original favicon
- videos/ — supplied scene.mp4 and studio-light.mp4
- fonts/ — local font with licensing

## Editing
Theme colours are at the top of css/style.css. Page copy is in index.html; interactive process copy is in js/main.js. The default is dark mode; the header toggle saves a choice locally. Reduced motion is supported.

## Before production
This is a front-end design concept. Illustrative placements, fictional Morrow/Pulse brands and creative workspace are clearly marked. No performance statistics, testimonials or customer relationships are asserted. Contact currently prepares an email draft to hello@admiro.io: verify or replace this address in js/main.js before launch. No email is sent automatically. Replace concept media with approved campaign assets and connect your preferred form backend if required. The supplied official logo is used with a Fraunces wordmark. Nothing has been deployed.

## Inspiration
AdCubes informed the scene-first storytelling and explanation sequence. Layout, wording, interactive mockups and brand styling were created independently for Admiro. Admiro public sign-in metadata described finding commercially valuable moments and matching brands to them; authenticated product capabilities were not assumed.

## Assets
Coffee photograph: https://unsplash.com/photos/coffee-cup-on-table-6VhPY27jdps (served from images.unsplash.com/photo-1495474472287-4d71bcdd2085), Unsplash License https://unsplash.com/license. Image downloaded locally; no runtime image requests. Original CSS gaming illustration and product mockup. Font license included in fonts/.

## Hero video update
Two supplied videos are switchable via the hero tabs. Muted looping inline playback, play/pause, poster fallback, reduced-motion support and offscreen pausing are included. Only the selected film loads. Professional stroke SVG icons replace decorative Unicode glyphs and arrows.

## Branding update
Supplied Admiro logo; Fraunces for the wordmark; Mona Sans throughout the website. Local variable fonts and OFL licenses are included. Charcoal/ember dark theme and warm neutral light theme, subtle SVG grain, faded grid with filled cells, and white-to-grey gradient headings in dark mode. Dark mode is now the first-visit default; saved theme choices are respected.

## Surface and spacing refinement
The process and contact sections use opposite surfaces: light sections in dark mode, dark sections in light mode. Dark texture is strengthened. Apple-inspired 8-point spacing, 44–48px controls, pill CTAs, larger pill labels and readable form type are applied across responsive layouts.

Header spans the viewport. Light-mode grids and ambient glows have stronger contrast. Dark surfaces use slow transform-only glow drift, disabled for reduced-motion preferences.

## Motion and playback
Locally bundled GSAP 3.13.0 animates three background glow layers and staggered brand-colour grid pulses. Reduced-motion disables decorative motion. Hero videos automatically advance on completion and cycle; manual pause and offscreen pause remain supported. Admiro wordmark uses regular Fraunces; favicon uses the supplied logo.

## Beauty showcase
Supplied cosmetics artwork placed in a full-width beauty/skincare feature below the two concept cards. The uploaded .gif contains a single-frame PNG, so it is stored correctly as cosmetics-morph.png; replace the img source with an actual animated GIF to enable morph playback.

Latest cosmetics replacement: cosmetics_loop_transparent_fixed.gif was inspected and also contains one PNG frame, not an animated GIF. Replaced the displayed artwork; a real multi-frame asset is required for morphing playback.

## Verified animated replacement
The GIF received inside ZIP is installed byte-for-byte at images/cosmetics_loop_transparent_fixed.gif. Multiple frames and infinite looping (loop=0) verified. Earlier single-frame upload notes are superseded.

Beauty feature includes a slowly rotating perspective text ring (“Beauty in motion · Made to belong”) and floating captions. Reduced-motion disables text movement. GIF retains its original infinite loop.

Cosmetics theme variants: black products in light mode and white products in dark mode. The image source follows the active theme on initial load and every toggle. Both supplied GIFs are verified multi-frame infinite loops.

Header Sign in links to https://admiro.io/login. Theme switches use a soft radial whole-page reveal from the toggle on desktop and a crossfade on mobile, matching the login page direction. View Transitions API with colour-transition fallback and reduced-motion support.

## In-scene platform section
Added directly before contact. Responsive HTML/SVG implementation with theme-aware surfaces and travelling connection dots, no CTA. Creator portraits derived using image generation from the supplied reference; asset: images/creator-portraits.png. Prompt: isolate the two circular creator headshots from the selected section reference on transparency, without text/panel/logo.

## Header languages
Globe/language control offers English, Turkish, Spanish, French, Simplified Chinese and Hindi shortcuts plus the full Google Translate supported-language selector. Service loads only when opened; requires internet and a served/hosted page. Machine translation is provider-powered; video/audio and text inside images are not translated. Google attribution remains visible. Error/retry state included.
