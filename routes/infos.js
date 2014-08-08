module.exports = function(app){

var express = require('express');
var router = express.Router();


/* GET today best infos. */
app.get('/infos', function(req, res) {

    var testRes = {categories : [
        {
            name : "Science/HighTech",
            _id : "fdsqfqs123",
            infos : [
                {
                    _id : "1a",
                    title : "Un virus inconnu présent chez un humain sur deux",
                    description : "Il est surprenant qu'un virus de la flore "+
                        "intestinale aussi répandu ait pu échapper si longtemps aux biologistes, s'étonnent les chercheurs qui l'ont débusqué.",
                    link : "http://passeurdesciences.blog.lemonde.fr/2014/08/01/ce-virus-inconnu-present-chez-un-humain-sur-deux/",
                    img : "http://s2.lemde.fr/image/2014/06/24/534x267/4443998_3_4039_les-bacteries-escherichia-coli-sont-tres_9776ad871ae4ae86d3c702fab0555e66.jpg",
                    score : 9.9,
                    source : "Le monde"
                },
            ]
        },
        {
            name : "Economie/Politique",
            _id : "fsefqd3323sd",
            infos : [
                {
                    _id : "1a2",
                    title : "Découverte d'une inscription en arabe datant du Ve siècle",
                    description : "Une mission franco-saoudienne a fait la découverte en Arabie saoudite d'un texte écrit dans une graphie intermédiaire entre le nabatéen et l'arabe, premier stade de l'écriture arabe.",
                    link : "http://autourduciel.blog.lemonde.fr/2014/07/31/1er-2-et-3-aout-observez-le-ciel-partout-en-france-lors-des-24e-nuits-des-etoiles/",
                    img : "http://s1.lemde.fr/image/2014/07/30/534x267/4464393_3_7d18_l-atv-georges-lemaitre_147db9d1a7c39aecc3f02c8df43561e0.jpg",
                    score : 7.9,
                    source : "Le figaro"
                },
            ]
        },
        {
            name : "Sport",
            _id : "fs123fqd33",
            infos : [
                {
                    _id : "13a",
                    title : "Quand des archéologues exhument les corps de poilus",
                    description : "Cent ans après, sur les lieux de la guerre de 1914-1918, les archéologues effectuant des fouilles préalables à de travaux d'aménagement du territoire retrouvent encore les restes de soldats.",
                    link : "http://www.lemonde.fr/planete/article/2014/07/30/le-virus-ebola-hors-de-controle-menace-de-s-etendre-en-afrique-de-l-ouest_4464511_3244.html",
                    img : "http://s2.lemde.fr/image/2014/07/04/534x267/4450949_3_5635_des-membres-de-l-ong-medecins-sans-frontieres-s_b201d231d25c07f292c912a0ea3add04.jpg",
                    score : 2.3,
                    source : "Next inpact"
                },
            ]
        },
        {
            name : "Santé",
            _id : "fdfqd33fq3",
            infos : [
                {
                    _id : "431a",
                    title : "Mars recèle les archives de la Terre",
                    description : "Dans une mini-conférence, la chercheuse Violaine Sautter explique comment Mars garde la trace de processus géologiques qui ont aussi façonné la Terre jeune mais qu'on ne voit plus.",
                    link : "http://www.lemonde.fr/sciences/article/2014/07/30/decollage-reussi-pour-une-fusee-ariane-5-en-route-pour-ravitailler-l-iss_4464390_1650684.html",
                    img : "http://s1.lemde.fr/image/2014/07/28/534x267/4463817_3_5ed7_selon-un-paleontologue-britannique-si_46efbdc08819cdaf0fe813936be23536.jpg",
                    score : 4.8,
                    source : "Libération"
                },
            ]
        },
        {
            name : "Internationnal",
            _id : "fdkbgofs68f",
            infos : [
                {
                    _id : "12341a",
                    title : "Sierra Leone : le médecin à la tête de la lutte contre Ebola meurt du virus",
                    description : "En Guinée, au Liberia et en Sierra Leone, 672 morts ont été imputées au virus depuis le début de l'épidémie, en février.",
                    link : "http://www.lemonde.fr/planete/article/2014/07/29/sierra-leone-le-medecin-charge-de-diriger-la-lutte-contre-ebola-meurt-du-virus_4464379_3244.html",
                    img : "http://s2.lemde.fr/image/2010/10/05/534x267/1420341_3_b467_fecondation-in-vitro-par-injection-de-l-adn_54101de4bd1f549209e9ffbc23f206af.jpg",
                    score : 1.2,
                    source : "Les echos"
                },
                {
                    _id : "1a09",
                    title : "lorem ipsum article 2 dans une categorie hahaha",
                    description : "lorem ipsum article 2 dans une categorie hahaha lorem ipsum article 2 dans une categorie hahaha lorem ipsum article 2 dans une categorie hahaha",
                    link : "http://www.lemonde.fr/sciences/article/2014/07/30/decollage-reussi-pour-une-fusee-ariane-5-en-route-pour-ravitailler-l-iss_4464390_1650684.html",
                    img : "http://s1.lemde.fr/image/2014/07/28/534x267/4463817_3_5ed7_selon-un-paleontologue-britannique-si_46efbdc08819cdaf0fe813936be23536.jpg",
                    score : 9.7,
                    source : "Rue 89"
                },
            ]
        },
    ]}

    res.send(testRes);
});

};
