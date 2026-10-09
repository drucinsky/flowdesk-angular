---
description: Modern Angular (v22+) Frontend Conventions — Architecture, State, TypeScript, Styling, i18n
paths:
  - '**/*.ts'
  - '**/*.html'
  - '**/*.scss'
---

## 1. Architecture & Design Patterns

- **Standalone Only**: Never create NgModules. Do NOT set `standalone: true` inside decorators (it's the default in Angular v20+).
- **Facade Pattern**: Keep components presentation-focused (dumb). Extract complex business logic and state management into Facade services.
  - Facade files MUST be named `*.facade.ts`.
  - Facade classes MUST be named with a `Facade` suffix (e.g., `UserFacade`).
- **Composition over Inheritance**: Do NOT use base classes (`extends`). Share logic using Angular's composition features:
  - Use custom inject functions (composables) for shared state/logic. Name these functions starting with `inject` (e.g., `injectPagination()`) and place them in `*.feature.ts` or `*.util.ts` files.
  - Use `hostDirectives` for shared UI/DOM behavior.
- **Feature-first**: Group domains in directories with their own lazy-loaded routes. Never lazy-load single components.
- **Table Features**: Optional table capabilities that keep per-table state (selection, row expansion, inline edit) live in `shared/table-state/features/<name>/` as a `with<Name>()` function (`*.feature.ts`) passed to `provideTableState(config, ...features)`, with a typed `injectTable<Name>()`. Stateless helpers (e.g., CSV export) are plain `inject*` composables. Domain-specific actions (e.g., bulk delete) stay in the table's own feature folder. After an action that changes data, call `table.refresh()` and `selection.clear()`.
- **Services**: Design around a single responsibility. Use the new `@Service` decorator (Angular v22+) instead of `@Injectable({providedIn: 'root'})` for new singletons.

## 2. Component Authoring (v22+)

- **Change Detection**: Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly (it's the default in Angular v22+).
- **Injection**: Use `inject()` exclusively. Do NOT use constructors.
- **Signal-based APIs**: Use `input()`, `output()`, and `model()`. Never use `@Input()`/`@Output()`.
- **Host Bindings**: Do NOT use `@HostBinding` or `@HostListener`. Use the `host: {}` object inside the `@Component` / `@Directive` decorator instead.

## 3. TypeScript & Linting Rules (Strict)

- **Inputs**: All inputs MUST be readonly (e.g., `readonly myInput = input<string>();`).
- **Access Modifiers & Naming**:
  - Properties and methods accessed ONLY in the HTML template MUST be marked as `protected`.
  - All `private` class members MUST start with an underscore `_` (e.g., `private _cache = new Map<string, string>();`). This is enforced by ESLint.
  - `protected` class members (used only in the template) do NOT use an underscore (e.g., `protected isExpanded = signal(false);`).
- **Strictness**: Use strict type checking. Prefer type inference.
- **Null-safety**: Avoid `any`; use `unknown` plus narrowing. Write null-safe code natively.

## 4. State & Data Management

- **Signals**: Use Signals for local state. Use `computed()` for derived state and `linkedSignal()` for state derived from multiple reactive sources that must stay synchronized.
- **Mutations**: Do NOT use `.mutate()` on signals. Use `.set()` or `.update()`.
- **Async Flows**: Use RxJS for complex async streams. Suffix observable fields with `$` (e.g., `data$`).

## 5. Forms

- **Signal Forms**: Prefer `@angular/forms/signals` for new forms (stable in v22+) for type-safe field access and schema-based validation.
- **Form Schemas**: Define Signal Forms schemas (validation, debounce, disabled/hidden logic) in a separate `*.schema.ts` file using `schema<T>()` and pass it to `form()`. Export related constants (e.g., min lengths) from the same file. Do not inline schema functions in components or facades.
- If not using Signal Forms, strictly use Reactive Forms. Never use Template-driven forms.

## 6. Templates & Styling

- **Control Flow**: Use native `@if`, `@for`, `@switch`. Do not use `*ngIf`/`*ngFor`.
- **Bindings**: Do NOT use `ngClass` or `ngStyle`. Use native `class` and `style` bindings (e.g., `[class.active]="isActive()"`).
- **Images**: Use `NgOptimizedImage` for all static images (does not apply to inline base64).
- **Styles**: Keep component styles minimal. Use the project's utility CSS system (e.g., PrimeFlex) instead of custom scoped SCSS.
- **Empty Style Files**: Do NOT delete empty component style files (`*.less`/`*.scss`) and do not remove their `styleUrl`/`styleUrls` references during refactors. Keep them as they are.

## 7. Accessibility (A11y) & i18n

- **A11y**: Code MUST pass all AXE checks and follow WCAG AA minimums (focus management, contrast, ARIA).
- **Translations**: UI text MUST go through the translation layer. Keys are namespaced (`feature.component-name.key`). Polish is the default locale.

## 8. Testing (Disabled)

- **No Tests**: Do NOT write, generate, or suggest any tests, test files (e.g., `.spec.ts`), or testing setups. The project does not use tests. Skip testing entirely to save tokens and streamline responses.

## 9. Workflow: Analysis & Plan Before Implementation

- **Plan First**: Before starting any implementation, perform an analysis of the task and the relevant existing code, then describe an action plan (affected files, proposed approach, key decisions, risks/open questions).
- **Wait for Approval**: Do NOT start implementing until the user approves the plan. The user may accept it, change it, or propose alternatives — incorporate their feedback and, if the plan changes significantly, present the updated version.
- **Propose Alternatives**: Where there are meaningful trade-offs, present the recommended option together with alternatives instead of silently choosing one.
- **Trivial Changes**: For trivial, unambiguous changes (e.g., a typo, a one-line fix), a short statement of intent is enough.
- **Review Before Commit**: NEVER run `git commit` (or push / open a PR) before the user has reviewed the diff and explicitly approved it. After implementing, stop with changes uncommitted in the working tree, summarize what changed, and wait for approval. Approval of a plan is NOT approval to commit.

## 10. Advanced Angular Features & Performance

- **Routing & Params**: Do NOT inject `ActivatedRoute` to read parameters. Rely on Router Component Input Binding. Define route parameters, query parameters, and route data directly as `input()` functions.
- **Deferrable Views**: Liberally use `@defer` blocks in templates to lazy-load heavy components, modals, charts, or content below the fold. Always provide a `@placeholder`.
- **RxJS Interoperability**: Prefer converting streams to signals using `toSignal()` for template consumption over the `async` pipe.
- **Memory Management**: Do NOT use `ngOnDestroy` for unsubscribing. Always use `takeUntilDestroyed()` with `inject(DestroyRef)` for manual RxJS subscriptions.
- **Lifecycle Hooks**:
  - NEVER use `ngOnChanges`. React to input changes using `computed()`, `linkedSignal()`, or `effect()`.
  - Minimize `ngOnInit`. Initialize state declaratively at the property level whenever possible.
- **@for Loop Tracking**: Always use a unique identifier (e.g., `track item.id`) in `@for` loops. Never track by index unless items lack unique IDs.
- **DOM Manipulation**: Never access `window` or `document` directly. Use Angular's `DOCUMENT` token, or handle DOM updates safely using `afterNextRender()` to ensure SSR/hydration compatibility.
