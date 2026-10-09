const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

function getArg(name) {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? null : args[index + 1];
}

function toPascalCase(value) {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function toConstantName(value) {
  return value.replace(/-/g, '_').toUpperCase();
}

function writeFile(targetDir, fileName, content) {
  fs.writeFileSync(path.join(targetDir, fileName), content.trimStart());
}

const feature = getArg('feature');
const name = getArg('name');

if (!feature || !name) {
  console.error('Usage: npm run generate:modal -- --feature cases --name close-case');
  process.exit(1);
}

const modalName = `${name}-modal`;
const pascalName = `${toPascalCase(name)}Modal`;
const modalConstName = `${toConstantName(name)}_MODAL`;
const targetDir = path.join(process.cwd(), 'src', 'app', 'features', feature, 'modals', modalName);

if (fs.existsSync(targetDir)) {
  console.error(`Modal already exists: ${targetDir}`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

writeFile(
  targetDir,
  `${modalName}.types.ts`,
  `
export interface I${pascalName}Data {
  // TODO: define modal input data
}

export interface I${pascalName}Result {
  // TODO: define modal close result
}
`,
);

writeFile(
  targetDir,
  `${modalName}.definition.ts`,
  `
import { type IAppModalDefinition } from '../../../../shared/modal/modal.definition';
import { ${pascalName}Component } from './${modalName}.component';
import { type I${pascalName}Data, type I${pascalName}Result } from './${modalName}.types';

export const ${modalConstName}: IAppModalDefinition<I${pascalName}Data, I${pascalName}Result> = {
  key: '${feature}.${name}',
  component: ${pascalName}Component,
  title: '${toPascalCase(name)}',
  width: 720,
  className: 'fd-${modalName}',
  maskClosable: false,
};
`,
);

writeFile(
  targetDir,
  `${modalName}.service.ts`,
  `
import { Service, inject } from '@angular/core';
import { type Observable } from 'rxjs';

import { AppModalService } from '../../../../shared/modal/app-modal.service';
import { ${modalConstName} } from './${modalName}.definition';
import { type I${pascalName}Data, type I${pascalName}Result } from './${modalName}.types';

@Service()
export class ${pascalName}Service {
  private readonly _modal = inject(AppModalService);

  open(data: I${pascalName}Data): Observable<I${pascalName}Result | undefined> {
    return this._modal.open(${modalConstName}, data);
  }
}
`,
);

writeFile(
  targetDir,
  `${modalName}.facade.ts`,
  `
import { Injectable, signal } from '@angular/core';

@Injectable()
export class ${pascalName}Facade {
  readonly loading = signal(false);
}
`,
);

writeFile(
  targetDir,
  `${modalName}.component.ts`,
  `
import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

import { ${pascalName}Facade } from './${modalName}.facade';
import { type I${pascalName}Data, type I${pascalName}Result } from './${modalName}.types';

@Component({
  selector: 'fd-${modalName}',
  imports: [NzButtonModule],
  templateUrl: './${modalName}.component.html',
  styleUrl: './${modalName}.component.scss',
  providers: [${pascalName}Facade],
})
export class ${pascalName}Component {
  private readonly _modalRef = inject<NzModalRef<unknown, I${pascalName}Result>>(NzModalRef);

  protected readonly data = inject<I${pascalName}Data>(NZ_MODAL_DATA);
  protected readonly facade = inject(${pascalName}Facade);

  protected cancel(): void {
    this._modalRef.close();
  }

  protected confirm(): void {
    this._modalRef.close({} as I${pascalName}Result);
  }
}
`,
);

writeFile(
  targetDir,
  `${modalName}.component.html`,
  `
<section class="${modalName}">
  <p>TODO: add modal content.</p>

  <footer class="${modalName}__actions">
    <button nz-button type="button" (click)="cancel()">Cancel</button>
    <button nz-button nzType="primary" type="button" (click)="confirm()">Confirm</button>
  </footer>
</section>
`,
);

writeFile(
  targetDir,
  `${modalName}.component.scss`,
  `
.${modalName} {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.${modalName}__actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
`,
);

writeFile(
  targetDir,
  `${modalName}.component.spec.ts`,
  `
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

import { ${pascalName}Component } from './${modalName}.component';

describe('${pascalName}Component', () => {
  let component: ${pascalName}Component;
  let fixture: ComponentFixture<${pascalName}Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [${pascalName}Component],
      providers: [
        {
          provide: NzModalRef,
          useValue: {
            close: () => undefined,
          },
        },
        {
          provide: NZ_MODAL_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(${pascalName}Component);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
`,
);

writeFile(
  targetDir,
  'index.ts',
  `
export * from './${modalName}.service';
export * from './${modalName}.types';
`,
);

console.log(`Created modal: ${targetDir}`);
