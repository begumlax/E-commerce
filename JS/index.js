let images = ['https://wallpapercave.com/wp/wp3646126.jpg', 'https://wallpapercave.com/wp/wp3646146.jpg'

, 'https://wallpaperaccess.com/full/6747379.jpg',
'https://img.freepik.com/free-photo/bright-positive-fashion-studio-portrait-young-girl-with-nude-lips-bright-make-up-stylish-trendy-outfit-pink-skirt-smart-casual_496169-516.jpg?size=626&ext=jpg&ga=GA1.2.1250868961.1665811270'];
var isAuth = true
let index = 0;
const imgElement = document.querySelector('#home');
function change() {
    
    for(let i=0;i<imgElement.length;i++){
         imgElement.src = images[i];
         alert(imgElement.src)
    }
}

// window.onload = function () {
//     setInterval(change,1000);
// };