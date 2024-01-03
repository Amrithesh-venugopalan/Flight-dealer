const sellPlaneEl = document.querySelector('.sell');
const showPlaneEl = document.querySelector('.show');
const buyPlaneEl = document.querySelector('.buy');
const searchPlaneEl = document.querySelector('.search');
const displayEl = document.querySelector('.display');

const planeServer = {
  planes: [],
  searchPlane: function (arr, planeName) {
    for (const item of arr) {
      if (item[0] === planeName) return true;
    }
    return false;
  },
  showDisplay: function (text) {
    displayEl.textContent = text;
  },

  filterPlanes: function (arr, pname, price = 10000) {
    let text = 'planes on sale are:\n\n';
    for (const plane of arr) {
      if (plane[0].includes(pname) && plane[1] <= Number(price)) {
        text += `${plane[0]} - ${plane[1]} cr\n`;
      }
    }
    this.showDisplay(text);
  },
  showPlanes: function () {
    let text = 'planes on sale are :\n\n';
    for (const plane of this.planes) {
      text += `${plane[0]} - ${plane[1]} cr\n`;
    }
    this.showDisplay(text);
  },
  searchPlane: function () {
    let planePrice = document.querySelector('.plane-number').value;
    let planeName = document.querySelector('.plane-name').value;
    if (planeName === '' && planePrice === '') {
      this.showPlanes();
    } else if (!planeName) this.filterPlanes(this.planes, planeName, planePrice);
    else if (!planePrice) this.filterPlanes(this.planes, planeName);
    else this.filterPlanes(this.planes, planeName, planePrice);
  },

  addPlane: function () {
    let planePrice = document.querySelector('.plane-number').value;
    let planeName = document.querySelector('.plane-name').value;
    planeDetails = [planeName, planePrice];
    if (planePrice && planeName && 1) {
      console.log(this.planes);
      this.planes.push(planeDetails);
      this.showDisplay('plane added for sale');
    }
  },
  findPlane: function (arr, pname, price) {
    for (const [ind, plane] of arr.entries()) {
      if (plane[0] === pname && plane[1] === price) {
        return [ind, plane[0], plane[1]];
      } else {
        this.showDisplay('no such plane available for sale');
      }
    }
  },

  deletePlane: function (ind) {
    this.planes = this.planes.slice(0, ind).concat(this.planes.slice(ind + 1));
  },
  buyPlane: function () {
    let planePrice = document.querySelector('.plane-number').value;
    let planeName = document.querySelector('.plane-name').value;
    if (planePrice && planeName) {
      let confirmInput = Number(prompt('press 1 to confirm order\npress 2 to cancel order'));
      if (confirmInput) {
        [planeindex, soldplane, soldprice] = this.findPlane(this.planes, planeName, planePrice);
        this.showDisplay(`Horray!! you bought a plane ${soldplane} for ₹${soldprice}cr.`);
        this.deletePlane(planeindex);
      } else {
        this.showDisplay('order cancelled');
      }
    } else {
      this.showDisplay('please enter both the input');
    }
  },
};

sellPlaneEl.addEventListener('click', planeServer.addPlane.bind(planeServer));
showPlaneEl.addEventListener('click', planeServer.showPlanes.bind(planeServer));
searchPlaneEl.addEventListener('click', planeServer.searchPlane.bind(planeServer));
buyPlaneEl.addEventListener('click', planeServer.buyPlane.bind(planeServer));

// // // if (planeName && planePrice && 1) {
// // // } else if (planeName && 1) {
// // //   // console.log('only name given');
// // // } else if (planePrice && 1) {
// // //   console.log('only price given');
// // // } else {
// // //   console.log('please enter an input');
// // // }
