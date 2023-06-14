const table = document.querySelector('.artistTable');
const url = 'https://raw.githubusercontent.com/speculative-salon/speculative-salon.github.io/main/data.jsonl';
//const url = 'data.jsonl';
window.addEventListener('DOMContentLoaded',()=>{
   fetchData();
})
let images = new Set()

const increment = 30
let numImages = increment;
let lines = null;
function fetchData(){
    fetch(url)
      .then(response => response.text())
      .then(data => {
        lines = data.split('\n').reverse();
        
        let top = new Array();

        for (let line of lines ){
            if (line.trim() !== '') {
                if (top.length < numImages ) {
                    top.push(line)
                }
            }
        }
        top.reverse().forEach(line => {
        if (line.trim() !== '') {
            const obj = JSON.parse(line);
            // Do something with the object
              if (!images.has(obj.img)){
                    addToPage(obj, true)
                  }
          }
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });

}


function loadMore(){

    numImages += increment;
    console.log(numImages)
    let top = new Array();

    for (let line of lines ){
        if (line.trim() !== '') {
            if (top.length < numImages ) {
                top.push(line)
            }
        }
    }
    top.forEach(line => {
    if (line.trim() !== '') {
        const obj = JSON.parse(line);
        // Do something with the object
        if (!images.has(obj.img)){
                addToPage(obj, false)
              }
      }
    });

}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}



function addToPage(el, addTop){

   const frame = document.createElement('tr')
   if (addTop){ 
    insertAfter(frame,  table.firstElementChild);
   }else{
        table.append(frame)
   }
   images.add(el.img)
   const tdImg = document.createElement('div');
   const img = document.createElement('img');
   img.src = el.img

   //const link = document.createElement('a');
    
   //link.href = el.img + '_small.jpeg'
   //link.appendChild(img)
   //tdImg.append(link)
   tdImg.append(img)
   const name = document.createElement('div')
   name.textContent = 'Speculative Collaboration between: '

   //name.textContent = 'Artists: ' + el.name1 + ', ' + el.name2;
   const port1 = document.createElement('a')
   const and = document.createElement('text')
   and.textContent = ' and '
   port1.textContent = el.name1
   port1.href = el.port1
   const port2 = document.createElement('a')
   port2.textContent = el.name2 
   port2.href = el.port2

   name.append(port1)
    name.append(and)
   name.append(port2)
   const dateDiv = document.createElement('div')
   dateDiv.textContent = "Created: " + el.time
   dateDiv.id = 'bottomDiv'
   frame.append(tdImg)
   frame.append(name)
   frame.append(dateDiv)
   frame.append(document.createElement('br'))
}


const refreshIntervalSeconds = 10; // Change this value to your desired interval
setInterval(fetchData, refreshIntervalSeconds * 1000);






