// const burger = document.getElementById('sidebarToggle');
// const sidebar = document.getElementById('sidebar');
// const page = document.getElementById('page');
// const body = document.body;

// burger.addEventListener('click', event => {
//     // document.body.classList.toggle('show-sidebar');
//     if(body.classList.contains('show-sidebar')) {
//         closeSidebar();
//     } else {
//         showSidebar();
//     }
// });

// function showSidebar() {
//     let mask = document.createElement('div');
//     mask.classList.add('page__mask');
//     mask.addEventListener('click', closeSidebar);
//     page.appendChild(mask);

//     body.classList.add('show-sidebar');
//     sidebar.classList.add('sidebar');
// }

// function closeSidebar() {
//     console.log('closed');
//     body.classList.remove('show-sidebar');
//     document.querySelector('.page__mask').remove();
//     sidebar.classList.remove('sidebar');
// }