import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import ModalData from '../../components/modal/modalData.interface';

@Injectable()
export class ModalDataService {
    modalUpdate: Subject<ModalData> = new Subject<ModalData>();
    modalData: ModalData;

    constructor() { }

    updateModalData(newModalData:ModalData){
        this.modalUpdate.next(this.modalData = newModalData)
    }

}
