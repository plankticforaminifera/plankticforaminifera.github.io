const map = new Map();

map.set("hexag","Globorotaloides hexagonus");
map.set("sipho","Globigerinella siphonifera");
map.set("orbul","Orbulina universa");
map.set("gluti","Globogerinita glutinata");
map.set("calid","Globigerinella calida");
map.set("obliq","Pulleniatina obliquiloculata");

map.set("menar","Globorotalia menardii");
map.set("ungul","Globorotalia ungulata");
map.set("scitu","Globorotalia scitula");
map.set("tumid","Globorotalia tumida");
map.set("trunc","Globorotalia truncatulanoides");
map.set("crass","Globorotalia crassiformis");
map.set("toese","Globorotalia toesensis");

map.set("rubes","Globoturborotalita rubescens");
map.set("bullo","Globigerina bulloides");
map.set("falco","Globigerina falconensis");
map.set("digit","Beella digitata");
map.set("duter","Neogloboquadrina dutertrei");
map.set("incom","Neogloboquadrina incompta");
map.set("pachy","Neogloboquadrina pachyderma");

map.set("ruber","Globigerinoides ruber");
map.set("tenel","Globigerinoides tenellus");
map.set("batus","Globigerinoides conglobatus");

map.set("saccu","Trilobatus sacculifer");
map.set("merat","Globoquadrina conglomerata");

function checkSpecies(image_current){
    let IDext = image_current;
    let ID = IDext.substring(0, IDext.lastIndexOf("."));
    let IDmap = ID.substring(0, 5);  //Get the first five letters of ID 
    fullName = map.get(IDmap) // map ID letters

    if (ID.includes("duter")) {
        return ["D", ID, fullName]
    }
    else {
        return ["O", ID, fullName]
}
}

function checkScore(score){

    const PosPos = score.filter(x => x === 1).length; 
    const NegPos = score.filter(x => x === 2).length; 
    const PosNeg = score.filter(x => x === 3).length; 
    const NegNeg = score.filter(x => x === 4).length; 

    const total = (PosPos+NegPos+PosNeg+NegNeg)
    const scoreP = (PosPos+PosNeg)/total*100
    const scoreF = (PosPos+PosNeg)+"/"+total

    const scorePP = PosPos/(NegNeg+PosPos)*100
    const scorePN = PosNeg/(PosNeg+NegPos)*100
    return [scoreP, scoreF, scorePP, scorePN]

}
// let species_folders = []

//  fetch('./text/text.txt')
//    .then(response => response.text())
//    .then(text => {
//      species_folders = text.split('\n');
//      console.log(species_folders);

//      startProgram();
//    });

function qForm(currentID) {
event.preventDefault();
window.open('form.html?'+currentID.toString(),'_blank','resizable,height=400,width=400');
let value = document.getElementById('SpecimenID').value;
console.log(value)
return false;
}
let metadata = [];

const fetchMeta = ()=>{
    return fetch('./text/metadata.txt');
}
function infoClick(pos) {
    checkIfAnswered = document.getElementById('answerText').innerHTML         
    console.log(checkIfAnswered)
    if (checkIfAnswered == ''){
            console.log('waiting for answer')}
    else if (checkIfAnswered.includes('Correct') || checkIfAnswered.includes('Incorrect')){ // if html has an characters (true)
    fetchMeta()
    .then(res => res.text())
    .then(data => {

        metadata = data;
        metadata2 = metadata.split('**');

        img = document.getElementById('image1');
        imgID = img.getAttribute('src');
        imgID = imgID.substring(imgID.lastIndexOf("/")+1);
        console.log(imgID);

        //find the index of the image ID in the metadata array
        currentIndex = metadata2.findIndex(element=>element.includes(imgID));

        currentMeta = metadata2[currentIndex]
       
        if (typeof currentMeta == 'undefined') {
                infoText = "no data"
              }
              else {
            currentMeta2 = currentMeta.split('\n')
            fullName = map.get(currentMeta2[2])
            infoText = "<h1>Specimen Information:<h1>"+
                "<h2>ID: "+currentMeta2[1]+
                    '<br>Species: <i>'+fullName+"</i>"+
                    '<br>Region: '+currentMeta2[3]+
                    '<br>Source: '+currentMeta2[4]+"</h2>"+
                    '<br><h3 style="font-weight: normal">Question about this specimen or want to report a problem?'+ 
                    '<a href="" onClick="qForm(2)" style="color:blue;">Click Here.</a>' 
              }

        const infoBtn = document.querySelector('#infoBtn')
        const popup = document.querySelector("#myPopup"); 

        infoBtn.addEventListener('click',() => {
        if (pos=1){

            popup.classList.toggle("show");
            document.getElementById('myPopup').innerHTML = infoText;
            }
        
        else {
            popup.classList.toggle("noshow");
        }
        })
    
        })
    }
}




//using map
//console.log(map.get("a"));
// //Expected output: 97
//console.log(map.size);
// Expected output: 3
// map.delete("b");
// console.log(map.size);
// // Expected output: 2

//const image_array_rand_const = image_array.sort(() => Math.random() - .5);
//let image_array_rand = image_array_rand_const;
//let image_array_rand_length = image_array_rand.unshift('image1.jpg')
//console.log(image_array_rand)
//let image_current = image_array_rand[0];
// 
let image_current =  document.getElementById('image1')
imgAtt = image_current.getAttribute('src')
console.log(imgAtt)
document.getElementById('image1').src = `./${imgAtt}`;

const rand_value = Math.random() - .5
const counter_og = new Array(22).fill(0); //replace # with the number of species for the round (n-1)
let counter = [];
const postion_og = new Array(22).fill(0); //replace # with the number of species for the round
let position = [];

let IDlist=[];
let scoring=[];

//instead of splicing through the array, use the counter to move through the array
//instead of getting the final length, prompt it to quit when the counter number equals the array length
const fetchText = ()=>{
    return fetch('./text/text.txt');
}
function userSelection(response) {
    fetchText()
    .then(res => res.text())
    .then(data => {
        list = data
        list = list.split('\n');
        const list2 = Array.from(list);
        list3 = Array.from(list);
        let image_array = [];
        for (let i = 0; i < list2.length; i++){
            if (list2[i].includes("sp") || list2[i].includes("side") || list2[i].includes(".DS_Store") || list2[i].includes("image") ) {
               continue
            }
            else image_array.push(list2[i])
        }

        const image_array_rand_const = image_array.sort(() => rand_value)
        let image_array_rand = image_array_rand_const
        let image_array_rand_length = image_array_rand.unshift('image1.jpg')
        let image_current = image_array_rand[0];

    console.log(response)


    img = document.getElementById('image1')
    scale = document.getElementById('image2')
    console.log(scale)
    imgAtt = img.getAttribute('src')
    scaleAtt = scale.getAttribute('src')
    imgAtt = imgAtt.substring(0, imgAtt.lastIndexOf("."));
    scaleAtt = scaleAtt.substring(0, scaleAtt.lastIndexOf("."));
    console.log(imgAtt, scaleAtt)

    if (response == 4){
        if (imgAtt.includes("image")){ //if we are on start screen

            let image_current = image_array_rand[1]; //get the first image name of the array
            document.getElementById('image1').src = `./forams/${image_current}`; //display this image in image style 1

            console.log(position.length)
            speciesInfo = checkSpecies(image_current)
            species = speciesInfo[0]
            console.log(species)

             document.getElementById('image2').src = `./scalebars/${speciesInfo[1]}.png`; //display the errorbar for this image in image style 2
            return

        }
                      
                if (!imgAtt.includes("sp")){ //current image is front
                    spView = imgAtt + "_sp.png"
                    spView_scale = scaleAtt + "_sp.png"

                    document.getElementById('image1').src = spView;
                    document.getElementById('image2').src = spView_scale;

                }

                
                
                if (imgAtt.includes("sp")){
                    imgAtt = imgAtt.replace("_sp","");
                    scaleAtt = scaleAtt.replace("_sp","");
                    document.getElementById('image1').src = `${imgAtt}.png`;
                    document.getElementById('image2').src = `${scaleAtt}.png`;}
                
    }
                    

    if (response == 3) {

        if (counter.length==counter_og.length+1) { //if we are the las image 
            console.log("end")
            let score = checkScore(scoring)
            let scoreFormatted = 
                "<h1>Results:</h1>"+
                '<h2>\n'+score[0]+"%</h2>"+
                "<h3>You got "+score[1]+" correct</h3>"+
                "<p>\nYou correctly identified the target species "+score[2]+
                '% of the time \nand correctly excluded a species '+score[3]+"% of the time</p>"+
                "<p>placeholder for foot</p>"

            
            let foot = 
                "<p><a href='https://www.w3.org/' >Try Again</a></p>\n<p><a href='https://www.google.com/'>Return Home</a></p>\n<p><a href='https://www.google.com/'>Review Answers</a></p>"


            let modalbox = document.getElementById("modal1"); //parent ID
            let modalbody = document.getElementById("modalbody"); //child ID

            document.getElementById('modalbody').innerHTML = scoreFormatted; //Replaces text in child ID

            endPos = modalbody.children.length-1
            modalbody.children[endPos].innerHTML= foot//Replaces text in the child of child ID
                        
            modalbox.classList.toggle("show"); //will display the parent ID box
                        
                        


        
        return
        }
        document.getElementById('answerText').innerHTML=" ";
        document.getElementById('infoBtn').src = `./icons/info.svg`;
        console.log(counter)
        console.log(position)
                   
        //index_current_image = image_array_rand.indexOf[imgAtt]

        if (imgAtt.includes("image")) { //if we are on start screen
            //click a new link which will splice
            console.log("WAITING")
        }
        if (counter.length==position.length){
            console.log("waiting for user selection")
        }
        if (!imgAtt.includes("image") && counter.length==position.length+1) {//if we are NOT on start screen


            if (position.length==0) { //if we are on the first image 
                
                current_index=2
                let image_current = image_array_rand[current_index];
                document.getElementById('image1').src = `./forams/${image_current}`;

                position.push(imgAtt)

                console.log("Position:"+position)
                speciesInfo = checkSpecies(image_current)
                species = speciesInfo[0]
                console.log(species)

                document.getElementById('image2').src = `./scalebars/${speciesInfo[1]}.png`; //display the errorbar for this image in image style 2
            }
            else if (position.length > 0) { //if we are NOT on the first image 
                
                current_index=position.length+2
                let image_current = image_array_rand[current_index];
                document.getElementById('image1').src = `./forams/${image_current}`;


                position.push(imgAtt)
                
                console.log(image_array_rand)
                speciesInfo = checkSpecies(image_current)
                species = speciesInfo[0]
                console.log(species)

                document.getElementById('image2').src = `./scalebars/${speciesInfo[1]}.png`; //display the errorbar for this image in image style 2
            }
    
        }
    }
    
             
        else if (response == 1 && counter.length==position.length &&  !imgAtt.includes("image")) {
            
            console.log(response)
            counter.push(1);
            console.log(counter)
            if (species == "D") {
                answer = "<h3><p>Correct!</h3> <h4><br>Species:<br><i style='font-weight: normal;'>"+speciesInfo[2]+"</i></p></h4>"
                scoreID = 1
                console.log(answer)
                document.getElementById('answerText').innerHTML=answer;
                document.getElementById('infoBtn').src = `./icons/info2.svg`;
                IDlist.push(speciesInfo[1])
                scoring.push(scoreID)
            } else {
                answer = "<h3><p>Incorrect!</h3> <h4><br>Species:<br><i style='font-weight: normal;'>"+speciesInfo[2]+"</i></p></h4>"
                scoreID = 2
                console.log(answer)
                document.getElementById('answerText').innerHTML=answer;
                document.getElementById('infoBtn').src = `./icons/info2.svg`;
                IDlist.push(speciesInfo[1])
                scoring.push(scoreID)

            }
            
        }

        else if (response == 2 && counter.length==position.length && !imgAtt.includes("image")) {
            console.log(response)
            counter.push(1);
            console.log(counter)

            if (species == "O") {
                answer = "<h3><p>Correct!</h3> <h4><br>Species:<br><i style='font-weight: normal;'>"+speciesInfo[2]+"</i></p></h4>"
                scoreID = 3
                console.log(answer)
                document.getElementById('answerText').innerHTML=answer;
                document.getElementById('infoBtn').src = `./icons/info2.svg`;

                IDlist.push(speciesInfo[1])
                scoring.push(scoreID)
            } else {
                answer = "<h3><p>Incorrect!</h3> <h4><br>Species:<br><i style='font-weight: normal;'>"+speciesInfo[2]+"</i></p></h4>"
                scoreID = 4
                console.log(answer)
                document.getElementById('answerText').innerHTML=answer;
                document.getElementById('infoBtn').src = `./icons/info2.svg`;
                IDlist.push(speciesInfo[1])
                scoring.push(scoreID)
            }
              }
        else {
            console.log("waiting to start");
        }

   
    })
    .catch (err => console.log(err));

}

