import { Component, Inject, inject } from '@angular/core';
import { BannerService } from '../banner.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Banner } from '../banner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '../../app-reusables/controls/input/input.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-banner-form',
  standalone: true,
  imports: [CommonModule, MatToolbarModule,MatGridListModule, ReactiveFormsModule,
    MatIconModule, InputComponent, MatDialogModule, MatCheckboxModule, MatButtonModule,
    MatDatepickerModule, MatNativeDateModule,
    MatFormFieldModule, MatInputModule],
  templateUrl: './banner-form.component.html',
  styleUrl: './banner-form.component.scss',
})
export class BannerFormComponent {
  private bannerService = inject(BannerService);
  frm: FormGroup;
  imageSource!: string | ArrayBuffer | null;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {banner?: Banner}){
    this.frm = this.bannerService.createBannerForm(data.banner);
    this.imageSource = this.frm.get('ImageUrl')?.value;
  }
  reset() {
    this.frm.setValue(this.bannerService.createBannerForm(this.data.banner).value);    
    this.imageSource = this.frm.get('ImageUrl')?.value;
  }
  previewImage(event: any) {
    if(!event.target?.files || event.target?.files.length === 0) {
      return;
    }
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.imageSource = reader.result;      
    };
    reader.readAsDataURL(selectedFile);
    this.frm.get('ImageFile')?.setValue(selectedFile);
  }
  deleteImage() {
    this.frm.get('ImageFile')?.setValue(null);
    this.imageSource = "";
  }
}
