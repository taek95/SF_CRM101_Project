public without sharing class webToCaseController {
    @AuraEnabled
    public static Case createCase(String subject, String description) {
        Case newCase = new Case(
            Subject = subject,
            Description = description,
            Origin = 'Web',
            Status = 'New' 
        );
        insert newCase;

        try {
            // assignment process 적용
            Database.DMLOptions dmlOpts = new Database.DMLOptions();
            dmlOpts.assignmentRuleHeader.useDefaultRule = true;
            newCase.setOptions(dmlOpts);
            update newCase;
            return newCase;
        } catch (Exception e) {
            throw new AuraHandledException('Error creating case: ' + e.getMessage());
        }
    }
}
