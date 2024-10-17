
public without sharing class HCaseController {

    @AuraEnabled
    public static String saveFileToCase(String caseNumber, String fileName, String base64Data, String contentType) {
        // CaseNumber로 CaseId 조회
        Case caseRecord = [SELECT Id, CaseNumber, Subject, Status, Description FROM Case WHERE CaseNumber = :caseNumber LIMIT 1];
        System.debug('Test');
        System.debug(caseRecord.CaseNumber);

        // 파일을 ContentVersion에 저장
        Blob fileBody = EncodingUtil.base64Decode(base64Data);
        ContentVersion contentVersion = new ContentVersion();
        contentVersion.Title = fileName;
        contentVersion.PathOnClient = fileName;
        contentVersion.VersionData = fileBody;
        contentVersion.IsMajorVersion = true;
        insert contentVersion;
        
        // // ContentDocumentLink로 Case와 연결
        ContentDocumentLink contentDocumentLink = new ContentDocumentLink();
        contentDocumentLink.LinkedEntityId = caseRecord.Id; // CaseId로 링크
        contentDocumentLink.ContentDocumentId = [SELECT ContentDocumentId FROM ContentVersion WHERE Id = :contentVersion.Id].ContentDocumentId;
        contentDocumentLink.ShareType = 'V';  // View 권한
        contentDocumentLink.Visibility = 'AllUsers';
        insert contentDocumentLink;

        return 'Success';
    }
    
   
}
