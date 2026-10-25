# BitePilot customer demo mockup

Open `index.html` in a browser. It is a standalone HTML/CSS/JavaScript prototype with no build step, backend or third-party JavaScript dependencies.

## What customers can click through

- Overview with order counts, queue status and recent example tickets.
- Kitchen queue with clickable status transitions.
- Order list with status filters, search, receipt preview and CSV export.
- Menu search, category filters and availability switches.
- Customer-facing storefront preview that opens as its own page and can be presented separately.
- Pricing and proposal page with an explicitly suggested Starter offer.
- Receipt modal with browser print action.

The dark banner marks the experience as a demo. Sweet n Lovely's profile, menu names, descriptions, size prices, and availability are based on the current app catalog. The seven order tickets, customer names, order statuses, and weekly chart are fabricated sample content; changes remain in the current browser session only. Storefront checkout is a visual demo and sends no order or payment.

The storefront includes menu search and categories, small/large size selection, sold-out states, editable quantities, a kitchen note, pickup details, and a demo basket. It uses CSS and emoji artwork so it runs without external image services.

`storefront.html` is a standalone customer preview. Keep it together with `menu-data.js`, `storefront.js`, `storefront.css`, `standalone-storefront.css`, and `styles.css`. For another device on the same Wi-Fi, serve the `docs/demo` folder from your computer and open its network address on the other device; `localhost` only points to the device currently viewing it.

The proposal page suggests a R299/month Starter price and a 30-day pilot. This is a discussion starting point, not a validated rate, active subscription, or contract. The demo does not submit a subscription or pilot request.

The workspace uses a restrained neutral palette with BitePilot orange for primary actions and consistent typography and spacing across the screens. This prototype is for customer feedback; it has no backend, and edits are held only in the current page session.

## Interface rules

- Layout spacing uses an 8px base scale, with 4px increments for compact controls.
- Type hierarchy: 28px page title, 17–21px section title, 14px body, and 11–12px supporting text.
- Orange marks the primary action. Success, warning and error colors are reserved for status.
- Keyboard focus is visible; filters expose their selected state, and switches announce availability.
- Search, empty results, sold-out items, status confirmations and export errors have explicit states. The demo data is local, so it does not simulate network loading.
