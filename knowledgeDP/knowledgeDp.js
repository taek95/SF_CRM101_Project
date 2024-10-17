import { LightningElement, wire, track } from 'lwc';
import getAllKnowledgeArticles from '@salesforce/apex/KnowledgeArticleController.getAllKnowledgeArticles';

export default class KnowledgeDp extends LightningElement {
    @track knowledgeArticles = [];
    @track selectedArticle = null;
    @track articles = [];
    @track searchKey = '';

    connectedCallback() {
        this.loadKnowledgeArticles();
    }

    async loadKnowledgeArticles() {
        try {
            const articles = await getAllKnowledgeArticles();
            this.knowledgeArticles = articles;
        } catch (error) {
            console.error('Error loading knowledge articles:', error);
        }
    }

    handleButtonClick(event) {
        const articleId = event.target.dataset.id;
        this.selectedArticle = this.knowledgeArticles.find(article => article.Id === articleId);
    }


}
