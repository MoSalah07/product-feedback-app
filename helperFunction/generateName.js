//  const createName = () => {
//     const arr = ['Elijah Moss', 'James Skinner', 'Anne Valentine', 'Ryan Welles', 'Zena Kelley'];
//     const arrNiceNameEmail = ['hexagon.bestagon', 'hummingbird1', 'annev1990', 'voyager.344', 'velvetround'];
//     const num = Math.floor( Math.random() * arrNiceNameEmail.length );
//     return {userName: arr[num], nickEmail: arrNiceNameEmail[num]};
// };

 const createNicName = () => {
     const arr = ['Elijah Moss', 'James Skinner', 'Anne Valentine', 'Ryan Welles', 'Zena Kelley'];
     const arrNiceNameEmail = ['hexagon.bestagon', 'hummingbird1', 'annev1990', 'voyager.344', 'velvetround'];
     let userName = '';
     let nickEmail = ''
    for ( let i = 0; i < arr.length;  i++) {

        userName = arr[Math.floor( Math.random() * arr.length )];
     }
     
     for ( let k = 0; k < arrNiceNameEmail.length;  k++) {
        nickEmail = arrNiceNameEmail[Math.floor( Math.random() * arrNiceNameEmail.length )]
     }
    return {userName, nickEmail};
}


export {createNicName}