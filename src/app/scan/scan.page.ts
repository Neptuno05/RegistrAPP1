import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage {
  qrResult!: string | null;

  segment = 'scan';
  qrText = '';
  constructor(
    private loadingController: LoadingController,
    private platform : Platform
  ) {}

  // captura el elemento html , lo convierte a canvas y obtiene una imagen
  captureScreen() {
    const element = document.getElementById('qrImage') as HTMLElement;

    html2canvas(element).then((canvas: HTMLCanvasElement) => {
      this.downloadImage(canvas);
      if(this.platform.is('capacitor')) this.shareImage(canvas);
      else this.downloadImage(canvas);
    });
  }

  // ********* download image (web)****************
  downloadImage(canvas: HTMLCanvasElement) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'qr.png';
    link.click();
  }

  // ************** share image (mobile) ****************
  async shareImage(canvas: HTMLCanvasElement) {
    let base64 = canvas.toDataURL();
    let path = 'qr.png';


      const loading = await this.loadingController.create({ spinner: 'crescent'});
      await loading.present();


    await Filesystem.writeFile({
      path,
      data: base64,
      directory: Directory.Cache,
    }).then(async (res) => {
      let uri = res.uri;

      await Share.share({ url: uri });

      await Filesystem.deleteFile({
        path,
        directory: Directory.Cache
      });
    }).finally(() => {
      loading.dismiss();
    })
  }

  // onCodeResult(result: string) {
  //   this.qrResult = result;
  //   // Aquí puedes implementar la lógica para registrar la asistencia
  //   console.log('Código QR escaneado:', result);
  // }
}
