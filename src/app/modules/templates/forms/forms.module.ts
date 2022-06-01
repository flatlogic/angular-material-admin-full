import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormElementsPageComponent } from './components/form-elements-page/form-elements-page.component';
import { FormValidationPageComponent } from './components/form-validation-page/form-validation-page.component';
import {FormsRoutingModule} from './forms-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import { HorizontalFormComponent } from './components/horizontal-form/horizontal-form.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DefaultFormComponent } from './components/default-form/default-form.component';
import { SelectsComponent } from './components/selects/selects.component';
import {MatSelectModule} from '@angular/material/select';
import { InputVariantsComponent } from './components/input-variants/input-variants.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { TextariasComponent } from './components/textarias/textarias.component';
import { SimpleValidationComponent } from './components/simple-validation/simple-validation.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    FormElementsPageComponent,
    FormValidationPageComponent,
    HorizontalFormComponent,
    DefaultFormComponent,
    SelectsComponent,
    InputVariantsComponent,
    TextariasComponent,
    SimpleValidationComponent
  ],
    imports: [
        CommonModule,
        FormsRoutingModule,
        SharedModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        MatCheckboxModule,
        ReactiveFormsModule
    ]
})
export class FormsModule { }
