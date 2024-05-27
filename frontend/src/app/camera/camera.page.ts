import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage {

  imageUrl: string = ''; // Initialize with an empty string

  constructor() { }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    if (image.webPath) {
      this.imageUrl = image.webPath;
    } else {
      // Handle the case where webPath is undefined
      console.error('Image path is undefined');
    }
  }

  async uploadPicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });

    if (image.webPath) {
      this.imageUrl = image.webPath;
    } else {
      // Handle the case where webPath is undefined
      console.error('Image path is undefined');
    }
  }
}
