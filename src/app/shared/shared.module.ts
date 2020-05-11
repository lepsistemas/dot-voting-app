import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { WebviewDirective } from './directives/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective],
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, ReactiveFormsModule, MaterialModule],
})
export class SharedModule {}
