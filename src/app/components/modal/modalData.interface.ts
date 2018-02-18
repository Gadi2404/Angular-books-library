interface ModalData{
    isOpen: boolean;
    title: string;
    modalType: string;
    actionType: string;
    data: object;
    callback?(book: any):void;
}

export default ModalData;