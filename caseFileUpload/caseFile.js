import saveFileToCase from '@salesforce/apex/HCaseController.saveFileToCase';
import { api, LightningElement, wire, track } from 'lwc';

export default class CaseFile extends LightningElement {
    @api caseRecord;
    @api error;
    @track filePreview;
    caseNumber = '';
    @track successMessage;
    @track errorMessage;
    file;
    fileName = '';

    connectedCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        this.caseNumber = urlParams.get('caseNumber');
    }


    handleFileChange(event) {
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
            this.fileName = this.file.name;
            console.log(this.fileName);
            // Display the file preview (only if it's an image)
            if (this.file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.filePreview = reader.result;  // Base64 encoded image
                };
                console.log(this.fileName);
                reader.readAsDataURL(this.file);
            } else {
                this.filePreview = null;  // If not an image, reset preview
            }
        }

    }

    handleUpload() {
        if (!this.file || !this.caseNumber) {
            this.errorMessage = 'Please provide a case number and select a file to upload.';
            return;
        }
        
        // Read the file and convert it to Base64
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Data = reader.result.split(',')[1];  // Remove the metadata
            const contentType = this.file.type;
            saveFileToCase({ 
                caseNumber: this.caseNumber,  // caseId 대신 caseNumber 전송
                fileName: this.fileName, 
                base64Data: base64Data, 
                contentType: contentType 
            })
            .then((result) => {
                if (result == 'Success') {
                    this.successMessage = '파일이 성공적으로 업로드되었습니다!';
                    alert(this.successMessage);
                } else {
                    this.errorMessage = '알 수 없는 오류 발생';
                }
                this.errorMessage = null;
            })
            .catch(error => {
                this.errorMessage = '파일 업로드 오류: ' + error.body.message;
                alert(this.errorMessage);
                this.successMessage = null;
            });
        };
        reader.readAsDataURL(this.file);

    }



}
