// KnowledgeArticleController.cls
public without sharing class KnowledgeArticleController {

    @AuraEnabled(cacheable=true)
    public static List<Knowledge__kav> getAllKnowledgeArticles() {
        return [SELECT Id, Title, Summary FROM Knowledge__kav WHERE PublishStatus = 'Online' AND Language = 'ko' 
        ORDER BY CreatedDate DESC LIMIT 5];
    }
}
