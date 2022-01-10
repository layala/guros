const { response } = require('express');
const DnaModel = require('../models/dna');

const gurosGet = async (req, res = response) => {
  
    const resp = await Promise.all([
         DnaModel.find({mutation: true}).countDocuments(),
        DnaModel.find({mutation: false}).countDocuments()
    ])
    console.log(resp)
    const ratio = (resp[0] * resp[1]) / 100;

    res.json({
        count_mutations: resp[0],
        count_no_mutation: resp[1],
        ratio: ratio
    }) 
}

const gurosPost = async (req, res = response) => {
    const { dna } = req.body;
    var newArr = [];
    var arrVert = [];
    var r = []
    var match = 0;
    var mutation;
    const  search = async (e) => {
        console.log(e)
        r = e.reduce((a, d) => ( a[d] ? a[d] += 1 : a[d] = 1, a), {});
        console.log(r)
        r['A'] >= 4 ? match++ : '';
        r['T'] >= 4 ? match++ : '';
        r['C'] >= 4 ? match++ : '';
        r['G'] >= 4 ? match++ : '';
    }
    dna.forEach((element) => newArr.push(Array.from(element)) );
    newArr.forEach((e, x) => {  
        // horizontal search 
        search(e)
        //  create vertical array
        arrVert.push(newArr.map(a => a[x]));
    })
    // seach in vertical array
    arrVert.forEach((e) =>  search(e));
      //search oblicuos
    newArr.forEach((e, x) =>{
        var count = {};
        var iterator = function (element) {
            count[element] = (count[element] || 0) + 1;
            count[element] >= 4 ? match +=  1 : '';
        }
        if (e[x].forEach) {
            e[x].forEach(function (element, c) {
                iterator(element);
            });
        }  else {
            for (var j = 0; j < e[x].length; j++) {
                iterator(e[j]);
            }
        } 
    })
  
  //  console.log(arrVert)
    console.log('count: ', match)
    match > 1 ? mutation = true : mutation = false
    console.log(mutation)
    var resM = 200;
    mutation == true ? resM = resM : resM = 403;
    // save results
    const dnaResult = new DnaModel({dna: JSON.stringify(dna), mutation });
     await dnaResult.save()
    res.status(resM).json({
        body: dna,
        msg: 'post - controller'
       
    })
}

module.exports = {
    gurosGet, gurosPost
}