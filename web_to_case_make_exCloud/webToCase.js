import { LightningElement, track } from 'lwc';
import createCase from '@salesforce/apex/webToCaseController.createCase';

export default class CaseCreator extends LightningElement {
    @track subject = '';
    @track description = '';
    @track caseId;
    @track error;

    handleSubjectChange(event) {
        this.subject = event.target.value;
    }

    handleDescriptionChange(event) {
        this.description = event.target.value;
    }

    handleCreateCase() {
        createCase({ subject: this.subject, description: this.description })
            .then(result => {
                this.caseId = result.Id; // Case ID 저장
                this.error = undefined;
                alert('문의가 성공적으로 등록되었습니다. 문의 번호: ' + this.caseId);
            })
            .catch(error => {
                this.error = error.body.message; // 에러 메시지 저장
                this.caseId = undefined;
            });
    }
}
