import { Common } from './spectra-bdsd-plugin.common';
import {SpectraBdsdOptions} from "./options";

declare var org: any;

export class SpectraBdsdPlugin {

    private _bdsdAsyncTask: any;
    public start(options: SpectraBdsdOptions): Promise<any> {
        console.log("BDSD Plugin starting.");
        return new Promise(async(resolve, reject) => {
            try {
                this._bdsdAsyncTask = new org.eu.transfusion.spectrabdsddetector.BDSDDetector.BDSDDetectorAsyncTask(
                    new org.eu.transfusion.spectrabdsddetector.OnBDSDDetectorListener({
                        onBDSDDetectionResult: options.onBDSDDetectionResult
                    })
                );

                this._bdsdAsyncTask.execute(null);

            } catch (ex) {
                console.log(ex);
                reject(ex);
            }
        });
    }

    public stop() {
        return new Promise(async (resolve, reject) => {
            try {
                this._bdsdAsyncTask.cancel(true);
                this._bdsdAsyncTask = null;
            } catch (ex) {
                console.log(ex);
                reject(ex);
            }
        });
    }
}
