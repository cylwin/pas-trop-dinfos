/**
 * This is an exemple of how we can filter article with a precalculated score
 * 
 */
var articles = [];
var selectedArticles = [];

var categories = [{
	name: "Politique",
	coef: 1
},
{
	name: "International",
	coef: 1
},
{
	name: "Science/IT",
	coef: 1
},
{
	name: "Sport",
	coef: 1
},
{
	name: "Economie",
	coef: 1
}
]

function randomizeArticles(){
	for (var i = 0; i < 25; i++) {
		var score = Math.floor(Math.random()*200);
		articles.push({
			titre : "titre"+i,
			categorie: Math.floor(i/5),
			score: score
		});
	}
}


function displayArticles(articles){
	console.log("===Articles===");
	for (var i = 0; i < articles.length; i++) {
		displayArticle(article[i]);
	}
}

function displayCategories(){
	console.log("===Categories===");
	for (var i = 0; i < categories.length; i++) {
		console.log(i + " - " + categories[i].name + " : c=" + categories[i].coef)
	}
}

function displayArticle(article, withComputedScore){
	console.log(article.titre);
	console.log(article.categorie + " - " + categories[article.categorie].name);
	console.log("Score : " + article.score);
	if(withComputedScore){
		console.log("Computed score : " + article.score*categories[article.categorie].coef)
	}
	console.log("==========");

}

function sortArticlesBycomputedScore(){
	articles.sort(function(a,b){
		return -(a.score*categories[a.categorie].coef - b.score*categories[b.categorie].coef);
	});
}

function selectArticles(){
	var nb_article = 0;
	while(nb_article<5){
		sortArticlesBycomputedScore();
		selectedArticles.push(articles[0]);
		displayArticle(articles[0], true);
		categories[articles[0].categorie].coef /= 1.2;
		articles.splice(0,1);
		nb_article++;
	}
}

function cleanDescription(){
    console.log("aaaa");
}

randomizeArticles();
selectArticles();
//displayArticles(selectedArticles);

displayCategories();
